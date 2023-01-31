import * as React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";

/////////////////styles////////////
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////react native paper//////
import { IconButton } from "react-native-paper";

////////////////app fonts//////////////
import { fontFamily } from "../../../constant/fonts";

const IconsTopTabs = (props) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: wp(props.width),
        //paddingHorizontal:wp(3)
      }}
      onPress={props.onpress}
    >
      <IconButton
        icon={props.icon}
        color={props.selected === props.id ? Colors.activetextinput : "grey"}
        iconColor={
          props.selected === props.id ? Colors.activetextinput : "grey"
        }
        size={20}
      />
      <Text
        style={{
          color:
            props.selected === props.id ? Colors.activetextinput : "#AAAAAA",
          fontSize: hp(1.6),
          fontFamily: fontFamily.Poppins_Medium,
        }}
      >
        {props.title}
      </Text>
      {props.selected === props.id && (
        <View
          style={{
            height: hp(0.5),
            width: wp(props.width),
            marginTop: hp(1.2),
            backgroundColor:
              props.selected === props.id ? Colors.activetextinput : "#AAAAAA",
            borderRadius: wp(2),
          }}
        ></View>
      )}
    </TouchableOpacity>
  );
};

export default IconsTopTabs;
