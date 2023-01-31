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
import CustomHeader from "../../../../components/Header/CustomHeader";
import DashboardCard from "../../../../components/CustomCards/DashboardCard";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setExchangeOffer_MyListing } from "../../../../redux/actions";

////////////////app Colors/////////////
import Colors from "../../../../utills/Colors";

/////////////app styles////////////////
import styles from "./styles";

//////////////app functions///////////////
import { post_Listings_Exchange_Offer } from "../../../../api/PostApis";

/////////////image url/////////////
import { IMAGE_URL } from "../../../../utills/ApiRootUrl";

///////////////////App Heigth and width///////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////app images//////////
import { appImages } from "../../../../constant/images";

//////////////////appImages.//////////////////

const ExchangeRequest = ({ navigation, route }) => {
  ////////////////redux/////////////
  const { exchange_other_listing, exchange_my_listing } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  /////////////////Price formatter/////////////
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });
  ////////////LISTING LIKES//////////
  const Listings_Exchange_Offer = (props) => {
    post_Listings_Exchange_Offer(props).then((response) => {
    });
  };
  const [list_data, setList_Data] = useState({
    myuser_id: exchange_my_listing.user_id,
    otheruser_id: exchange_other_listing.user_id,
    my_item_id: exchange_other_listing.id,
    other_item_id: exchange_other_listing.id,
  });
  useEffect(() => {}, []);

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
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <DashboardCard
          image={IMAGE_URL + exchange_my_listing.images[0]} //IMAGE_URL + item.images[0]
          maintext={exchange_my_listing.title}
          subtext={exchange_my_listing.location}
          type={"Exchange_Request"}
          price={formatter.format(exchange_my_listing.price)}
          //onpress={() => onselect(item)}
        />
        <Image
          source={appImages.exchangeicon}
          style={{ width: wp(5.5), height: hp(6) }}
          resizeMode="contain"
        />
        <DashboardCard
          image={IMAGE_URL + exchange_other_listing.images[0]} //IMAGE_URL + item.images[0]
          maintext={exchange_other_listing.title}
          subtext={exchange_other_listing.location}
          type={"Exchange_Request"}
          price={formatter.format(exchange_other_listing.price)}
          //onpress={() => onselect(item)}
        />
      </View>

      <View style={styles.smallbtnView}>
        <TouchableOpacity
          style={styles.smallbtn}
          onPress={() => Listings_Exchange_Offer(list_data)}
        >
          <Text style={styles.smallbtnText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallbtn} 
          onPress={() => Listings_Exchange_Offer(list_data)}
        >
          <Text style={styles.smallbtnText}>Reject</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems:'center',justifyContent:'center',marginTop:hp(3)}}>
      <Text style={styles.LastText}>Talk on chat</Text>
      </View>
  
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExchangeRequest;
