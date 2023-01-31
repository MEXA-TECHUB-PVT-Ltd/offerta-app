import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

////////////app styles//////////
import styles from "./styles";

///////////////app color/////////////
import Colors from "../../utills/Colors";

/////////app heigth and width//////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PromotionsCard = (props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("SliderScreen", {
          navplace: "Market",
          navtype: item.type,
        })
      }
      style={styles.Promotionscard}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            backgroundColor:
              props.type === "Urgent"
                ? "red"
                : props.type === "Advertisement"
                ? "#576AF4"
                : Colors.inactivetextinput,
            height: hp(3.5),
            width: props.type === "Advertisement" ? wp(15) : wp(20),
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-end",
            borderTopRightRadius: hp(2),
          }}
        >
          <Text style={styles.Promotionstagtext}>
            {props.type === "Urgent"
              ? "Urgent"
              : props.type === "Advertisement"
              ? "Ad"
              : "Expired"}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: hp(10),
              width: wp(20),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={props.image}
              style={styles.Promotionsimage}
              resizeMode="contain"
            ></Image>
          </View>

          <View style={{ marginLeft: wp(3) }}>
            <Text style={styles.Promotionstext}>{props.maintext}</Text>
            <Text style={styles.Promotionssubtext}>{props.subtext}</Text>
          </View>

          <Text
            style={[styles.Promotionspricetext, { right: wp(0) }]}
            numberOfLines={1}
          >
            {props.pricetext}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PromotionsCard;
