import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../../components/Header/CustomHeader";
import DashboardCard from "../../../../components/CustomCards/DashboardCard";
import NoDataFound from "../../../../components/NoDataFound/NoDataFound";

/////////////app styles////////////////

/////////////api function/////////
import {
  get_Categories_Listings,
  get_User_Listings,
} from "../../../../api/GetApis";

///////////////image url///////////////
import { IMAGE_URL } from "../../../../utills/ApiRootUrl";
import { useFocusEffect } from "@react-navigation/native";
import Colors from "../../../../utills/Colors";
import Loader from "../../../../components/Loader/Loader";

const AllListingsByCategory = ({ navigation, route }) => {
  ////////////////LIST DATA/////////
  const [data, setdata] = useState();
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   get_User_Listings().then((response) => {
  //     if (response.data.message === "No data available") {
  //       setdata("");
  //     } else {
  //       setdata(response.data);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setLoading(true);
    getData();
  }, [route?.params]);

  const getData = async () => {
    get_Categories_Listings(route?.params?.id)
      .then((response) => {
        if (response.data.message === "No data available") {
          setdata("");
        } else {
          setdata(response.data);
        }
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    getData();
  };

  const renderItem = ({ item }) => (
    <DashboardCard
      image={item.images === [] ? null : IMAGE_URL + item.images[0]}
      maintext={item.title}
      subtext={item.location}
      price={item.price}
      onpress={() => {
        // navigation.navigate("ListingsDetails", { listing_id: item.id });
        navigation.navigate("MainListingsDetails", {
          listing_id: item.id,
        });
      }}
    />
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Loader isLoading={loading} />
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
        <CustomHeader
          headerlabel={route?.params?.name ? route?.params?.name : "Listings"}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />
        {data === "" ? (
          <NoDataFound icon={"exclamation-thick"} text={"No Data Found"} />
        ) : (
          <FlatList
            data={data}
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

export default AllListingsByCategory;
