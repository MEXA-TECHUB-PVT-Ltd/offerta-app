import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, FlatList, View, TouchableOpacity } from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import PromotionTopTabs from "../../../components/TopTabs/PromotionTopTabs";
import PromotionsCard from "../../../components/CustomCards/PromotionsCard";

/////////////app styles////////////////
import styles from "./styles";
import TopTabstyles from "../../../styles/GlobalStyles/TopTabstyles";

////////////app colors////////////
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////api functions///////////
import {
  get_Advertisement_Promotion_List,
  get_Urgent_Promotion_List,
  get_Expired_Promotion_List,
} from "../../../api/GetApis";
import { IMAGE_URL } from "../../../utills/ApiRootUrl";
import TranslationStrings from "../../../utills/TranslationStrings";
import Loader from "../../../components/Loader/Loader";
import NoNotificationFound from "../../BottomTab/Notification/NoNotificationFound";

const Promotions = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("Urgent");
  const Top_Tab = [
    {
      id: "1",
      // title: "Urgent",
      title: TranslationStrings.URGENT,
    },
    {
      id: "2",
      // title: "Advertisement",
      title: TranslationStrings.ADVERTISEMENT,
    },
    {
      id: "3",
      // title: "Expired",
      title: TranslationStrings.EXPIRED,
    },
  ];

  /////////////main menu status states/////////////
  const [urgent_promotion_list, setUrgent_Promotion__List] = useState([]);
  const [advertisement_promotion_list, setAdvertisement_Promotion__List] =
    useState("");

  const GetUrgentPromotionsList = async (props) => {
    try {
      setLoading(true);
      get_Urgent_Promotion_List()
        .then((response) => {
          console.log("GetUrgentPromotionsLists   : ", response?.data?.msg);

          if (response?.data?.msg == "No Result") {
            setUrgent_Promotion__List([]);
          } else {
            setUrgent_Promotion__List(response.data?.reverse());
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setUrgent_Promotion__List([]);
      setLoading(false);
    }
  };
  const GetAdvertisementPromotionsList = async (props) => {
    try {
      setLoading(true);
      get_Advertisement_Promotion_List()
        .then((response) => {
          console.log("GetAdvertisementPromotionsList   : ", response?.data);
          if (response?.data?.msg == "No Result") {
            setUrgent_Promotion__List([]);
          } else {
            setUrgent_Promotion__List(response.data?.reverse());
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setUrgent_Promotion__List([]);
    }
  };
  const GetExpiredPromotionsList = async (props) => {
    try {
      setLoading(true);
      get_Expired_Promotion_List()
        .then((response) => {
          console.log("GetExpiredPromotionsList   : ", response?.data);
          if (response?.data?.msg == "No Result") {
            setUrgent_Promotion__List([]);
          } else {
            setUrgent_Promotion__List(response.data?.reverse());
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setUrgent_Promotion__List([]);
    }
  };
  const togglePromotionsList = async (props) => {
    console.log("props  ; ", props);
    // if (props === "Urgent") {
    //   GetUrgentPromotionsList();
    // } else {
    //   GetAdvertisementPromotionsList();
    // }

    if (props === "Urgent" || props == "Urget") GetUrgentPromotionsList();
    else if (props === "Advertisement") GetAdvertisementPromotionsList();
    else GetExpiredPromotionsList();
  };
  useEffect(() => {
    GetUrgentPromotionsList();
    //GetExpiredPromotionsList()
  }, []);
  ////////////select state////////////
  const [selectedId, setSelectedId] = useState("1");
  ///////////////select function/////////////
  const onselect = (item) => {
    setSelectedId(item.id);
    togglePromotionsList(item.title);
    setSelectedType(item?.title);
  };

  const renderItem = ({ item, index }) => {
    return (
      //   <TouchableOpacity onPress={()=> {item.title === "Urgent"?GetUrgentPromotionsList():
      //   item.title === "Advertisement"?GetAdvertisementPromotionsList():
      //   GetExpiredPromotionsList()}
      // }>
      <PromotionTopTabs
        title={item.title}
        width={"28%"}
        selected={selectedId}
        id={item.id}
        onpress={() => {
          onselect(item);
          // item.title === "Urgent"
          //   ? GetUrgentPromotionsList()
          //   : item.title === "Advertisement"
          //   ? GetAdvertisementPromotionsList()
          //   : GetExpiredPromotionsList();
        }}
      />
      // </TouchableOpacity>
    );
  };

  const list_renderItem = ({ item, index }) => {
    return (
      //item.listing === "No data available"?null:
      <PromotionsCard
        image={
          item.listing === "No data available"
            ? null
            : IMAGE_URL + item.listing.images[0]
        }
        maintext={
          item?.listing === "No data available" ? null : item?.listing?.title
        }
        subtext={
          item?.listing === "No data available"
            ? null
            : item?.listing?.description
        }
        pricetext={
          item?.listing === "No data available" ? null : item?.listing?.price
        }
        // type={item?.promotion?.type}
        type={selectedType}
        item={item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loading} />
      <CustomHeader
        headerlabel={TranslationStrings.PROMOTIONS}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"arrow-back"}
      />

      <View style={TopTabstyles.TopTabView}>
        <FlatList
          data={Top_Tab}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
      </View>
      <View style={{ flex: 1 }}>
        {urgent_promotion_list?.length == 0 ? (
          <NoNotificationFound loading={loading} />
        ) : (
          <FlatList
            data={urgent_promotion_list}
            renderItem={list_renderItem}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Promotions;
