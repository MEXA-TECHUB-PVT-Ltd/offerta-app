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

const TermsCondition = ({ navigation,route }) => {

  /////////////main menu status states/////////////
  const [termsAndConditions, settermsAndConditions] = useState('');
  const GettermsAndConditions = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'api/termsAndConditions/alltermsAndConditionss',
    })
      .then(async function (response) {
        settermsAndConditions(response.data);
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
          headerlabel={'Terms & Conditions'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'arrow-back'}
        />

<View style={styles.textview}>

    <Text style={styles.text}>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
     sed diam nonumy eirmod tempor invidunt ut labore et dolore
      magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
      justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata 
      sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur 
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
       aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut 
        labore et dolore magna aliquyam erat, sed diam voluptua. At vero
    </Text>
</View>

   </ScrollView>
    </SafeAreaView>
  )
};

export default TermsCondition;