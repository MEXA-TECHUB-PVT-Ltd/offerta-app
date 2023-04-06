import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
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
import TranslationStrings from "../../utills/TranslationStrings";

const Verification = ({ navigation, route }) => {
  /////////////previous data state///////////////
  const [predata] = useState(route.params);

  /////////////redux states///////
  const { phone_no } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  /////////////timer state///////////////
  const [disabletimer, setdisableTimer] = useState(false);

  //////////time function//////////
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };
  //code Confirmation states
  const [value, setValue] = useState();
  //cell number
  const CELL_COUNT = 4;

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //button states
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  //check OTP Code
  const verifyno = () => {
    setloading(1);

    if (predata?.code == value) {
      setloading(0);
      navigation.navigate("ResetPassword", { data: predata });
    } else {
      setModalVisible(true);
      setloading(0);
    }
  };
  // useEffect(() => {
  // },[]);
  return (
    <SafeAreaView style={styles.container}>
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
      <View style={[Authstyles.textview, { marginBottom: hp(0) }]}>
        <Text style={Authstyles.maintext}>
          {TranslationStrings.VERIFICATIONS}
        </Text>
        <Text style={Authstyles.subtext}>
          {TranslationStrings.ENTER_CODE_THAT_YOU_RECEIVED_ON_EMAIL}
        </Text>
      </View>
      <View style={styles.Cellview}>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          //style={styles.input}
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : "0")}
            </Text>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          //backgroundColor:'red',
          width: wp(90),
          alignSelf: "center",
          marginTop: hp(2),
          // paddingHorizontal:wp(6)
        }}
      >
        <View style={{ justifyContent: "flex-start", alignSelf: "flex-start" }}>
          {disabletimer == true ? (
            <CountdownCircleTimer
              size={50}
              strokeWidth={0}
              children={children}
              isPlaying
              duration={7}
              initialRemainingTime={15}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => {
                setdisableTimer(false);
                // do your stuff here
                //return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
              }}
            >
              {({ remainingTime }) => (
                <Text style={{ color: "black", fontSize: hp(2) }}>
                  {remainingTime}(s)
                </Text>
              )}
            </CountdownCircleTimer>
          ) : null}
        </View>
        <TouchableOpacity
          disabled={disabletimer}
          onPress={() => setdisableTimer(true)}
          style={{ marginLeft: wp(8) }}
        >
          <Text style={styles.Cellmaintext}>
            {TranslationStrings.RESEND_CODE}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonview}>
        <CustomButtonhere
          title={TranslationStrings.VERIFY}
          widthset={80}
          topDistance={30}
          loading={loading}
          disabled={disable}
          onPress={() => verifyno()}
        />
      </View>
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
    </SafeAreaView>
  );
};

export default Verification;
