import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, View } from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../../components/Header/CustomHeader";
import ExcahangeOffersCards from "../../../../components/CustomCards/ExchangeOffersCards";
import NoDataFound from "../../../../components/NoDataFound/NoDataFound";

/////////////app styles////////////////
import styles from "./styles";

/////////////////api function//////////////////
import { get_outgoing_Exchnages } from "../../../../api/GetExchanges";

///////////////image url//////////////////////
import { IMAGE_URL } from "../../../../utills/ApiRootUrl";

const OutGoingExchange = ({ navigation }) => {
  ////////////////LIST DATA/////////
  const [data, setdata] = useState();

  useEffect(() => {
    //getdat()
    get_outgoing_Exchnages().then((response) => {
      if (response.data.msg === "No Result") {
        setdata("");
      } else {
        setdata(response.data);
      }
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={"Out going Exchanges"}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"chevron-back"}
      />
      <View style={{ flex: 1 }}>
        {data === "" ? (
          <NoDataFound icon={"exclamation-thick"} text={"No Data Found"} />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              // console.log("item.item.user::", item.user_item.title)
              <ExcahangeOffersCards
                image={
                  item.user_item.images[0] === []
                    ? null
                    : IMAGE_URL + item.user_item.images[0]
                }
                image2={
                  item.user2_item.images[0] === []
                    ? null
                    : IMAGE_URL + item.user2_item.images[0]
                }
                maintext={item.user_item.title}
                maintext2={item.user2_item.title}
                // subtext={item.user2_item.description}
                // pricetext={item.user2_item.price}
              />
            )}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default OutGoingExchange;
