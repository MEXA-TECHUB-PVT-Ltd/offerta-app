import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
} from "react-native";
import React from "react";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("screen");

import VideoPlayer from "react-native-video-player";

//////////////////api url//////////////
import { IMAGE_URL } from "../../utills/ApiRootUrl";

const SlideItem = ({ item }) => {
  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    //duration: 1000,
    useNativeDriver: true,
    //easing: Easing.bounce,
  }).start();

  return (
    <View style={[styles.container]}>
      {item?.type == "video" ? (
        <VideoPlayer
          // uri: IMAGE_URL + item?.path,
          video={{
            uri: item?.path,
          }}
          style={{ backgroundColor: "#000" }}
          videoWidth={wp(100)}
          videoHeight={hp(45)}
          thumbnail={{ uri: "https://i.picsum.photos/id/866/1600/900.jpg" }}
        />
      ) : (
        <ImageBackground
          blurRadius={3}
          resizeMode="cover"
          source={{ uri: IMAGE_URL + item }}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Animated.Image
            source={{ uri: IMAGE_URL + item }}
            resizeMode="contain"
            style={[styles.image]}
          />
        </ImageBackground>
      )}
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 2.3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
    //alignItems: 'center',
    //backgroundColor:'red'
  },
  image: {
    flex: 1,
    width: width,
    // height:height/2.3,
  },
});
