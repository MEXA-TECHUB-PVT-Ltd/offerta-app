import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

////////////react native paper/////////////
import { Checkbox } from "react-native-paper";

/////////////styles///////////////
import styles from "./styles";

/////////////colors////////////
import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////app icons////////////////
import Ionicons from "react-native-vector-icons/Ionicons";
import { fontFamily } from "../../constant/fonts";
import TranslationStrings from "../../utills/TranslationStrings";

const DashboardCard = (props) => {
  const [checked, setChecked] = React.useState(true);

  /////////price formatter
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });
  const formattedLikes = formatter.format(props.price);

  return (
    <TouchableOpacity onPress={props.onpress} activeOpacity={0.9}>
      <View
        style={[
          styles.dashboardcard,
          {
            width: props.type === "Exchange_Request" ? wp(90) : wp(45),
            height: props.type === "Exchange_Request" ? hp(27) : hp(23),
          },
        ]}
      >
        <View style={{ marginBottom: hp(0), marginTop: hp(0) }}>
          <Image
            source={{ uri: props.image }}
            style={[
              styles.dasboardimage,
              {
                width: props.type === "Exchange_Request" ? wp(90) : wp(45),
                height: props.type === "Exchange_Request" ? hp(18) : hp(15),
              },
            ]}
            resizeMode="cover"
          ></Image>

          {/* {(props?.tag == "sold" ||
            props?.tag == true ||
            props?.tag == "true") && (
            <View
              style={{
                backgroundColor: "red",
                position: "absolute",
                right: 0,
                borderBottomLeftRadius: 8,
                paddingHorizontal: 8,
                paddingTop: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fontFamily.Poppins_Regular,
                  color: "#fff",
                }}
              >
                {props?.tag}
              </Text>
            </View>
          )} */}

          {props?.promotion?.tag == "Advertised" && (
            <View
              style={{
                backgroundColor: props?.promotion?.color
                  ? props?.promotion?.color
                  : "#576AF4",
                position: "absolute",
                left: 0,
                borderBottomLeftRadius: 8,
                paddingHorizontal: 15,
                paddingTop: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fontFamily.Poppins_Regular,
                  color: "#fff",
                }}
              >
                Ad
              </Text>
            </View>
          )}

          {(props?.sold == "sold" ||
            props?.sold == true ||
            props?.sold == "true") && (
            <View
              style={{
                backgroundColor: "red",
                position: "absolute",
                right: 0,
                borderBottomLeftRadius: 8,
                paddingHorizontal: 8,
                paddingTop: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fontFamily.Poppins_Regular,
                  color: "#fff",
                }}
              >
                {TranslationStrings.SOLD}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            width: props.type === "Exchange_Request" ? wp(85) : wp(42),
            paddingLeft: wp(1),
            marginTop: hp(1),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text numberOfLines={1} style={styles.dashboardmaintext}>
              {props.maintext}
            </Text>
            <Text numberOfLines={1} style={styles.pricetext}>
              {formattedLikes === "0" ? "free" : "$" + formattedLikes}
              {/* //+"$"  */}
            </Text>
          </View>
          {props.type === "Exchange_Request" ? null : (
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name={"location"}
                size={15}
                color={Colors.activetextinput}
                onPress={() => navigation.toggleDrawer()}
              />
              <Text numberOfLines={2} style={styles.blogsubtext}>
                {props.subtext}
              </Text>
            </View>
          )}
        </View>
      </View>
      {props.selected === true && props.type === "Selected_List" ? (
        <View
          style={{
            backgroundColor: "rgba(87,106,244,0.42)",
            position: "absolute",
            height: hp(23.3),
            width: wp(45),
            marginVertical: hp(2),
            marginHorizontal: wp(3),
            borderRadius: wp(4),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name={"checkmark"}
            size={25}
            color={"white"}
            onPress={() => navigation.toggleDrawer()}
          />
        </View>
      ) : null}
      {props.selected === props.id && props.type === "Exchange_Offer" ? (
        <View
          style={{
            position: "absolute",
            height: hp(23.3),
            width: wp(45),
            marginVertical: hp(3),
            marginHorizontal: wp(3),
            borderRadius: wp(4),
          }}
        >
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(checked);
            }}
            color={"red"}
            //uncheckedColor={Colors.activetextinput}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default DashboardCard;
