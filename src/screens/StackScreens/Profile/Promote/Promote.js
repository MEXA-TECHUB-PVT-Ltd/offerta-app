import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../../components/Header/CustomHeader";
import PromotionTopTabs from "../../../../components/TopTabs/PromotionTopTabs";
import CustomButtonhere from "../../../../components/Button/CustomButton";
/////////////app styles////////////////
import styles from "./styles";
import TopTabstyles from "../../../../styles/GlobalStyles/TopTabstyles";

import Colors from "../../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appImages } from "../../../../constant/images";


const Promote = ({ navigation }) => {
  //top tab status states
  const [Urgent, setUrgent] = useState(true);
  const [Advertisment, setAdvertisment] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
            <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
      <CustomHeader
        headerlabel={"Promote"}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"chevron-back"}
      />
      <View style={TopTabstyles.TopTabView}>
        <TouchableOpacity
          onPress={() => {
            setUrgent(true), setAdvertisment(false)
          }}
        >
          <PromotionTopTabs title={"Urgent"} width={"35%"} state={Urgent} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setUrgent(false), setAdvertisment(true)
          }}
        >
          <PromotionTopTabs
            title={"Advertisment"}
            width={"35%"}
            state={Advertisment}
          />
        </TouchableOpacity>
      </View>
      {Urgent === true?
          <View>
          <View style={{alignItems:'center',paddingHorizontal:wp(5)}}>
      <Text style={styles.promotetoptext}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
        no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, se</Text>
    </View>
    <View style={{alignItems:'center',paddingHorizontal:wp(5),marginTop:hp(2)}}>
      <Text style={styles.promotepricetext}>Buy at 99$</Text>
    </View>
    <View style={{height:hp(0.3),width:wp(85),backgroundColor:Colors.icon,alignSelf:'center',marginTop:hp(2)}}></View>
    <View style={{alignItems:'center',paddingHorizontal:wp(5),marginTop:hp(2)}}>
      <Text style={[styles.promotepricetext,{fontSize:hp(2.5)}]}>Features</Text>
    </View>
    <View style={{alignItems:'center',paddingHorizontal:wp(5)}}>
      <Text style={styles.promotetoptext}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
        no sea takimata sanctus est Lorem ipsum dolor sit amet.</Text>
    </View>
          </View>
          :
          <View>
          <View style={{alignItems:'center',paddingHorizontal:wp(5)}}>
      <Text style={styles.promotetoptext}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
        no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, se</Text>
    </View>
    <View style={{alignItems:'center',paddingHorizontal:wp(10),marginTop:hp(2),flexDirection:'row',
  justifyContent:'space-between'
  }}>
  <Text style={styles.promotepricetext}>3-months</Text>
    <Text style={styles.promotepricetext}>300$</Text>
    </View>
    <View style={{alignItems:'center',paddingHorizontal:wp(10),marginTop:hp(2),flexDirection:'row',
  justifyContent:'space-between'
  }}>
  <Text style={styles.promotepricetext}>6-months</Text>
    <Text style={styles.promotepricetext}>100$</Text>
    </View>
    <View style={{height:hp(0.3),width:wp(85),backgroundColor:Colors.icon,alignSelf:'center',marginTop:hp(2)}}></View>
    <View style={{alignItems:'center',paddingHorizontal:wp(5),marginTop:hp(2)}}>
      <Text style={[styles.promotepricetext,{fontSize:hp(2.5)}]}>Features</Text>
    </View>
    <View style={{alignItems:'center',paddingHorizontal:wp(5)}}>
      <Text style={styles.promotetoptext}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
        no sea takimata sanctus est Lorem ipsum dolor sit amet.</Text>
    </View>
          </View>
    }
  

<View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={"PAY"}
            widthset={80}
            topDistance={15}
            onPress={() => {
            navigation.navigate('Payment')
            }}
          />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Promote;
