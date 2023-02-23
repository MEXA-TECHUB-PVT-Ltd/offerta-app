import React, { useEffect, useState,useRef } from 'react';
import {
  SafeAreaView,ScrollView,Image,
 View, Text, TouchableOpacity,FlatList
} from 'react-native';

////////navigation////////////////
import { useIsFocused } from '@react-navigation/native';

//////////////////app components///////////////
import CustomHeader from '../../../../../components/Header/CustomHeader';
import CustomButtonhere from '../../../../../components/Button/CustomButton';
import CustomTextInput from '../../../../../components/TextInput/CustomTextInput';
import ShippingAddressCard from '../../../../../components/CustomCards/ShippingAddressCard';
import NoDataFound from '../../../../../components/NoDataFound/NoDataFound';

////////////////country picker package/////////////
import CountryPicker from 'react-native-country-picker-modal'

/////////////app styles////////////////
import styles from './styles';
import Colors from '../../../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import { BASE_URL } from '../../../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

//////////////api function//////////
import { get_Shipping_Address } from "../../../../../api/ShippingAddress";

////////////////redux//////////////
import { setOrderShippingAddress ,setLoginUserShippingAddress} from '../../../../../redux/LoginUserActions';
import { useDispatch,useSelector } from "react-redux";

const ConfirmAddress = ({ navigation,route }) => {

///////////////data states////////////////////
const [cardno,  setCardNo] = React.useState();
const [expirydate, setExpiryDate] = React.useState();
const [cvv, setCvv] = React.useState();
const [country, setCountry] = React.useState();

////////////country picker states/////////////
const [CountryPickerView, setCountryPickerView] = useState(false);
const [countryCode, setCountryCode] = useState('92');
const [countryname, setCountryName] = useState('Pak');

    ////////////////navigation/////////////////
    const isFocused = useIsFocused();

      ////////////////redux/////////////
  const { exchange_other_listing } = useSelector((state) => state.loginuserReducer);
  const dispatch = useDispatch();

    ////////////list state////////////
const[shippinglist,setshippinglist]=useState("")

useEffect(() => {
    if(isFocused){
        get_Shipping_Address().then((response) => {
            console.log("response get here dispatcher", JSON.stringify(response.data))
            if(response.data.msg === "No Result")
            {
              setshippinglist("")
            }
            else{
              setshippinglist(response.data)
            }

            });
    }
  }, [isFocused]);
  return (

    <SafeAreaView style={styles.container}>
                    <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
                              {CountryPickerView == true ? <CountryPicker
          withFilter={true}
          withCallingCode={true}
          withModal={true}
          withFlag={true}
          withFlagButton={true}
          withCountryNameButton={true}

          onSelect={(e) => {
            console.log('country here',e)
            var name = e.name.substring('4')
            setCountryPickerView(false)
            if( e.name==='Antarctica')
            {
              setCountryCode('672')
            }
            if( e.name==='Bouvet Island')
            {
              setCountryCode('55')
            }
            else{
              setCountryCode(JSON.parse(e.callingCode))
            }
            //setCountryFlag(JSON.parse(e.flag))
            //setCountryCode(JSON.parse(e.callingCode))
            setCountryName(e.name)
          }}
          onClose={(e) => {
            setCountryPickerView(false)
          }}
          visible={CountryPickerView}
        /> :
          <View></View>
        }
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
              <View style={ styles.timelineinnerview}>
              </View>
          <View style={[styles.timeline,{width:wp(79)}]}></View>

        </View>
        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          marginHorizontal:wp('2%'),
          //backgroundColor: 'red'
        }}>

        </View>
      </View>
      <View style={{alignItems:'center',justifyContent:'center',marginVertical:hp(0)}}>
        <Text style={styles.timelinetext}>Confirm Address</Text>
      </View>
      {shippinglist===""?
      <View style={{marginBottom:hp(14)}}>
       <NoDataFound icon={"exclamation-thick"} text={"No Address Added, First Add Shipping Address"} />
      <TouchableOpacity 
      style={{backgroundColor:Colors.Appthemecolor,width:wp(50),height:hp(6),alignSelf:'center',alignItems:'center',justifyContent:'center',
    borderRadius:wp(3)
    }}
      onPress={()=>navigation.navigate("ShippingAddress",{navtype:"Buy"})}>
              <Text style={[styles.timelinetext,{color:"white"}]}>Add Address</Text>
      </TouchableOpacity>
      </View>

              :
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
                  type={"Buy"}
                  cardonpress={()=>{    dispatch(setLoginUserShippingAddress(item))
                    }}
                    onpress={()=>{    dispatch(setLoginUserShippingAddress(item))
                      navigation.navigate("UpdateShippingAddress")
                    }}
                   />
        )}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
      }

{/* <View>
            <CustomTextInput
              type={"withouticoninput"}
              texterror={"invalid"}
              term={cardno}
              placeholder="Enter your nick name"
              onTermChange={(newUsername) => setCardNo(newUsername)}
            />
            <CustomTextInput
              type={"withouticoninput"}
              term={expirydate}
              placeholder="Enter your name"
              onTermChange={(newFname) => setExpiryDate(newFname)}
            />
        
                      <TouchableOpacity
            onPress={() => {
              setCountryPickerView(true)
            }}>
                         <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={countryname}
              editable={false}
              disable={false}
              placeholder="Select Country"
              onTermChange={(newcountry) => setCountryName(newcountry)}
            />
            </TouchableOpacity>
            <CustomTextInput
              type={"withouticoninput"}
              term={cvv}
              placeholder="Enter address 1"
              onTermChange={(newCvv) => setCvv(newCvv)}
            />
                  <CustomTextInput
              type={"withouticoninput"}
              term={cvv}
              placeholder="Enter address 2"
              onTermChange={(newCvv) => setCvv(newCvv)}
            />
            <View style={{flexDirection:'row',marginHorizontal:wp(10),justifyContent:'space-between'}}>
            <CustomTextInput
              type={"iconinput"}
              term={cvv}
              length={'small'}
              placeholder="City"
              onTermChange={(newCvv) => setCvv(newCvv)}
            />
           <CustomTextInput
              type={"iconinput"}
              term={cvv}
              length={'small'}
              width={20}
              placeholder="State"
              onTermChange={(newCvv) => setCvv(newCvv)}
            /> 
            </View>
                         <CustomTextInput
              type={"iconinput"}
              term={cvv}
              placeholder="Enter ZIP code"
              onTermChange={(newCvv) => setCvv(newCvv)}
            />
                         <CustomTextInput
              type={"withouticoninput"}
              term={cvv}
              placeholder="Enter Phone Number"
              onTermChange={(newCvv) => setCvv(newCvv)}
            />
          </View> */}
<View style={{marginBottom:hp(15)}}>
<CustomButtonhere
            title={"NEXT"}
            widthset={80}
            topDistance={10}
            onPress={() => {
              navigation.navigate("Checkout");
            }}
          />
</View>
   </ScrollView>
    </SafeAreaView>
  )
};

export default ConfirmAddress;