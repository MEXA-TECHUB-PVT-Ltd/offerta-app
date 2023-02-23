
////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

//////////////Get ALL Users //////////
export const get_Sales = async () => {
  var user_id=await AsyncStorage.getItem("Userid")
  return axios.get(BASE_URL + "mySale.php?user_id="+user_id);
};

//////////////Get Specific User //////////
export const get_Orders = async () => {
  var user_id=await AsyncStorage.getItem("Userid")
  return axios.get(BASE_URL + "myOrder.php?user_id=" + user_id);
};

//////////////Get ALL Users //////////
export const get_Urgent_Promotions = async () => {
  return axios.get(BASE_URL + "getUrgentConfiguration.php");
};

//////////////Get Specific User //////////
export const get_Advertisement_Promotions = async () => {
  return axios.get(BASE_URL + "getAllAdDetail.php");
};

////////////LISTING Promotion Creation//////////
export const post_Promotions = async (list_id,promotion_type,promotion_id) => {
  var user_id=await AsyncStorage.getItem("Userid")
  return axios.post(BASE_URL+'createPromotion.php', {
    user_id:user_id,
    listing_id:list_id,
    type:promotion_type,
    promotion_type_id:promotion_id
  })
}

//////////////Get Listings Insights//////////
export const get_Listings_Insights = async (props) => {
  return axios.get(BASE_URL + "insightOnList.php?listing_id="+props
  );
};



