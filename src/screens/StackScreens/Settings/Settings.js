import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

/////////////////////app pakages///////////////
import { Avatar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import SettingsMenu from "../../../components/SettingsView/SettingsMenu";
import CustomButtonhere from "../../../components/Button/CustomButton";

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
import RNFetchBlob from "rn-fetch-blob";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";

const Settings = ({ navigation }) => {
  const logout = async () => {
    await AsyncStorage.removeItem("Userid");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={"Settings"}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"arrow-back"}
      />

      <View style={{ marginTop: hp(6) }}></View>
      <SettingsMenu
        label={"Edit Profile"}
        icon={"file-edit-outline"}
        labelPress={() => navigation.navigate("EditProfile")}
      />
      <SettingsMenu
        label={"Change Password"}
        icon={"lock"}
        labelPress={() =>
          navigation.navigate("ChangePassword", { navplace: "ChangePassword" })
        }
      />
      <SettingsMenu
        label={"Location"}
        icon={"map-marker"}
        labelPress={() =>
          navigation.navigate("Location", { navplace: "Location" })
        }
      />
      <SettingsMenu
        label={"Verify Account"}
        icon={"shield-check"}
        labelPress={() => navigation.navigate("VerifyAccount")}
      />
      <SettingsMenu
        label={"View Verification Documents"}
        icon={"shield-check"}
        labelPress={() => navigation.navigate("VerificationDocuments")}
      />
      {/* <SettingsMenu
       label={'Allow user to call you'}
       icon={'phone'}
       //labelPress={()=>navigation.navigate('How to Use')}
       /> */}
      <CustomButtonhere
        title={"LOGOUT"}
        widthset={78}
        topDistance={30}
        icon={"power"}
        onPress={() => logout()}
      />
    </SafeAreaView>
  );
};

export default Settings;
