import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

////////////////////paper////////////////////
import { Checkbox, Snackbar } from "react-native-paper";

//////////////////app icons////////////////
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../components/Button/CustomButton";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";
import CamerBottomSheet from "../../../components/CameraBottomSheet/CameraBottomSheet";
import CustomModal from "../../../components/Modal/CustomModal";
//-------------->Dropdowns
import Categories from "../../../components/Dropdowns/Categories";
import ProductCondition from "../../../components/Dropdowns/ProductCondition";

//////////////app pakages//////////////////
import ImagePicker from "react-native-image-crop-picker";

/////////////app styles////////////////
import styles from "./styles";
import Uploadstyles from "../../../styles/GlobalStyles/Upload";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setCategoryName, setSubCategoryName,setItemImagesArray } from "../../../redux/actions";

/////////////////App Api function/////////////////
import { post_Item_Images } from "../../../api/Upload Item";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";

const UploadItem = ({ navigation, route }) => {
  /////////////redux states///////
  const {
    category_name,
    product_condition,
    sub_category_name,
    category_id,
    sub_category_id,
    item_images_array,
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ///////////checkbox/////////////
  const [exchangebuychecked, setExchangebuyChecked] = React.useState(false);
  const [fixedpricechecked, setFixedpriceChecked] = React.useState(false);
  const [givingawaychecked, setGivingawayChecked] = React.useState(false);

  ////////Bottom sheet references/////////
  const refRBSheet = useRef();
  const refddRBSheet = useRef();
  const refsubddRBSheet = useRef();
  const refproductcondionddRBSheet = useRef();

  ///////////picker state/////////
  const [image, setImage] = useState("");

  //////////////////////cameraimage//////////////////
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      refRBSheet.current.close();
      console.log(image);
      setImage(image.path);
      let newfile = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf("/") + 1),
      };
      imagehandleUpload(newfile);
    });
  };
  ////////////////////library image//////////////////
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      refRBSheet.current.close();
      console.log(image);
      setImage(image.path);
      let newfile = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf("/") + 1),
      };
      imagehandleUpload(newfile);
    });
  };
  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  ///////////////data states of Item////////////////////
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [youtubelink, setYoutubeLink] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [shippingprice, setShippingPrice] = React.useState("");

  //////////////Api Calling////////////////////
  const UploadItemDetail = async () => {
    var user_id=await AsyncStorage.getItem("Userid")
    // console.log("here we are:",user_id,category_id,sub_category_id)
    var data = JSON.stringify({
      user_id:user_id,
      title: title,
      description: description,
      price: price,
      category_id: category_id,
      subcategory_id: sub_category_id,
      product_condition: product_condition,
      fixed_price: fixedpricechecked!= true?"false":"true",
      location: location,
      exchange: exchangebuychecked!= true?"false":"true",
      giveaway: givingawaychecked!= true?"false":"true",
      shipping_cost: shippingprice,
      youtube_link: youtubelink,
    });

    var config = {
      method: "post",
      url: BASE_URL + "PostingList.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config).then(function (response) {
      console.log(JSON.stringify(response.data));
      post_Item_Images({
        item_id: response.data.id,
        item_images: item_images_array,
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log("Response:", responseData);
                dispatch(setItemImagesArray());
          setloading(0);
          setdisable(0);
          setModalVisible(true);
        });
    });
  };
  //Api form validation
  const formValidation = async () => {
    // input validation
    if (title == "") {
      setsnackbarValue({ value: "Please Enter Item Title", color: "red" });
      setVisible("true");
    }
    //  else if (price == "") {
    //   setsnackbarValue({ value: "Please Enter Item Price", color: "red" });
    //   setVisible("true");
    // }
    else if (description == "") {
      setsnackbarValue({
        value: "Please Enter Item Description",
        color: "red",
      });
      setVisible("true");
    } else {
      setloading(1);
      setdisable(1);
      UploadItemDetail();
    }
  };
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader headerlabel={"Upload Item"} />
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <View style={Uploadstyles.mainview}>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              {/* <FontAwesome5
            name={"upload"}
            size={30}
            color={Colors.Appthemecolor}
            onPress={() => navigation.toggleDrawer()}
          /> */}
              <Image
                source={appImages.UploadIcpn}
                style={Uploadstyles.uploadicon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={Uploadstyles.uploadtext}>Upload Images</Text>
          </View>
        </TouchableOpacity>
        <View>
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={title}
            placeholder="Item Title"
            onTermChange={(itemtitle) => setTitle(itemtitle)}
          />
          {givingawaychecked === true ? null : (
            <CustomTextInput
              icon={appImages.email}
              type={"withouticoninput"}
              texterror={"invalid"}
              term={price}
              placeholder="Item Price"
              onTermChange={(itemprice) => setPrice(itemprice)}
              keyboard_type={"numeric"}
            />
          )}

          <TouchableOpacity onPress={() => refddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={category_name}
              editable={false}
              disable={false}
              placeholder="Select Category"
              onTermChange={(category) => setCategoryName(category)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => refsubddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={sub_category_name}
              editable={false}
              disable={false}
              placeholder="Select Sub Category"
              onTermChange={(subcategory) => setSubCategoryName(subcategory)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refproductcondionddRBSheet.current.open()}
          >
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={product_condition}
              editable={false}
              disable={false}
              placeholder="Select Product Condition"
              onTermChange={(newcountry) => setCondition(newcountry)}
            />
          </TouchableOpacity>
          {/* <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={bannerlink}
            placeholder="Date of listing"
            onTermChange={(newUsername) => setBannerLink(newUsername)}
          /> */}
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={youtubelink}
            placeholder="YouTube link (optional)"
            onTermChange={(itemyoutubelink) => setYoutubeLink(itemyoutubelink)}
          />
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={description}
            multiline={true}
            placeholder="Description"
            onTermChange={(desc) => setDescription(desc)}
          />
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={location}
            placeholder="Enter Location"
            onTermChange={(itemlocation) => setLocation(itemlocation)}
          />
          {givingawaychecked === true ? null : (
            <CustomTextInput
              icon={appImages.email}
              type={"withouticoninput"}
              texterror={"invalid"}
              term={shippingprice}
              placeholder="Shipping Price"
              onTermChange={(itemshippingprice) =>
                setShippingPrice(itemshippingprice)
              }
              keyboard_type={"numeric"}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(8),
            marginTop: hp(2),
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>Exchange to Buy</Text>
          <Checkbox
            status={exchangebuychecked ? "checked" : "unchecked"}
            color={Colors.activetextinput}
            uncheckedColor={Colors.activetextinput}
            onPress={() => {
              setExchangebuyChecked(!exchangebuychecked);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(8),
            marginTop: hp(2),
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>Fixed Price</Text>
          <Checkbox
            status={fixedpricechecked ? "checked" : "unchecked"}
            color={Colors.activetextinput}
            uncheckedColor={Colors.activetextinput}
            onPress={() => {
              setFixedpriceChecked(!fixedpricechecked);
            }}
          />
        </View>
        {fixedpricechecked === true || exchangebuychecked === true ? null : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: wp(8),
              marginTop: hp(2),
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Giving Away</Text>
            <Checkbox
              status={givingawaychecked ? "checked" : "unchecked"}
              color={Colors.activetextinput}
              uncheckedColor={Colors.activetextinput}
              onPress={() => {
                {
                  setGivingawayChecked(!givingawaychecked),
                    setPrice(0),
                    setShippingPrice(0);
                }
              }}
            />
          </View>
        )}

        <View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={"UPLOAD"}
            widthset={80}
            topDistance={10}
            loading={loading}
            disabled={disable}
            onPress={() => {
              formValidation();
            }}
          />
        </View>
        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={"From Gallery"}
          takePhotoFromCamera={takePhotoFromCamera}
          choosePhotoFromLibrary={choosePhotoFromLibrary}
        />
        <Categories
          refRBSheet={refddRBSheet}
          onClose={() => refddRBSheet.current.close()}
        />
        <Categories
          refRBSheet={refsubddRBSheet}
          onClose={() => refsubddRBSheet.current.close()}
          type={"subcategory"}
        />
        <ProductCondition
          refRBSheet={refproductcondionddRBSheet}
          onClose={() => refproductcondionddRBSheet.current.close()}
        />
        <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom: hp(20),
            zIndex: 999,
          }}
        >
          {snackbarValue.value}
        </Snackbar>
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={"Success"}
          subtext={"User Already Registered"}
          buttontext={"OK"}
          onPress={() => {
            setModalVisible(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadItem;
