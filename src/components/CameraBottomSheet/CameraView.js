import "react-native-gesture-handler";
import React, { useState, useRef } from "react";
import {
  ScrollView,
  ImageBackground,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, TouchableRipple, Appbar } from "react-native-paper";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setItemImagesArray } from "../../redux/actions";

//////////////////app color/////////////////
import Colors from "../../utills/Colors";

////////////////app image picker/////////////////
import ImagePicker from "react-native-image-crop-picker";

/////////////////app icons//////////////
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

//////////////App Heigth and width///////////////
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function CameraViewScreen({ route, navigation }) {
  /////////////redux states///////
  const { item_images_array } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const scrollRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  ///////////////camera mode///////////
  const[camera_mode,setCamera_Mode]=useState(true)

  ///////////toggle camera mode////////////
  const togglecamera=()=>{
    if(camera_mode === true)
    {
      setCamera_Mode(false)
    }
    else
    {
      setCamera_Mode(true)
    }
  }

  const takePhotoFromCamera = async () => {
 await ImagePicker.openCamera({
      // width: 500,
      // height: 500,
      //cropping: true,
      useFrontCamera: camera_mode,
      //compressImageQuality: 0.7,
    }).then((image) => {
      setImage(image.path);
      setImages([...images, image]);
      dispatch(
        setItemImagesArray([
          ...data,
          {
            path: image.path,
          },
        ])
      );
      setData([
        ...data,
        {
          path: image.path,
        },
      ]);

      scrollRef.current.scrollToEnd();
    });
  };
  ////////////////////library image//////////////////
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      //cropping: true,
     // compressImageQuality: 0.7,
    }).then(image => {
      setImage(image.path);
      setImages([...images, image]);
      dispatch(
        setItemImagesArray([
          ...data,
          {
            path: image.path,
          },
        ])
      );
      setData([
        ...data,
        {
          path: image.path,
        },
      ])
      scrollRef.current.scrollToEnd();
    })
  };
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{
          backgroundColor: "white",
        }}
      >
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={""} />
        <Appbar.Action icon="send" color={Colors.Appthemecolor} onPress={() => {
         navigation.goBack();
    }} />
      </Appbar.Header>
      <View
        style={{
          flex: 0.77,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.appgreycolor,
        }}
      >
        {image == null ? (
          <View
            style={{
              borderRadius: 10,
              width: wp(98),
              height: hp(70),
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: Colors.appgreycolor,
              borderStyle: "dashed",
            }}
          >
            <Text>No Image Selected</Text>
          </View>
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              resizeMode:"cover",
              padding: 10,
              borderRadius: wp(1),
              width: wp(98),
              height: hp(70),
            }}
          />
        )}
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingHorizontal: wp(3),
          position: "absolute",
          bottom: hp(10.3),
        }}
      >
        {images.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setImage(item.path);
              setVisible(true);
            }}
            key={index}
          >
            <ImageBackground
              source={{ uri: item.path }}
              style={{
                width: wp(17.3),
                height: hp(8.5),
                backgroundColor: "white",
                
                marginRight: 10,
              }}
              imageStyle={{
                borderRadius: wp(1),
                borderWidth: 0.3,
                borderColor: Colors.appgreycolor,
              }}
            >
              <TouchableRipple
                onPress={() => {
                  images.splice(index, 1);
                  setImages([...images]);
                }}
              >
                <Ionicons
                  name="close-circle"
                  size={25}
                  color={Colors.appgreycolor}
                  style={{
                    right: -10,
                    top: -3,
                    position: "absolute",
                  }}
                />
              </TouchableRipple>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: wp(100),
          alignItems: "center",
          position: "absolute",
          bottom: image == null ? hp(2) : hp(2),
          paddingHorizontal: wp(5),
        }}
      >
            <TouchableOpacity
          onPress={() => {
            choosePhotoFromLibrary();
          }}
          activeOpacity={0.8}
        >
        <Ionicons name="image" size={wp(8)} color={"#404040"} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            takePhotoFromCamera();
          }}
          activeOpacity={0.8}
          style={{
            width:wp(17),
            height: hp(8.3),
            backgroundColor: Colors.Appthemecolor,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
        >
          <View
            style={{
              width:wp(14.8),
              height: hp(7.5),
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
          >
            <View
              style={{
                width: wp(13.8),
                height: hp(7),
                backgroundColor: Colors.Appthemecolor,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
            ></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            togglecamera();
          }}
          activeOpacity={0.8}
        >
        <Ionicons name="camera-reverse" size={wp(8)} color={"#404040"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CameraViewScreen;
