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
} from "../../../api/GetApis";

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

  /////////////main menu status states/////////////
  const [username, setUsername] = useState("");
  const GetUserData = async () => {
    get_Login_UserData().then((response) => {
      setUsername(response.data.full_name);
    });
  };

  /////////////main menu status states/////////////
  const [Categorylist, setCategoryList] = useState("");
  const GetCategoriesList = async (props) => {
    get_Categories_Listings(props).then((response) => {
      setCategoryList(response.data);
    });
  };
  const [categorydata, setCategoryData] = useState("");
  useEffect(() => {
    GetCategories().then((response) => {
      //console.log("response get here dispatcher", JSON.stringify(response.data))
      dispatch(setExchangeOffer_OtherListing(response.data[0]));
      setCategoryData(response.data);
      setSelectedId(response.data[0].id);
      GetCategoriesList(response.data[0].id);
      setloading(false);
    });
    GetUserData();
  }, []);

  const SliderImages = [
    { image: appImages.BagsIcon },
    { image: appImages.dogIcon },
    { image: appImages.BagsIcon },
  ];

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
      icon={appImages.SaleIcon}
      //icon={{uri:IMAGE_URL.item.image}}
      width={wp(4)}
      selected={selectedId}
      id={item.id}
      onpress={() => onselect(item.id)}
    />
  );
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
          imagearray={SliderImages}
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
        <FlatList
          data={Categorylist}
          numColumns={2}
          renderItem={({ item }) => (
            <DashboardCard
              image={IMAGE_URL + item.images[0]}
              maintext={item.title}
              subtext={item.location}
              price={formatter.format(item.price) + "$"}
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
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
