import * as React from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";

///////////////colors/////////////////
import Colors from "../../utills/Colors";

////////////styles//////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

///////////////app fonts///////////////
import { fontFamily } from "../../constant/fonts";

const PromotionTopTabs = (props) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: wp(props.width),
        height:hp(5.5),
        borderRadius:wp(2),
        backgroundColor:props.state != true ?'#EBEBEB':'white'
      }}
    >
      <Text
        style={{
          color: props.state != true ? Colors.appgreycolor :Colors.Appthemecolor,
          fontSize: hp(1.6),
          fontFamily: fontFamily.Poppins_Medium,
        }}
      >
        {props.title}
      </Text>
    </View>
  );
};

export default PromotionTopTabs;
