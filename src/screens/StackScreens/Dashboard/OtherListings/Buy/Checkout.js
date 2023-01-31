import React, { useEffect, useState,useRef } from 'react';
import {
  SafeAreaView,ScrollView,Image,
 View, Text, TouchableOpacity,
} from 'react-native';

//////////////////app components///////////////
import CustomHeader from '../../../../../components/Header/CustomHeader';
import CustomButtonhere from '../../../../../components/Button/CustomButton';
import CustomTextInput from '../../../../../components/TextInput/CustomTextInput';

/////////////app styles////////////////
import styles from './styles';
import Colors from '../../../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import { BASE_URL } from '../../../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////app images/////////////////////
import { appImages } from '../../../../../constant/images';

const Checkout = ({ navigation,route }) => {

  //timelinestates
  const [address, setAddress] = React.useState(true);

  useEffect(() => {
  }, []);
  return (

    <SafeAreaView style={styles.container}>
                    <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
               <CustomHeader
          headerlabel={'Buy'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'arrow-back'}
        />

<View style={[styles.timelineflex, {
        marginLeft:wp(0),

      }]}>
        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal:wp(8)
        }}>
              <View style= {styles.timelineinnerview}>
              </View>

          <View style={[styles.filedtimeline,{width:wp(36)}]}></View>
    <View style= {styles.timelineinnerview}>
              </View>
          <View style={[styles.timeline,{width:wp(37.6)}]}></View>
        </View>
        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          marginHorizontal:wp('2%'),
          //backgroundColor: 'red'
        }}>

        </View>
      </View>
      <View style={{alignItems:'center',justifyContent:'center',marginVertical:hp(2)}}>
        <Text style={styles.timelinetext}>Checkout</Text>
      </View>

<View style={{marginBottom:hp(15)}}>
<CustomButtonhere
            title={"NEXT"}
            widthset={80}
            topDistance={10}
            onPress={() => {
              navigation.navigate("CardDetails");
            }}
          />
</View>
   </ScrollView>
    </SafeAreaView>
  )
};

export default Checkout;