import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import DashboardCard from "../../../components/CustomCards/DashboardCard";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

/////////////app styles////////////////
import styles from "./styles";

/////////////api function/////////
import { get_User_Listings } from "../../../api/GetApis";

///////////////image url///////////////
import { IMAGE_URL } from "../../../utills/ApiRootUrl";
import { useFocusEffect } from "@react-navigation/native";
import Colors from "../../../utills/Colors";

const Listings = ({ navigation, route }) => {
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
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUSerListings();
    }, [])
  );

  const getUSerListings = async () => {
    get_User_Listings()
      .then((response) => {
        if (response.data.message === "No data available") {
          setdata("");
        } else {
          setdata(response.data);
        }
      })
      .finally(() => {
        setRefreshing(false);
        setLoading(false);
      });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    getUSerListings();
  };
  const renderItem = ({ item }) => (
    <DashboardCard
      image={item.images === [] ? null : IMAGE_URL + item.images[0]}
      maintext={item.title}
      subtext={item.location}
      sold={item?.sold}
      price={item.price}
      onpress={() =>
        navigation.navigate("ListingsDetails", { listing_id: item.id })
      }
    />
  );
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
        <CustomHeader
          headerlabel={"Listings"}
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

export default Listings;
