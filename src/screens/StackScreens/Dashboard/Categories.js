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

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Sale",
    image: appImages.SaleIcon,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Pets",
    image: appImages.PetsIcon,
  },
  {
    id: "58694a0f-3da1-4571f-bd96-145571e29d72",
    title: "Vehicle",
    image: appImages.VehicleIcon,
  },
  {
    id: "58694a0f-3da1-4271f-bd96-145571e29d72",
    title: "Property",
    image: appImages.PropertyIcon,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Cloth",
    image: appImages.ClothIcon,
  },
  {
    id: "58694a0f-3d4a1-471f-bd96-145571e29d72",
    title: "Bags",
    image: appImages.BagsIcon,
  },
  {
    id: "58694a0f-3d14a1-471f-bd96-145571e29d72",
    title: "Shoes",
    image: appImages.ShoesIcon,
  },
  {
    id: "58694a0f-3d14a1-471f-bd96-145571e29d72",
    title: "Furniture",
    image: appImages.FurnitureIcon,
  },
];

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
            <CategoryCard image={IMAGE_URL+item.image} maintext={item.name} />
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
