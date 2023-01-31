import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../components/Header/CustomHeader";
import BlogCard from "../../components/CustomCards/BlogCard";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../constant/images";

///////////////////app fonts/////////////
import { fontFamily } from "../../constant/fonts";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    subtext:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    subtext:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    subtext:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
  },
];

const Blogs = ({ navigation, route }) => {
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={"Blogs"}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <FlatList
          data={DATA}
          numColumns={2}
          //ListFooterComponent={ListFooter('Popular')}
          renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("SliderScreen", {
//                   navplace: "Market",
//                   navtype: item.type,
//                 })
//               }
//             >
//               <View
//                 style={{
//                   marginVertical: hp(2),
//                   margin: wp(0),
//                   alignItems: "center",
//                   marginHorizontal: wp(5),
//                   backgroundColor: "white",
//                   width: wp(41),
//                   height: hp(22),
//                   borderRadius: wp(3),
//                   shadowColor: "#000",
//                   shadowOffset: {
//                     width: 0,
//                     height: 6,
//                   },
//                   shadowOpacity: 0.39,
//                   shadowRadius: 8.3,

//                   elevation: 13,
//                 }}
//               >
//                 <View style={{marginBottom:hp(4),marginTop:hp(5)}}>
//                   <Image
//                     source={appImages.ImageIcon}
//                     style={{
//                       height: hp(5),
//                       width: wp(15),
        
//                     }}
//                     imageStyle={{
//                       borderRadius: 15,
//                       borderWidth: 1,
//                       borderColor: "black",
//                       padding: 10,
//                     }}
//                   ></Image>
//                 </View>
//                 <View style={{width:wp(38),paddingLeft:wp(1)}}>
//                   <Text
//                   numberOfLines={1}
//                     style={{
//                       color:Colors.Appthemecolor,
//                       width: wp(30),
//                       marginTop: hp(1),
//                       fontSize:hp(1.6),
//                       fontFamily:fontFamily.Poppins_Medium
//                     }}>
//                     {item.title}
//                   </Text>
//                   <Text
//                    numberOfLines={2}
//                     style={{
//                       color: "black",
//                       width: wp(35),
//                       marginTop: hp(0),
//                       fontSize:hp(1),
// fontFamily:fontFamily.Poppins_Regular
//                     }}>
//             Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
<BlogCard
image={'image'}
maintext={item.title}
subtext={item.subtext}
onpress={()=>navigation.navigate('BlogsDetails')}
/>
          )}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Blogs;
