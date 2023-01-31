////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";


////////////LISTING LIKES//////////
export const post_Like_Listings = async (props) => {
    var user_id=await AsyncStorage.getItem("Userid")
    return axios.post(BASE_URL+'like.php', {
        user_id: user_id,
        listing_id: props,
    })
}
////////////LISTING UNLIKES//////////
export const post_UnLike_Listings = async (props) => {
    var user_id=await AsyncStorage.getItem("Userid")
    return axios.post(BASE_URL+'disLike.php', {
        user_id: user_id,
        listing_id: props,
    })
}
////////////LISTING VIEWS//////////
export const post_Views_Listings = async (props) => {
    var user_id=await AsyncStorage.getItem("Userid")
    return axios.post(BASE_URL+'ViewList.php', {
        user_id: user_id,
        listing_id: props,
    })
}

/////////////////////Exchange Offer////////////
export const post_Listings_Exchange_Offer = async (props) => {
    return axios.post(BASE_URL+'createExchange.php', {
        user_id: props.myuser_id,
        second_user:props.otheruser_id,
        item: props.my_item_id,
        item2:props.other_item_id
    })
}

/////////////////////Price Offer////////////
export const post_Listings_Price_Offer = async (props) => {
    var user_id=await AsyncStorage.getItem("Userid")
    console.log("here props:",user_id,props)
    return axios.post(BASE_URL+'createOffer.php', {
        user_id:user_id,
        sale_by:props.otheruser_id,
        listing_id:props.other_item_id,
        price:props.item_offerprice
    })
}
