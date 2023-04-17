import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  ScrollView,
  View,
  Text,
  RefreshControl,
  LogBox,
} from "react-native";

//////////////////app icons////////////////
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

/////////////////app components/////////
import ViewAll from "../../../components/ViewAll/ViewAll";
import DashboardCard from "../../../components/CustomCards/DashboardCard";
import IconsTopTabs from "../../../components/TopTabs/IconsTabs/IconsTopTabs";
import Slider from "../../../components/ImageSlider/Slider";
import Loader from "../../../components/Loader/Loader";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import {
  setListingId,
  setExchangeOffer_OtherListing,
  setLoginUserId,
  get_Categories_Listings_By_Location,
  setChatCount,
} from "../../../redux/actions";

////////////////Image URL////////////////
import { IMAGE_URL } from "../../../utills/ApiRootUrl";

/////////////////app Height and width////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

/////////////////////app styles////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";

////////////////api helper functions///////
import {
  GetCategories,
  get_Categories_Listings,
  get_Login_UserData,
  get_Banners,
  get_all_listings,
} from "../../../api/GetApis";

//////////////////location////////////////
import {
  locationPermission,
  getCurrentLocation,
} from "../../../api/CurrentLocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "react-native-swiper-flatlist/src/themes";
import CustomImageSlider from "../../../components/ImageSlider/CustomImageSlider";

import TranslationStrings from "../../../utills/TranslationStrings";

const Home = ({ navigation }) => {
  const { name, age } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ///////////////////loader loading state///////////////
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  /////////////current location states/////////////
  const [cur_lat, setCur_Lat] = useState("");
  const [cur_lng, setCur_Lng] = useState("");

  /////////////user data states/////////////
  const [username, setUsername] = useState("");
  const GetUserData = async () => {
    get_Login_UserData().then((response) => {
      setUsername(response.data.full_name);
    });
  };
  /////////////user data states/////////////
  const [banners, setBanners] = useState([]);
  const Get_Banners = async () => {
    get_Banners().then((response) => {
      if (response.data.msg === "No Result") {
        setBanners([]);
      } else {
        setBanners(response.data);
      }
    });
  };
  /////////////main menu status states/////////////
  const [Categorylist, setCategoryList] = useState("");
  const GetCategoriesList = async (props) => {
    // get_Categories_Listings_By_Location(props,cur_lat,cur_lng).then((response) => {

    //   if(response.data.message === "No data available")
    //   {
    //     setCategoryList("");
    //   }
    //   else{
    //     setCategoryList(response.data);
    //   }

    // });
    get_Categories_Listings(props).then((response) => {
      // console.log("response  :   ", response?.data);
      if (response.data.message === "No data available") {
        setCategoryList("");
      } else {
        setCategoryList(response.data);
      }
    });
  };

  const getAllListings = async (props) => {
    get_all_listings().then((response) => {
      // console.log("response  :   ", response?.data);
      let list = response?.data ? response?.data : [];
      // console.log("list  :  ", list);
      setCategoryList(list);
    });
  };
  const [categorydata, setCategoryData] = useState("");
  useEffect(() => {
    try {
      LogBox.ignoreAllLogs();
      Get_Banners();
      GetCategories()
        .then((response) => {
          dispatch(setExchangeOffer_OtherListing(response.data[0]));
          console.log("response.data  :  ", response.data);
          let obj = {
            created_at: "2023-03-21 10:49:00",
            id: "All",
            image: "",
            image_url: "",
            name: "All",
          };
          let list1 = response?.data;
          list1.unshift(obj);
          // setCategoryData(response.data);
          setCategoryData(list1);

          setSelectedId(response.data[0].id);
          GetCategoriesList(response.data[0].id);
          getAllListings();
          setloading(false);
        })
        .catch((err) => {
          console.log("err  : ", err);
          setloading(false);
        });
      GetUserData().catch((err) =>
        console.log("error getting user data  : ", err)
      );
      getLiveLocation().catch((err) =>
        console.log("error getting live location : ", err)
      );
      getuser().catch((err) => console.log("err getting usr : ", err));
    } catch (error) {
      console.log("error raised  : ", error);
    }
  }, []);

  const [login_user_id, setlogin_user_id] = useState();
  const getuser = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    setlogin_user_id(user_id);
  };
  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const { latitude, longitude, heading } = await getCurrentLocation();
      setCur_Lat(latitude);
      setCur_Lng(longitude);
    }
  };
  ////////////select state////////////
  const [selectedId, setSelectedId] = useState(null);
  ///////////////select function/////////////
  const onselect = (item) => {
    setSelectedId(item);
    if (item == "All") {
      //get all listings
      getAllListings();
    } else {
      GetCategoriesList(item);
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    try {
      Get_Banners();
      GetCategories()
        .then((response) => {
          dispatch(setExchangeOffer_OtherListing(response.data[0]));
          let obj = {
            created_at: "2023-03-21 10:49:00",
            id: "All",
            image: "",
            image_url: "",
            name: "All",
          };
          let list1 = response?.data;
          list1.unshift(obj);

          // setCategoryData(response.data);
          setSelectedId(response.data[0].id);
          GetCategoriesList(response.data[0].id);
          getAllListings();
          setloading(false);
          setRefreshing(false);
        })
        .catch((err) => {
          console.log("err  : ", err);
          setloading(false);
          setRefreshing(false);
        });
      GetUserData().catch((err) =>
        console.log("error getting user data  : ", err)
      );
      getLiveLocation().catch((err) =>
        console.log("error getting live location : ", err)
      );
      getuser().catch((err) => console.log("err getting usr : ", err));
    } catch (error) {
      console.log("error raised  : ", error);
      setloading(false);
      setRefreshing(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <IconsTopTabs
      title={item.name == "All" ? TranslationStrings.All : item.name}
      icon={item.image_url.replace("{{baseurl}}", "")}
      width={wp(5)}
      selected={selectedId}
      id={item.id}
      onpress={() => onselect(item.id)}
    />
  );

  // useEffect(() => {
  //   ChangeAppLanguage("es");
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[Colors.Appthemecolor]}
            onRefresh={() => handleRefresh()}
          />
        }
      >
        <StatusBar backgroundColor={"white"} barStyle="dark-content" />
        <Loader isLoading={loading} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(5),
            alignItems: "center",
            marginTop: hp(2),
          }}
        >
          <Ionicons
            name={"menu"}
            size={30}
            color={Colors.Appthemecolor}
            onPress={() => navigation.toggleDrawer()}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: wp(28),
            }}
          >
            <View style={styles.headericonsview}>
              <MaterialCommunityIcons
                name={"filter"}
                size={25}
                color={Colors.Appthemecolor}
                onPress={() => navigation.navigate("Filter")}
              />
            </View>
            <View style={styles.headericonsview}>
              <Ionicons
                name={"search"}
                size={25}
                color={Colors.Appthemecolor}
                onPress={() => navigation.navigate("Search")}
              />
            </View>
          </View>
        </View>
        <View style={{ justifyContent: "center", paddingHorizontal: wp(5) }}>
          <Text style={styles.welcometext}>{TranslationStrings.WELCOME}</Text>
          <Text style={styles.usertext}>{username}</Text>
        </View>
        {/* <Slider
          imagearray={banners}
          slidertype={"dashboard"}
          listing_user_id={0}
        /> */}
        <CustomImageSlider imagearray={banners} />

        <ViewAll
          headerlabel={TranslationStrings.Categories1}
          onpress={() => navigation.navigate("Categories")}
          // onpress={() => {
          //   dispatch(setChatCount(100));
          // }}
        />
        <View style={{ paddingHorizontal: wp(3) }}>
          <FlatList
            data={categorydata}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          />
        </View>
        <View
          style={{
            borderBottomColor: "#B2B2B2",
            borderBottomWidth: 0.25,
            backgroundColor: "white",
            marginTop: hp(0),
            marginBottom: hp(3),
          }}
        ></View>

        {Categorylist === "" ? null : (
          <FlatList
            data={Categorylist}
            numColumns={2}
            // item.user_id === login_user_id ? null :

            renderItem={({ item }) => (
              <DashboardCard
                image={
                  item?.images?.length == 0 ? null : IMAGE_URL + item?.images[0]
                }
                // image={null}
                sold={item?.sold}
                // image={item}
                maintext={item.title}
                subtext={item.location}
                price={item.price}
                onpress={() => {
                  dispatch(setListingId(item.id));
                  if (item.user_id === login_user_id) {
                    navigation.navigate("ListingsDetails", {
                      listing_id: item.id,
                    });
                  } else {
                    navigation.navigate("MainListingsDetails", {
                      listing_id: item.id,
                    });
                  }
                }}
              />
            )}
            keyExtractor={(item, index) => index}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
