import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
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
  get_Categories_Listings_By_Location
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

/////////////////app images///////////
import { appImages } from "../../../constant/images";

////////////////api helper functions///////
import {
  GetCategories,
  get_Categories_Listings,
  get_Login_UserData,
  get_Banners,
} from "../../../api/GetApis";

//////////////////location////////////////
import { locationPermission,getCurrentLocation } from "../../../api/CurrentLocation";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////mapkey////////////////
import { MapKeyApi } from "../../../utills/MapKey";

import { TextInput } from 'react-native-paper';

const Home = ({ navigation }) => {
  const { name, age } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

    /////////////////Price formatter/////////////
    const formatter = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    });

  ///////////////////loader loading state///////////////
  const [loading, setloading] = useState(true);

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
      console.log("here data:",response.data)
      if(response.data.msg ==="No Result")
      {
        setBanners([]);
      }
      else{
        setBanners(response.data);
      }
    });
  };
  /////////////main menu status states/////////////
  const [Categorylist, setCategoryList] = useState("");
  const GetCategoriesList = async (props) => {
    // get_Categories_Listings_By_Location(props,cur_lat,cur_lng).then((response) => {
    //   console.log("data here in cat:",response.data)
    //   if(response.data.message === "No data available")
    //   {
    //     setCategoryList("");
    //   }
    //   else{
    //     setCategoryList(response.data);
    //   }
 
    // });
    get_Categories_Listings(props).then((response) => {
      if(response.data.message === "No data available")
      {
        setCategoryList("");
      }
      else{
        setCategoryList(response.data);
      }
 
    });
  };
  const [categorydata, setCategoryData] = useState("");
  useEffect(() => {
    Get_Banners()
    GetCategories().then((response) => {
      //console.log("response get here dispatcher", JSON.stringify(response.data))
      dispatch(setExchangeOffer_OtherListing(response.data[0]));
      setCategoryData(response.data);
      setSelectedId(response.data[0].id);
      GetCategoriesList(response.data[0].id);
      setloading(false);
    });
    GetUserData()
    getLiveLocation()
    getuser()
  }, []);

  const [login_user_id, setlogin_user_id] = useState();
  const getuser = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    setlogin_user_id(user_id);
  };
  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission()
    if (locPermissionDenied) {
        const { latitude, longitude, heading } = await getCurrentLocation()
       console.log("get live location after 4 second",latitude,longitude,heading)
        setCur_Lat(latitude)
        setCur_Lng(longitude)
    }
    }
  ////////////select state////////////
  const [selectedId, setSelectedId] = useState(null);
  ///////////////select function/////////////
  const onselect = (item) => {
    setSelectedId(item);
    GetCategoriesList(item);
  };

  const renderItem = ({ item, index }) => (
    <IconsTopTabs
      title={item.name}
      icon={item.image_url.replace("{{baseurl}}", "")}
      width={wp(5)}
      selected={selectedId}
      id={item.id}
      onpress={() => onselect(item.id)}
    />
  );
  const SliderImages = [
    { image: appImages.BagsIcon },
    { image: appImages.dogIcon },
    { image: appImages.BagsIcon },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
          <Text style={styles.welcometext}>{"Welcome"}</Text>
          <Text style={styles.usertext}>{username}</Text>
        </View>
        <Slider
          imagearray={banners}
          slidertype={"dashboard"}
          listing_user_id={0}
        />

        <ViewAll
          headerlabel={"Categories"}
          onpress={() => navigation.navigate("Categories")}
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
            borderBottomColor:"#B2B2B2",
            borderBottomWidth: 0.25,
            backgroundColor:'white',
            marginTop: hp(0),
            marginBottom:hp(3),

          }}
        ></View>


        {Categorylist === ""?null:
                <FlatList
                data={Categorylist}
                numColumns={2}
                renderItem={({ item }) => (
                  item.user_id === login_user_id ?null:
                  <DashboardCard
                    image={item.images === []?null:IMAGE_URL + item.images[0]}
                    maintext={item.title}
                    subtext={item.location}
                    price={item.price}
                    onpress={() => {
                      dispatch(setListingId(item.id));
                      navigation.navigate("MainListingsDetails", {
                        listing_id: item.id,
                      });
                    }}
                  />
                )}
                keyExtractor={(item, index) => index}
                scrollEnabled={false}
                //inverted={true}
              />
        }

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
