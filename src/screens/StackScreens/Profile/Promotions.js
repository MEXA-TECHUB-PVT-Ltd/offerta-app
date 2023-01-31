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
import PromotionTopTabs from "../../../components/TopTabs/PromotionTopTabs";
import PromotionsCard from "../../../components/CustomCards/PromotionsCard";

/////////////app styles////////////////
import styles from "./styles";
import TopTabstyles from "../../../styles/GlobalStyles/TopTabstyles";

import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appImages } from "../../../constant/images";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    subtext: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
    price: "20$",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    subtext: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
    price: "20$",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    subtext: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
    price: "20$",
  },
];
const options = [
  { id:'1',label: 'View Profile', icon:'eye'},
  {id:'2',label: 'View Profile', icon:'eye' },
  {id:'3',label: 'View Profile', icon:'eye' },
];
const Promotions = ({ navigation }) => {
  //top tab status states
  const [Urgent, setUrgent] = useState(true);
  const [Advertisment, setAdvertisment] = useState(false);
  const [Expired, setExpired] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={"Promotions"}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"arrow-back"}
      />

      <View style={TopTabstyles.TopTabView}>
        <TouchableOpacity
          onPress={() => {
            setUrgent(true), setAdvertisment(false), setExpired(false)
          }}
        >
          <PromotionTopTabs title={"Urgent"} width={"25%"} state={Urgent} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setUrgent(false), setAdvertisment(true), setExpired(false);
          }}
        >
          <PromotionTopTabs
            title={"Advertisment"}
            width={"25%"}
            state={Advertisment}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setUrgent(false), setAdvertisment(false), setExpired(true);
          }}
        >
          <PromotionTopTabs title={"Expired"} width={"25%"} state={Expired} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
      {Urgent === true?
        <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <PromotionsCard
            image={appImages.dogIcon}
            maintext={"Item Name"}
            subtext={"username want to exchange with item name"}
            pricetext={"78"}
            type={'Urgent'}
          />
        )}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      :
      Advertisment ==true?
      <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <PromotionsCard
          image={appImages.dogIcon}
          maintext={"Item Name"}
          subtext={"username want to exchange with item name"}
          pricetext={"78"}
          type={'Advertisement'}
        />
      )}
      keyExtractor={(item, index) => index}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
    :
    <FlatList
    data={DATA}
    renderItem={({ item }) => (
      <PromotionsCard
        image={appImages.dogIcon}
        maintext={"Item Name"}
        subtext={"username want to exchange with item name"}
        pricetext={"78"}
        type={'Expired'}
      />
    )}
    keyExtractor={(item, index) => index}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
  />
}
      </View>
    </SafeAreaView>
  );
};

export default Promotions;
