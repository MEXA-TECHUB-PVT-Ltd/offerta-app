////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

//////////////Get ALL Users //////////
export const get_AllUsers = async () => {
  return axios.get(BASE_URL + "getAllUser.php");
};

//////////////Get Specific User //////////
export const get_Login_UserData = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "getUserById.php?user_id=" + user_id);
};
//////////////Get Specific User //////////
export const get_Other_UserData = async (props) => {
  console.log(":here id user:", props);
  return axios.get(BASE_URL + "getUserById.php?user_id=" + props);
};
/////////////////User Data/////////////
//----------------> User follwers
export const get_Login_User_Followers = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "totalFollower.php?user_id=" + user_id);
};
//----------------> User follwers List
export const get_Login_User_Followers_List = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "getFollower.php?user_id=" + user_id);
};
//----------------> User follwings
export const get_Login_User_Followings = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "totalFollowing.php?user_id=" + user_id);
};
//----------------> User follwers List
export const get_Login_User_Followings_List = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "getFollowing.php?user_id=" + user_id);
};

//////////////Specific User Listings//////////
export const get_User_Listings = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "allProduct.php?user_id=" + user_id);
};

////////////////////CATEGORIES/////////////////
//----------->GET CATEGORIES
export const GetCategories = async () => {
  return axios.get(BASE_URL + "getAllCategory.php");
};

//------------>GET SUB CATEGORIES
export const GetSubCategories = async () => {
  return axios.get(BASE_URL + "getAllSubCategories.php");
};
//----------->GET CATEGORIES LISTINGS
export const get_Categories_Listings = async (props) => {
  return axios.get(BASE_URL + "getListByCategoryId.php?id=" + props);
};
//----------->GET CATEGORIES LISTINGS BY LOCATION
export const get_Categories_Listings_By_Location = async (
  props,
  cur_lat,
  cur_lng
) => {
  return axios.get(
    BASE_URL +
      "getListbyCatLocation.php?id=" +
      props +
      "&lat=" +
      cur_lat +
      "&lng=" +
      cur_lng
  );
};

////////////////GET LISTINGS DETAILS//////////
export const GetListingsDetails = async (props) => {
  return axios.get(BASE_URL + "getListById.php?id=" + props);
};

//////////////////user liked listings//////////////
export const get_User_Liked_Listings = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "getLikeListByUser.php?user_id=" + user_id);
};

////////////LISTING COMMENTS//////////
export const GetComments = async (props) => {
  return axios.get(BASE_URL + "getCommentOnList.php?listing_id=" + props);
};

////////////LISTING LIKES//////////
export const GetLikes = async (props) => {
  return axios.get(BASE_URL + "totalLikes.php?listing_id=" + props);
};
////////////LISTING VIEWS//////////
export const get_User_Listing = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "allProduct.php?user_id=" + user_id);
};

////////////LISTING VIEWS//////////
export const GetListingViews = async (props) => {
  return axios.get(BASE_URL + "getViewsOnList.php?id=" + props);
};

/////////////////LISTING SEARCH////////////
export const get_Listing_Search = async (props) => {
  return axios.get(BASE_URL + "search.php?search=" + props);
};

///////////PROMOTIONS////////////
export const get_Listing_Promotion_Features = async () => {
  return axios.get(BASE_URL + "getAllFeature.php");
};
export const get_Urgent_Promotion_List = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "getPromotionsUrgent.php?user_id=" + user_id);
};
export const get_Advertisement_Promotion_List = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "getPromotionAdv.php?user_id=" + user_id);
};
export const get_Expired_Promotion_List = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(
    BASE_URL + "getExpairepromotion.php?user_id=1"
  // + user_id
  );
};
///////////////////Notification/////////////
export const get_Notifications = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "getnotifications.php?user_id=" + user_id);
};

////////////////////////get banners////////////
export const get_Banners = async (props) => {
  return axios.get(BASE_URL + "getActiveBanner.php");
};
