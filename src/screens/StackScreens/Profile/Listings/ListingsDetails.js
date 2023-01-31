import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";

////////////////////app components//////////////
import DescriptionBottomSheet from "../../../../components/CustomBottomSheet/DescriptionBTS";

///////////////app icons////////////
import Icon from "react-native-vector-icons/Ionicons";

/////////////////app components/////////
import Slider from "../../../../components/ImageSlider/Slider";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setName, setAge } from "../../../../redux/actions";

////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

/////////////////////app styles////////////
import styles from "./styles";
import Colors from "../../../../utills/Colors";

/////////////////app images///////////
import { appImages } from "../../../../constant/images";

const options = [
  { id:'1',label: 'View Profile', icon:'eye'},
  {id:'2',label: 'View Profile', icon:'eye' },
  {id:'3',label: 'View Profile', icon:'eye' },
];

const ListingsDetails = ({ navigation }) => {

    //camera and imagepicker
    const refRBSheet = useRef();

  const { name, age } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  /////////////main menu status states/////////////
  const [Orders, setOrders] = useState("");
  const GetOrders = async () => {
    var user = await AsyncStorage.getItem("Userid");
    axios({
      method: "GET",
      url: BASE_URL + "api/Order/getGuestOrdersByTime/" + user,
    })
      .then(async function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {}, []);

  const SliderImages = [
    { image: require("../../../../assets/images/img.png") },
    { image: appImages.AddIcon },
    { image: appImages.BagsIcon },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <StatusBar backgroundColor={"black"} barStyle="light-content" />
        <Slider 
        imagearray={SliderImages} 
        menuitem1={"View Profile"}
        menuitem1onpress={()=>{{navigation.navigate("OtherProfile")}}}
        menuitem2={"Report Item"}
        menuitem2onpress={()=>{{refRBSheet.current.open()}}}
        menuitem3={"Make an Offer"}
        menuitem4={"Request exchange"}
        type={'promote'}
        menuoptions={options}
        />

        <View style={{ marginTop: hp(5), marginHorizontal: wp(7) }}>
          <Text style={styles.maintext}>Item Name</Text>
        </View>

        <View style={styles.iconview}>
          <Icon
            name={"chatbox-sharp"}
            size={20}
            color={Colors.activetextinput}
            style={{ marginRight: wp(3) }}
            onPress={() => {
              {
                navigation.navigate('CommentsDetails')
              }
            }}
          />
          <Text style={styles.icontext}>234 comments</Text>
          <Icon
            name={"chevron-forward-sharp"}
            size={15}
            color={Colors.Appthemecolor}
            style={{ marginLeft: wp(3) }}
            onPress={() => {
              {
                navigation.navigate('CommentsDetails')
              }
            }}
          />
        </View>

        <View style={styles.iconview}>
          <Icon
            name={"heart"}
            size={20}
            color={Colors.activetextinput}
            style={{ marginRight: wp(3) }}
            onPress={() => {
              {
              }
            }}
          />
          <Text style={styles.icontext}>234 Likes</Text>
        </View>
        <View style={styles.iconview}>
          <Icon
            name={"eye"}
            size={20}
            color={Colors.activetextinput}
            style={{ marginRight: wp(3) }}
            onPress={() => {
              {
              }
            }}
          />
          <Text style={styles.icontext}>234 Views</Text>
        </View>
        <View style={{ paddingHorizontal: wp(7) }}>
          <Text style={styles.subtext}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </Text>
        </View>

        <View style={{ paddingHorizontal: wp(7), marginTop: hp(2) }}>
          <View style={styles.rowtextview}>
            <Text style={styles.rowlefttext}>Category</Text>
            <Text style={styles.rowrighttext}>Category name</Text>
          </View>
          <View style={styles.rowtextview}>
            <Text style={styles.rowlefttext}>Product Condition</Text>
            <Text style={styles.rowrighttext}>Lightly used</Text>
          </View>
          <View style={styles.rowtextview}>
            <Text style={styles.rowlefttext}>Date of Listing</Text>
            <Text style={styles.rowrighttext}>00/00/0000</Text>
          </View>
          <View style={styles.rowtextview}>
            <Text style={styles.rowlefttext}>Location</Text>
            <Text style={styles.rowrighttext}>St. Robert, MO 65584-5678.</Text>
          </View>
          <View style={styles.rowtextview}>
            <Text style={styles.rowlefttext}>Shipping Cost</Text>
            <Text style={styles.rowrighttext}>22$</Text>
          </View>
          <View style={styles.rowtextview}>
            <Text style={styles.rowlefttext}>YouTube Link</Text>
            <Text style={styles.rowrighttext}>Youtube link here</Text>
          </View>
        </View>
        <View style={styles.locationview}>
        <Icon
            name={"location"}
            size={20}
            color={Colors.activetextinput}
            style={{ marginRight: wp(2) }}
          />
        <Text style={styles.locationtext}>1234 NW Bobcat Lane St. Robert, MO 65584-5678.</Text>
        </View>
        <View style={{marginTop:hp(3)}}>
        <Text style={styles.locationtext}>1234 NW Bobcat Lane St. Robert, MO 65584-5678.</Text>
        </View>
        <View style={styles.btnView}>
    <TouchableOpacity style={styles.btn} 
    onPress={()=> navigation.navigate('Insights')}
    >
        <Text style={styles.btnText}>VIEW INSIGHTS</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn}
     onPress={()=> navigation.navigate('Promote')}
    >
        <Text style={styles.btnText}>PROMOTE</Text>
    </TouchableOpacity>
</View>
      </ScrollView>
      <DescriptionBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={"Report Item"}
        subtitle={"Enter Description"}
        btntext={"REPORT"}
        onpress={()=>{{}}}
      />
    </SafeAreaView>
  );
};

export default ListingsDetails;
