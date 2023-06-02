import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import {
  initStripe,
  StripeProvider,
  usePaymentSheet,
} from "@stripe/stripe-react-native";
import { CardField, createToken, useStripe } from "@stripe/stripe-react-native";
import { get_stripe_payment_detail } from "../../../api/StripeApis";
import Loader from "../../../components/Loader/Loader";
import { useSelector } from "react-redux";
import { Snackbar } from "react-native-paper";
import { appImages } from "../../../constant/images";
import TranslationStrings from "../../../utills/TranslationStrings";
import CustomHeader from "../../../components/Header/CustomHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomModal from "../../../components/Modal/CustomModal";
import { create_order_Listings } from "../../../api/Offer";
import {
  post_Promotions_new,
  send_new_banner_req_to_admin,
  send_new_verification_req_to_admin,
} from "../../../api/Sales&Promotions";
import { get_specific_user_detail } from "../../../api/GetApis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import Colors from "../../../utills/Colors";

import { Publishable_key } from "@env";

const StripePayment = ({ navigation, route }) => {
  const [loading1, setLoading1] = useState(false);
  const { exchange_other_listing } = useSelector((state) => state.userReducer);
  const { login_user_shipping_address } = useSelector(
    (state) => state.loginuserReducer
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  console.log("Publishable_key  : ", Publishable_key);
  useEffect(() => {
    initializePaymentSheet();
  }, []);

  //__________________________Strip Payment______________________________________________
  const { confirmPayment } = useStripe();
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  const initializePaymentSheet = async (item) => {
    try {
      setLoading1(true);
      // publishableKey:
      //   "pk_test_51NDQiwGaIs51jJaWUMftnPOteL1EZZollLRlDFWc6ui0DiO5sUbIb2yu5YIDWjzyn3hi1kgopLXb7sFhRnXKwOP200Bx5PabHJ",
      initStripe({
        publishableKey: Publishable_key,
      });
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams(item);

      const { error } = await initPaymentSheet({
        appearance: {
          shapes: {
            borderRadius: 12,
            borderWidth: 0.5,
          },
          primaryButton: {
            shapes: {
              borderRadius: 20,
            },
          },
          colors: {
            primary: Colors.Appthemecolor,
            background: "#FFFFFF",
            componentBackground: "#FFFFFF",
            componentBorder: "#000000",
            componentDivider: "#000000",
            primaryText: Colors.Appthemecolor,
            secondaryText: Colors.Appthemecolor,
            componentText: Colors.Appthemecolor,
            placeholderText: "#000000",
          },
        },
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: "OfertaSV",
      });

      if (error) {
        console.log("Error Code : ", error.code, error.message);
      } else {
        console.log("ready");
        openPaymentSheet();
      }
      setLoading1(false);
    } catch (error) {
      console.log("Error catch : ", error);
    }
  };

  //createPaymentIntent
  const fetchPaymentSheetParams = async (item) => {
    try {
      let amount = route?.params?.fee ? route?.params?.fee : "1.00";
      var user_id = await AsyncStorage.getItem("Userid");
      let user_detail = await get_specific_user_detail(user_id);
      let obj = {
        email: user_detail ? user_detail?.email : "test@gmail.com",
        currency: "usd",
        amount: amount * 100, // convert cents to dollars
        name: user_detail ? user_detail?.user_name : "test",
      };

      console.log("obj : ", obj);

      let response = await get_stripe_payment_detail(obj);
      let response1 = response?.data;
      let paymentIntent = response1?.paymentIntent?.client_secret;
      let ephemeralKey = response1?.empheralkey;
      let customer = response1?.customerid;

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.log("error :::::::::::::::::::::: :: ", error);
      setLoading1(false);
      setsnackbarValue({
        value: "Something went wrong",
        color: "red",
      });
      setVisible(true);
    }
  };

  const handlePay = async () => {
    // openPaymentSheet();
    if (selectedPlan == null) {
      Snackbar.show({
        text: "Please select a plan to continue",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "red",
      });
    } else {
      console.log("selected plan  :   ", selectedPlan);
      initializePaymentSheet(selectedPlan);
    }
  };

  const fetchCardDetail = (cardDetails) => {
    if (cardDetails?.complete) {
      setCardInfo(cardDetails);
    } else {
      setCardInfo(null);
    }
  };

  const openPaymentSheet = async (item) => {
    const res = await presentPaymentSheet();
    setLoading1(false);
    const { error } = res;
    console.log("res  :  ", res);
    if (error?.code == "Canceled") {
      console.log("user cancel .......");
      navigation?.goBack();
    } else if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      if (route?.params?.type == "promote") {
        CreatePromotion();
        console.log(
          "______________________Create Promotion........................"
        );
      } else if (route?.params?.type == "addbanner") {
        CreateBanner();
        console.log(
          "______________________Create Banner........................"
        );
      } else if (route?.params?.type == "account_verify") {
        SubmitVerificationDocument();
        console.log(
          "______________________Submit Verification Document........................"
        );
      } else if (route?.params?.type == "listing_stripe") {
        //handle listing payment
        createListingOrder();
      } else {
        console.log("route?.params?.type  not found", route?.params?.type);
      }

      //   Alert.alert("Success", "Your order is confirmed!");
    }
  };

  //__________________________Strip Payment______________________________________________

  const CreatePromotion = async () => {
    let listingID = route?.params?.listingID;
    let feature_id = route?.params?.feature_id;
    let promotionID = route?.params?.promotionID;
    let promotionType = route?.params?.promotionType;
    let start_date = route?.params?.start_date;
    let expiry_date = route?.params?.expiry_date;

    post_Promotions_new(
      listingID,
      feature_id,
      promotionID,
      promotionType,
      start_date,
      expiry_date
    ).then((response) => {
      console.log("hessdsre we go in:", response.data);
      //setModalVisible(true)

      setModalVisible(true);
    });
  };

  //banner ads
  const CreateBanner = async () => {
    console.log("CreateBanner function called...");
    var formdata = new FormData();
    formdata.append("user_id", route?.params?.user_id);
    formdata.append("start_date", route?.params?.start_date);
    formdata.append("end_date", route?.params?.end_date);
    formdata.append("app_img", route?.params?.app_img);
    formdata.append("app_img_link", route?.params?.app_img_link);
    formdata.append("cast", route?.params?.cast);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(BASE_URL + "bannerAdApi.php", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response?.status == true) {
          setModalVisible(true);
          //sending notification to admin to noti new banner is created
          send_new_banner_req_to_admin()
            .then((res) => {
              console.log("banner notification response : ", res?.data);
            })
            .catch((err) => {
              console.log("error raised while sending banner notification");
            });
        } else {
          setsnackbarValue({ value: response?.message, color: "red" });
          setVisible(true);
        }
      })
      .catch((error) => console.log("error in create banner api", error));
  };

  //verify_account
  const SubmitVerificationDocument = async () => {
    console.log("SubmitVerificationDocument  :___________________________");
    const formData = new FormData();
    formData.append("user_id", route?.params?.user_id);
    formData.append("cnic", route?.params?.cnic);
    formData.append("live_image", route?.params?.live_image);

    formData.append("bitcoin", route?.params?.bitcoin);
    formData.append("paypal", route?.params?.paypal);
    formData.append("bank", route?.params?.bankAccount);

    let url = BASE_URL + "accountVerify.php";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response of SubmitVerificationDocument :  ", response);
        if (response?.status == true) {
          setsnackbarValue({
            value: "Verification document submitted successfully!",
            color: "green",
          });
          setVisible(true);

          //sending notification to admin to notify new verification is created
          send_new_verification_req_to_admin()
            .then((res) => {
              console.log("verification notification response : ", res?.data);
            })
            .catch((err) => {
              console.log(
                "error raised while sending verification notification"
              );
            });

          setTimeout(() => {
            navigation?.goBack();
          }, 200);
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
  };

  //listing order
  const createListingOrder = async () => {
    console.log("createListingOrder  _________________________called...");
    create_order_Listings(
      exchange_other_listing.user_id,
      exchange_other_listing.id,
      login_user_shipping_address.id
    ).then((response) => {
      if (response?.data?.status == true) {
        setModalVisible(true);
      } else {
        console.log("create order response :  ", response?.data);
        setsnackbarValue({
          value: "Something went wrong",
          color: "red",
        });
        setVisible(true);
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Loader isLoading={loading1} />
      <CustomHeader
        headerlabel={TranslationStrings.BUY}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"arrow-back"}
      />

      {/* <TouchableOpacity
        onPress={() => initializePaymentSheet()}
        style={{
          width: 300,
          height: 50,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          backgroundColor: "red",
        }}
      >
        <Text style={{ color: "#fff" }}>Open payment sheet</Text>
      </TouchableOpacity> */}

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
        subtext={TranslationStrings.PAYED_SUCCESSFULLY}
        buttontext={TranslationStrings.OK}
        onPress={() => {
          if (route?.params?.type == "promote") {
            // navigation?.goBack();
            navigation.replace("Promotions");
          } else if (route?.params?.type == "addbanner") {
            navigation?.goBack();
            setModalVisible(false);
          } else {
            // navigation.navigate("BottomTab")
            navigation.replace("SalesOrders");
            setModalVisible(false);
          }
        }}
      />
    </View>
  );
};

export default StripePayment;

const styles = StyleSheet.create({});