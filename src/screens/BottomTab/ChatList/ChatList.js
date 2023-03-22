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
} from "react-native";
import { Divider, Badge } from "react-native-paper";

/////////////////app components/////////////
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

//////////////////app components/////////
import CustomHeader from "../../../components/Header/CustomHeader";

////////////////////App styles///////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////////api data//////////
import { get_Chat_Users } from "../../../api/ChatApis";

////////////image url/////////////
import { IMAGE_URL } from "../../../utills/ApiRootUrl";

///////////////////async//////////////
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatList = ({ navigation }) => {
  ///////////////////data state///////////
  const [data, setData] = useState([]);

  //textfields
  useEffect(() => {
    getuser();
    get_Chat_Users().then((response) => {
      console.log("chat list  response :  ", response?.data);
      if (response.data.msg === "No Result") {
        setData();
      } else {
        setData(response.data);
      }
    });
  }, []);
  const [login_user_id, setlogin_user_id] = useState();
  const getuser = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    setlogin_user_id(user_id);
  };
  ///////////////////flatlist render item///////////////
  const renderitem = (item) => {
    return item.item.chat_user.id === login_user_id &&
      item.item.user.id != login_user_id ? (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ChatScreen", {
            navtype: "chatlist",
            userid: item.item.user.id,
          })
        }
      >
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: wp("3%"),
            }}
          >
            <View style={{}}>
              <Image
                source={{ uri: IMAGE_URL + item.item.user.image }}
                style={styles.userimage}
                resizeMode="contain"
              />
              <View
                style={{ position: "absolute", bottom: 0, right: hp(-1.5) }}
              >
                <Image
                  source={item.status}
                  style={{ width: wp(10), height: hp(2) }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={{ marginLeft: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#1B1B1B",
                    fontWeight: "700",
                  }}
                >
                  {item.item.user.full_name}
                </Text>
              </View>

              <Text style={[styles.recomend, { color: "#7A8FA6" }]}>
                {item.subtext}
              </Text>
            </View>
          </View>

          {/* <View style={{}}>
            <Text style={[styles.recomend, { color: "#7A8FA6" }]}>1m ago</Text>
            <Badge style={{ marginTop: hp(2) }}>5</Badge>
          </View> */}
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ChatScreen", {
            navtype: "chatlist",
            userid: item.item.chat_user.id,
          })
        }
      >
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: wp("3%"),
            }}
          >
            <View style={{}}>
              <Image
                source={{ uri: IMAGE_URL + item.item.chat_user.image }}
                style={styles.userimage}
                resizeMode="contain"
              />
              <View
                style={{ position: "absolute", bottom: 0, right: hp(-1.5) }}
              >
                <Image
                  source={item.status}
                  style={{ width: wp(10), height: hp(2) }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={{ marginLeft: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#1B1B1B",
                    fontWeight: "700",
                  }}
                >
                  {item.item.chat_user.full_name}
                </Text>
              </View>
              <Text style={[styles.recomend, { color: "#7A8FA6" }]}>
                {item.subtext}
              </Text>
            </View>
          </View>

          {/* <View style={{}}>
            <Text style={[styles.recomend, { color: "#7A8FA6" }]}>1m ago</Text>
            <Badge style={{ marginTop: hp(2) }}>5</Badge>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headerlabel={"Chats"} />
      {data === [] ? (
        <NoDataFound icon={"exclamation-thick"} text={"No Data Found"} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderitem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ChatList;
