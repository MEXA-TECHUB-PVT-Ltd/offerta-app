import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";
import CustomModal from "../../../components/Modal/CustomModal";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setExchangeOffer_OtherListing } from "../../../redux/actions";

/////////////app styles////////////////
import styles from "./styles";

//////////////app functions///////////////
import { offer_Accept_Reject_Listings } from "../../../api/Offer";

/////////////image url/////////////
import { IMAGE_URL } from "../../../utills/ApiRootUrl";

///////////////////App Heigth and width///////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////app images///////////////
import { appImages } from "../../../constant/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TranslationStrings from "../../../utills/TranslationStrings";

const PriceOfferNoti = ({ navigation, route }) => {
  ////////////////redux/////////////
  const { exchange_other_listing, exchange_my_listing } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [currentUser, setCurrentUser] = useState("");

  ////////////Offer Accept//////////
  const offerAcceptListings = (props) => {
    offer_Accept_Reject_Listings(route.params.offerid, props).then(
      (response) => {
        console.log("response   of accepting offer   :    ", response?.data);
        setModalVisible(true);
      }
    );
  };

  ////////////Offer Reject//////////
  const offerRejectListings = (props) => {
    // console.log("exchnage response hereL:", props);
    offer_Accept_Reject_Listings(route.params.offerid, props).then(
      (response) => {
        console.log("response  :: ", response?.data?.senderId);
        setModalVisible1(true);
      }
    );
  };

  // console.log("route.params  :  ", route.params);

  useEffect(() => {
    checkData();
  }, [route?.params]);

  const checkData = async () => {
    let user_id = await AsyncStorage.getItem("Userid");
    setCurrentUser(user_id);
    console.log("route?.params :  ", route?.params?.sale_by);
    console.log("route.params?.senderId :  ", route.params?.senderId);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={TranslationStrings.PRICE_OFFER}
          iconPress={() => {
            navigation.goBack();
          }}
          type={"no_icon"}
          icon={"arrow-back"}
        />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={{ uri: IMAGE_URL + route.params.item_img }}
            style={{ width: wp(90), height: hp(30), borderRadius: wp(4) }}
            resizeMode="cover"
          />
        </View>
        <View style={{ paddingHorizontal: wp(3), marginTop: hp(3) }}>
          <Text style={{ color: "black" }}>
            {TranslationStrings.ITEM_PRICE}
          </Text>
          <CustomTextInput
            type={"withouticoninput"}
            texterror={"invalid"}
            term={route.params.itemprice + "$"}
            placeholder={TranslationStrings.SHIPPING_PRICE}
            editable={false}
            //onTermChange={(my_price) => setMyPrice(my_price)}
            keyboard_type={"numeric"}
          />
          <Text style={{ color: "black" }}>
            {TranslationStrings.OFFER_PRICE}
          </Text>
          <CustomTextInput
            type={"withouticoninput"}
            texterror={"invalid"}
            term={route.params.offer_price + "$"}
            placeholder={TranslationStrings.ENTER_PRICE}
            editable={false}
            // onTermChange={(offer_price) => setOfferPrice(offer_price)}
            keyboard_type={"numeric"}
          />
        </View>

        {route.params?.sale_by == currentUser && (
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.replace("CounterOffer", {
                  buyer_id: route?.params?.buyer_id,
                  item_img: route?.params?.item_img,
                  itemprice: route?.params?.itemprice,
                  listing_id: route?.params?.listing_id,
                  navtype: route?.params?.navtype,
                  offer_price: route?.params?.offer_price,
                  offer_type: route?.params?.offer_type,
                  price_offer: route?.params?.price_offer,
                  offerid: route?.params?.offerid,
                  receiverId: route?.params?.receiverId,
                  sale_by: route?.params?.sale_by,
                  senderId: route?.params?.senderId,
                  userId: route?.params?.userId,
                });

                // navigation.navigate("CounterOffer", {
                //   sale_by: route?.params?.sale_by,
                //   buyer_id: route?.params?.buyer_id,
                //   offer_type: route?.params?.type,
                //   receiverId: route?.params?.receiverId,
                //   senderId: route?.params?.senderId,

                //   item_img: route?.params?.textimg1,
                //   offer_price: route?.params?.offerprice,
                //   offerid: route?.params?.offerid,
                //   itemprice: route?.params?.textprice,
                //   navtype: "chat",
                //   userid: route?.params?.receiverId,
                // });
              }}
              // onPress={() => offerAcceptListings("accept")}
            >
              <Text style={styles.smallbtnText}>
                {TranslationStrings.MAKE_COUNTER_OFFER}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {route.params?.senderId == currentUser ? null : (
          <View style={{ ...styles.smallbtnView, marginTop: 35 }}>
            <TouchableOpacity
              style={styles.smallbtn}
              onPress={() => offerAcceptListings("accept")}
            >
              <Text style={styles.smallbtnText}>
                {TranslationStrings.ACCEPT}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallbtn}
              onPress={() => offerRejectListings("reject")}
            >
              <Text style={styles.smallbtnText}>
                {TranslationStrings.REJECT}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: hp(3),
          }}
          onPress={() => {
            console.log("route?.params?.userid :  ", route?.params?.userid);

            navigation.navigate("ChatScreen", {
              navtype: "chatlist",
              // userid: predata.userid,
              userid: route?.params?.userid,
            });
          }}
        >
          <Text style={styles.LastText}>{TranslationStrings.TALK_ON_CHAT}</Text>
        </TouchableOpacity>
      </ScrollView>
      <CustomModal
        modalVisible={modalVisible}
        CloseModal={() => setModalVisible(false)}
        Icon={appImages.sucess}
        text={TranslationStrings.SUCCESS}
        subtext={TranslationStrings.OFFER_ACCEPTED_SUCCESSFULLY}
        buttontext={TranslationStrings.OK}
        onPress={() => {
          setModalVisible(false);
          // navigation.navigate("BottomTab");
          console.log(".......", route?.params?.listing_id);
          navigation.navigate("ListingsDetails", {
            listing_id: route?.params?.listing_id,
          });
        }}
      />
      <CustomModal
        modalVisible={modalVisible1}
        CloseModal={() => setModalVisible1(false)}
        Icon={appImages.sucess}
        text={TranslationStrings.SUCCESS}
        subtext={TranslationStrings.OFFER_REJECTED_SUCCESSFULLY}
        buttontext={TranslationStrings.OK}
        onPress={() => {
          setModalVisible1(false);
          navigation.navigate("BottomTab");
        }}
      />
    </SafeAreaView>
  );
};

export default PriceOfferNoti;
