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
    /////////price formatter
    const formatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short'
    });
    const formattedLikes = formatter.format(props.pricetext);
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
              props.type === "Urgent" || props.type === "urgent"
                ? "red"
                : props.type === "Advertisement" || props.type === "advertisement"
                ? "#576AF4"
                : Colors.inactivetextinput,
            height: hp(3.5),
            width: props.type === "Advertisement" || props.type === "advertisement" ? wp(15) : wp(20),
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-end",
            borderTopRightRadius: hp(2),
          }}
        >
          <Text style={styles.Promotionstagtext}>
            {props.type === "Urgent"  || props.type === "urgent"
              ? "Urgent"
              : props.type === "Advertisement" || props.type === "advertisement"
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
              source={{ uri: props.image }}
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
                 {formattedLikes === "0"?"free":"$"+formattedLikes}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PromotionsCard;
