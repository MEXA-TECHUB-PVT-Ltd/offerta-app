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

const Notification = ({ navigation }) => {
  const dispatch = useDispatch();
  ///////////////////data state///////////
  const [notification, setNotification] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  //textfields
  useEffect(() => {
    get_user_notifications();
  }, []);
  const get_user_notifications = async () => {
    get_Notifications()
      .then((response) => {
        //setData(response.data)
        setRefreshing(false);
        if (response.data.msg === "No Result") {
          setNotification("");
        } else {
          setNotification(response.data);
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
    if (item?.type == "Price Offer") {
      console.log("notification is price offer");
      dispatch(setExchangeOffer_OtherListing(item?.list));

      navigation.navigate("ConfirmAddress");
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
          {/* <Text style={[styles.recomend, { color: "#7A8FA6" }]}>
            00:00 pm
          </Text> */}
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

      <View style={{ ...styles.postcard, marginTop: 0 }}>
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
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;
