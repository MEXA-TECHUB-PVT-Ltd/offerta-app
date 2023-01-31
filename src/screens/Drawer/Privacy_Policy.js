import React, { useEffect, useState,useRef } from 'react';
import {
  SafeAreaView,ScrollView,Image,
 View, Text, TouchableOpacity,
} from 'react-native';

//////////////////app components///////////////
import CustomHeader from '../../components/Header/CustomHeader';

/////////////app styles////////////////
import styles from './Banner/styles';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import { BASE_URL } from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////app images/////////////////////
import { appImages } from '../../constant/images';

const PrivacyTerms = ({ navigation,route }) => {

  /////////////privacyPolicy states/////////////
  const [privacyPolicy, setprivacyPolicy] = useState('');
  const GetprivacyPolicy = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'api/privacyPolicy/allprivacyPolicys',
    })
      .then(async function (response) {
        setprivacyPolicy(response.data);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  useEffect(() => {
  }, []);
  return (

    <SafeAreaView style={styles.container}>
                    <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
               <CustomHeader
          headerlabel={'Privacy Policy'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'arrow-back'}
        />

<View style={styles.textview}>

    <Text style={styles.text}>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut 
    labore et dolore magna aliquyam erat, sed diam voluptua. 
    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
    no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
    magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
    Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
 labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
  rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem 

    </Text>
 <Text style={[styles.text,{marginTop:hp(4),marginBottom:hp(4)}]}>
 What & Why?
  
    </Text>
    <Text style={styles.text}>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore 
    et dolore magna aliquyam erat, sed diam voluptua.
     At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est 
     Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
     tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
      duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore 
magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
 gubergren, no sea takimata sanctus est Lorem
  
    </Text>
</View>

   </ScrollView>
    </SafeAreaView>
  )
};

export default PrivacyTerms;