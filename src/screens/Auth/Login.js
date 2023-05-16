import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";

///////////////app components////////////////
import CustomButtonhere from "../../components/Button/CustomButton";
import CustomModal from "../../components/Modal/CustomModal";
import CustomTextInput from "../../components/TextInput/CustomTextInput";
import SocialIcons from "../../components/SocialView/SocialIcons";

////////////////app pakages////////////
import { Snackbar } from "react-native-paper";

// Import Google Signin
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

////////////////facebook signin.//////////
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

/////////////app styles///////////////////
import styles from "./styles";
import Authstyles from "../../styles/GlobalStyles/Authstyles";
import Logostyles from "../../styles/GlobalStyles/Logostyles";
import Authlaststyles from "../../styles/GlobalStyles/Authlaststyles";
import Colors from "../../utills/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

////////////////////app images////////
import { appImages } from "../../constant/images";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fontFamily } from "../../constant/fonts";
import PendingAccountApproval from "../../components/Modal/PendingAccountApproval";

import messaging from "@react-native-firebase/messaging";
import TranslationStrings from "../../utills/TranslationStrings";

import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import GoogleButton from "../../components/Button/GoogleButton";
import paypalApi from "../../api/paypalApi";
import WebView from "react-native-webview";
const queryString = require("query-string");

const Login = ({ navigation }) => {
  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  const [modalVisible2, setModalVisible2] = useState(false);

  //password eye function and states
  const [data, setData] = React.useState({
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  ///////////email//////////////////
  const handleValidEmail = (val) => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    if (reg.test(val)) {
      console.log("true");
      return true;
    } else {
      console.log("falsse");
      return false;
    }
  };

  ///////////////data states////////////////////
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  //////////////Api Calling////////////////////

  const checkUserAccountVerification = async (user_id) => {
    return new Promise((resolve, reject) => {
      try {
        let url = BASE_URL + `getUserById.php?user_id=${user_id}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log("data :  ", data);
            if (
              data?.subscription == true ||
              data?.subscription == "true" ||
              data?.subscription == "subscribed"
            ) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch((err) => {
            console.log("error raised : :   ", data);
          });
      } catch (error) {
        console.log("error  :  ", error);
        resolve(false);
      }
    });
  };

  const getUserFCMToken = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          const fcmToken = await messaging().getToken();
          resolve(fcmToken);
        } else {
          resolve("");
        }
      } catch (error) {
        resolve("");
      }
    });
  };

  const LoginUser = async () => {
    console.log("email : ", email);
    console.log("password : ", password);

    // navigation.navigate("Drawerroute");
    // return;
    // let fcm_token = await getUserFCMToken();
    // console.log("fcm token", fcm_token);

    let fcm_token = await getUserFCMToken();
    axios({
      method: "post",
      url: BASE_URL + "loginUser.php",
      data: {
        email: email?.trim(),
        password: password?.trim(),
        fcm: fcm_token,
      },
    })
      .then(async function (response) {
        // console.log("response", JSON.stringify(response.data));
        console.log("login api response  : ", response?.data);
        setloading(0);
        setdisable(0);
        if (response.data.status == true) {
          await AsyncStorage.setItem("Userid", response.data.data.id);
          navigation.replace("Drawerroute");
        } else {
          setloading(0);
          setdisable(0);
          // setModalVisible(true);
          setsnackbarValue({ value: response?.data?.message, color: "red" });
          setVisible("true");
        }
      })
      .catch(function (error) {
        setloading(0);
        setdisable(0);
        if (error) {
          console.log("Email or Password is incorrect");
        }
        setModalVisible(true);
        console.log("error", error);
      });
  };
  //Api form validation
  const formValidation = async () => {
    // await AsyncStorage.setItem("Userid", "63");
    // navigation.replace("Drawerroute");
    // return;
    // testPayPalPayment();

    // input validation
    if (email == "") {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_EMAIL,
        color: "red",
      });
      setVisible("true");
    } else if (!handleValidEmail(email)) {
      console.log("a");
      setsnackbarValue({
        value: TranslationStrings.INCORRECT_EMAIL,
        color: "red",
      });
      setVisible("true");
    } else if (password == "") {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_PASSWORD,
        color: "red",
      });
      setVisible("true");
    } else if (password.length <= 5) {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_SIX_DIGIT_PASSWORD,
        color: "red",
      });
      setVisible("true");
    } else {
      setloading(1);
      setdisable(1);
      LoginUser();
    }
  };

  // __________________________________________paypal payment______________________

  // ___________________________________________________________________________________
  /////////////////Google states//////////////////
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const gmailLoginHandler = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      console.log("User Info --> ", userInfo);
      // console.log('User Info currentUser tokeen--> ', currentUser);
      setUserInfo(userInfo);
      _signOut();
      // GoogleSignupUser(userInfo.user.email);
      GoogleLoginUser(userInfo.user.email);
    } catch (error) {
      console.log("Message", JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        //alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //alert('Play Services Not Available or Outdated');
      } else {
        //alert(error.message);
      }
    }
  };
  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  useEffect(() => {
    GoogleSignin.configure();
    // checkPermission().then(result => {

    //   setFCMToken(result)
    //   //do something with the result
    // })
  }, []);

  //////////////Google Login Api Calling////////////////////
  const GoogleLoginUser = async (props) => {
    setloading(true);
    axios({
      method: "post",
      url: BASE_URL + "loginUser.php",
      data: {
        email: props,
        password: "google123",
      },
    })
      .then(async function (response) {
        console.log("response", JSON.stringify(response.data));
        // if (response.data.message) {
        //   await AsyncStorage.setItem("Userid", response.data.data.id);
        //   navigation.navigate("Drawerroute");
        // } else {
        //   setModalVisible(true);
        // }

        console.log("respo nkfsdfjsf", response?.data);
        setloading(0);
        setdisable(0);
        if (response.data.status == true) {
          await AsyncStorage.setItem("Userid", response.data.data.id);
          navigation.replace("Drawerroute");
        } else {
          setloading(0);
          setdisable(0);
          // setModalVisible(true);
          setsnackbarValue({ value: response?.data?.message, color: "red" });
          setVisible("true");
        }
      })
      .catch(function (error) {
        if (error) {
          console.log("Wrong");
        }
      });
  };
  //////////////Google Signup Api Calling////////////////////
  const GoogleSignupUser = async (props) => {
    axios({
      method: "post",
      url: BASE_URL + "regisrationApi.php",
      data: {
        email: props.toLowerCase(),
        password: "google123",
        conformPassword: "google123",
      },
    })
      .then(async function (response) {
        console.log("response", JSON.stringify(response.data));
        if (response.data.message === "User Already Registered") {
          GoogleLoginUser(props);
        } else {
          await AsyncStorage.setItem("Userid", response.data.data.id);
          navigation.navigate("Drawerroute");
        }
      })
      .catch(function (error) {
        if (error) {
          console.log("Wrong");
        }
      });
  };
  const fbLogin = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);

    if (result.isCancelled) {
      throw "User cancelled the login process";
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw "Something went wrong obtaining access token";
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    // Sign-in the user with the credential
    let userinfo = await auth().signInWithCredential(facebookCredential);
    console.log("userinfo :  ", userinfo);
    if (userinfo != "") {
      console.log("uer fb info here:", userinfo.user.email);
      FacebookSignupUser(userinfo.user.email);
    }
  };
  //////////////Facebook Login Api Calling////////////////////
  const FacebookLoginUser = async (props) => {
    axios({
      method: "post",
      url: BASE_URL + "loginUser.php",
      data: {
        email: props,
        password: "facebook123",
      },
    })
      .then(async function (response) {
        console.log("response", JSON.stringify(response.data));
        if (response.data.message) {
          await AsyncStorage.setItem("Userid", response.data.data.id);
          navigation.navigate("Drawerroute");

          // let verification_status = response?.data?.data?.subscription;
          // console.log("verification_status", verification_status);
          // if (verification_status == false || verification_status == "false") {
          //   //not uploaded verification documents
          //   navigation?.navigate("AccountVerification", {
          //     signup_role: response?.data?.data?.role,
          //     type: "login",
          //   });
          // } else if (
          //   verification_status == true ||
          //   verification_status == "true"
          // ) {
          //   //waiting for aprroval
          //   setModalVisible2(true);
          // } else {
          //   navigation.navigate("Drawerroute");
          // }
        }
      })
      .catch(function (error) {
        if (error) {
          console.log("Wrong");
        }
      });
  };
  //////////////Facebook Signup Api Calling////////////////////
  const FacebookSignupUser = async (props) => {
    axios({
      method: "post",
      url: BASE_URL + "regisrationApi.php",
      data: {
        email: props.toLowerCase(),
        password: "facebook123",
        conformPassword: "facebook123",
      },
    })
      .then(async function (response) {
        console.log("response", JSON.stringify(response.data));
        if (response.data.message === "User Already Registered") {
          FacebookLoginUser(props);
        } else {
          await AsyncStorage.setItem("Userid", response.data.data.id);
          navigation.navigate("Drawerroute");
        }
      })
      .catch(function (error) {
        if (error) {
          console.log("Wrong");
        }
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor={"white"} barStyle="dark-content" />

        <View style={Logostyles.Logoview}>
          <Image
            source={appImages.logo}
            style={Logostyles.logo}
            resizeMode="contain"
          />
        </View>
        <View>
          <View style={Authstyles.textview}>
            <Text style={Authstyles.maintext}>
              {TranslationStrings.SIGN_IN}
            </Text>
            <Text style={Authstyles.subtext}>
              {TranslationStrings.PLEASE_SIGN_IN_TO_YOUR_ACCOUNT}
            </Text>
          </View>
          <View>
            <CustomTextInput
              icon={appImages.email}
              type={"iconinput"}
              texterror={"invalid"}
              term={email}
              placeholder={TranslationStrings.EMAIL_ADDRESS}
              onTermChange={(newEmail) => {
                setEmail(newEmail);
              }}
            />
            <CustomTextInput
              icon={appImages.lock}
              type={"iconinput"}
              term={password}
              placeholder={TranslationStrings.PASSWORD}
              onTermChange={(newPassword) => setPassword(newPassword)}
              mode={"password"}
              secureTextEntry={data.secureTextEntry ? true : false}
              onclick={() => updateSecureTextEntry()}
            />
          </View>
          <View
            style={{
              ...styles.forgettextview,
              width: "auto",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text
                style={styles.forgettext}
                //onPress={() => navigation.navigate("ForgetPassword")}
              >
                {TranslationStrings.FORGET_PASSWORD}?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: wp(8),
            marginBottom: hp(8),
            marginTop: hp(3),
          }}
        >
          <View
            style={{
              flex: 1,
              borderWidth: 0.5,
              borderColor: Colors.inactivetextinput,
              // height: hp(0.3),
              // backgroundColor: Colors.inactivetextinput,
            }}
          />
          <View>
            <Text
              style={{
                width: 50,
                textAlign: "center",
                color: Colors.Appthemecolor,
                fontFamily: fontFamily.Poppins_Regular,
              }}
            >
              OR
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 0.5,
              borderColor: Colors.inactivetextinput,
            }}
          />
        </View> */}

        <View
          style={{
            marginHorizontal: wp(5),
            flexDirection: "row",
            justifyContent: "space-between",
            // width: wp(60),
            alignSelf: "center",
          }}
        >
          {/* <SocialIcons icon={appImages.apple} bgcolor={"#000000"} /> */}
          {/* <SocialIcons
            icon={appImages.facebook}
            bgcolor={"#4267B2"}
            onpress={() => fbLogin()}
          /> */}
          {/* <SocialIcons
            icon={appImages.google}
            bgcolor={"#4285F4"}
            onpress={() => gmailLoginHandler()}
          /> */}

          <GoogleButton
            title="Sign in with Google"
            onPress={() => gmailLoginHandler()}
          />
        </View>

        <View style={{ marginTop: hp(0) }}>
          <CustomButtonhere
            title={TranslationStrings.SIGN_IN}
            widthset={80}
            topDistance={10}
            loading={loading}
            disabled={disable}
            onPress={() => {
              //navigation.navigate("Drawerroute");
              formValidation();
            }}
          />
        </View>
        <View style={Authlaststyles.lasttextview}>
          <Text style={Authlaststyles.lasttextgrey}>
            {TranslationStrings.DO_NOT_HAVE_AN_ACCOUNT}?
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("SignUp")}
            // style={{ width: wp(16) }}
          >
            <Text style={Authlaststyles.lasttextblue}>
              {"  "}
              {TranslationStrings.SIGN_UP}
            </Text>
          </TouchableOpacity>
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
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.failed}
          text={"Error"}
          subtext={"Wrong Email or Password"}
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

export default Login;
