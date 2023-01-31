import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

////////////////////app icons///////////////
import Icon from "react-native-vector-icons/Ionicons";

//////////////////app components///////////////
import SearchTextInput from "../../../components/TextInput/SearchInput";
import DashboardCard from "../../../components/CustomCards/DashboardCard";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////api function////////////
import { get_Listing_Search } from "../../../api/GetApis";

////////////image url////////////
import { IMAGE_URL } from "../../../utills/ApiRootUrl";

////////////////app Images///////////////
import { appImages } from "../../../constant/images";

const Search = ({ navigation, route }) => {
  ///////////////post search state////////////
  const [search, setSearch] = useState();

  ////////////get search result data///////////
  const [searchdata, setSearchData] = useState("");

  ////////////////Search Function////////////
  const listing_Search = (props) => {
    get_Listing_Search(props)
      .then((response) => {
        console.log("here search ", response.data);
        setSearchData(response.data);
      })
      .catch(function (error) {
        console.log("error", error);
        setSearchData("No data Found");
      });
  };

  useEffect(() => {}, []);

  const renderItem = ({ item }) => (
    <DashboardCard
      //image={IMAGE_URL + item.images[0]}
      maintext={item.title}
      subtext={item.location}
      price={item.price + "$"}
      onpress={() => {
        navigation.navigate("MainListingsDetails", {
          listing_id: item.id,
        });
      }}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.headerView]}>
          <Icon
            name={"arrow-back"}
            size={25}
            color={"white"}
            onPress={() => navigation.goBack()}
            style={{ marginLeft: wp(3) }}
          />
          <View style={{ marginLeft: wp(3) }}></View>
          <SearchTextInput
            term={search}
            placeholder="Search Here"
            onTermChange={(searchhere) => setSearch(searchhere)}
            searchiconpress={() => listing_Search(search)}
          />
        </View>

        {searchdata === "" ? (
          <View>
            <Text style={styles.friendsmaintext}>Trending Searches</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: wp(5),
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: wp(30),
                }}
              >
                <Icon
                  name={"trending-up-sharp"}
                  size={25}
                  color={"black"}
                  style={{}}
                />

                <Text style={styles.text}> Type 01</Text>
              </View>
              {/* <Image
        source={appImages.AddIcon}
        resizeMode='contain'
        style={{width:wp(5),height:hp(5)}}
        /> */}
              <Icon name={"close"} size={25} color={"black"} style={{}} />
            </View>
            <View
              style={{
                borderBottomColor: "grey",
                borderBottomWidth: 0.5,
                width: wp(90),
                alignSelf: "center",
                marginTop: hp(2),
                marginBottom: hp(2),
              }}
            ></View>
          </View>
        ) :searchdata === "No data Found" ? (
          <NoDataFound
          icon={'exclamation-thick'}
          text={'No Data Found'}
          />
        ) :  
          <FlatList
            data={searchdata}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
