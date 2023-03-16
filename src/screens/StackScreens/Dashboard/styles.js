import React from "react";
import { StyleSheet, Dimensions } from "react-native";

///////////////app colors///////////
import Colors from "../../../utills/Colors";

////////////height/ width//////////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////app height width//////////////
const Width = Dimensions.get("screen").width;
const Height = Dimensions.get("screen").height;

///////////////app fonts///////////////
import { fontFamily } from "../../../constant/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  /////////////////privacy policy///////////////////
  textview: {
    justifyContent: "center",
    marginHorizontal: wp(6),
    marginTop: hp(0),
  },
  text: {
    color: "#000000",
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.7),
  },

  /////////////////Language/////////////
  Languagepickerview: {
    borderColor: Colors.activetextinput,
    width: wp(87),
    height: hp(7),
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: wp(10),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
    marginTop: hp(1),
  },
  languagetext: {
    color: "#000000",
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(1.7),
  },

  //////////////////Invite Friends///////////////
  friendsmaintext: {
    color: Colors.Appthemecolor,
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: hp(2),
  },
  friendsview: {
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "center",
    width: wp(88),
    height: hp(6.5),
    backgroundColor: "red",
    alignSelf: "center",
    borderRadius: wp(10),
    paddingHorizontal: wp(12),
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  friendstext: {
    color: "white",
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
    marginLeft: wp(5),
  },

  /////////////////////////Search Styling///////////////////
  //Header
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.Appthemecolor,
    height: Height * 0.1,
    width: wp(100),
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    borderBottomRightRadius: wp(3),
    borderBottomLeftRadius: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  iconview: {
    justifyContent: "center",
    marginRight: wp(0),
  },
  iconstyle: {
    height: hp(12),
    width: wp(15),
  },
  searchmaintext: {
    color: Colors.Appthemecolor,
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: hp(2),
    marginLeft:wp(5)
  },
});
export default styles;
