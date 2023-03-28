import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

///////////////app components////////////////
import CustomButtonhere from "../../components/Button/CustomButton";
import CustomTextInput from "../../components/TextInput/CustomTextInput";
import CustomModal from "../../components/Modal/CustomModal";

///////////////////dropdown////////////////
import SignupRole from "../../components/Dropdowns/SignupRole";

////////////////app pakages////////////
import { Snackbar } from "react-native-paper";

//////////////////app icons/////////////
import Ionicons from "react-native-vector-icons/Ionicons";

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

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setsignupRole } from "../../redux/actions";

import messaging from "@react-native-firebase/messaging";

const SignUp = ({ navigation }) => {
  //////////////redux////////////////////
  const { signup_role } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ////////Bottom sheet references/////////
  const refRBSheet = useRef();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

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
  const [confirmPassword, setConfirmPassword] = useState("");

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
  //////////////Api Calling////////////////////
  const SignupUser = async () => {
    let fcm_token = await getUserFCMToken();
    axios({
      method: "post",
      url: BASE_URL + "regisrationApi.php",
      data: {
        email: email.toLowerCase(),
        password: password,
        conformPassword: confirmPassword,
        role: signup_role,
        fcm: fcm_token,
      },
    })
      .then(async function (response) {
        console.log("response", JSON.stringify(response.data));
        setloading(0);
        setdisable(0);
        if (response.data.message === "User Register successful") {
          await AsyncStorage.setItem("Userid", response.data.data.id);
          await AsyncStorage.setItem("UserEmail", response.data.data.email);
          navigation.navigate("CreateProfile", {
            useremail: response.data.data.email,
            signup_role: signup_role,
          });
        } else {
          setloading(0);
          setdisable(0);
          setModalVisible(true);
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
    // navigation.navigate("AccountVerification");
    // return;

    // input validation
    if (email == "") {
      setsnackbarValue({ value: "Please Enter Email", color: "red" });
      setVisible("true");
    } else if (!handleValidEmail(email)) {
      console.log("a");
      setsnackbarValue({ value: "Incorrect Email", color: "red" });
      setVisible("true");
    } else if (password == "") {
      setsnackbarValue({ value: "Please Enter Password", color: "red" });
      setVisible("true");
    } else if (password.length <= 5) {
      setsnackbarValue({
        value: "Please Enter 6 digit Password",
        color: "red",
      });
      setVisible("true");
    } else if (confirmPassword == "") {
      setsnackbarValue({
        value: "Please Enter Confirm Password",
        color: "red",
      });
      setVisible("true");
    } else if (confirmPassword.length <= 5) {
      setsnackbarValue({
        value: "Please Enter 6 digit Password",
        color: "red",
      });
      setVisible("true");
    } else if (password != confirmPassword) {
      setsnackbarValue({ value: "Please Enter Same Password", color: "red" });
      setVisible("true");
    } else if (signup_role == "" || signup_role?.length == 0) {
      setsnackbarValue({ value: "Please Select Role", color: "red" });
      setVisible("true");
    } else {
      setloading(1);
      setdisable(1);
      SignupUser();
    }
  };

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Ionicons
          name={"arrow-back"}
          size={25}
          color={Colors.Appthemecolor}
          style={{ marginLeft: wp(5), marginTop: hp(3) }}
          onPress={() => navigation.goBack()}
        />
        <View style={[Logostyles.Logoview, { marginTop: hp(5) }]}>
          <Image
            source={appImages.logo}
            style={Logostyles.logo}
            resizeMode="contain"
          />
        </View>
        <View>
          <View style={Authstyles.textview}>
            <Text style={Authstyles.maintext}>Sign Up</Text>
            <Text style={Authstyles.subtext}>
              Sign Up to create your account
            </Text>
          </View>
          <View>
            <CustomTextInput
              icon={appImages.email}
              type={"iconinput"}
              texterror={"invalid"}
              texttype="email-address"
              term={email}
              returnType={"next"}
              onNext={() => {
                ref_input2.current.focus();
              }}
              placeholder="Email Address"
              onTermChange={(newEmail) => setEmail(newEmail)}
            />
            <CustomTextInput
              onRef={ref_input2}
              icon={appImages.lock}
              type={"iconinput"}
              term={password}
              returnType={"next"}
              onNext={() => {
                ref_input3.current.focus();
              }}
              placeholder="Password"
              onTermChange={(newPassword) => setPassword(newPassword)}
              mode={"password"}
              secureTextEntry={data.secureTextEntry ? true : false}
              onclick={() => updateSecureTextEntry()}
            />
            <CustomTextInput
              onRef={ref_input3}
              icon={appImages.lock}
              type={"iconinput"}
              term={confirmPassword}
              placeholder="Confirm Password"
              onTermChange={(newPassword) => setConfirmPassword(newPassword)}
              mode={"password"}
              secureTextEntry={data.secureTextEntry ? true : false}
              onclick={() => updateSecureTextEntry()}
            />
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <CustomTextInput
                icon={appImages.downarrow}
                type={"iconinput"}
                term={signup_role}
                editable={false}
                disable={false}
                placeholder="Select Role"
                onTermChange={(newcountry) => setsignupRole(newcountry)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: hp(10),
          }}
        >
          <View style={{ marginTop: hp(0) }}>
            <CustomButtonhere
              title={"SIGN UP"}
              widthset={80}
              topDistance={0}
              loading={loading}
              disabled={disable}
              onPress={() => {
                formValidation();
              }}
            />
          </View>

          <View style={[Authlaststyles.lasttextview, { marginTop: hp(1) }]}>
            <Text style={Authlaststyles.lasttextgrey}>
              Already have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Login")}
              style={{ width: wp(16) }}
            >
              <Text style={Authlaststyles.lasttextblue}>{" Sign In"}</Text>
            </TouchableOpacity>
          </View>
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
          subtext={"User Already Registered"}
          buttontext={"GO BACK"}
          onPress={() => {
            setModalVisible(false);
          }}
        />
        <SignupRole
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
