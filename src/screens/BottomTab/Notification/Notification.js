import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
  Image,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from "react-native";

////////////////app components///////////
import CustomHeader from "../../../components/Header/CustomHeader";

/////////////app styles///////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appImages } from "../../../constant/images";

////////////////////api function/////////////
import { get_Notifications } from "../../../api/GetApis";
import { useDispatch } from "react-redux";
import { setExchangeOffer_OtherListing } from "../../../redux/actions";
import Loader from "../../../components/Loader/Loader";
import { useFocusEffect } from "@react-navigation/native";

import BlockUserView from "../../../components/BlockUserView";
import { get_user_status } from "../../../api/GetApis";

import moment from "moment";

const Notification = ({ navigation }) => {
  const dispatch = useDispatch();
  ///////////////////data state///////////
  const [notification, setNotification] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  //textfields
  useEffect(() => {
    setLoading(true);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      get_user_notifications();
    }, [])
  );

  const get_user_notifications = async () => {
    get_Notifications()
      .then((response) => {
        //setData(response.data)
        setRefreshing(false);
        setLoading(false);
        if (response.data.msg === "No Result") {
          setNotification("");
        } else {
          console.log("response.data  : ", response.data?.length);
          if (response.data?.length > 0) {
            setNotification(response.data?.reverse());
          }
        }
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    get_user_notifications();
  };

  const handleNotificationPress = async (item) => {
    let user_status = await get_user_status();
    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }

    if (item?.type == "Price Offer") {
      console.log("notification is price offer");
      dispatch(setExchangeOffer_OtherListing(item?.list));
      console.log("item :::", item?.offer_status);
      if (item?.offer_status == "reject") {
        //handle offer reject
        let obj = {
          sale_by: item?.offer?.sale_by,
          buyer_id: item?.offer?.user_id,
          offer_type: "price_offer",
          receiverId: item?.offer?.sale_by,
          senderId: item?.offer?.user_id,
          listing_id: item?.list?.id,

          item_img: item?.list?.images?.length > 0 ? item?.list?.images[0] : "",
          offer_price: item?.offer?.price,
          offerid: item?.offer?.id,
          itemprice: item?.list?.price,
          navtype: "notification",
          userid: item?.offer?.sale_by,
        };

        navigation.navigate("PriceOfferNoti", obj);
      } else {
        navigation.navigate("ConfirmAddress");
      }
    } else if (item?.type == "Counter Offer") {
      console.log("counter offer_________________");
      let obj = {
        buyer_id: item?.offer?.user_id,
        item_img: item?.list?.images?.length > 0 ? item?.list?.images[0] : "",
        itemprice: item?.list?.price,
        listing_id: item?.list?.id,
        navtype: "notification",
        offer_price: item?.offer?.price,
        offer_type: "counter_offer",
        price_offer: item?.offer?.price,
        offerid: item?.offer?.id,
        receiverId: item?.offer?.user_id,
        sale_by: item?.offer?.sale_by,
        senderId: item?.offer?.sale_by,
        userId: item?.offer?.sale_by,
      };
      console.log("obj   ::  ", obj);
      navigation.navigate("CounterOffer", obj);
    } else if (item?.type == "exchange") {
      //item1  : requester_list
      //item2 : list

      let obj = {
        item_img1: item?.requester_list?.images[0],
        item_img2: item?.list?.images[0],
        itemname1: item?.requester_list?.title,
        itemname2: item?.list?.title,
        itemprice1: item?.requester_list?.price,
        itemprice2: item?.list?.price,
        navtype: "notification",

        userid: item?.list?.user_id,
        receiverId: item?.list?.user_id,
        senderId: item?.requester_list?.user_id,
        offerId: item?.offer?.id,
        offer_detail: {
          id: item?.offer?.id,
          user_id: item?.offer?.user_id,
          second_user: item?.list?.user_id,
          item: item?.offer?.item,
          item2: item?.offer?.item2,
        },
      };
      console.log("obj : ", obj);
      navigation.navigate("ExchangeNoti", obj);
    } else {
      console.log("other type that is not handled yet  :  ", item?.type);
    }
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          handleNotificationPress(item?.item);
          // navigation.navigate("ExchangeNoti", {
          //   data: item.item,
          //   navtype: "Notification",
          // });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View style={{}}>
            <Image
              source={{ uri: IMAGE_URL + item.item.requester.image }}
              style={styles.userimage}
              resizeMode="contain"
            />
          </View>
          <View style={{ marginLeft: wp(3) }}>
            <Text style={styles.username}>{item.item.requester.full_name}</Text>
            <Text style={[styles.recomend, { color: "#7A8FA6" }]}>
              {item.item.notification}
            </Text>
          </View>
        </View>

        <View style={{ marginLeft: 0 }}>
          <Text style={[styles.recomend, { color: "#7A8FA6" }]}>
            {item?.item?.created_at && moment(item?.item?.created_at).fromNow()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.Appthemecolor}
        barStyle="light-content"
      />
      <CustomHeader headerlabel={"Notifications"} />
      <BlockUserView visible={showBlockModal} setVisible={setShowBlockModal} />
      <View style={{ ...styles.postcard, marginTop: 0 }}>
        <Loader isLoading={loading} />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={[Colors.Appthemecolor]}
              onRefresh={() => handleRefresh()}
            />
          }
          data={notification}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View style={{ height: 200 }}>
                <Text style={{ color: "#000" }}>No Record Found</Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;
