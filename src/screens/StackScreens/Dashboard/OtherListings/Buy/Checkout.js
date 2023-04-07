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
import CustomHeader from "../../../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../../../components/Button/CustomButton";
import ExcahangeCard from "../../../../../components/CustomCards/ExcahngeCard";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../../../constant/images";

////////////////redux//////////////
import { setLoginUserShippingAddress } from "../../../../../redux/LoginUserActions";
import { useDispatch, useSelector } from "react-redux";
import TranslationStrings from "../../../../../utills/TranslationStrings";

const Checkout = ({ navigation, route }) => {
  ////////////////redux/////////////
  const { exchange_other_listing } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
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

            <View style={[styles.filedtimeline, { width: wp(36) }]}></View>
            <View style={styles.timelineinnerview}></View>
            <View style={[styles.timeline, { width: wp(37.6) }]}></View>
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
          <Text style={styles.timelinetext}>{TranslationStrings.CHECKOUT}</Text>
        </View>
        <View>
          <ExcahangeCard
            image={IMAGE_URL + exchange_other_listing.images[0]}
            maintext={exchange_other_listing.title}
            subtext={exchange_other_listing.description}
            pricetext={exchange_other_listing.price}
            //pricetag={exchange_other_listing.price}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(5),
          }}
        >
          <Text style={styles.timelinetext}>
            {TranslationStrings.TOTAL_ITEMS}
          </Text>
          <Text style={styles.timelinetext}>01</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(5),
          }}
        >
          <Text style={styles.timelinetext}>
            {TranslationStrings.TOTAL_PRICE}
          </Text>
          <Text style={styles.timelinetext}>
            {exchange_other_listing.price}
          </Text>
        </View>
        <View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={TranslationStrings.NEXT}
            widthset={80}
            topDistance={10}
            onPress={() => {
              navigation.navigate("CardDetails");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;
