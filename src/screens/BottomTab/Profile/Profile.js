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

///////////////api function///////////
import { get_Login_UserData,get_Login_User_Followers,get_Login_User_Followings } from "../../../api/GetApis"; 

const Profile = ({ navigation }) => {
  ////////////isfocused//////////
  const isfocussed = useIsFocused();

  ///////////////data states////////////////////
  const [username, setUserName] = React.useState('');
  const [userimage, setUserImage] = React.useState();
  const [useremail, setUseremail] = React.useState();
  const [ratting, setRatting] = React.useState();
  const [followers, setFollowers] = React.useState();
  const [following, setFollowing] = React.useState();
  const GetAcountDetail = async () => {
    get_Login_UserData().then((response) => {
      setUserName(response.data.full_name);
      setUseremail(response.data.email);
      setUserImage(response.data.image);
      setFollowing(response.data.following);
      setFollowers(response.data.followers);
      setRatting(response.data.review);
    });
  };

//////////////////////Follower detail////////////
const [userfollwer, setUserfollower] = React.useState();
const GetFollowers = async () => {
  get_Login_User_Followers().then((response) => {
    if(response.data.msg === "No follower yet")
    {
      setUserfollower(0)
    }
    else
    {
      setUserfollower(response.data.Total);
    }

  });
};
//////////////////////Following detail////////////
const [userfollwings, setUserfollowings] = React.useState();
const GetFollowings = async () => {
  get_Login_User_Followings().then((response) => {
    console.log('here total:',response.data)
    if(response.data === "No following yet")
    {
      setUserfollowings(0)
    }
    else
    {
      setUserfollowings(response.data.Total);
    }

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
          followers={followers}
          following={following}
          ratting={ratting}
          ratting_text={"Rate"}
          following_text={"Follwers"}
          followers_text={"Followings"}
          // followStatus={
          //   follow_user_id === login_user_id ? "Unfollow" : "follow"
          // }
        />
      </View>
    </View>
  );
};

export default Profile;