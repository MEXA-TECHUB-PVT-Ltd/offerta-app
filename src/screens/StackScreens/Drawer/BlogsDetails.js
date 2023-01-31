import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";

///////////////app icons////////////
import Icon from "react-native-vector-icons/Ionicons";

/////////////////app components/////////
import Slider from "../../../components/ImageSlider/Slider";
import DescriptionBottomSheet from "../../../components/CustomBottomSheet/DescriptionBTS";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setName, setAge } from "../../../redux/actions";

////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

/////////////////////app styles////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";

/////////////////app images///////////
import { appImages } from "../../../constant/images";

////////////////////app ratting  pakages////////////////////////
import {Rating, AirbnbRating} from 'react-native-ratings';

const BlogsDetails = ({ navigation }) => {
  //////////////redux///////////////
  const { name, age } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  //camera and imagepicker
  const refRBSheet = useRef();

  /////////////main menu status states/////////////
  const [Orders, setOrders] = useState("");
  const GetOrders = async () => {
    var user = await AsyncStorage.getItem("Userid");
    axios({
      method: "GET",
      url: BASE_URL + "api/Order/getGuestOrdersByTime/" + user,
    })
      .then(async function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {}, []);

  const SliderImages = [
    { image: appImages.SaleIcon },
    { image: appImages.AddIcon },
    { image: appImages.BagsIcon },
  ];
  const [ratting, setRatting] = useState(4.5);
  ///////////////ratings function//////////////
  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setRatting(rating);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <StatusBar backgroundColor={"black"} barStyle="light-content" />
        <Slider 
        imagearray={SliderImages} 
        type={'blogs'}
        />

        <View style={{ marginTop: hp(5), marginHorizontal: wp(5),marginBottom:hp(2) }}>
          <Text style={styles.maintext}>Blog name</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:wp(5)}}>
        <Text style={styles.lefttext}>Referrences</Text>
        <Text style={styles.righttext}>Lightly used</Text>
        </View>
        <View style={{ marginTop: hp(2), marginHorizontal: wp(5),marginBottom:hp(2) }}>
          <Text style={styles.lefttext}>Description</Text>
        </View>
        <View style={{ marginHorizontal: wp(5),marginBottom:hp(2) }}>
          <Text style={styles.subtext}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
           sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed 
           diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita 
           kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
             ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
              et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
               est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
 ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
  dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor 
  sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
   invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
    justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut 
labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
 et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogsDetails;
