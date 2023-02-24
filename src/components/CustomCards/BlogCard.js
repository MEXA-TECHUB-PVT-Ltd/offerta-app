import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { appImages } from "../../constant/images";
import { fontFamily } from "../../constant/fonts";

const BlogCard = (props) => {
  console.log("props here:", props);
  return (
    <TouchableOpacity
      onPress={props.onpress}
      activeOpacity={0.9}
    >
      <View style={styles.blogcard}>
        <View style={{ marginBottom: hp(0), marginTop: hp(0) }}>
          <Image source={{uri:"https://teamsuit.co/offertaFinal/admin/"+props.image}} 
          style={styles.blogimage}
          resizeMode={'cover'}
          ></Image>
        </View>
        <View style={{ width: wp(38), paddingLeft: wp(1) }}>
          <Text numberOfLines={1} style={styles.blogmaintext}>
            {props.maintext}
          </Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:wp(15)}}>
            <View>
            <Text style={[styles.blogsubtext,{    width: wp(15),fontFamily:fontFamily.Poppins_SemiBold}]}>
           Category
          </Text>
          <Text style={[styles.blogsubtext,{    width: wp(18),}]}>
            {props.subtext}
          </Text>
            </View>
            <View>
            <Text style={[styles.blogsubtext,{ textAlign:'right',   width: wp(15),fontFamily:fontFamily.Poppins_SemiBold}]}>
           Sub Category
          </Text>
          <Text style={[styles.blogsubtext,{  textAlign:'right',  width: wp(15),}]}>
            {props.subtext1}
          </Text>
            </View>
   
          </View>
  
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BlogCard;