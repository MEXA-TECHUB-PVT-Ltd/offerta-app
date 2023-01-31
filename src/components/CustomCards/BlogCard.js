import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { appImages } from "../../constant/images";

const BlogCard = (props) => {
  console.log("props here:", props);
  return (
    <TouchableOpacity
      onPress={props.onpress}
      activeOpacity={0.9}
    >
      <View style={styles.blogcard}>
        <View style={{ marginBottom: hp(4), marginTop: hp(5) }}>
          <Image source={appImages.ImageIcon} style={styles.blogimage}></Image>
        </View>
        <View style={{ width: wp(38), paddingLeft: wp(1) }}>
          <Text numberOfLines={1} style={styles.blogmaintext}>
            {props.maintext}
          </Text>
          <Text numberOfLines={2} style={styles.blogsubtext}>
            {props.subtext}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BlogCard;
