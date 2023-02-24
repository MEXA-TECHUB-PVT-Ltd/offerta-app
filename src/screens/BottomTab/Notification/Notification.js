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

const Notification = ({ navigation }) => {
  ///////////////////data state///////////
  const [notification, setNotification] = useState("");

  //textfields
  useEffect(() => {
    get_Notifications().then((response) => {
      console.log(
        "response get here dispatcher",
   response.data
      );
      //setData(response.data)
      if (response.data.msg === "No Result") {
        setNotification("");
      } else {
        setNotification(response.data);
      }
    });
  }, []);

  const renderItem=(item)=>{
    return(
        <TouchableOpacity style={styles.card}
        onPress={()=> navigation.navigate("ExchangeNoti",{data:item.item,navtype:"Notification" })}
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
              source={{uri: IMAGE_URL+ item.item.requester.image}}
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
    )

  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.Appthemecolor}
        barStyle="light-content"
      />
      <CustomHeader headerlabel={"Notifications"} />

      <View style={styles.postcard}>
        <FlatList
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