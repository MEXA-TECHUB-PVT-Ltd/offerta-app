import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  View,
  Text,
  useWindowDimensions,
  Linking,
  Button,
} from "react-native";

///////////////app icons///////////////
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

/////////////render/////////////////
import RenderHtml from "react-native-render-html";

///////////////component////////////
import Loader from "../../../components/Loader/Loader";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setName, setAge } from "../../../redux/actions";

////////////////app height and width////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

/////////////////////app styles////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";

/////////////////app images///////////
import { appImages } from "../../../constant/images";

//////////////api function////////////////
import { get_Blogs_By_id } from "../../../api/Blogs";

////////////key ///////////////////
import { GoogleApiKey } from "../../../utills/GoogleApiKey";

import VideoPlayer from "react-native-video-player";
import YoutubePlayer from "react-native-youtube-iframe";

const BlogsDetails = ({ navigation, route }) => {
  console.log("here props:", route.params);

  //////////////////previous data/////////
  const [predata] = useState(route.params);

  ///////////////////loader loading state///////////////
  const [loading, setloading] = useState(true);

  //////////////redux///////////////
  const { name, age } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  //////////render html width///////////
  const { width } = useWindowDimensions();

  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  //camera and imagepicker
  const refRBSheet = useRef();

  ////////////////data States/////////
  const [blog_name, setBlog_Name] = useState();
  const [blog_description, setBlog_Description] = useState();
  const [blog_reference, setBlog_Reference] = useState();
  const [cover_video, setCover_Video] = useState();
  const [cover_image, setCover_Image] = useState();
  const [cover_image_status, setCover_Image_Status] = useState(true);

  useEffect(() => {
    get_Blogs_By_id(predata.blog_id).then((response) => {
      console.log("here data:", response.data);
      if (response.data.message === "No data available") {
        setBlog_Name("");
        setBlog_Description("");
        setBlog_Reference("");
        setCover_Video("");
        setCover_Image("");
        setloading(false);
      } else {
        setBlog_Name(response.data[0].title);
        setBlog_Description(response.data[0].description);
        setBlog_Reference(response.data[0].reference);
        setCover_Video(response.data[0].cover_video.includes('v='.toLowerCase())?response.data[0].cover_video.split("v=")[1].split("&")[0]:null)
        setCover_Image(response.data[0].cover_img);
        setloading(false);
      }
    });
  }, []);
  const handlePress = () => {
    Linking.openURL(blog_reference);
  };

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
    div: {
      color: "black",
      width: wp(90),
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <StatusBar backgroundColor={"black"} barStyle="light-content" />
        <Loader isLoading={loading} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            paddingHorizontal: wp(2),
            height: hp(6),
            alignItems: "center",
          }}
        >
          <Icon
            name={"arrow-back"}
            size={25}
            color={Colors.Appthemecolor}
            onPress={() => navigation.goBack()}
            style={{ marginLeft: wp(3) }}
          />
          {cover_image_status === true ? (
            <Icon
              name={"play-circle"}
              size={25}
              color={Colors.Appthemecolor}
              onPress={() => setCover_Image_Status(false)}
              style={{ marginLeft: wp(3) }}
            />
          ) : (
            <Icon
              name={"image"}
              size={25}
              color={Colors.Appthemecolor}
              onPress={() => setCover_Image_Status(true)}
              style={{ marginLeft: wp(3) }}
            />
          )}
        </View>
        <View></View>
        {cover_image_status === false ? (
          <YoutubePlayer
            height={200}
            play={playing}
            videoId={cover_video}
            onChangeState={onStateChange}
          />
        ) : (
          <Image
            source={{
              uri: "https://teamsuit.co/offertaFinal/admin/" + cover_image,
            }}
            style={{ height: hp(48), width: wp(100) }}
            resizeMode="cover"
          />
        )}

        <View
          style={{
            marginTop: hp(5),
            marginHorizontal: wp(5),
            marginBottom: hp(2),
          }}
        >
          <Text style={styles.maintext}>
            {blog_name}
            {cover_video}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(5),
          }}
        >
          <Text style={styles.lefttext}>Referrences</Text>
          <Text style={styles.righttext} onPress={() => handlePress()}>
            {blog_reference}
          </Text>
        </View>
        <View
          style={{
            marginTop: hp(2),
            marginHorizontal: wp(5),
            marginBottom: hp(2),
          }}
        >
          <Text style={styles.lefttext}>Description</Text>
        </View>
        <View style={{ marginHorizontal: wp(5), marginBottom: hp(2) }}>
          <View style={{ alignItems: "center" }}>
            <RenderHtml
              contentWidth={width}
              source={{ html: blog_description }}
              tagsStyles={tagsStyles}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogsDetails;
