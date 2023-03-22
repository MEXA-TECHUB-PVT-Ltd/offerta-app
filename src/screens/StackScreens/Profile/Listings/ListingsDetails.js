import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

//////////////map////////////////
import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
  Marker,
  AnimatedRegion,
} from "react-native-maps";

////////////////////app components//////////////
import DescriptionBottomSheet from "../../../../components/CustomBottomSheet/DescriptionBTS";
import Loader from "../../../../components/Loader/Loader";

///////////////app icons////////////
import Icon from "react-native-vector-icons/Ionicons";

/////////////////app components/////////
import Slider from "../../../../components/ImageSlider/Slider";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setListingId } from "../../../../redux/actions";

///////////height and width/////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

/////////////////////app styles////////////
import styles from "./styles";
import Colors from "../../../../utills/Colors";

/////////////////app images///////////
import { appImages } from "../../../../constant/images";

////////////////helper functions/////////////
import {
  GetListingsDetails,
  GetComments,
  GetLikes,
  GetListingViews,
} from "../../../../api/GetApis";
import {
  post_Like_Listings,
  post_UnLike_Listings,
  post_Views_Listings,
} from "../../../../api/PostApis";

////////////menu array/////////////
import { my_listing_options } from "../../../../data/Menulists";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListingsDetails = ({ navigation, route }) => {
  ///////////previous data///////////
  const [predata] = useState(route.params);

  //camera and imagepicker
  const refRBSheet = useRef();

  const { name, age } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ///////////////////loader loading state///////////////
  const [loading, setloading] = useState(true);

  ////////////Listing Checks//////////////
  const [listing_like_user_id, setListing_Like_User_id] = useState("");
  const [listing_views_user_id, setListing_Views_User_id] = useState("");
  //-----------like list
  const listing_like = (props) => {
    post_Like_Listings(props).then((response) => {
      setListing_Like_User_id(response.data.data.user_id);
      likes_count();
    });
  };
  //-----------unlike list
  const listing_unlike = (props) => {
    post_UnLike_Listings(props).then((response) => {
      setListing_Like_User_id(" ");
      likes_count();
    });
  };
  //----------likes count
  const likes_count = () => {
    GetLikes(predata.listing_id).then((response) => {
      if (response.data.msg === "No one liked yet") {
        setListing_Likes_count(0);
      } else {
        setListing_Likes_count(response.data.Total);
        listing_like(predata.listing_id);
      }
    });
  };
  //---------------comments count
  const comments_count = () => {
    GetComments(predata.listing_id).then((response) => {
      setListing_Comments_count(response.data.length);
    });
  };
  //---------------views count
  const views_count = () => {
    GetListingViews(predata.listing_id).then((response) => {
      setListing_Views_count(response.data.total_views);
    });
  };
  //---------------views post
  const listing_views = () => {
    post_Views_Listings(predata.listing_id).then((response) => {
      setListing_Views_User_id(response.data.data.user_id);
      views_count();
    });
  };

  /////////////Listing Detail states/////////////
  const [listing_id, setListing_Id] = useState();
  const [listing_user_id, setListing_User_Id] = useState();
  const [listing_images, setListing_Images] = useState([]);
  const [listing_item_title, setListing_Item_Title] = useState("");
  const [listing_item_price, setListing_Item_Price] = useState("");
  const [listing_comments_count, setListing_Comments_count] = useState();
  const [listing_likes_count, setListing_Likes_count] = useState();
  const [listing_views_count, setListing_Views_count] = useState();
  const [listing_details, setListing_Details] = useState();
  const [listing_category, setListing_Category] = useState();
  const [listing_subcategory, setListing_SubCategory] = useState();
  const [listing_condition, setListing_Condition] = useState();
  const [listing_date, setListing_Date] = useState();
  const [listing_location, setListing_Location] = useState();
  const [listing_shippingcost, setListing_ShippingCost] = useState();
  const [listing_youtubelink, setListing_YoutubeLink] = useState();
  const [listingLat, setListingLat] = useState();
  const [listingLng, setListingLng] = useState();

  const [listingImages, setListingImages] = useState([]);

  //-----------------> listings checks
  const [exchange_status, setExchnage_Status] = useState();
  const [fixed_price_status, setFixedPrice_Status] = useState();
  const [giveaway_status, setGiveaway_Status] = useState();

  const GetListData = async () => {
    GetListingsDetails(predata.listing_id)
      .then((response) => {
        setListing_Id(response.data.id);
        setListing_User_Id(response.data.user_id);
        setListing_Images(response.data.images);
        setListing_Item_Price(response.data.price);
        setListing_Item_Title(response.data.title);
        setListing_Details(response.data.description);
        //setListing_Category(response.data.category.category_name);
        //setListing_SubCategory(response.data.subcategory.sub_category_name);
        setListing_Condition(response.data.product_condition);
        getuser();
        //////////date//////////
        const year =
          response.data.created_at === ""
            ? null
            : response.data.created_at.substring(0, 4);
        const month =
          response.data.created_at === ""
            ? null
            : response.data.created_at.substring(5, 7);
        const day =
          response.data.created_at === ""
            ? null
            : response.data.created_at.substring(8, 10);
        const formattedDate = `${day}/${month}/${year}`;
        setListing_Date(formattedDate);
        setListingLat(response.data.location_lat);
        setListingLng(response.data.location_log);
        setListing_Location(response.data.location);
        setListing_ShippingCost(response.data.shipping_cost);
        setListing_YoutubeLink(response.data.youtube_link);
        //-----------------> listings checks
        setExchnage_Status(response.data.exchange);
        setFixedPrice_Status(response.data.fixed_price);
        setGiveaway_Status(response.data.giveaway);
        comments_count();
        likes_count();
        views_count();
        //listing_like(predata.listing_id)
        let imagesList = response?.data?.images ? response?.data?.images : [];
        setListingImages(imagesList);
        setloading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    GetListData();
    listing_views();
    dispatch(setListingId(predata.listing_id));
  }, []);
  const [login_user_id, setlogin_user_id] = useState();
  const getuser = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    setlogin_user_id(user_id);
  };
  const SliderImages = [
    { image: require("../../../../assets/images/img.png") },
    { image: appImages.AddIcon },
    { image: appImages.BagsIcon },
  ];

  ///////////////youtube link////////////
  const handlePress = () => {
    Linking.openURL(youtube_link);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Loader isLoading={loading} />
        {listingImages?.length > 0 && (
          <Slider
            imagearray={listingImages}
            menuitem1onpress={() => {
              {
                navigation.navigate("OtherProfile");
              }
            }}
            menuitem2onpress={() => {
              {
                refRBSheet.current.open();
              }
            }}
            type={"promote"}
            listing_user_id={listing_user_id}
            menuoptions={my_listing_options}
          />
        )}
        {/* <Slider
          imagearray={SliderImages}
          menuitem1onpress={() => {
            {
              navigation.navigate("OtherProfile");
            }
          }}
          menuitem2onpress={() => {
            {
              refRBSheet.current.open();
            }
          }}
          type={"promote"}
          menuoptions={my_listing_options}
        /> */}
        <View style={{ marginTop: hp(4), marginHorizontal: wp(7) }}>
          <Text style={styles.pricetext}>
            {giveaway_status === "true" ? "Free" : listing_item_price + " $"}
          </Text>
          <Text style={styles.maintext}>{listing_item_title}</Text>
        </View>

        {/* <TouchableOpacity style={styles.iconview}
                 onPress={() => {
                    navigation.navigate("CommentsDetails", route.params);
                }}
          > */}
        <View style={styles.iconview}>
          <Icon
            name={"chatbox-sharp"}
            size={20}
            color={Colors.activetextinput}
            style={{ marginRight: wp(3) }}
            onPress={() => {
              {
                navigation.navigate("CommentsDetails", route.params);
              }
            }}
          />
          <Text style={styles.icontext}>{listing_comments_count} comments</Text>
          <Icon
            name={"chevron-forward-sharp"}
            size={15}
            color={Colors.Appthemecolor}
            style={{ marginLeft: wp(3) }}
            // onPress={() => {
            //   {
            //     navigation.navigate("CommentsDetails");
            //   }
            // }}
          />
        </View>

        {/* </TouchableOpacity> */}
        {listing_like_user_id === login_user_id ? (
          // <TouchableOpacity
          //   onPress={() => listing_unlike(predata.listing_id)}
          // >
          <View style={styles.iconview}>
            <Icon
              name={"heart"}
              size={20}
              color={Colors.activetextinput}
              style={{ marginRight: wp(3) }}
              onPress={() => {
                {
                }
              }}
            />
            <Text style={styles.icontext}>{listing_likes_count} Likes</Text>
          </View>
        ) : (
          // </TouchableOpacity>
          // <TouchableOpacity onPress={() => listing_like(predata.listing_id)}>

          <View style={styles.iconview}>
            <Icon
              name={"heart-outline"}
              size={20}
              color={Colors.activetextinput}
              style={{ marginRight: wp(3) }}
              onPress={() => {
                {
                }
              }}
            />
            <Text style={styles.icontext}>{listing_likes_count} Likes</Text>
          </View>
        )}
        <View style={styles.iconview}>
          <Icon
            name={
              listing_views_user_id === login_user_id ? "eye" : "eye-outline"
            }
            size={20}
            color={Colors.activetextinput}
            style={{ marginRight: wp(3) }}
            onPress={() => {
              {
              }
            }}
          />
          <Text style={styles.icontext}>{listing_views_count} Views</Text>
        </View>
        <View style={{ paddingHorizontal: wp(7) }}>
          <Text style={styles.subtext}>{listing_details}</Text>
        </View>

        <View style={{ paddingHorizontal: wp(7), marginTop: hp(2) }}>
          <View style={styles.rowtextview}>
            <Text style={styles.rowlefttext}>Category</Text>
            <Text style={styles.rowrighttext}>{listing_category}</Text>
          </View>
          <View style={styles.rowtextview}>
            <Text style={styles.rowlefttext}>Product Condition</Text>
            <Text style={styles.rowrighttext}>{listing_condition}</Text>
          </View>
          {listing_date === "" ? null : (
            <View style={styles.rowtextview}>
              <Text style={styles.rowlefttext}>Date of Listing</Text>
              <Text style={styles.rowrighttext}>{listing_date}</Text>
            </View>
          )}

          <View style={styles.rowtextview}>
            <Text style={styles.rowlefttext}>Location</Text>
            <Text style={styles.rowrighttext}>{listing_location}</Text>
          </View>
          {listing_shippingcost === "" ? null : (
            <View style={styles.rowtextview}>
              <Text style={styles.rowlefttext}>Shipping Cost</Text>
              <Text style={styles.rowrighttext}>{listing_shippingcost}$</Text>
            </View>
          )}
          {listing_youtubelink === "" ? null : (
            <View style={styles.rowtextview}>
              <Text style={styles.rowlefttext}>YouTube Link</Text>
              <Text style={styles.rowrighttext} onPress={() => handlePress()}>
                {listing_youtubelink}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.locationview}>
          <Icon
            name={"location"}
            size={20}
            color={Colors.activetextinput}
            style={{ marginRight: wp(2) }}
          />
          <Text style={styles.locationtext}>{listing_location}</Text>
        </View>
        <View
          style={{
            height: hp(25),
            width: wp(100),
            alignItems: "center",
            marginBottom: hp(0),
          }}
        >
          {listingLat && listingLng > 0 ? (
            <MapView
              style={[styles.mapStyle]}
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              initialRegion={{
                latitude: listingLat,
                longitude: listingLng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {listingLat && listingLng > 0 ? (
                <Marker
                  coordinate={{
                    latitude: listingLat,
                    longitude: listingLng,
                  }}
                  //icon={<Ionicons name='location' color={Colors.BottomTabcolor}  size={25}></Ionicons>}
                  //image={appImages.orangeloc}
                />
              ) : null}
            </MapView>
          ) : null}
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Insights", { list_id: listing_id })
            }
          >
            <Text style={styles.btnText}>VIEW INSIGHTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Promote", { list_id: listing_id })
            }
          >
            <Text style={styles.btnText}>PROMOTE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <DescriptionBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={"Report Item"}
        subtitle={"Enter Description"}
        btntext={"REPORT"}
        onpress={() => {
          {
          }
        }}
      />
    </SafeAreaView>
  );
};

export default ListingsDetails;
