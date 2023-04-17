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
import ExcahangeCard from "../../../components/CustomCards/ExcahngeCard";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appImages } from "../../../constant/images";

///////////////api functions///////////////
import { get_User_Liked_Listings } from "../../../api/GetApis";

/////////////image url//////////////
import { IMAGE_URL } from "../../../utills/ApiRootUrl";
import TranslationStrings from "../../../utills/TranslationStrings";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LikedItems = ({ navigation }) => {
  ////////////////LIST DATA/////////
  const [data, setdata] = useState();
  const [login_user_id, setlogin_user_id] = useState();
  const getuser = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    setlogin_user_id(user_id);
  };

  useEffect(() => {
    getuser();
    get_User_Liked_Listings().then((response) => {
      if (response.data.msg === "No Result") {
        setdata("");
      } else {
        setdata(response.data);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={TranslationStrings.LIKED_ITEMS}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"arrow-back"}
      />
      <View style={{ flex: 1 }}>
        {data === "" ? (
          <NoDataFound
            icon={"exclamation-thick"}
            text={TranslationStrings.NO_DATA_FOUND}
          />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ExcahangeCard
                image={item.images === [] ? null : IMAGE_URL + item.images[0]}
                maintext={item.title}
                subtext={item.description}
                pricetext={item.total_likes}
                cardtype={"like"}
                onPress={() => {
                  if (item.user_id === login_user_id) {
                    navigation.navigate("ListingsDetails", {
                      listing_id: item.id,
                      like: true,
                      login_user_id: login_user_id,
                    });
                  } else {
                    navigation.navigate("MainListingsDetails", {
                      listing_id: item.id,
                      like: true,
                      login_user_id: login_user_id,
                    });
                  }
                }}
              />
            )}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LikedItems;
