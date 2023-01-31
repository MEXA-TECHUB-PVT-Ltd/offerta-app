import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList
} from "react-native";

///////////////////icons///////////
import Icon from "react-native-vector-icons/Ionicons";

///////////////////react native navigation///////////////
import { useIsFocused } from "@react-navigation/native";

////////////////app components//////////////
import DashboardCard from "../../../../components/CustomCards/DashboardCard";
import ProfileCard from "../../../../components/CustomCards/Profile";

////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

///////////app styles////////////////
import styles from "./styles";
import Colors from "../../../../utills/Colors";

//////////////////app images///////////
import { appImages } from "../../../../constant/images";

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      subtext: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
      price: "20$",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      subtext: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
      price: "20$",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      subtext: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
      price: "20$",
    },
  ];
  

const OtherProfile = ({ navigation }) => {
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
        console.log("response get here", JSON.stringify(response.data))
        setUserImage(response.data.image);
        //setUserName(response.data.full_name);
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
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.header}>
        <View style={{  marginTop: wp(5) }}>
          <Icon
            name={"arrow-back"}
            size={25}
            color={"white"}
            style={{ marginLeft: wp(3) }}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      <View style={[styles.footer]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ marginTop: hp(23), marginBottom: hp(2) }}>
          <FlatList
          data={DATA}
          numColumns={2}
          renderItem={({ item }) => (
            <DashboardCard
              image={"image"}
              maintext={item.title}
              subtext={item.subtext}
              price={item.price}
              onpress={()=> navigation.navigate('MainListingsDetails')}
            />
          )}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
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
          text1={"Facebook"}
          text2={"4.5"}
          type={"other"}
          //facebookicon={appImages.facebookicon}
          staricon={{}}
        />
      </View>
    </View>
  );
};

export default OtherProfile;
