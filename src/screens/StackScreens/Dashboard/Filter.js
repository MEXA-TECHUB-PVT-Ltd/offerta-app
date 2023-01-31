import React, { useEffect, useState,useRef } from 'react';
import {
  SafeAreaView,ScrollView,Image,
 View, Text, TouchableOpacity,
} from 'react-native';

//////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomTextInput from '../../../components/TextInput/CustomTextInput';

//////////////////app dropdown////////////////
import Categories from '../../../components/Dropdowns/Categories';
import ProductCondition from '../../../components/Dropdowns/ProductCondition';

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setCategoryName,} from "../../../redux/actions";

/////////////app styles////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////app images/////////////////////
import { appImages } from '../../../constant/images';

const Filter = ({ navigation,route }) => {

    /////////////redux states///////
    const {
      category_name,
      product_condition,
    } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    ////////Bottom sheet references/////////
    const refddRBSheet = useRef();
    const refproductcondionddRBSheet = useRef();

      ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

///////////////data states////////////////////
const [listing_distance,  setListing_Distance] = React.useState();
const [listing_price, setListing_Price] = React.useState();

  return (

    <SafeAreaView style={styles.container}>
                    <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
 
               <CustomHeader
          headerlabel={'Apply Filters'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'arrow-back'}
        />


<View>
            <CustomTextInput
              type={"withouticoninput"}
              texterror={"invalid"}
              term={listing_distance}
              placeholder="Enter distance"
              onTermChange={(distance) => setListing_Distance(distance)}
            />
            <CustomTextInput
              type={"withouticoninput"}
              term={listing_price}
              placeholder="Enter Price"
              onTermChange={(price) => setListing_Price(price)}
            />
          <TouchableOpacity onPress={() => refddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={category_name}
              editable={false}
              disable={false}
              placeholder="Select Category"
              onTermChange={(category) => setCategoryName(category)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => refproductcondionddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={category_name}
              editable={false}
              disable={false}
              placeholder="Posted within"
              onTermChange={(category) => setCategoryName(category)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => refddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={category_name}
              editable={false}
              disable={false}
              placeholder="Sort by"
              onTermChange={(category) => setCategoryName(category)}
            />
          </TouchableOpacity>
          <View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={"UPLOAD"}
            widthset={80}
            topDistance={10}
            loading={loading}
            disabled={disable}
            onPress={() => {navigation.navigate('FilterListings')
            }}
          />
        </View>
          </View>
          <Categories
          refRBSheet={refddRBSheet}
          onClose={() => refddRBSheet.current.close()}
        />
        <ProductCondition
          refRBSheet={refproductcondionddRBSheet}
          onClose={() => refproductcondionddRBSheet.current.close()}
          type={"PostedRange"}
          
        />
   </ScrollView>
    </SafeAreaView>
  )
};

export default Filter;