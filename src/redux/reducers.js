import {
  ///////////////User//////////////
  SET_USER_NAME,
  SET_USER_IMAGE,
  SET_USER_Email,

  /////////////////Set Item Images array/////////////
  SET_ITEM_IMAGES_ARRAY,

  //////////DROPDOWNS///////////
  //----------->Category
  SET_CATEGORY_NAME,
  SET_CATEGORY_ID,
  //----------->Sub Category
  SET_SUB_CATEGORY_NAME,
  SET_SUB_CATEGORY_ID,
  //----------->Product Condition
  SET_PRODUCT_CONDITION,

  //////////LISTING ID/////////
  SET_LISTING_ID,

  ////////////////////Exchange OFFER ON LISTINGS///////////
  SET_EXCHANGE_MY_LISTING,
  SET_EXCHANGE_OTHER_LISTING,

  ////////////////////OFFER//////////
  //---------------> Price Offer
  SET_PRICE_OFFER,
} from "./actions";

const initialState = {
  ////////////////\USER////////////
  name: "",
  user_image: "",
  email: "",

  /////////////////Set Item Images array/////////////
  item_images_array: [],

  //////////DROPDOWNS///////////
  //-------->Category
  category_name: "",
  category_id: "",
  //-------->Sub Category
  sub_category_name: "",
  sub_category_id: "",
  //-------->Product Condition
  product_condition: "",

  ////////LISTING ID////////
  listing_id: "",

  ////////////////////Exchange OFFER ON LISTINGS///////////
  exchange_other_listing: "",
  exchange_my_listing: "",
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    ////////////////users/////////////
    case SET_USER_NAME:
      return { ...state, name: action.payload };
    case SET_USER_IMAGE:
      return { ...state, user_image: action.payload };
    case SET_USER_Email:
      return { ...state, user_email: action.payload };

    /////////////////Set Item Images array/////////////
    case SET_ITEM_IMAGES_ARRAY:
      return { ...state, item_images_array: action.payload };

    //////////DROPDOWNS///////////
    //----------->Category
    case SET_CATEGORY_ID:
      return { ...state, category_id: action.payload };
    case SET_CATEGORY_NAME:
      return { ...state, category_name: action.payload };
    //----------->Sub Category
    case SET_SUB_CATEGORY_ID:
      return { ...state, sub_category_id: action.payload };
    case SET_SUB_CATEGORY_NAME:
      return { ...state, sub_category_name: action.payload };
    //-------->Product Condition
    case SET_PRODUCT_CONDITION:
      return { ...state, product_condition: action.payload };

    ///////////////////LISTING ID/////////
    case SET_LISTING_ID:
      return { ...state, listing_id: action.payload };

    ////////////////////Exchange OFFER ON LISTINGS///////////
    case SET_EXCHANGE_MY_LISTING:
      return { ...state, exchange_my_listing: action.payload };
    case SET_EXCHANGE_OTHER_LISTING:
      return { ...state, exchange_other_listing: action.payload };

    default:
      return state;
  }
}

export default userReducer;
