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

///////////////COUNTER_OFFER Accept/Reject///////////////////////////
export const counter_offer_Accept_OR_Reject = async (oferid, status) => {
  return axios.put(BASE_URL + "AcceptRejectCounterOffer.php", {
    id: oferid,
    status: status,
  });
};

////////////////////// Exchange_Offer Accept/Reject ///////////////////////////////
export const update_exchange_offer = async (data) => {
  return axios.put(BASE_URL + "updateExchange.php", data);
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

export const add_User_Stripe_Credentials = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.post(BASE_URL + "stripCredentials.php", {
    user_id: user_id,
    private_key:
      "sk_test_51K7Ok1SImwf7DA0fmyPO4NOhzT8h6MzeD8vDpt8PtXFpBim1ed711h2fpOeytQSZOpVmRgxwkb8ISccAB45BY9IB00ZxorWl3g",
    public_key:
      "pk_test_51K7Ok1SImwf7DA0foroMnlRi3yVyjTPI9E5DrhxorvxQuGPF7yB2WU5FnwoFubbeqDQQT40hnsuVbZf6qVhSKauJ00cY5UgqbF",
  });
};

export const checkout = async (data) => {
  console.log("data passed to checkout api : ", data);
  return axios.post(BASE_URL + "checkOut.php", data);
};
