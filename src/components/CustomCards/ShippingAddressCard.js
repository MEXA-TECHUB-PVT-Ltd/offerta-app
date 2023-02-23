import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

////////app styles////////////
import styles from "./styles";

/////////////app height and width/////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////colors/////////////
import Colors from "../../utills/Colors";

const ShippingAddressCard = (props) => {
    console.log("here we",props)
  return (
      props.type === "Buy"?
            <TouchableOpacity onPress={props.cardonpress} style={styles.card}>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center', borderBottomColor:Colors.Appthemecolor,borderBottomWidth:2,
            alignSelf:'flex-end',
            width:wp(10),marginBottom:hp(1)}}
            onPress={props.onpress}
            >
            <Text style={styles.shippinglefttext}>Edit</Text>
            </TouchableOpacity>
    
                  <View style={styles.shippingview}>
                <Text style={styles.shippinglefttext}>User Name</Text>
                <Text style={styles.balancetext}>{props.username}</Text>
          </View>
          <View style={styles.shippingview}>
                <Text style={styles.shippinglefttext}>Address 1</Text>
                <Text style={styles.balancetext}>{props.address_1}</Text>
          </View>
          <View style={styles.shippingview}>
                <Text style={styles.shippinglefttext}>Address 2</Text>
                <Text style={styles.balancetext}>{props.address_2}</Text>
          </View>
          <View style={styles.shippingview}>
                <Text style={styles.shippinglefttext}>Country</Text>
                <Text style={styles.balancetext}>{props.country}</Text>
          </View>
          <View style={styles.shippingview}>
                <Text style={styles.shippinglefttext}>City</Text>
                <Text style={styles.balancetext}>{props.city}</Text>
          </View>
          <View style={styles.shippingview}>
                <Text style={styles.shippinglefttext}>State</Text>
                <Text style={styles.balancetext}>{props.state}</Text>
          </View>
          </TouchableOpacity>
          :
          <View style={styles.card}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center', borderBottomColor:Colors.Appthemecolor,borderBottomWidth:2,
          alignSelf:'flex-end',
          width:wp(10),marginBottom:hp(1)}}
          onPress={props.onpress}
          >
          <Text style={styles.shippinglefttext}>Edit</Text>
          </TouchableOpacity>
                <View style={styles.shippingview}>
              <Text style={styles.shippinglefttext}>User Name</Text>
              <Text style={styles.balancetext}>{props.username}</Text>
        </View>
        <View style={styles.shippingview}>
              <Text style={styles.shippinglefttext}>Address 1</Text>
              <Text style={styles.balancetext}>{props.address_1}</Text>
        </View>
        <View style={styles.shippingview}>
              <Text style={styles.shippinglefttext}>Address 2</Text>
              <Text style={styles.balancetext}>{props.address_2}</Text>
        </View>
        <View style={styles.shippingview}>
              <Text style={styles.shippinglefttext}>Country</Text>
              <Text style={styles.balancetext}>{props.country}</Text>
        </View>
        <View style={styles.shippingview}>
              <Text style={styles.shippinglefttext}>City</Text>
              <Text style={styles.balancetext}>{props.city}</Text>
        </View>
        <View style={styles.shippingview}>
              <Text style={styles.shippinglefttext}>State</Text>
              <Text style={styles.balancetext}>{props.state}</Text>
        </View>
    </View>
  );
};

export default ShippingAddressCard;
