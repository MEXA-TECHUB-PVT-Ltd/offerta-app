////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

////////////LISTING LIKES//////////
export const offer_Accept_Reject_Listings = async (oferid, status) => {
  return axios.put(BASE_URL + "AcceptRejectOffer.php", {
    id: oferid,
    status: status,
  });
};
////////////LISTING UNLIKES//////////
export const offer_Reject_Listings = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.post(BASE_URL + "disLike.php", {
    user_id: user_id,
    listing_id: props,
  });
};

////////////LISTING UNLIKES//////////
export const create_order_Listings = async (
  listing_user,
  listing_id,
  shipping_id
) => {
  var user_id = await AsyncStorage.getItem("Userid");

  return axios.post(BASE_URL + "createOrder.php", {
    sale_by: listing_user,
    order_by: user_id,
    listing_id: listing_id,
    shipping_id: shipping_id,
  });
};
