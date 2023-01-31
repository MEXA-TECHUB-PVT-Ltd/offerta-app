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

//////////////////app components/////////
import CustomHeader from "../../../../components/Header/CustomHeader";

////////////////////App styles///////////////
import styles from "./styles";
import Colors from "../../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////////api data//////////
import { get_AllUsers } from "../../../../api/GetApis";
import { IMAGE_URL } from "../../../../utills/ApiRootUrl";

const DATA = [
  // {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     name: 'Emma',
  //     image: require('../../../assets/Notification/person.png'),
  //     subtext:'Asked for download the file?',
  //     status:require('../../../assets/Chat/dot.png')
  // },
  {
    id: "1",
    name: "Sandra Vargas",
    image: require("../../../../assets/Chat/user4.png"),
    subtext: "You have a new Job Applied",
    status: require("../../../../assets/Chat/inactive.png"),
  },

  // {
  //     id: '58694a0f-3da13-471f-bd96-147671e29d72',
  //     name: 'Bruce Pierce',
  //     image: require('../../../assets/Chat/user3.png'),
  //     subtext:'Asked for download the file?',
  //     status:require('../../../assets/Chat/dot.png')
  // },
  // {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad43ybb28ba',
  //     name: 'Emma',
  //     image: require('../../../assets/Notification/person.png'),
  //     subtext:'You have a new Job Applied',
  //     status:require('../../../assets/Chat/dot.png')
  // },
  // {
  //     id: '3ac68afc-c625-48d3-a4f8-fbd91aa97f63',
  //     name: 'Sandra Vargas',
  //     image: require('../../../assets/Chat/user4.png'),
  //     subtext:'Asked for download the file?',
  //     status:require('../../../assets/Chat/inactive.png')
  // },
  // {
  //     id: '3ac34afc-c625-48d3-a4f8-fbd91aa97f63',
  //     name: 'Sandra Vargas',
  //     image: require('../../../assets/Chat/user3.png'),
  //     subtext:'Asked for download the file?',
  //     status:require('../../../assets/Chat/inactive.png')
  // },
  // {
  //     id: '3ac68afc-c625-48d3-a4f8-fbd91a43h7f63',
  //     name: 'Sandra Vargas',
  //     image: require('../../../assets/Chat/user4.png'),
  //     subtext:'Asked for download the file?',
  //     status:require('../../../assets/Chat/dot.png')
  // },
  // {
  //     id: '3ac68afc-c625-484e3-a4f8-fbd91aa97f63',
  //     name: 'Sandra Vargas',
  //     image: require('../../../assets/Chat/user3.png'),
  //     subtext:'Asked for download the file?',
  //     status:require('../../../assets/Chat/dot.png')
  // },
  // {
  //     id: 'bd7acbea-c1b1-4456c2-aed5-3ad43ybb28ba',
  //     name: 'Emma',
  //     image: require('../../../assets/Notification/person.png'),
  //     subtext:'You have a new Job Applied',

  // },
  // {
  //     id: '3adf8afc-c625-48343-a4f8-fbd91aa97f63',
  //     name: 'Sandra Vargas',
  //     image: require('../../../assets/Chat/user3.png'),
  //     subtext:'Asked for download the file?',
  //     status:require('../../../assets/Chat/dot.png')
  // },
  // {
  //     id: 'bd89fcbea-c1b1-4456c2-aed5-3ad43b28ba',
  //     name: 'Emma',
  //     image: require('../../../assets/Notification/person.png'),
  //     subtext:'You have a new Job Applied',

  // },
];

const ChatList = ({ navigation }) => {
///////////////////data state///////////
const[data,setData]=useState()

  //textfields
  useEffect(() => {
    get_AllUsers()
    .then((response) => {
        console.log("response get here dispatcher", JSON.stringify(response.data))
        setData(response.data)
    }
    )
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headerlabel={"Chats"} />
      <FlatList
        data={data}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity onPress={() => navigation.navigate("ChatScreen",{userid:item.id})}>
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
                    source={{uri: IMAGE_URL+item.image}}
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
                      {item.full_name}
                    </Text>
                  </View>

                  <Text style={[styles.recomend, { color: "#7A8FA6" }]}>
                    {item.subtext}
                  </Text>
                </View>
              </View>

              <View style={{}}>
                <Text style={[styles.recomend, { color: "#7A8FA6" }]}>
                  1m ago
                </Text>
                <Badge style={{ marginTop: hp(2) }}>5</Badge>
              </View>
            </View>
          </TouchableOpacity>
        )}
        //keyExtractor={item => item.id}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ChatList;
