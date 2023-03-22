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

const PriceOfferNoti = ({ navigation, route }) => {
  ////////////////redux/////////////
  const { exchange_other_listing, exchange_my_listing } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  ////////////Offer Accept//////////
  const offerAcceptListings = (props) => {
    offer_Accept_Reject_Listings(route.params.offerid, props).then(
      (response) => {
        console.log("response  :    ", response?.data);
        setModalVisible(true);
      }
    );
  };

  ////////////Offer Reject//////////
  const offerRejectListings = (props) => {
    // console.log("exchnage response hereL:", props);
    offer_Accept_Reject_Listings(route.params.offerid, props).then(
      (response) => {
        console.log("response  :: ", response?.data);
        setModalVisible1(true);
      }
    );
  };

  useEffect(() => {
    console.log("image here:", exchange_other_listing, route.params.itemprice);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={"Price Offer"}
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
          <Text style={{ color: "black" }}>Item Price</Text>
          <CustomTextInput
            type={"withouticoninput"}
            texterror={"invalid"}
            term={route.params.itemprice + "$"}
            placeholder="Shipping Price"
            editable={false}
            //onTermChange={(my_price) => setMyPrice(my_price)}
            keyboard_type={"numeric"}
          />
          <Text style={{ color: "black" }}>Offer Price</Text>
          <CustomTextInput
            type={"withouticoninput"}
            texterror={"invalid"}
            term={route.params.offer_price + "$"}
            placeholder="Enter Price"
            editable={false}
            // onTermChange={(offer_price) => setOfferPrice(offer_price)}
            keyboard_type={"numeric"}
          />
        </View>

        <View style={styles.smallbtnView}>
          <TouchableOpacity
            style={styles.smallbtn}
            onPress={() => offerAcceptListings("accept")}
          >
            <Text style={styles.smallbtnText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallbtn}
            onPress={() => offerRejectListings("reject")}
          >
            <Text style={styles.smallbtnText}>Reject</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: hp(3),
          }}
          onPress={() => {
            // console.log("predata........", route?.params?.userid);
            navigation.navigate("ChatScreen", {
              navtype: "chatlist",
              // userid: predata.userid,
              userid: route?.params?.userid,
            });
          }}
        >
          <Text style={styles.LastText}>Talk on chat</Text>
        </TouchableOpacity>
      </ScrollView>
      <CustomModal
        modalVisible={modalVisible}
        CloseModal={() => setModalVisible(false)}
        Icon={appImages.sucess}
        text={"Success"}
        subtext={"Offer Accepted Sucessfully"}
        buttontext={"OK"}
        onPress={() => {
          setModalVisible(false);
          navigation.navigate("BottomTab");
        }}
      />
      <CustomModal
        modalVisible={modalVisible1}
        CloseModal={() => setModalVisible1(false)}
        Icon={appImages.sucess}
        text={"Success"}
        subtext={"Offer Rejected Sucessfully"}
        buttontext={"OK"}
        onPress={() => {
          setModalVisible1(false);
          navigation.navigate("BottomTab");
        }}
      />
    </SafeAreaView>
  );
};

export default PriceOfferNoti;
