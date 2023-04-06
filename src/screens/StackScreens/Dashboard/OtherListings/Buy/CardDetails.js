import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

///////////////////paper///////////////
import { Checkbox } from "react-native-paper";

//////////////////app components///////////////
import CustomHeader from "../../../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../../../components/Button/CustomButton";
import CustomTextInput from "../../../../../components/TextInput/CustomTextInput";
import CustomModal from "../../../../../components/Modal/CustomModal";

////////////////country picker package/////////////
import CountryPicker from "react-native-country-picker-modal";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////////app images/////////////////////
import { appImages } from "../../../../../constant/images";

////////////////redux//////////////
import { setLoginUserShippingAddress } from "../../../../../redux/LoginUserActions";
import { useDispatch, useSelector } from "react-redux";

////////////////////api function/////////////
import {
  add_User_Stripe_Credentials,
  checkout,
  create_order_Listings,
} from "../../../../../api/Offer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Snackbar } from "react-native-paper";
import TranslationStrings from "../../../../../utills/TranslationStrings";

const CardDetails = ({ navigation, route }) => {
  ////////////////redux/////////////
  const { exchange_other_listing } = useSelector((state) => state.userReducer);

  ////////////////redux/////////////
  const { login_user_shipping_address } = useSelector(
    (state) => state.loginuserReducer
  );
  //////////////Modal States////////////////////////
  const [modalVisible, setModalVisible] = useState(false);

  /////////////////checkbox////////
  const [checked, setChecked] = React.useState(false);

  ///////////////data states////////////////////
  const [cardno, setCardNo] = React.useState("");
  const [expirydate, setExpiryDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  ////////////country picker states/////////////
  const [CountryPickerView, setCountryPickerView] = useState(false);
  const [countryCode, setCountryCode] = useState("92");
  const [countryname, setCountryName] = useState("Pak");

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  const validate = async () => {
    if (cardno?.length == 0) {
      // please enter card no
      setsnackbarValue({ value: "Please Enter Card No", color: "red" });
      setVisible(true);
      return false;
    } else if (expirydate?.length == 0 || expirydate.length < 5) {
      //please enter valid expiry date
      setsnackbarValue({
        value: "Please Enter Valid card Expiry date",
        color: "red",
      });
      setVisible(true);
      return false;
    } else if (cvv.length == 0) {
      //please enter cvc number
      setsnackbarValue({ value: "Please Enter CVC", color: "red" });
      setVisible(true);
      return false;
    } else {
      return true;
    }
  };

  ////////////Create Order//////////
  const Listing_Create_Order = async () => {
    let user_id = await AsyncStorage.getItem("Userid");

    if (await validate()) {
      let expiryDate = expirydate?.split("/");
      let month = expiryDate[0];
      let year = expiryDate[1];
      let obj = {
        user_id: user_id,
        listing_id: exchange_other_listing.id,
        card_number: cardno,
        card_exp_month: month,
        card_exp_year: year,
        card_cvc: cvv,
        description: "nill",
        currency: "inr",
      };

      create_order_Listings(
        exchange_other_listing.user_id,
        exchange_other_listing.id,
        login_user_shipping_address.id
      ).then((response) => {
        if (response?.data?.status == true) {
          add_User_Stripe_Credentials().then(() => {
            checkout(obj)
              .then((res) => {
                console.log("checkout api response", res?.data);
                if (res?.data?.status == false) {
                  setsnackbarValue({ value: res?.data?.message, color: "red" });
                  setVisible(true);
                } else {
                  setModalVisible(true);
                }
              })
              .catch((err) => {
                console.log("error raised : ", err);
                setsnackbarValue({
                  value: "Something went wrong",
                  color: "red",
                });
                setVisible(true);
              });
          });
        } else {
          console.log("create order response :  ", response?.data);
          setsnackbarValue({
            value: "Something went wrong",
            color: "red",
          });
          setVisible(true);
        }
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {CountryPickerView == true ? (
        <CountryPicker
          withFilter={true}
          withCallingCode={true}
          withModal={true}
          withFlag={true}
          withFlagButton={true}
          withCountryNameButton={true}
          onSelect={(e) => {
            console.log("country here", e);
            var name = e.name.substring("4");
            setCountryPickerView(false);
            if (e.name === "Antarctica") {
              setCountryCode("672");
            }
            if (e.name === "Bouvet Island") {
              setCountryCode("55");
            } else {
              setCountryCode(JSON.parse(e.callingCode));
            }
            //setCountryFlag(JSON.parse(e.flag))
            //setCountryCode(JSON.parse(e.callingCode))
            setCountryName(e.name);
          }}
          onClose={(e) => {
            setCountryPickerView(false);
          }}
          visible={CountryPickerView}
        />
      ) : (
        <View></View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={TranslationStrings.BUY}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <View
          style={[
            styles.timelineflex,
            {
              marginLeft: wp(0),
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: wp(8),
            }}
          >
            <View style={styles.timelineinnerview}></View>

            <View style={[styles.filedtimeline, { width: wp(34.5) }]}></View>
            <View style={styles.timelineinnerview}></View>
            <View style={[styles.filedtimeline, { width: wp(34.5) }]}></View>
            <View style={styles.timelineinnerview}></View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: wp("2%"),
              //backgroundColor: 'red'
            }}
          ></View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: hp(2),
          }}
        >
          <Text style={styles.timelinetext}>
            {TranslationStrings.CARD_INFO}
          </Text>
        </View>
        <View>
          <CustomTextInput
            type={"withouticoninput"}
            texterror={"invalid"}
            term={cardno}
            placeholder={TranslationStrings.ENTER_CARD_NUMBER}
            keyboard_type={"number-pad"}
            onTermChange={(text) => {
              text = text
                .replace(/\s?/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim();
              setCardNo(text);
            }}
          />
          <CustomTextInput
            type={"withouticoninput"}
            term={expirydate}
            placeholder={TranslationStrings.EXPIRY_DATE + " ( MM/YY )"}
            maxLength={5}
            keyboard_type={"number-pad"}
            onTermChange={(text) => {
              // text = text
              //   .replace(/\s?/g, "")
              //   .replace(/(\d{2})/g, "$1/")
              //   .trim();
              if (text?.length == 2) {
                text = text + "/";
              }
              setExpiryDate(text);
            }}
          />
          <CustomTextInput
            type={"withouticoninput"}
            term={cvv}
            placeholder={TranslationStrings.ENTER_CVC}
            keyboard_type={"number-pad"}
            onTermChange={(newcvv) => setCvv(newcvv)}
          />

          <TouchableOpacity
            onPress={() => {
              setCountryPickerView(true);
            }}
          >
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={countryname}
              editable={false}
              disable={false}
              placeholder={TranslationStrings.SELECT_COUNTRY}
              onTermChange={(newcountry) => setCountryName(newcountry)}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(5),
          }}
        >
          <Text style={styles.timelinetext}>
            {TranslationStrings.SAVE_CARD}
          </Text>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            color={Colors.activetextinput}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>

        <View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={TranslationStrings.PAY}
            widthset={80}
            topDistance={10}
            onPress={() => {
              Listing_Create_Order();
            }}
          />
        </View>
      </ScrollView>
      <Snackbar
        duration={2000}
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
        text={TranslationStrings.SUCCESS}
        subtext={"Payed Successfully"}
        buttontext={"OK"}
        onPress={() => {
          navigation.navigate("BottomTab"), setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default CardDetails;
