import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

///////////////app code fields/////////////
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

//////////////////app icons/////////////
import Ionicons from "react-native-vector-icons/Ionicons";

///////////////timer/////////////////////
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

///////////////app images//////////////
import { appImages } from "../../constant/images";

/////////////////app components/////////////////
import CustomButtonhere from "../../components/Button/CustomButton";
import CustomModal from "../../components/Modal/CustomModal";

/////////////////////app styles/////////////////////
import Authstyles from "../../styles/GlobalStyles/Authstyles";
import Authtextstyles from "../../styles/GlobalStyles/Authtextstyles";
import Logostyles from "../../styles/GlobalStyles/Logostyles";
import styles from "./styles";
import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setPhoneNumber, setLoginUser } from "../../redux/actions";

////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fontFamily } from "../../constant/fonts";
import CamerBottomSheet from "../../components/CameraBottomSheet/CameraBottomSheet";
import { Modal, Snackbar } from "react-native-paper";
import PendingAccountApproval from "../../components/Modal/PendingAccountApproval";
import { get_user_status } from "../../api/GetApis";
import { Block_user_message } from "../../utills/AppStrings";
import BlockUserView from "../../components/BlockUserView";
import TranslationStrings from "../../utills/TranslationStrings";

const AccountVerification = ({ navigation, route }) => {
  const refRBSheet = useRef();
  const [modalVisible2, setModalVisible2] = useState(false);
  const [cnicImage, setCnicImage] = useState({
    uri: "",
    type: "",
    name: "",
  });
  const [userImage, setUserImage] = useState({
    uri: "",
    type: "",
    name: "",
  });
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState("");

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  const [showBlockModal, setShowBlockModal] = useState(false);

  useEffect(() => {
    if (route?.params?.type == "login") {
      setsnackbarValue({
        value: "Please Verify your account",
        color: "red",
      });
      setVisible(true);
    }
  }, [route?.params]);

  const handleVerifyAccount = async () => {
    // console.log("varification called.....");
    // setsnackbarValue({
    //   value: "Please Verify your account",
    //   color: "red",
    // });
    // setVisible(true);
    // return;
    let user_status = await get_user_status();

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }

    setLoading(true);
    let user_id = await AsyncStorage.getItem("Userid");
    console.log("user_id  :   ", user_id);
    if (!user_id) {
      setsnackbarValue({
        value: "User not found",
        color: "red",
      });
      setVisible(true);
    } else if (userImage?.uri == "") {
      setsnackbarValue({
        value: "Please upload your picture",
        color: "red",
      });
      setVisible(true);
    } else if (cnicImage?.uri == "") {
      setsnackbarValue({
        value: "Please upload your  CNIC Image",
        color: "red",
      });
      setVisible(true);
    } else {
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("cnic", cnicImage);
      formData.append("live_image", userImage);
      let url = BASE_URL + "accountVerify.php";
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("rsponse :  ", response);
          if (response?.status == true) {
            // navigation?.popToTop();
            // navigation?.navigate("Login");
            navigation?.goBack();
          } else {
            setsnackbarValue({
              value: response?.message,
              color: "red",
            });
            setVisible(true);
          }
        })
        .catch((err) => {
          console.log("error : ", err);
          setsnackbarValue({
            value: "Something went wrong",
            color: "red",
          });
          setVisible(true);
        });

      console.log("formData", formData);
    }
  };
  const onDismissSnackBar = () => setVisible(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Ionicons
          name={"arrow-back"}
          size={25}
          color={Colors.Appthemecolor}
          style={{ marginLeft: wp(5), marginTop: hp(3) }}
          onPress={() => navigation.goBack()}
        />

        <View
          style={[Logostyles.Logoview, { marginTop: hp(2), marginBottom: 2 }]}
        >
          <Image
            source={appImages.logo}
            style={Logostyles.logo}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            ...Authstyles.maintext,
            textAlign: "center",
          }}
        >
          {TranslationStrings.VERIFY_ACCOUNT}
        </Text>
        <View>
          <Text
            style={{
              marginLeft: 30,
              color: "#000",
              fontSize: hp(2),
              marginTop: 25,
              fontFamily: fontFamily.Poppins_Regular,
            }}
          >
            {TranslationStrings.PROFILE_PICTURE} :
          </Text>

          <TouchableOpacity
            onPress={() => {
              setSelected(0);
              refRBSheet?.current?.open();
            }}
          >
            <View style={style.card}>
              <View style={{ alignItems: "center" }}>
                {userImage?.uri == "" ? (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      refRBSheet?.current?.open();
                      setSelected(0);
                    }}
                    // onPress={() => navigation.navigate("CameraViewScreen")}
                  >
                    <Image
                      source={appImages.UploadIcpn}
                      style={{
                        width: wp("10%"),
                        height: wp("10%"),
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: Colors.appgreycolor,
                        fontSize: hp(1.8),
                        marginTop: hp(3),
                        fontFamily: fontFamily.Poppins_Regular,
                      }}
                    >
                      {TranslationStrings.UPLOAD_YOUR_PICTURE}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      refRBSheet?.current?.open();
                      setSelected(0);
                    }}
                    style={style.imageView}
                  >
                    <Image
                      source={{ uri: userImage.uri }}
                      style={style.imageView}
                      resizeMode={"contain"}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              marginLeft: 30,
              color: "#000",
              fontSize: hp(2),
              marginTop: 25,
              fontFamily: fontFamily.Poppins_Regular,
            }}
          >
            {TranslationStrings.UPLOAD_DOCUMENTS} :
          </Text>

          <TouchableOpacity
            onPress={() => {
              setSelected(1);
              refRBSheet?.current?.open();
            }}
          >
            <View style={style.card}>
              <View style={{ alignItems: "center" }}>
                {cnicImage?.uri == "" ? (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      refRBSheet?.current?.open();
                      setSelected(1);
                    }}
                    // onPress={() => navigation.navigate("CameraViewScreen")}
                  >
                    <Image
                      source={appImages.UploadIcpn}
                      style={{
                        width: wp("10%"),
                        height: wp("10%"),
                      }}
                      resizeMode="contain"
                    />

                    <Text
                      style={{
                        color: Colors.appgreycolor,
                        fontSize: hp(1.8),
                        marginTop: hp(3),
                        fontFamily: fontFamily.Poppins_Regular,
                      }}
                    >
                      {TranslationStrings.UPLOAD_DOCUMENTS}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      refRBSheet?.current?.open();
                      setSelected(1);
                    }}
                    style={style.imageView}
                  >
                    <Image
                      source={{ uri: cnicImage.uri }}
                      style={style.imageView}
                      resizeMode={"contain"}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 120 }}>
          <CustomButtonhere
            title={TranslationStrings.VERIFY}
            widthset={80}
            topDistance={5}
            loading={loading}
            disabled={disable}
            onPress={() => handleVerifyAccount()}
          />
        </View>

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

        <BlockUserView
          visible={showBlockModal}
          setVisible={setShowBlockModal}
        />

        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={"From Gallery"}
          type={"verify"}
          onCameraImageSelect={(file) => {
            if (file) {
              let obj = {
                uri: file.path,
                type: file.mime,
                name: file.path.split("/").pop(),
              };
              console.log("selected :    ", selected);
              if (selected == 0) {
                setUserImage(obj);
              } else {
                setCnicImage(obj);
              }
            }
          }}
          onGalleryImageSelect={(file) => {
            if (file) {
              let obj = {
                uri: file.path,
                type: file.mime,
                name: file.path.split("/").pop(),
              };
              console.log("selected :    ", selected);
              if (selected == 0) {
                setUserImage(obj);
              } else {
                setCnicImage(obj);
              }
            }
            console.log("image selected from gallery :   ", file);
          }}
        />
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.failed}
          text={"Error"}
          subtext={"OTP Not Matched Confirm it or Resend it"}
          buttontext={"GO BACK"}
          onPress={() => {
            setModalVisible(false);
          }}
        />

        <PendingAccountApproval
          modalVisible={modalVisible2}
          CloseModal={() => setModalVisible2(false)}
          Icon={appImages.pending_account}
          text={"Pending Account Approval"}
          onPress={() => {
            setModalVisible2(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountVerification;

const style = StyleSheet.create({
  card: {
    width: wp(85),
    height: wp(45),
    borderRadius: 20,
    borderWidth: 1.5,
    alignSelf: "center",
    borderColor: Colors.appgreycolor,
    marginTop: wp("5%"),
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: wp("5%"),
    overflow: "hidden",
  },
  imageView: {
    width: wp(85),
    height: wp(45),
    borderRadius: 20,
  },
});
