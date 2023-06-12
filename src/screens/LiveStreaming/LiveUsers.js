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
  useWindowDimensions,
  StyleSheet,
} from "react-native";

import CustomHeader from "../../components/Header/CustomHeader";

import Colors from "../../utills/Colors";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Avatar, Button, Card } from "react-native-paper";

import Loader from "../../components/Loader/Loader";
import { appImages } from "../../constant/images";

import { Rating } from "react-native-rating-element";

const LiveUsers = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([
    {
      id: 0,
      name: "Test",
      email: "test@gmail.com",
      rating: 3.2,
      profile: appImages.draweruser,
    },
    {
      id: 1,
      name: "John",
      email: "johndoe@gmail.com",
      rating: 4.5,
      profile: appImages.dogIcon,
    },
    {
      id: 2,
      name: "Harry",
      email: "harry@gmail.com",
      rating: 5,
      profile: appImages.draweruser,
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.Appthemecolor}
        barStyle="light-content"
      />
      <CustomHeader type={"profile"} headerlabel={"Live Streaming"} />

      <View style={{ padding: 5, backgroundColor: "white", height: hp(100) }}>
        <Loader isLoading={loading} />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Card
                style={styles.card}
                onPress={() => {
                  navigation.navigate("Live");
                }}
              >
                <Card.Title
                  title={item.name}
                  subtitle={item.email}
                  left={(props) => (
                    <Avatar.Image {...props} source={item.profile} />
                  )}
                />
                <View
                  style={{
                    marginLeft: wp(20),
                    marginTop: -10,
                    marginBottom: 5,
                  }}
                >
                  <Rating
                    rated={item?.rating}
                    totalCount={5}
                    ratingColor="#f1c644"
                    ratingBackgroundColor="#d4d4d4"
                    size={12}
                    readonly // by default is false
                    icon="ios-star"
                    direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
                  />
                </View>
                <View style={styles.liveView}>
                  <Text style={styles.liveText}>Live</Text>
                </View>
              </Card>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LiveUsers;

const styles = StyleSheet.create({
  card: { backgroundColor: "white", margin: 10 },
  liveView: {
    backgroundColor: "red",
    position: "absolute",
    right: 10,
    top: 7,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  liveText: { color: "#fff", fontWeight: "500" },
});
