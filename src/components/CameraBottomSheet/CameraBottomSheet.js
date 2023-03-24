import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Divider } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

////////////app pakages////////////////
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import RBSheet from "react-native-raw-bottom-sheet";

///////////////app styles//////////////////
import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setUserImage, editUserImage } from "../../redux/actions";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from "rn-fetch-blob";

//////////////app pakages//////////////////
import ImagePicker from "react-native-image-crop-picker";

//////////////////app Images////////////////
import { appImages } from "../../constant/images";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CamerBottomSheet = (props) => {
  const navigation = useNavigation();

  /////////////redux states///////
  const { nav_place } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ///////////picker state/////////
  const [image, setImage] = useState("");

  //////////////////////cameraimage//////////////////
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      props.refRBSheet.current.close();
      if (props?.type == "verify") {
        props?.onCameraImageSelect(image);
      } else {
        props?.type1 === "editProfile" && handleUpdateUserProfile(image);
        props.type === "Chat_image"
          ? Uploadpic(image)
          : dispatch(setUserImage(image.path));
        setImage(image.path);
      }
    });
  };
  ////////////////////library image//////////////////
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      props.refRBSheet.current.close();
      if (props?.type == "verify") {
        props?.onGalleryImageSelect(image);
      } else {
        props?.type1 === "editProfile" && handleUpdateUserProfile(image);
        props.type === "Chat_image"
          ? Uploadpic(image)
          : dispatch(setUserImage(image.path));

        setImage(image.path);
      }
    });
  };

  const handleUpdateUserProfile = async (image) => {
    console.log("updated user profile called  .....", image);
    if (image) {
      let user_id = await AsyncStorage.getItem("Userid");

      console.log("user_id  ______________________________________", user_id);
      const formData = new FormData();
      formData.append("id", user_id);
      let obj = {
        uri: image.path,
        type: image.mime,
        name: image?.path?.split("/")?.pop(),
      };
      formData.append(`profile`, obj);

      fetch(BASE_URL + "updateProfilePicture.php", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log("update user profile response :", responseData);
          // dispatch(setUserImage(responseData.image));
          dispatch(setUserImage(image.path));
        })
        .catch((err) => {
          console.log("error raised while updating user image : ", err);
        });
    }
  };
  const [selectedimage, setselectedimage] = useState(false);
  /////////////////image api calling///////////////
  const Uploadpic = (file) => {
    const formData = new FormData();
    formData.append(`image`, {
      uri: file.path,
      type: "image/jpeg",
      name: "image.jpg",
    });

    fetch(BASE_URL + "uploadImage.php", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData  ::    ", responseData);
        dispatch(setUserImage(responseData.image));
        props.onImageUpload(responseData.image);
      });
  };
  return (
    <RBSheet
      ref={props.refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      animationType="fade"
      minClosingHeight={0}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(52, 52, 52, 0.5)",
        },
        draggableIcon: {
          backgroundColor: "white",
        },
        container: {
          borderTopLeftRadius: wp(10),
          borderTopRightRadius: wp(10),
          height: hp(25),
        },
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: wp(8),
          alignItems: "center",
        }}
      >
        <Text style={styles.maintext}>Upload Image</Text>
        <TouchableOpacity onPress={() => props.refRBSheet.current.close()}>
          <Ionicons
            name="close"
            size={22}
            color={"#303030"}
            onPress={() => props.refRBSheet.current.close()}
          />
          {/* <Image
               source={appImages.Closeicon}
                  style={styles.icons}
                  resizeMode='contain'
              /> */}
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: "center", marginTop: hp(3) }}>
        <TouchableOpacity
          onPress={() => {
            props.type === "onepic" ||
            props.type === "Chat_image" ||
            props.type === "verify"
              ? takePhotoFromCamera()
              : navigation.navigate("CameraViewScreen", "Take Photo"),
              props.refRBSheet.current.close();
          }}
          //onPress={props.takePhotoFromCamera}
          style={styles.modaltextview}
        >
          <Ionicons name="camera" size={25} color={"#707070"} />

          <Text style={styles.optiontext}>Upload from Camera</Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: "#DCDCDC",
            borderBottomWidth: 1,
            width: wp(85),
            alignSelf: "center",
            marginBottom: hp(2),
            marginTop: hp(2),
          }}
        ></View>
        <TouchableOpacity
          onPress={() => {
            props.type === "onepic" ||
            props.type === "Chat_image" ||
            props.type === "verify"
              ? choosePhotoFromLibrary()
              : navigation.navigate("CameraViewScreen", "Take Photo"),
              props.refRBSheet.current.close();
          }}
          style={styles.modaltextview}
        >
          <Ionicons name="image" size={25} color={"#707070"} />
          {/* <Image
                 source={require('../../assets/imagepicker/gallery.png')}
                 style={styles.uploadicon}
                  resizeMode='contain'
              /> */}
          <Text style={styles.optiontext}>Upload from Gallery</Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default CamerBottomSheet;
