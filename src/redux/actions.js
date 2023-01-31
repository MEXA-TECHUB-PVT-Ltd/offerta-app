//////////////User Info/////////////////
export const SET_USER_NAME = "SET_USER_NAME";

export const setName = (name) => (dispatch) => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};
//////////////User Email/////////////////
export const SET_USER_Email = "SET_USER_Email";

export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: SET_USER_Email,
    payload: email,
  });
};
//////////////////////images Info//////////////////
export const SET_USER_IMAGE = "SET_USER_IMAGE";

export const setUserImage = (user_image) => (dispatch) => {
  dispatch({
    type: SET_USER_IMAGE,
    payload: user_image,
  });
};

/////////////////Set Item Images array/////////////
export const SET_ITEM_IMAGES_ARRAY = "SET_ITEM_IMAGES_ARRAY";
export const setItemImagesArray = (item_images_array) => ({
  type: 'SET_ITEM_IMAGES_ARRAY',
  payload: item_images_array
});

//////////////////DROPDOWNS//////////////////
//-------------->/Categories
export const SET_CATEGORY_NAME = "SET_CATEGORY_NAME";
export const SET_CATEGORY_ID = "SET_CATEGORY_ID";

export const setCategoryName = (category_name) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_NAME,
    payload: category_name,
  });
};
export const setCategoryId = (category_id) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_ID,
    payload: category_id,
  });
};
//-------------->/Categories
export const SET_SUB_CATEGORY_NAME = "SET_SUB_CATEGORY_NAME";
export const SET_SUB_CATEGORY_ID = "SET_SUB_CATEGORY_ID";

export const setSubCategoryName = (sub_category_name) => (dispatch) => {
  dispatch({
    type: SET_SUB_CATEGORY_NAME,
    payload: sub_category_name,
  });
};
export const setSubCategoryId = (sub_category_id) => (dispatch) => {
  dispatch({
    type: SET_SUB_CATEGORY_ID,
    payload: sub_category_id,
  });
};

//-------------->/Product Condition
export const SET_PRODUCT_CONDITION = "SET_PRODUCT_CONDITION";

export const setProductCondition = (product_condition) => (dispatch) => {
  dispatch({
    type: SET_PRODUCT_CONDITION,
    payload: product_condition,
  });
};

////////////////////LISTINGS ID///////////
export const SET_LISTING_ID = "SET_LISTING_ID";

export const setListingId = (listing_id) => (dispatch) => {
  dispatch({
    type: SET_LISTING_ID,
    payload: listing_id,
  });
};


////////////////////Exchange OFFER ON LISTINGS///////////
export const SET_EXCHANGE_OTHER_LISTING = "SET_EXCHANGE_OTHER_LISTING";

export const setExchangeOffer_OtherListing = (exchange_other_listing) => (dispatch) => {
  dispatch({
    type: SET_EXCHANGE_OTHER_LISTING,
    payload: exchange_other_listing,
  });
};

export const SET_EXCHANGE_MY_LISTING = "SET_EXCHANGE_MY_LISTING";

export const setExchangeOffer_MyListing = (exchange_my_listing) => (dispatch) => {
  dispatch({
    type: SET_EXCHANGE_MY_LISTING,
    payload: exchange_my_listing,
  });
};

//////////////////////////Offers data//////////////
//---------------->Exchange Offer
export const SET_Exchange_OFFER= "SET_Exchange_OFFER";

export const setExchangeOffer = (price_offer) => (dispatch) => {
  dispatch({
    type: SET_PRICE_OFFER,
    payload: price_offer,
  });
};

//---------------->Price Offer
export const SET_PRICE_OFFER= "SET_PRICE_OFFER";

export const setPriceOffer = (price_offer) => (dispatch) => {
  dispatch({
    type: SET_PRICE_OFFER,
    payload: price_offer,
  });
};
