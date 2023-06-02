import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import paypalApi from "../../../api/paypalApi";
import WebView from "react-native-webview";
import GoogleButton from "../../../components/Button/GoogleButton";
const queryString = require("query-string");
import Loader from "../../../components/Loader/Loader";
import {
  post_Promotions,
  post_Promotions_new,
  send_new_banner_req_to_admin,
  send_new_verification_req_to_admin,
} from "../../../api/Sales&Promotions";
import TranslationStrings from "../../../utills/TranslationStrings";
import { appImages } from "../../../constant/images";
import CustomModal from "../../../components/Modal/CustomModal";
import { BASE_URL } from "../../../utills/ApiRootUrl";

import { Snackbar } from "react-native-paper";
import { useSelector } from "react-redux";
import {
  add_User_Stripe_Credentials,
  create_order_Listings,
} from "../../../api/Offer";

const PaypalPayment = ({ navigation, route }) => {
  const { exchange_other_listing } = useSelector((state) => state.userReducer);
  const { login_user_shipping_address } = useSelector(
    (state) => state.loginuserReducer
  );
  // paypal
  const [loading, setLoading] = useState(false);
  const [isWebViewopen, setIsWebViewopen] = useState(false);
  const [payPalUrl, setPayPalUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [paypalOrderDetail, setPaypalOrderDetail] = useState({});
  console.log("  ....", route?.params);

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    testPayPalPayment();
  }, []);

  const testPayPalPayment = async () => {
    try {
      setLoading(true);
      const token = await paypalApi.generateToken();
      console.log("Access Token :  ", token);
      setAccessToken(token);
      //pass type i.e hospital or doctor
      // const rate = await getSubscriptionRate("doctor");
      const rate = true;
      // console.log("rate_________________________________", rate);
      if (rate == false) {
        // alert('Rate not found ');
        setLoading(false);
      } else {
        // setSubscriptionRateID(rate?._id ? rate?._id : "");
        // value: rate?.rate,
        console.log("route?.params?.fee  : ", route?.params?.fee);
        let fees = route?.params?.fee ? route?.params?.fee : "1.00";
        // let fees = "1.00";
        fees = parseFloat(fees).toFixed(2).toString();

        let orderDetail = {
          intent: "CAPTURE",
          purchase_units: [
            {
              items: [
                {
                  name: "testet name",
                  description: "test description",
                  quantity: "1",
                  unit_amount: {
                    currency_code: "USD",
                    // value: "1.00",
                    value: fees,
                  },
                },
              ],
              amount: {
                currency_code: "USD",
                // value: "1.00",
                value: fees,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    // value: "1.00",
                    value: fees,
                  },
                },
              },
            },
          ],
          application_context: {
            return_url: "https://example.com/return",
            cancel_url: "https://example.com/cancel",
          },
        };
        setPaypalOrderDetail(orderDetail);
        const res = await paypalApi
          .createOrder(token, orderDetail)
          .then((res) => {
            console.log("create order response::::", res);
            if (res?.links) {
              const link = res?.links?.find((data) => data?.rel == "approve");
              console.log("link  : ", link);
              setPayPalUrl(link?.href ? link?.href : "");
              setIsWebViewopen(true);
            }
          })
          .catch((err) => {
            console.log("error in create order...", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } catch (error) {
      console.log("error ", error);
      setLoading(false);
    }
  };

  const onUrlChange = (webviewState) => {
    try {
      console.log(":::::::::::::::::::::::::::");
      console.log("webviewstate", webviewState);
      if (webviewState?.url?.includes("https://example.com/cancel")) {
        console.log("here....");
        clearPaypalState();
        return;
      }

      if (webviewState?.url?.includes("https://example.com/return")) {
        console.log("sfjksdfksdjf__________________", webviewState?.url);
        const urlValues = queryString.parseUrl(webviewState?.url);
        console.log("urlValues", urlValues);
        const { PayerID, token } = urlValues.query;
        if (token) {
          paymentSuccess(token);
          clearPaypalState();
          return;
        }
        return;
      }
    } catch (error) {
      console.log("Error Raised : ", error);
    }
  };
  const clearPaypalState = () => {
    setPayPalUrl("");
    setIsWebViewopen(false);
  };

  const paymentSuccess = async (id) => {
    try {
      setLoading(true);
      const res = await paypalApi
        .capturePayment(id, accessToken, paypalOrderDetail)
        .then((res) => {
          console.log("resopnse...", res);
          console.log("res?.status...", res?.status);
          console.log("Payment Done");
          //   alert("Payment Done");
          if (route?.params?.type == "promote") {
            CreatePromotion();
          } else if (route?.params?.type == "addbanner") {
            CreateBanner();
          } else if (route?.params?.type == "account_verify") {
            SubmitVerificationDocument();
          } else if (route?.params?.type == "listing_paypal") {
            //handle listing payment
            createListingOrder();
          } else {
            console.log("route?.params?.type  not found", route?.params?.type);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log("error ", error);
    }
  };

  //   ________________________________________________

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
          //   setsnackbarValue({
          //     value: "Banner Ad created successfully!",
          //     color: "green",
          //   });
          //   setVisible(true);
          //   setTimeout(() => {
          //     navigation.navigate("Drawerroute");
          //   }, 1000);

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
          }, 1000);
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <GoogleButton
        title="pay with paypal"
        onPress={() => testPayPalPayment()}
      /> */}
      <Loader isLoading={loading} />
      {isWebViewopen && (
        <WebView
          source={{ uri: payPalUrl }}
          onNavigationStateChange={onUrlChange}
          style={{
            height: hp(100),
            width: wp(100),
          }}
          onError={() => clearPaypalState()}
        />
      )}
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

export default PaypalPayment;

const styles = StyleSheet.create({});
