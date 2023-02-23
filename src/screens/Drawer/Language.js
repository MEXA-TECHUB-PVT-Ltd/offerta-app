import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

//////////////////app components///////////////
import CustomHeader from "../../components/Header/CustomHeader";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Language = ({ navigation, route }) => {
  const [Englishisfocused, setEnglishisFocused] = useState(true);
  const [Frenchisfocused, setFrenchisFocused] = useState(false);
  const [Arabicisfocused, setArabicisFocused] = useState(false);
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={"Language"}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />
        <TouchableOpacity
          style={[
            styles.Languagepickerview,
            {
              borderColor:
                Englishisfocused === false
                  ? Colors.inactivetextinput
                  : Colors.activetextinput,
            },
          ]}
          onPress={() => {
            setEnglishisFocused(true),
              setFrenchisFocused(false),
              setArabicisFocused(false);
          }}
        >
          <Text style={[styles.languagetext,    {
                color:
                Englishisfocused === false
                    ? Colors.inactivetextinput
                    : Colors.activetextinput,
              },]}>English</Text>
          {Englishisfocused === true ? (
            <Icon
              name={"checkmark"}
              size={25}
              color={Colors.activetextinput}
              style={{ marginLeft: wp(30) }}
            />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.Languagepickerview,
            {
              borderColor:
                Frenchisfocused === false
                  ? Colors.inactivetextinput
                  : Colors.activetextinput,
            },
          ]}
          onPress={() => {
            setEnglishisFocused(false),
              setFrenchisFocused(true),
              setArabicisFocused(false);
          }}
        >
          <Text style={[styles.languagetext,    {
                color:
                Frenchisfocused === false
                    ? Colors.inactivetextinput
                    : Colors.activetextinput,
              },]}>French</Text>
          {Frenchisfocused === true ? (
            <Icon
              name={"checkmark"}
              size={25}
              color={Colors.activetextinput}
              style={{ marginLeft: wp(30) }}
            />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.Languagepickerview,
            {
              borderColor:
                Arabicisfocused === false
                  ? Colors.inactivetextinput
                  : Colors.activetextinput,
            },
          ]}
          onPress={() => {
            setEnglishisFocused(false),
              setFrenchisFocused(false),
              setArabicisFocused(true);
          }}
        >
          <Text
            style={[
              styles.languagetext,
              {
                color:
                  Arabicisfocused === false
                    ? Colors.inactivetextinput
                    : Colors.activetextinput,
              },
            ]}
          >
            Arabic
          </Text>
          {Arabicisfocused === true ? (
            <Icon
              name={"checkmark"}
              size={25}
              color={Colors.activetextinput}
              style={{ marginLeft: wp(30) }}
            />
          ) : null}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Language;
