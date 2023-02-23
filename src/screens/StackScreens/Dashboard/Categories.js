import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CategoryCard from "../../../components/CustomCards/CategoriesCard";
/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL,IMAGE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";

///////////////////app fonts/////////////
import { fontFamily } from "../../../constant/fonts";


const Categories = ({ navigation, route }) => {

  /////////////category state and function/////////////
  const [Category, setCategory] = useState("");
  const GetCategories = async () => {
    await axios({
      method: "GET",
      url: BASE_URL + "getAllCategory.php",
    })
      .then(function (response) {
        //console.log("response get here dispatcher", JSON.stringify(response.data))
        setCategory(response.data)
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  useEffect(() => {
    GetCategories()
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={"Categories"}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <FlatList
          data={Category}
          numColumns={2}
          renderItem={({ item }) => (
            <CategoryCard image={item.image_url.replace("{{baseurl}}", "")} maintext={item.name} />
          )}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;
