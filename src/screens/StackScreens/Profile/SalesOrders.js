import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, View } from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import PromotionTopTabs from "../../../components/TopTabs/PromotionTopTabs";
import ExcahangeCard from "../../../components/CustomCards/ExcahngeCard";

/////////////app styles////////////////
import styles from "./styles";
import TopTabstyles from "../../../styles/GlobalStyles/TopTabstyles";

import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appImages } from "../../../constant/images";

////////////////api functions///////////
import { get_Sales, get_Orders } from "../../../api/Sales&Promotions";
import TranslationStrings from "../../../utills/TranslationStrings";
import { BASE_URL, IMAGE_URL } from "../../../utills/ApiRootUrl";
import RattingModal from "../../../components/Modal/RattingModal";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// const Top_Tab = [
//   {
//     id: "1",
//     // title: "Sales",
//     title: TranslationStrings.SALES,
//   },
//   {
//     id: "2",
//     // title: "Orders",
//     title: TranslationStrings.ORDERS,
//   },
// ];

const SalesOrders = ({ navigation }) => {
  const [rating, setRating] = useState(3.5);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selected_user_id, setSelected_user_id] = useState("");
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  const [Top_Tab, setTop_Tab] = useState([
    {
      id: "1",
      // title: "Sales",
      title: TranslationStrings.SALES,
    },
    {
      id: "2",
      // title: "Orders",
      title: TranslationStrings.ORDERS,
    },
  ]);
  ////////////select state////////////
  const [selectedId, setSelectedId] = useState("1");
  ///////////////select function/////////////
  const onselect = (item) => {
    setSelectedId(item);
    //GetPromotionsFeaturesList(item);
  };
  const GetSalesList = async (props) => {
    get_Sales().then((response) => {
      if (response.data[0]?.order_by === [] || response.data?.status == false) {
        setdata("");
      } else {
        setdata(response.data);
      }
    });
  };
  const GetOrderList = async (props) => {
    get_Orders().then((response) => {
      console.log("response get_Orders list", JSON.stringify(response.data));

      if (response.data[0]?.order_by === [] || response.data?.status == false) {
        setdata("");
      } else {
        setdata(response.data);
      }
    });
  };

  useEffect(() => {
    GetSalesList();
  }, []);
  ////////////////LIST DATA/////////
  const [data, setdata] = useState();

  const renderItem = ({ item, index }) => (
    <PromotionTopTabs
      title={item.title}
      width={"30%"}
      selected={selectedId}
      id={item.id}
      onpress={() => {
        onselect(item.id),
          item.title === "Sales" ? GetSalesList() : GetOrderList();
      }}
      type={"sales&orders"}
    />
  );

  const AddRattings = async (ratted_user, rating) => {
    var user = await AsyncStorage.getItem("Userid");
    axios({
      method: "POST",
      url: BASE_URL + "reivewUser.php",
      data: {
        user_id: user,
        reviewed_user_id: ratted_user,
        review: rating,
      },
    })
      .then(async function (response) {
        console.log("response", JSON.stringify(response.data));
        setsnackbarValue({
          value: "Review Submitted Successfully",
          color: "green",
        });
        setVisible(true);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={TranslationStrings.SALE_AND_ORDERS}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"chevron-back"}
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
      {/* <View style={TopTabstyles.TopTabView}>
        <TouchableOpacity
          onPress={() => {
            setSales(true), setOrders(false)
          }}
        >
          <PromotionTopTabs title={"Sales"} width={"35%"} state={Sales} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSales(false), setOrders(true)
          }}
        >
          <PromotionTopTabs
            title={"Orders"}
            width={"35%"}
            state={Orders}
          />
        </TouchableOpacity>
      </View> */}

      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <>
              {item?.listing?.message == "No data available" ? null : (
                <ExcahangeCard
                  onPress={() => {
                    if (selectedId == 2) {
                      //orders
                      let seller_id = item?.listing?.user_id;
                      setSelected_user_id(seller_id);
                      setShowRatingModal(true);
                    } else {
                      //sales
                      let buyer_id = item?.order_by?.id;
                      navigation.navigate("ListingsDetails", {
                        listing_id: item?.listing?.id,
                        buyer_id: buyer_id,
                        type: "sale",
                      });
                    }
                  }}
                  image={
                    typeof item?.listing?.images == "undefined" ||
                    item?.listing?.images === []
                      ? null
                      : IMAGE_URL + item?.listing?.images[0]
                  }
                  maintext={item.listing.title}
                  subtext={item.listing.description}
                  pricetext={item.listing.price}
                />
              )}
            </>
          )}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Snackbar
        duration={400}
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{
          backgroundColor: snackbarValue.color,
          marginBottom: hp(9),
          zIndex: 999,
        }}
      >
        {snackbarValue.value}
      </Snackbar>
      <RattingModal
        title={TranslationStrings.RATE_SELLER}
        modalVisible={showRatingModal}
        CloseModal={() => setShowRatingModal(false)}
        ratted_user={selected_user_id}
        setRating={setRating}
        onDone={() => {
          setShowRatingModal(false);
          AddRattings(selected_user_id, rating);
        }}
      />
    </SafeAreaView>
  );
};

export default SalesOrders;
