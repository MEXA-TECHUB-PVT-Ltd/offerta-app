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
import {
  get_Listing_Search,
  get_Listing_Most_Search,
} from "../../../api/GetApis";

////////////image url////////////
import { IMAGE_URL } from "../../../utills/ApiRootUrl";

////////////////app Images///////////////
import { appImages } from "../../../constant/images";
import TranslationStrings from "../../../utills/TranslationStrings";

const Search = ({ navigation, route }) => {
  ///////////////post search state////////////
  const [search, setSearch] = useState();

  ////////////get search result data///////////
  const [searchdata, setSearchData] = useState("");
  const [most_searchdata, setMost_SearchData] = useState("");

  ////////////////Search Function////////////
  const listing_Search = (props) => {
    get_Listing_Search(props)
      .then((response) => {
        setSearchData(response.data);
      })
      .catch(function (error) {
        console.log("error", error);
        setSearchData("No data Found");
      });
  };
  ////////////////Search Function////////////
  const listing_Search_Most = () => {
    get_Listing_Most_Search()
      .then((response) => {
        setMost_SearchData(response.data);
      })
      .catch(function (error) {
        console.log("error", error);
        setMost_SearchData("No data Found");
      });
  };

  useEffect(() => {
    listing_Search_Most();
  }, []);

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
  const renderItem_most_search = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setSearch(item.item)}>
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

            <Text style={styles.text}>{item.item?.title}</Text>
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
      </TouchableOpacity>
    );
  };
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
            placeholder={TranslationStrings.SEARCH_HERE}
            onTermChange={(searchhere) => setSearch(searchhere)}
            searchiconpress={() => listing_Search(search)}
          />
        </View>

        {searchdata === "" ? (
          <View>
            <Text style={styles.searchmaintext}>
              {TranslationStrings.TRENDING_SEARCHES}
            </Text>
            <FlatList
              data={most_searchdata}
              renderItem={renderItem_most_search}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : searchdata === "No data Found" ? (
          <NoDataFound
            icon={"exclamation-thick"}
            text={TranslationStrings.NO_DATA_FOUND}
          />
        ) : (
          <FlatList
            data={searchdata}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
