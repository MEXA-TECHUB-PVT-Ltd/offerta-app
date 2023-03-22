////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

////////////LISTING LIKES//////////
export const post_Like_Listings = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.post(BASE_URL + "like.php", {
    user_id: user_id,
    listing_id: props,
  });
};
////////////LISTING UNLIKES//////////
export const post_UnLike_Listings = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.post(BASE_URL + "disLike.php", {
    user_id: user_id,
    listing_id: props,
  });
};
////////////LISTING VIEWS//////////
export const post_Views_Listings = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.post(BASE_URL + "ViewList.php", {
    user_id: user_id,
    listing_id: props,
  });
};

////////////LISTING Comments//////////
export const post_Comments_Listings = async (listing_id, description) => {
  var user_id = await AsyncStorage.getItem("Userid");

  return axios.post(BASE_URL + "commentOnList.php", {
    user_id: user_id,
    listing_id: listing_id,
    comment: description,
  });
};

/////////////////////Exchange Offer////////////
export const post_Listings_Exchange_Offer = async (props) => {
  return axios.post(BASE_URL + "createExchange.php", {
    user_id: props.myuser_id,
    second_user: props.otheruser_id,
    item: props.my_item_id,
    item2: props.other_item_id,
  });
};

/////////////////////Price Offer////////////
export const post_Listings_Price_Offer = async (
  other_user,
  other_listings,
  offer_price
) => {
  var user_id = await AsyncStorage.getItem("Userid");

  return axios.post(BASE_URL + "createOffer.php", {
    user_id: user_id,
    sale_by: other_user,
    listing_id: other_listings,
    price: offer_price,
  });
};

///////////////////User Functions////////////
//-------------->Follow Users
export const post_Follow_Users = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");

  return axios.post(BASE_URL + "follow.php", {
    user_id: user_id,
    following_id: props,
  });
};
//-------------->UnFollow Users
export const post_UnFollow_Users = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");

  return axios.post(BASE_URL + "unfollow.php", {
    user_id: user_id,
    following_id: props,
  });
};
