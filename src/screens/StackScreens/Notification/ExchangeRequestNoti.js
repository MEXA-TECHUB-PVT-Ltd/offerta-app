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
import DashboardCard from "../../../components/CustomCards/DashboardCard";
import CustomModal from "../../../components/Modal/CustomModal";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setExchangeOffer_MyListing } from "../../../redux/actions";

////////////////app Colors/////////////
import Colors from "../../../utills/Colors";

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

/////////////////app images//////////
import { appImages } from "../../../constant/images";

//////////////////appImages.//////////////////

const ExchangeNoti = ({ navigation, route }) => {
  console.log("here data:", route.params.data.list.images[0]);

   /////////price formatter
   const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  });

  ////////////////previous Data/////////
  const [predata] = useState(route.params);

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
        setModalVisible(true);
      }
    );
  };

  ////////////Offer Reject//////////
  const offerRejectListings = (props) => {
    console.log("exchnage response hereL:", props);
    offer_Accept_Reject_Listings(route.params.offerid, props).then(
      (response) => {
        setModalVisible1(true);
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={"Exchange Offer"}
          iconPress={() => {
            navigation.goBack();
          }}
          type={"no_icon"}
          icon={"arrow-back"}
        />
        {predata.navtype === "Notification" ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <DashboardCard
              image={IMAGE_URL + predata.data.requester_list.images[0]} //IMAGE_URL + item.images[0]
              maintext={predata.data.requester_list.title}
              subtext={predata.data.requester_list.location}
              type={"Exchange_Request"}
              price={predata.data.requester_list.price}
            />
            <Image
              source={appImages.exchangeicon}
              style={{ width: wp(5.5), height: hp(6) }}
              resizeMode="contain"
            />
            <DashboardCard
              image={IMAGE_URL + predata.data.list.images[0]} //IMAGE_URL + item.images[0]
              maintext={predata.data.list.title}
              subtext={predata.data.list.location}
              type={"Exchange_Request"}
              price={predata.data.list.price}
            />
          </View>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <DashboardCard
              image={IMAGE_URL + predata.item_img1} //IMAGE_URL + item.images[0]
              maintext={predata.itemname1}
              //subtext={predata.itemprice1}
              type={"Exchange_Request"}
              remove={"place"}
              price={predata.itemprice1}
            />
            <Image
              source={appImages.exchangeicon}
              style={{ width: wp(5.5), height: hp(6) }}
              resizeMode="contain"
            />
            <DashboardCard
              image={IMAGE_URL + predata.item_img2} //IMAGE_URL + item.images[0]
              maintext={predata.itemname2}
              //subtext={predata.itemprice2}
              type={"Exchange_Request"}
              remove={"place"}
              price={predata.itemprice1}
            />
          </View>
        )}

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
            navigation.navigate("ChatScreen",{navtype:"chatlist", userid: predata.userid });
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

export default ExchangeNoti;
