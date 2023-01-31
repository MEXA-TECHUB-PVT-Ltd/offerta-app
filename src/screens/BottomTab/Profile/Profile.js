import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";

///////////////////icons///////////
import Icon from "react-native-vector-icons/Ionicons";

///////////////////react native navigation///////////////
import { useIsFocused } from "@react-navigation/native";

////////////////app components//////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import ProfileCard from "../../../components/CustomCards/Profile";
import SettingsMenu from "../../../components/SettingsView/SettingsMenu";

////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

///////////app styles////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";

//////////////////app images///////////
import { appImages } from "../../../constant/images";

const Profile = ({ navigation }) => {
  ////////////isfocused//////////
  const isfocussed = useIsFocused();

  ///////////////data states////////////////////
  const [username, setUserName] = React.useState('John Deo');
  const [userimage, setUserImage] = React.useState();
  const [useremail, setUseremail] = React.useState();
  const GetAcountDetail = async () => {
    var user = await AsyncStorage.getItem("Userid");
    await axios({
      method: "GET",
      url: BASE_URL + "getUserById.php?user_id=" + user,
    })
      .then(function (response) {
        //console.log("response get here driver", JSON.stringify(response.data))
        setUserImage(response.data.image);
        //setUserName(response.data.fullname);
        setUseremail(response.data.email);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

//////////////////////Follower detail////////////
const [userfollwer, setUserfollower] = React.useState();
const GetFollowers = async () => {
  var user = await AsyncStorage.getItem("Userid");
  await axios({
    method: "GET",
    url: BASE_URL + "totalFollower.php?user_id=" + user,
  })
    .then(function (response) {
      console.log("response followers", JSON.stringify(response.data))
      setUserfollower(response.data.Total);
    })
    .catch(function (error) {
      console.log("error", error);
    });
};
//////////////////////Following detail////////////
const [userfollwings, setUserfollowings] = React.useState();
const GetFollowings = async () => {
  var user = await AsyncStorage.getItem("Userid");
  await axios({
    method: "GET",
    url: BASE_URL + "totalFollowing.php?user_id=" + user,
  })
    .then(function (response) {
      console.log("response followings", JSON.stringify(response.data))
      setUserfollowings(response.data.Total);
    })
    .catch(function (error) {
      console.log("error", error);
    });
};
  useEffect(() => {
    if (isfocussed) {
      GetAcountDetail();
      GetFollowers()
      GetFollowings()
    }
  }, [isfocussed]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.Appthemecolor} barStyle="light-content" />

      <View style={styles.header}>
        <View style={{ alignSelf: "flex-end", marginTop: wp(5) }}>
          <Icon
            name={"settings"}
            size={25}
            color={"white"}
            style={{ marginLeft: wp(30) }}
            onPress={() => navigation.navigate("Settings")}
          />
        </View>
      </View>
      <View style={[styles.footer]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ marginTop: hp(23), marginBottom: hp(2) }}>
            {/* <SettingsMenu
       label={'Payment Details'}
       labelPress={()=>navigation.navigate('ViewPaymentDetail')}
       /> */}
            <SettingsMenu
              label={"Listings"}
              labelPress={() => navigation.navigate("Listings")}
            />
            <SettingsMenu
              label={"Liked Items"}
              labelPress={() => navigation.navigate("LikedItems")}
            />
            <SettingsMenu
              label={"Exchanges"}
              labelPress={() => navigation.navigate("Exchanges")}
            />

            <SettingsMenu
              label={"Promotions"}
              labelPress={()=>navigation.navigate('Promotions')}
            />
            <SettingsMenu
              label={"Sale & Orders"}
              labelPress={()=>navigation.navigate('SalesOrders')}
            />
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          position: "absolute",
          top: hp(10),
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <ProfileCard
          userlogo={userimage}
          username={username}
          useremail={useremail}
          followers={userfollwer}
          following={userfollwings}
          reviews={'40'}
          text1={"Follwers"}
          text2={"Followings"}
          text3={"Reviews"}


        />
      </View>
    </View>
  );
};

export default Profile;
