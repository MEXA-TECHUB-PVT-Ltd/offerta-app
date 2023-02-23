import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

////////navigation////////////////
import { useIsFocused } from '@react-navigation/native';

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import ShippingAddressCard from "../../../components/CustomCards/ShippingAddressCard";

/////////////app styles////////////////
import styles from "./styles";

//////////////api function//////////
import { get_Shipping_Address } from "../../../api/ShippingAddress";

////////////////redux//////////////
import { setLoginUserShippingAddress } from "../../../redux/LoginUserActions";
import { useDispatch,useSelector } from "react-redux";


const ShippingAddressList = ({ navigation }) => {

    ////////////////navigation/////////////////
    const isFocused = useIsFocused();

      ////////////////redux/////////////
  const { exchange_other_listing } = useSelector((state) => state.loginuserReducer);
  const dispatch = useDispatch();

    ////////////list state////////////
const[shippinglist,setshippinglist]=useState()

useEffect(() => {
    if(isFocused){
        get_Shipping_Address().then((response) => {
            console.log("response get here dispatcher", JSON.stringify(response.data))
            setshippinglist(response.data)
            });
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={"Shipping Address"}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"chevron-back"}
        searchicon={"plus"}
        type={"left_icon"}
        onpresseacrh={()=>navigation.navigate("ShippingAddress",{navtype:"shippin_list"})}
      />

      <View style={{ flex: 1 }}>
        <FlatList
          data={shippinglist}
          renderItem={({ item }) => (
               <ShippingAddressCard
            username={item.country} 
            address_1={item.address_1} 
            address_2={item.address_2} 
            city={item.city}
            state={item.state}
            country={item.country}
          type={"shipping_address"}
            onpress={()=>{    dispatch(setLoginUserShippingAddress(item)),
                navigation.navigate("UpdateShippingAddress")}}
             />
  )}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShippingAddressList;
