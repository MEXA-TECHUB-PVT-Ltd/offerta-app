import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

//////////app styles/////////////////
import styles from "./styles";

//////////////app Height and width///////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CategoryCard = (props) => {
  return (
    <TouchableOpacity
    activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("SliderScreen", {
          navplace: "Market",
          navtype: item.type,
        })
      }
    >
      <View style={styles.Categoriescard}>
        <View style={{ marginBottom: hp(4), marginTop: hp(5),alignItems:"center" }}>
          <Image source={{uri:props.image}} style={styles.Categoriesimage}
          resizeMode='contain'
          ></Image>
          <Text  style={styles.Categoriestext}>
            {props.maintext}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
