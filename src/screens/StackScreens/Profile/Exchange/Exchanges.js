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
import SettingsMenu from "../../../../components/SettingsView/SettingsMenu";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Exchanges = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={"Exchanges"}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"chevron-back"}
      />

      <View style={{ marginTop: hp(0) }}></View>
      <SettingsMenu
        label={"In coming Exchanges"}
        labelPress={() => navigation.navigate("IncomingExchange")}
      />
      <SettingsMenu
        label={"Out going Exchanges"}
        labelPress={() => navigation.navigate("OutGoingExchange")}
      />
      <SettingsMenu
        label={"Success Exchanges"}
        labelPress={() => navigation.navigate("SucessExchange")}
      />
      <SettingsMenu
        label={"Failed Exchanges"}
        labelPress={() => navigation.navigate("FailedExchange")}
      />
    </SafeAreaView>
  );
};

export default Exchanges;
