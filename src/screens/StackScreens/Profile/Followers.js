import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import ListCard from "../../../components/CustomCards/ListCard";


/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";
  
const Followers = ({ navigation, route }) => {

      /////////////main menu status states/////////////
  const [followers, setFollowers] = useState("");
  const GetFollowers = async () => {
    var user = await AsyncStorage.getItem("Userid");
    axios({
      method: "GET",
      url: BASE_URL + "getFollower.php?user_id=" + user,
    })
      .then(async function (response) {
        setFollowers(response.data);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  useEffect(() => {
    GetFollowers()
  }, []);

  const renderItem = ({ item }) => (
      <ListCard
              image={"image"}
              usename={item.user_name}
              fullname={item.full_name}
              type={'Follow'}
              onpress={()=> navigation.navigate('ListingsDetails')}
            />
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={"Followers"}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />
        <FlatList
          data={followers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Followers;
