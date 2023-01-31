import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, ScrollView, FlatList } from "react-native";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setCategoryName } from "../../../redux/actions";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import DashboardCard from "../../../components/CustomCards/DashboardCard";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

/////////////app styles////////////////
import styles from "./styles";

//////////////api function////////////
import { get_Categories_Listings } from "../../../api/GetApis";

////////////image url////////////
import { IMAGE_URL } from "../../../utills/ApiRootUrl";

////////////////app Images///////////////
import { appImages } from "../../../constant/images";

const FilterListings = ({ navigation, route }) => {
  /////////////redux states///////
  const { category_id } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  /////////////main menu status states/////////////
  const [Categorylist, setCategoryList] = useState("");
  const GetCategoriesList = async (props) => {
    get_Categories_Listings(props)
      .then((response) => {
        if (response.data.message === "No data available") {
          setCategoryList("");
        } else {
          setCategoryList(response.data);
        }
      })
      .catch(function (error) {
        console.log("error", error);
        // setCategoryList("No data Found");
      });
  };
  useEffect(() => {
    GetCategoriesList(category_id);
    console.log("category id here:", category_id);
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
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      > */}
      <CustomHeader
        headerlabel={"Filter Results"}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"arrow-back"}
      />

      {Categorylist === "" ? (
        <NoDataFound icon={"exclamation-thick"} text={"No Data Found"} />
      ) : (
        <FlatList
          data={Categorylist}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default FilterListings;
