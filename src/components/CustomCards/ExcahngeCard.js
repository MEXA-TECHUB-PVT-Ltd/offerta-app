import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

//////////////////app icons////////////////
import Ionicons from "react-native-vector-icons/Ionicons";

import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { appImages } from "../../constant/images";

const ExcahangeCard = (props) => {
console.log("props here:",props)
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  });
  const formattedLikes = formatter.format(props.pricetext);
  return (
    // <TouchableOpacity
    //   onPress={() =>
    //     navigation.navigate("SliderScreen", {
    //       navplace: "Market",
    //       navtype: item.type,
    //     })
    //   }
    // >
      <View style={styles.Exchangecard}>
      {/* <View style={{backgroundColor:'red',height:hp(2),width:wp(5)}}>
  
  </View> */}
        {/* <View style={{ marginBottom: hp(4), marginTop: hp(5),alignItems:"center" }}> */}
        <View style={{flexDirection:'row',alignItems:'center'}}>
  <View style={{height:hp(8),width:wp(18),alignItems:'center',justifyContent:'center'}}>
        <Image    source={{ uri: props.image }}style={styles.Exchangeimage}
          resizeMode='contain'
          ></Image>
        </View>
 
          <View style={{marginLeft:wp(3)}}>
          <Text  style={styles.Exchangetext}>
            {props.maintext}
          </Text>
          <Text  style={styles.Exchangesubtext}>
            {props.subtext}
          </Text>
          </View>
        </View>
        <View style={{flexDirection:props.pricetag != undefined? 'column' :'row',marginTop:hp(1)}}>
        <Text  style={[styles.Exchangepricetext,{right:props.pricetag != undefined?wp(3):wp(7)}]}
        //numberOfLines={1}
        >
            {props.pricetag != undefined?formattedLikes + props.pricetag:formattedLikes}
          </Text>
    {props.cardtype === "like"?
                            <Ionicons
                            name={"heart"}
                            size={20}
                            color={'red'}   
                            style={{right:wp(8.5)}}
                            //onPress={() => navigation.navigate("Search")}
                          />
                          :null
  }

        </View>


        {/* </View> */}
      </View>
    // </TouchableOpacity>
  );
};

export default ExcahangeCard;
