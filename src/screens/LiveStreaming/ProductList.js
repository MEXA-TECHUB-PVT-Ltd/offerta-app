import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { fontFamily } from "../../constant/fonts";
import Colors from "../../utills/Colors";

const ProductList = ({ data }) => {
  return (
    <View>
      <FlatList
        fadingEdgeLength={100}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <>
              <Card
                style={{
                  ...styles.card,
                  opacity: item?.sold ? 0.5 : 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image source={item?.image} style={styles.cardImage} />

                  <View style={{ flex: 1 }}>
                    <View style={styles.rowView}>
                      <Text style={styles.boldText}>{item?.name}</Text>
                      <Text style={styles.boldText}>{item?.price}$</Text>
                    </View>
                    <View style={styles.rowView}>
                      <Text style={styles.mediumText}>
                        Quantity:
                        <Text style={styles.lightText}>{item?.quantity}</Text>
                      </Text>

                      <TouchableOpacity style={styles.tag}>
                        <Text style={styles.tagText}>Buy</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Card>
              {item?.sold && (
                <View
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    top: 20,
                    zIndex: 999,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#F86E0B",
                      width: 120,
                      paddingVertical: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 30,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: fontFamily.Poppins_Regular,
                        marginBottom: -3,
                        fontSize: 13,
                      }}
                    >
                      SOLD OUT
                    </Text>
                  </View>
                </View>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginBottom: 8,
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  cardImage: {
    height: 50,
    width: 50,
    borderRadius: 10,
    resizeMode: "stretch",
    // marginHorizontal: 10,
    // marginLeft: 10,
    marginRight: 12,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boldText: {
    fontFamily: fontFamily.Poppins_Bold,
    color: Colors.Appthemecolor,
  },
  mediumText: {
    fontFamily: fontFamily.Poppins_Medium,
    color: Colors.Appthemecolor,
  },
  lightText: {
    fontFamily: fontFamily.Poppins_Regular,
    color: Colors.Appthemecolor,
  },
});
