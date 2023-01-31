////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

//////////////Get Specific User //////////
export const get_AllUsers = async () => {
  return axios.get(BASE_URL + "getAllUser.php");
};

//////////////Get Specific User //////////
export const get_Login_UserData = async () => {
  var user_id=await AsyncStorage.getItem("Userid")
  return axios.get(BASE_URL + "getUserById.php?user_id=" + user_id);
};

//////////////Specific User Listings//////////
export const GetUserListings = async () => {
  var user_id=await AsyncStorage.getItem("Userid")
  return axios.get(BASE_URL + "allProduct.php?user_id="+user_id);
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
  return axios.get(BASE_URL + "getListByCategoryId.php?id="+ props);
};

////////////////GET LISTINGS DETAILS//////////
export const GetListingsDetails = async (props) => {
  return axios.get(BASE_URL + "getListById.php?id=" + props);
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
export const GetListingViews = async (props) => {
  return axios.get(BASE_URL + "getViewsOnList.php?id=" + props);
};

/////////////////LISTING SEARCH////////////
export const get_Listing_Search = async (props) => {
  return axios.get(BASE_URL + "search.php?search=" + props);
};

