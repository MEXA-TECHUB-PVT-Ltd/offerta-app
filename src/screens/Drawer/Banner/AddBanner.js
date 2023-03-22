import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

/////////////render/////////////////
import RenderHtml from "react-native-render-html";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../components/Button/CustomButton";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";
import CamerBottomSheet from "../../../components/CameraBottomSheet/CameraBottomSheet";

//////////////app pakages//////////////////
import ImagePicker from "react-native-image-crop-picker";

////////////////////app date picker pakaage////////////////////
import DateTimePicker from "@react-native-community/datetimepicker";

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
import { setUserImage } from "../../../redux/actions";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

///////////upload image///////////////
import RNFetchBlob from "rn-fetch-blob";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";

const AddBanner = ({ navigation, route }) => {
  //camera and imagepicker
  const refRBSheet = useRef();

  /////////////////////////redux///////////////////
  const { user_image } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  //////////render html width///////////
  const { width } = useWindowDimensions();

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

  ///////////////data states////////////////////
  const [bannerlink, setBannerLink] = React.useState();
  // const [startdate, setStartDate] = React.useState();
  // const [enddate, setEndDate] = React.useState();
  //////////////////////Api Calling/////////////////
  const CreateProfile = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    const data = [
      {
        name: "app_img",
        filename: "avatar-png.png",
        type: "image/foo",
        data: RNFetchBlob.wrap(user_image),
      },
      { name: "user_id", data: user_id },
      { name: "start_date", data: startDate },
      { name: "end_date", data: endDate },
      { name: "app_img_link", data: bannerlink },
    ];
    RNFetchBlob.fetch(
      "POST",
      BASE_URL + "bannerAdApi.php",
      {
        Authorization: "Bearer access-token",
        otherHeader: "foo",
        "Content-Type": "multipart/form-data",
      },
      data
    )
      .then((response) => response.json())
      .then(async (responsehere) => {
        console.log(" api result", responsehere);
      })
      .catch((error) => {
        alert("error" + error);
      });
  };
  //////////////////////Api Calling/////////////////
  const CreateBanner = async () => {
    var user_id = await AsyncStorage.getItem("Userid");

    var formdata = new FormData();
    formdata.append("user_id", user_id);
    formdata.append("start_date", startDate);
    formdata.append("end_date", endDate);
    formdata.append("app_img", user_image);
    formdata.append("app_img_link", bannerlink);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(BASE_URL + "bannerAdApi.php", requestOptions)
      .then((response) => response.text())
      .vvvvvvvvvvvvvv.catch((error) => console.log("error", error));
  };

  const [bannerDescription, setBannerDescription] = useState("");
  const GetBannerDescription = async () => {
    axios({
      method: "GET",
      url: BASE_URL + "getbannerDescription.php",
    })
      .then(async function (response) {
        setBannerDescription(response.data.description.split[0]);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  const [bannerPrice, setBannerPrice] = useState("");
  const GetBannerPrice = async () => {
    axios({
      method: "GET",
      url: BASE_URL + "getBannerConfiguration.php",
    })
      .then(async function (response) {
        setBannerPrice(response.data.app_cost);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {
    GetBannerDescription();
    GetBannerPrice();
  }, []);
  const tagsStyles = {
    p: {
      fontSize: hp(2),
      color: "black",
      width: wp(90),
      marginHorizontal: wp(5),
    },
    ul: {
      marginHorizontal: wp(3),
    },
    li: {
      fontSize: hp(1.7),
      color: "black",
    },
    div: {
      color: "black",
      width: wp(85),
    },
  };
  ////////////////datetime picker states////////////////
  const [date, setDate] = useState(new Date());
  const [startdatemode, setStartDateMode] = useState("date");
  const [enddatemode, setEndDateMode] = useState("date");
  const [startdateshow, setStartDateShow] = useState(false);
  const [enddateshow, setEndDateShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showyearwise, setshowyearwise] = useState(false);
  const [showdaywise, setshowdaywise] = useState("");

  const onstartdateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setStartDateShow(Platform.OS === "ios");
    setStartDate(currentDate);
    var d = new Date();
    d = selectedDate;
    // console.log(d)
    //console.log(selectedDate)
    if (d != undefined) {
      let year = d.getFullYear();
      let month = (d.getMonth() + 1).toString().padStart(2, "0");
      let day = d.getDate().toString().padStart(2, "0");
      console.log(year + "-" + month + "-" + day);
      console.log(typeof (year + "-" + month + "-" + day));
      setshowyearwise(year + "-" + month + "-" + day);
      setStartDate(year + "-" + month + "-" + day);
      //console('date',showyearwise)
    }
  };
  const onenddateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setEndDateShow(Platform.OS === "ios");
    setEndDate(currentDate);
    var d = new Date();
    d = selectedDate;
    // console.log(d)
    //console.log(selectedDate)
    if (d != undefined) {
      let year = d.getFullYear();
      let month = (d.getMonth() + 1).toString().padStart(2, "0");
      let day = d.getDate().toString().padStart(2, "0");
      console.log(year + "-" + month + "-" + day);
      console.log(typeof (year + "-" + month + "-" + day));
      setshowyearwise(year + "-" + month + "-" + day);
      setEndDate(year + "-" + month + "-" + day);
      //console('date',showyearwise)
    }
  };

  const showStartDateMode = (currentMode) => {
    setStartDateShow(true);
    setStartDateMode(currentMode);
    console.log("mode", enddatemode);
  };

  const showEndDateMode = (currentMode) => {
    setEndDateShow(true);
    setEndDateMode(currentMode);
    console.log("mode", enddatemode);
  };

  const showStartDatepicker = () => {
    showStartDateMode("date");
  };
  const showEndDatepicker = () => {
    showEndDateMode("date");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {startdateshow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode={startdatemode}
            display="default"
            locale="es-ES"
            themeVariant="light"
            onChange={onstartdateChange}
            style={{
              shadowColor: "#fff",
              shadowRadius: 0,
              shadowOpacity: 1,
              shadowOffset: { height: 0, width: 0 },
              color: "#1669F",
              textColor: "#1669F",
            }}
          />
        )}
        {enddateshow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode={enddatemode}
            display="default"
            locale="es-ES"
            themeVariant="light"
            onChange={onenddateChange}
            style={{
              shadowColor: "#fff",
              shadowRadius: 0,
              shadowOpacity: 1,
              shadowOffset: { height: 0, width: 0 },
              color: "#1669F",
              textColor: "#1669F",
            }}
          />
        )}
        <CustomHeader
          headerlabel={"Add Banner"}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={styles.toptext}>{bannerPrice + "$/Day"}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: hp(2),
            marginBottom: hp(3),
          }}
        >
          <RenderHtml
            contentWidth={width}
            source={{ html: bannerDescription }}
            tagsStyles={tagsStyles}
          />
        </View>

        {user_image === "" ? (
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <View style={Uploadstyles.mainview}>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Image
                  source={appImages.UploadIcpn}
                  style={Uploadstyles.uploadicon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={Uploadstyles.uploadtext}>Upload Image</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={Uploadstyles.mainview}>
            <Image
              source={{ uri: user_image }}
              style={{ height: hp(20), width: wp(83), borderRadius: wp(3) }}
              resizeMode="cover"
            />
          </View>
        )}
        <View>
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={bannerlink}
            placeholder="Add banner link"
            onTermChange={(newUsername) => setBannerLink(newUsername)}
          />
          <TouchableOpacity onPress={showStartDatepicker}>
            <CustomTextInput
              icon={appImages.lock}
              type={"withouticoninput"}
              term={startDate}
              editable={false}
              disable={false}
              placeholder="Start Date"
              onTermChange={(newFname) => setStartDate(newFname)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showEndDatepicker}>
            <CustomTextInput
              icon={appImages.lock}
              type={"withouticoninput"}
              term={endDate}
              editable={false}
              placeholder="End Date"
              onTermChange={(newLname) => setEndDate(newLname)}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={"PAY NOW"}
            widthset={80}
            topDistance={10}
            onPress={() => {
              CreateBanner();
              //navigation.navigate("PaymentMethod");
            }}
          />
        </View>
        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={"From Gallery"}
          type={"onepic"}
          takePhotoFromCamera={takePhotoFromCamera}
          choosePhotoFromLibrary={choosePhotoFromLibrary}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddBanner;
