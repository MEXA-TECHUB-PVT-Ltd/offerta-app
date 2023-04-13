import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  Text,
  useWindowDimensions,
} from "react-native";

//////////////paper//////////////
import { Checkbox } from "react-native-paper";

/////////////render/////////////////
import RenderHtml from "react-native-render-html";

//////////////////app components///////////////
import CustomHeader from "../../../../components/Header/CustomHeader";
import PromotionTopTabs from "../../../../components/TopTabs/PromotionTopTabs";
import CustomButtonhere from "../../../../components/Button/CustomButton";

/////////////app styles////////////////
import styles from "./styles";
import TopTabstyles from "../../../../styles/GlobalStyles/TopTabstyles";

/////////////import colors/////////////
import Colors from "../../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////api function/////////////
import {
  get_Advertisement_Promotions,
  get_Urgent_Promotions,
  post_Promotions,
} from "../../../../api/Sales&Promotions";
import TranslationStrings from "../../../../utills/TranslationStrings";

//////////top tab/////////////

const Promote = ({ navigation, route }) => {
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
  ];
  ////////////////////previous state///////////////
  const [predata] = useState(route.params);

  ///////////////check states//////////////
  const [checked, setChecked] = React.useState(false);

  ////////html render width//////////
  const { width } = useWindowDimensions();

  /////////////urgent tab states/////////////
  const [promotion_id, setPromotion_id] = useState("");
  const [promotion_type, setPromotion_Type] = useState("");
  const [urgent_promotion_price, setUrgent_Promotion_Price] = useState("");
  const [urgent_promotion_feature, setUrgent_Promotion_Feature] = useState("");

  ///////////////advertisement tab states////////////////
  const [advertisement_promotion, setAdvertisement_Promotion] = useState([]);

  const [urgent_promotion_id, setUrgent_promotion_id] = useState("");

  const GetUrgentPromotions = async (props) => {
    get_Urgent_Promotions().then((response) => {
      if (response.data.message === "No data available") {
        setUrgent_Promotion_Price("");
      } else {
        setUrgent_promotion_id(response.data?.id);
        setUrgent_Promotion_Price(response.data.price);
        setUrgent_Promotion_Feature(response.data.title);
      }
    });
  };
  const GetAdvertisementPromotions = async (props) => {
    get_Advertisement_Promotions().then((response) => {
      console.log("response advertisement list", JSON.stringify(response.data));
      if (response.data.message === "No data available") {
        setAdvertisement_Promotion([]);
      } else {
        console.log("response.data  :   ", response.data?.length);
        setAdvertisement_Promotion(response.data);
      }
    });
  };
  const togglePromotions = async (props) => {
    if (props === "Urgent") {
      GetUrgentPromotions();
    } else {
      GetAdvertisementPromotions();
    }
  };
  useEffect(() => {
    GetUrgentPromotions();
  }, []);
  ////////////Create Order//////////
  const Create_Promotions = () => {
    console.log("here we go in:", predata.list_id);
    // console.log({ checked, promotion_id, promotion_type });
    // navigation.navigate("CardDetails");
    let listingID = predata.list_id;
    let promotionID = "";
    let promotionType = "";
    if (selectedId == 1) {
      //urgent
      promotionID = urgent_promotion_id;
      promotionType = "urgent";
    } else {
      const selected_ad = advertisement_promotion?.filter(
        (item) => item?.checked
      );
      if (selected_ad?.length == 0) {
        alert("Please Select Plan");
        return;
      } else {
        promotionID = selected_ad[0]?.id;
        promotionType = "advertisment";
      }
    }

    console.log({ listingID, promotionID, promotionType });
    navigation.navigate("CardDetails", {
      type: "promote",
      listingID: listingID,
      promotionID: promotionID,
      promotionType: promotionType,
    });
    return;

    post_Promotions(predata.list_id, promotion_id, promotion_type).then(
      (response) => {
        console.log("hessdsre we go in:", response.data);
        //setModalVisible(true)
      }
    );
  };

  ////////////select state////////////
  const [selectedId, setSelectedId] = useState("1");
  ///////////////select function/////////////
  const onselect = (item) => {
    setSelectedId(item);
    togglePromotions();
    setChecked(false);
  };
  const renderItem = ({ item, index }) => (
    <PromotionTopTabs
      title={item.title}
      width={"30%"}
      selected={selectedId}
      id={item.id}
      onpress={() => onselect(item.id)}
      type={"sales&orders"}
    />
  );

  const handleCheckbox = (id) => {
    const newData = advertisement_promotion?.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          checked: true,
        };
      } else {
        return {
          ...item,
          checked: false,
        };
      }
    });
    setAdvertisement_Promotion(newData);
  };

  ///////////////Promotions//////////////
  const renderItemPromotions = ({ item, index }) => (
    <View style={{ marginHorizontal: wp(7), alignSelf: "center" }}>
      <View
        style={{
          alignItems: "center",
          marginTop: hp(2),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          {/* <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked), setPromotion_id(item.id);
              setPromotion_Type("advertisment");
              handleCheckbox(item.id)
            }}
          /> */}
          <Checkbox
            status={item?.checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked), setPromotion_id(item.id);
              setPromotion_Type("advertisment");
              handleCheckbox(item.id);
            }}
          />
          <Text style={styles.promotepricetext}>{item.offer_time}</Text>
        </View>
        <Text style={styles.promotepricetext}>{item.price + "$"}</Text>
      </View>
      <View
        style={{
          height: hp(0.3),
          width: wp(85),
          backgroundColor: Colors.icon,
          alignSelf: "center",
          marginTop: hp(2),
        }}
      ></View>
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: wp(5),
          marginTop: hp(2),
        }}
      >
        <Text style={[styles.promotepricetext, { fontSize: hp(2.5) }]}>
          {TranslationStrings.FEATURES}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          // paddingHorizontal: wp(5),
          // backgroundColor: "orange",
          width: wp(90),
        }}
      >
        <RenderHtml
          contentWidth={width}
          source={{ html: item.feature }}
          tagsStyles={tagsStyles}
        />
      </View>
    </View>
  );
  const tagsStyles = {
    p: {
      fontSize: hp(2),
      color: "black",
      width: wp(90),
      marginHorizontal: wp(5),
    },
    ul: {
      marginHorizontal: wp(3),
    },
    li: {
      fontSize: hp(1.7),
      color: "black",
    },
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={TranslationStrings.PROMOTE}
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
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: wp(5),
            color: "black",
          }}
        >
          <Text style={styles.promotetoptext}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, se
          </Text>
        </View>
        {selectedId === "1" ? (
          <View>
            <View style={styles.mainView}>
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                {/* <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked), setPromotion_id("1");
                    setPromotion_Type("urgent");
                  }}
                /> */}
                <Text style={styles.promotepricetext}>1-day</Text>
              </View>
              <Text style={styles.promotepricetext}>
                {TranslationStrings.BUY_AT} {urgent_promotion_price}$
              </Text>
            </View>
            <View
              style={{
                height: hp(0.3),
                width: wp(85),
                backgroundColor: Colors.icon,
                alignSelf: "center",
                marginTop: hp(2),
              }}
            ></View>
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: wp(5),
                marginTop: hp(2),
              }}
            >
              <Text style={[styles.promotepricetext, { fontSize: hp(2.5) }]}>
                {TranslationStrings.FEATURES}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: wp(5),
                width: wp(88),
                alignSelf: "center",
              }}
            >
              <RenderHtml
                contentWidth={width}
                source={{ html: urgent_promotion_feature }}
                tagsStyles={tagsStyles}
              />
            </View>
          </View>
        ) : (
          <View>
            <FlatList
              data={advertisement_promotion}
              renderItem={renderItemPromotions}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            />
          </View>
        )}

        <View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={TranslationStrings.PAY}
            widthset={80}
            topDistance={15}
            onPress={() => {
              Create_Promotions();
              //navigation.navigate('Payment')
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Promote;
