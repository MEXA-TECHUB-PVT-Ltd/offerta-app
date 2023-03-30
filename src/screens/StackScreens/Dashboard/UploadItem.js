import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

////////////////////paper////////////////////
import { Checkbox, Snackbar } from "react-native-paper";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../components/Button/CustomButton";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";
import CamerBottomSheet from "../../../components/CameraBottomSheet/CameraBottomSheet";
import CustomModal from "../../../components/Modal/CustomModal";
import IconsTopTabs from "../../../components/TopTabs/IconsTabs/IconsTopTabs";
//-------------->Dropdowns
import Categories from "../../../components/Dropdowns/Categories";
import ProductCondition from "../../../components/Dropdowns/ProductCondition";

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
import {
  setProductCondition,
  setCategoryName,
  setSubCategoryName,
  setItemImagesArray,
  setLocationAddress,
  setLocationLat,
  setLocationLng,
} from "../../../redux/actions";

/////////////////App Api function/////////////////
import { post_Item_Images } from "../../../api/Upload Item";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";

import BlockUserView from "../../../components/BlockUserView";
import { get_user_status } from "../../../api/GetApis";
import CustomModal1 from "../../../components/Modal/CustomModal1";

const UploadItem = ({ navigation, route }) => {
  /////////////redux states///////
  const {
    category_name,
    product_condition,
    sub_category_name,
    category_id,
    sub_category_id,
    item_images_array,
    location_lng,
    location_lat,
    location_address,
    nav_place,
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ///////////checkbox/////////////
  const [exchangebuychecked, setExchangebuyChecked] = React.useState(false);
  const [fixedpricechecked, setFixedpriceChecked] = React.useState(false);
  const [givingawaychecked, setGivingawayChecked] = React.useState(false);

  const [showBlockModal, setShowBlockModal] = useState(false);

  ////////Bottom sheet references/////////
  const refRBSheet = useRef();
  const refddRBSheet = useRef();
  const refsubddRBSheet = useRef();
  const refproductcondionddRBSheet = useRef();

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
  const [shippingprice, setShippingPrice] = React.useState("");

  const [addedListingId, setAddedListingId] = useState("");

  //////////////Api Calling////////////////////
  // const UploadItemDetail = async () => {
  //   var user_id = await AsyncStorage.getItem("Userid");
  //   var c_lat = parseFloat(location_lat);
  //   var c_lng = parseFloat(location_lng);
  //   console.log(
  //     "here we are:",
  //     c_lat,
  //     c_lng,
  //     user_id,
  //     parseFloat(location_lat),
  //     parseFloat(location_lng),
  //     exchangebuychecked,
  //     givingawaychecked
  //   );
  //   shippingprice === " "
  //     ? setShippingPrice("0")
  //     : setShippingPrice(shippingprice);
  //   var data = JSON.stringify({
  //     user_id: user_id,
  //     title: title,
  //     description: description,
  //     price: givingawaychecked != true ? price : "0.0",
  //     category_id: category_id,
  //     subcategory_id: sub_category_id,
  //     product_condition: product_condition,
  //     fixed_price: fixedpricechecked != true ? "false" : "true",
  //     location: location_address,
  //     location_lat: parseFloat(location_lat),
  //     location_log: parseFloat(location_lng),
  //     exchange: exchangebuychecked != true ? "false" : "true",
  //     giveaway: givingawaychecked != true ? "false" : "true",
  //     shipping_cost:
  //       shippingprice === " " || givingawaychecked != true
  //         ? shippingprice
  //         : "0.0",
  //     youtube_link: youtubelink,
  //   });

  //   var config = {
  //     method: "post",
  //     url: BASE_URL + "PostingList.php",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios(config).then(function (response) {
  //     console.log(
  //       "update item response :     _______________",
  //       JSON.stringify(response.data)
  //     );

  //     console.log(
  //       "item_images_array  ___________________ : ",
  //       item_images_array
  //     );
  //     post_Item_Images({
  //       item_id: response.data.id,
  //       item_images: item_images_array,
  //     })
  //       .then((response) => response.json())
  //       .then((responseData) => {
  //         console.log("heer data:", responseData);
  //         dispatch(setItemImagesArray([]));
  //         dispatch(setLocationAddress());
  //         dispatch(setLocationLat());
  //         dispatch(setLocationLng());
  //         dispatch(setProductCondition());
  //         dispatch(setCategoryName());
  //         dispatch(setSubCategoryName());
  //         setPrice("");
  //         setTitle("");
  //         setYoutubeLink("");
  //         setDescription("");
  //         setShippingPrice("");
  //         setExchangebuyChecked(false);
  //         setFixedpriceChecked(false);
  //         setGivingawayChecked(false);
  //         setloading(0);
  //         setdisable(0);
  //         setModalVisible(true);
  //       })
  //       .catch((err) => {
  //         console.log("error raised : ", err);
  //         setloading(0);
  //       });
  //   });
  // };

  const UploadItemDetail = async () => {
    // setloading(0);
    // setModalVisible(true);
    // setAddedListingId("70");
    // return;
    var user_id = await AsyncStorage.getItem("Userid");
    var c_lat = parseFloat(location_lat);
    var c_lng = parseFloat(location_lng);
    console.log(
      "here we are:",
      c_lat,
      c_lng,
      user_id,
      parseFloat(location_lat),
      parseFloat(location_lng),
      exchangebuychecked,
      givingawaychecked
    );
    shippingprice === " "
      ? setShippingPrice("0")
      : setShippingPrice(shippingprice);
    var data = JSON.stringify({
      user_id: user_id,
      title: title,
      description: description,
      price: givingawaychecked != true ? price : "0.0",
      category_id: category_id,
      subcategory_id: sub_category_id,
      product_condition: product_condition,
      fixed_price: fixedpricechecked != true ? "false" : "true",
      location: location_address,
      location_lat: parseFloat(location_lat),
      location_log: parseFloat(location_lng),
      exchange: exchangebuychecked != true ? "false" : "true",
      giveaway: givingawaychecked != true ? "false" : "true",
      shipping_cost:
        shippingprice == ""
          ? "0.0"
          : shippingprice === " " || givingawaychecked != true
          ? shippingprice
          : "0.0",
      youtube_link: youtubelink,
    });

    console.log("data : ", data);
    // setloading(0);
    // return;

    var config = {
      method: "post",
      url: BASE_URL + "PostingList.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res?.status == false) {
          setsnackbarValue({
            value: res?.message,
            color: "red",
          });
          setVisible("true");
          setloading(0);
        } else {
          console.log(
            "item_images_array  ___________________ : ",
            item_images_array
          );
          if (item_images_array?.length > 0) {
            post_Item_Images({
              item_id: response.data.id,
              item_images: item_images_array,
            })
              .then((response) => response.json())
              .then((responseData) => {
                console.log("heer data:", responseData);
                dispatch(setItemImagesArray([]));
                dispatch(setLocationAddress());
                dispatch(setLocationLat());
                dispatch(setLocationLng());
                dispatch(setProductCondition());
                dispatch(setCategoryName());
                dispatch(setSubCategoryName());
                setPrice("");
                setTitle("");
                setYoutubeLink("");
                setDescription("");
                setShippingPrice("");
                setExchangebuyChecked(false);
                setFixedpriceChecked(false);
                setGivingawayChecked(false);
                setloading(0);
                setdisable(0);
                // listing_id
                let listing_id = res?.id;
                setAddedListingId(listing_id);
                setModalVisible(true);
              })
              .catch((err) => {
                console.log("error raised : ", err);
                setloading(0);
              });
          } else {
            dispatch(setItemImagesArray([]));
            dispatch(setLocationAddress());
            dispatch(setLocationLat());
            dispatch(setLocationLng());
            dispatch(setProductCondition());
            dispatch(setCategoryName());
            dispatch(setSubCategoryName());
            setPrice("");
            setTitle("");
            setYoutubeLink("");
            setDescription("");
            setShippingPrice("");
            setExchangebuyChecked(false);
            setFixedpriceChecked(false);
            setGivingawayChecked(false);
            setloading(0);
            setdisable(0);
            let listing_id = res?.id;
            setAddedListingId(listing_id);
            setModalVisible(true);
          }
        }
      })
      .catch((err) => {
        console.log("error raised while adding listing : ", err);
      });
  };
  //Api form validation

  const formValidation = async () => {
    let user_status = await get_user_status();
    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }

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
    } else if (location_address == "") {
      setsnackbarValue({
        value: "Location is required",
        color: "red",
      });
      setVisible("true");
    } else if (category_id == "") {
      setsnackbarValue({
        value: "Please select a category",
        color: "red",
      });
      setVisible("true");
    } else if (sub_category_id == "") {
      setsnackbarValue({
        value: "Please select a sub category",
        color: "red",
      });
      setVisible("true");
    } else if (product_condition == "") {
      setsnackbarValue({
        value: "Please select Product Condition",
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
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          height: hp(25),
          width: wp(82),
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: wp(0),
          alignSelf: "center",
          // marginLeft:wp(1.3),
          //marginRight:index === item_images_array.length - 1?wp(0):wp(2),
          borderRadius: wp(6),
        }}
      >
        <Image
          //source={appImages.dogIcon}
          source={{ uri: item.path }}
          style={{ height: hp(25), width: wp(80), borderRadius: wp(6) }}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("CameraViewScreen")}
          style={{
            position: "absolute",
            top: hp(1.3),
            right: wp(2),
            backgroundColor: "green",
            borderRadius: wp(5),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              paddingVertical: hp(0.8),
              paddingHorizontal: wp(3),
              fontWeight: "bold",
            }}
          >
            Change
          </Text>
        </TouchableOpacity>
        {/* <Text style={Uploadstyles.uploadtext}>
   {item.path}
   </Text> */}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <BlockUserView visible={showBlockModal} setVisible={setShowBlockModal} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader headerlabel={"Upload Items"} />
        {item_images_array.length === 0 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("CameraViewScreen")}
          >
            <View style={Uploadstyles.mainview}>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CameraViewScreen")}
                >
                  <Image
                    source={appImages.UploadIcpn}
                    style={Uploadstyles.uploadicon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text style={Uploadstyles.uploadtext}>Upload Images</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={[Uploadstyles.mainview, { height: hp(25), width: wp(82) }]}
          >
            {/* <View style={{ alignItems: "center", justifyContent: "center" ,marginTop:hp(0),height:hp(0),width:wp(0),}}> */}
            <FlatList
              data={item_images_array}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            />
            {/* <Text style={Uploadstyles.uploadtext}>
                  {item_images_array.length}
                </Text>
                <Text style={Uploadstyles.uploadtext}>Images Uploaded</Text> */}
            {/* </View> */}
          </View>
        )}

        <View>
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={title}
            placeholder="Item Title"
            onTermChange={(itemtitle) => setTitle(itemtitle)}
          />
          {/* {givingawaychecked === true ? null : ( */}
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={price}
            placeholder="Item Price"
            onTermChange={(itemprice) => setPrice(itemprice)}
            keyboard_type={"numeric"}
          />
          {/* )} */}

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
            Lines={4}
            placeholder="Description"
            onTermChange={(desc) => setDescription(desc)}
          />

          <TouchableOpacity onPress={() => navigation.navigate("Location")}>
            <CustomTextInput
              icon={appImages.email}
              type={"withouticoninput"}
              texterror={"invalid"}
              term={location_address}
              editable={false}
              disable={false}
              placeholder="Enter Location"
              onTermChange={(itemlocation) => setLocationAddress(itemlocation)}
            />
          </TouchableOpacity>

          {/* {givingawaychecked === true ? null : ( */}
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={shippingprice}
            // placeholder="Shipping Price"
            placeholder=" PICKUP or Delivery shipping price"
            onTermChange={(itemshippingprice) =>
              setShippingPrice(itemshippingprice)
            }
            keyboard_type={"numeric"}
          />
          {/* )} */}
        </View>
        <View style={{ paddingHorizontal: wp(8) }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",

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
          {exchangebuychecked && (
            <Text style={{ color: "red", fontSize: 13 }}>
              Check to see Exchange offers on your listing.
            </Text>
          )}
        </View>
        <View style={{ paddingHorizontal: wp(8) }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",

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
          {fixedpricechecked && (
            <Text style={{ color: "red", fontSize: 13 }}>
              Check to see different offers on your listing.
            </Text>
          )}
        </View>
        {/* {fixedpricechecked === true || exchangebuychecked === true ? null : ( */}
        <View style={{ paddingHorizontal: wp(8) }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",

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
                setGivingawayChecked(!givingawaychecked),
                  setPrice(0),
                  setShippingPrice(0);
              }}
            />
          </View>
          {givingawaychecked && (
            <Text style={{ color: "red", fontSize: 13 }}>
              Check If you want to give item for free.
            </Text>
          )}
        </View>
        <Text
          style={{
            color: "#000",
            fontSize: 12,
            marginTop: 25,
            textAlign: "center",
          }}
        >
          Don't check any option if you want to receive offers.
        </Text>
        {/* )} */}

        <View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={"UPLOAD"}
            widthset={80}
            topDistance={6}
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
        {/* <CustomModal
          // modalVisible={modalVisible}
          modalVisible={true}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={"Success"}
          subtext={
            "Item Upload Sucessfully \n\n Do you want to promote Your Listing"
          }
          buttontext={"OK k"}
          onPress={() => {
            setModalVisible(false),
              nav_place === "exchange"
                ? navigation.navigate("ExchangeOfferList")
                : addedListingId != ""
                ? navigation?.navigate("ListingsDetails", {
                    listing_id: addedListingId,
                  })
                : navigation.navigate("Home");
          }}
        /> */}

        <CustomModal1
          // modalVisible={modalVisible}
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={"Success"}
          subtext={
            "Item Upload Sucessfully \n\n Do you want to promote Your Listing?"
          }
          buttontext={"Yes"}
          cancelText={"Not Now"}
          cancelPress={() => setModalVisible(false)}
          cancelable={true}
          onPress={() => {
            setModalVisible(false),
              navigation?.navigate("ListingsDetails", {
                listing_id: addedListingId,
              });
            // nav_place === "exchange"
            //   ? navigation.navigate("ExchangeOfferList")
            //   : addedListingId != ""
            //   ? navigation?.navigate("ListingsDetails", {
            //       listing_id: addedListingId,
            //     })
            //   : navigation.navigate("Home");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadItem;
