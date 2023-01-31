import React, { useEffect, useState,useRef } from 'react';
import {
  SafeAreaView,ScrollView,Image,FlatList,
 View, Text, TouchableOpacity,
} from 'react-native';

//////////////////app components///////////////
import CustomHeader from '../../../../components/Header/CustomHeader';
import ExcahangeCard from '../../../../components/CustomCards/ExcahngeCard';

/////////////app styles////////////////
import styles from './styles';
import Colors from '../../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen'; 
import { appImages } from '../../../../constant/images';

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    subtext: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
    price: "20$",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    subtext: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
    price: "20$",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    subtext: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
    price: "20$",
  },
];


const OutGoingExchange = ({ navigation }) => {


  return (

    <SafeAreaView style={styles.container}>
               <CustomHeader
          headerlabel={'Out going Exchanges'}
          iconPress={() => {
            navigation.goBack();a
          }}
          icon={'chevron-back'}
        />
<View style={{flex:1}}>
<FlatList
          data={DATA}
          renderItem={({ item }) => (
            <ExcahangeCard
            image={appImages.dogIcon}
            maintext={'Item Name'}
            subtext={'username want to exchange with item name'}
            pricetext={'78$'}
            />
          )}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
</View>


    </SafeAreaView>
  )
};

export default OutGoingExchange;