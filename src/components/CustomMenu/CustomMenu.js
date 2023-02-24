import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";

/////////////react navigation////////////
import { useNavigation } from '@react-navigation/native';

/////////////app components////////////////
import CustomModal from "../Modal/CustomModal";

///////////////APP HEIGTH AND WIDTH///////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

/////////////app icons/////////////////////
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../utills/Colors";

////////////////app fonts//////////
import { fontFamily } from "../../constant/fonts";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setExchangeOffer_MyListing } from "../../../../redux/actions";

//////////////////API FUNCTION///////////
import axios from "axios";
import { BASE_URL } from "../../utills/ApiRootUrl";

/////////////app images/////////////
import { appImages } from "../../constant/images";

const CustomMenu = (props) => {
  /////////////navigation state////////////
  const navigation = useNavigation();

      ////////////////redux/////////////
      const { listing_id} = useSelector(
        (state) => state.userReducer
      );
      const dispatch = useDispatch();
  //////////////modal states/////////////
  const [modalVisible, setModalVisible] = React.useState(false);
  const [msgmodalVisible, setMsgModalVisible] = React.useState(false);

  //////////////delete/////////////
  const delete_Listing=()=>{

var data = JSON.stringify({
  id: listing_id
});

var config = {
  method: 'delete',
maxBodyLength: Infinity,
  url: BASE_URL+'deleteList.php',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  setMsgModalVisible(false);
  navigation.navigate("Listings")
})
.catch(function (error) {
  console.log(error);
});
  }
//////////////delete/////////////
const mark_Status_Listing=()=>{
  var data = JSON.stringify({
    list_id: listing_id
  });
  
  var config = {
    method: 'post',
  maxBodyLength: Infinity,
    url: BASE_URL+'markAsSold.php',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    navigation.navigate("Listings")
  })
  .catch(function (error) {
    console.log(error);
  });
}
  return (
    <View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        animationType="slide"
        transparent={true}
      >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: wp(3.5),
              paddingVertical: hp(4),
              borderRadius: wp(5),
              width: wp(50),
              marginRight: wp(5),
              marginTop: hp(2),
            }}
          >
            <FlatList
              data={props.menudata}
              renderItem={({ item, index }) => {
                const isEnd = index === props.menudata.length - 1;
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => 
                        { 
                       
                      item.label === "View Profile"?
                      navigation.navigate("OtherProfile"):
                          item.label === 'Make an Offer'?
                          navigation.navigate("PriceOffer"):
                          item.label === 'Request Exchange'?
                          navigation.navigate("ExchangeOfferList"):
                          item.label === 'Edit Item'?
                          navigation.navigate("EditList",{navtype:"edit_list"}):
                          item.label === 'Mark as Sold'?
                          mark_Status_Listing():
                          item.label === 'Delete'?
                          setMsgModalVisible(true)
                       :
                          null
                          setModalVisible(false)
                        }
                      }
                      style={{ flexDirection: "row" }}
                    >
                      <MaterialCommunityIcons
                        name={item.icon}
                        color={Colors.appgreycolor}
                        size={20}
                      />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontFamily: fontFamily.Poppins_Regular,
                          fontSize: hp(1.8),
                          color: Colors.Appthemecolor,
                        }}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                    {isEnd ? (
                      <View></View>
                    ) : (
                      <View
                        style={{
                          borderWidth: 0.5,
                          borderColor: "rgba(112,112,112,0.3)",
                          marginVertical: hp(1.3),
                          width: wp(38),
                          alignSelf: "center",
                        }}
                      ></View>
                    )}
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
            </TouchableWithoutFeedback>
    
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons
          name={"dots-vertical"}
          color={"#404040"}
          size={22}
          onPress={() => setModalVisible(true)}
        />
      </TouchableOpacity>
      <CustomModal
        modalVisible={msgmodalVisible}
        CloseModal={() => setMsgModalVisible(false)}
        Icon={appImages.confirm}
        text={"Confirmation"}
        type={"confirmation"}
        subtext={"Do you really want to Delete the listings?"}
        buttontext={"Yes"}
        buttontext1={"Cancel"}
        onPress={() => {
          setMsgModalVisible(false);
        }}
        onPress1={() => {
          delete_Listing();
        }}
      />
    </View>
  );
};

export default CustomMenu;