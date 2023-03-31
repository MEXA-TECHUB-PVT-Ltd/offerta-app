import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

////////navigation////////////////
import { useIsFocused } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";
//////////////////app components///////////////
import CustomHeader from "../../../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../../../components/Button/CustomButton";
import CustomTextInput from "../../../../../components/TextInput/CustomTextInput";
import ShippingAddressCard from "../../../../../components/CustomCards/ShippingAddressCard";
import NoDataFound from "../../../../../components/NoDataFound/NoDataFound";

////////////////country picker package/////////////
import CountryPicker from "react-native-country-picker-modal";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

//////////////api function//////////
import { get_Shipping_Address } from "../../../../../api/ShippingAddress";

////////////////redux//////////////
import {
  setOrderShippingAddress,
  setLoginUserShippingAddress,
} from "../../../../../redux/LoginUserActions";
import { useDispatch, useSelector } from "react-redux";
import { fontFamily } from "../../../../../constant/fonts";

const PaymentOptions = ({ navigation, route }) => {
  const [selected_index, setSelected_index] = useState(-1);

  const handlePress = async (index) => {
    setSelected_index(index);
    if (index == 0) {
      navigation.navigate("ConfirmAddress");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={"Buy"}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              color: Colors.Appthemecolor,
              fontFamily: fontFamily.Poppins_Bold,
              marginBottom: 30,
            }}
          >
            Choose Payment Method
          </Text>
          <TouchableOpacity style={styles1.btn} onPress={() => handlePress(0)}>
            <Text style={styles1.btnText}>Credit Card</Text>
            {selected_index == 0 && (
              <View style={styles1.checkedView}>
                <Checkbox status={"checked"} />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles1.btn} onPress={() => handlePress(1)}>
            <Text style={styles1.btnText}>Bit Coin</Text>
            {selected_index == 1 && (
              <View style={styles1.checkedView}>
                <Checkbox status={"checked"} />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles1.btn} onPress={() => handlePress(2)}>
            <Text style={styles1.btnText}>Pay on Delivery</Text>
            {selected_index == 2 && (
              <View style={styles1.checkedView}>
                <Checkbox status={"checked"} />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles1.btn} onPress={() => handlePress(3)}>
            <Text style={styles1.btnText}>Pay on Pickup</Text>
            {selected_index == 3 && (
              <View style={styles1.checkedView}>
                <Checkbox status={"checked"} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentOptions;
const styles1 = StyleSheet.create({
  btn: {
    height: hp(15),
    width: wp(90),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: Colors.Appthemecolor,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  btnText: {
    color: "#000",
    fontSize: 18,
  },
  checkedView: { position: "absolute", top: hp(15) / 3, left: 0 },
});
