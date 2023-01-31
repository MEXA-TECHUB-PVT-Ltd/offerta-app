import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";

/////////////////Chart Library//////////////
import {
    LineChart,
  } from "react-native-chart-kit";

//////////////////app components///////////////
import CustomHeader from "../../../../components/Header/CustomHeader";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../../constant/images";

  
const Insights = ({ navigation, route }) => {
  useEffect(() => {}, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={"Insights"}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />
 <LineChart
    data={{
      labels: ["day1", "day2", "day3", "day4", "day5", "day6","day7"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width/1.05} // from react-native
    height={220}
    //yAxisLabel="$"
    //yAxisSuffix="k"
    //yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor:Colors.Appthemecolor,
      backgroundGradientFrom:Colors.Appthemecolor,
      backgroundGradientTo:Colors.Appthemecolor,
      //decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 12
      },
      propsForDots: {
        r: "4",
        strokeWidth: "0.5",
        stroke: 'white'
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 14,
      alignSelf:'center'
    }}
  />
  <View style={{flexDirection:'row',justifyContent:'spac'}}>
    <Text></Text>
  </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Insights;
