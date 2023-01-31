import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  TextInput,
  ScrollView,
  Keyboard,
  Image,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";

///////////////app components////////////////
import CustomButtonhere from "../../components/Button/CustomButton";
import CustomModal from "../../components/Modal/CustomModal";
import CustomTextInput from "../../components/TextInput/CustomTextInput";
import CustomHeader from "../../components/Header/CustomHeader";
import CamerBottomSheet from "../../components/CameraBottomSheet/CameraBottomSheet";

////////////////app pakages////////////
import { Snackbar } from "react-native-paper";

//////////////////app icons/////////////
import Ionicons from "react-native-vector-icons/Ionicons";

/////////////app styles///////////////////
import styles from "./styles";
import Colors from "../../utills/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

 //////////////app pakages//////////////////
 import ImagePicker from 'react-native-image-crop-picker';

 ///////////upload image///////////////
 import RNFetchBlob from 'rn-fetch-blob';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {setUserImage
} from '../../redux/actions';

////////////////////app images////////
import { appImages } from "../../constant/images";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fontFamily } from "../../constant/fonts";

const CreateProfile = ({ navigation,route }) => {

  /////////////previous data////////////
  const[predata]=useState(route.params)

  /////////////////////////redux///////////////////
  const {user_image} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

    //camera and imagepicker
    const refRBSheet = useRef();

    ///////////picker state/////////
    const [image, setImage] = useState('')
  
    //////////////////////cameraimage//////////////////
    const takePhotoFromCamera = () => {
  
      ImagePicker.openCamera({
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        cropping: true,
        compressImageQuality: 0.7
      }).then(image => {
        refRBSheet.current.close()
        console.log(image);
        setImage(image.path);
      });
    }
    ////////////////////library image//////////////////
    const choosePhotoFromLibrary = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7
      }).then(image => {
        refRBSheet.current.close()
        console.log(image);
        setImage(image.path);
      });
    }

 ///////////////data states////////////////////
 const [username,  setusername] = React.useState();
 const [fname, setfname] = React.useState();
 const [lname, setlname] = React.useState();

//////////////////////Api Calling/////////////////
const CreateProfile = async() => {
  
  console.log("image",user_image,"email",predata.useremail,"username",username,fname,lname)
  const newUrl = user_image == '' ? null : user_image.replace('file:///', 'file://')
  console.table("response image:",newUrl)
  const data = [
    {name:'profile', filename:'avatar-png.png', type: 'image/foo', data: RNFetchBlob.wrap(user_image) },
    {name:'email',data:predata.useremail},
    {name:'username',data:username},
    {name:'fullName',data:fname+lname},
  ]
  RNFetchBlob.fetch('POST',   BASE_URL+"createProfile.php", {
    Authorization: "Bearer access-token",
    otherHeader: "foo",
    'Content-Type': 'multipart/form-data',
  }, data)
    .then((response) => response.json())
    .then( async (response) => {
      console.log("response here in create profile:",response.data)
      await AsyncStorage.setItem("Userid", response.data.id);
      navigation.navigate("Drawerroute")
    })
    .catch((error) => {
      alert('error' + error)

    })
 }

  //Api form validation
  const formValidation = async () => {
    // input validation
    if (username == "") {
      setsnackbarValue({ value: "Please Enter Email", color: "red" });
      setVisible("true");
    }  else if (fname == "") {
      setsnackbarValue({ value: "Please Enter Password", color: "red" });
      setVisible("true");
    }  else if (lname == "") {
      setsnackbarValue({
        value: "Please Enter Confirm Password",
        color: "red",
      });
      setVisible("true");
    }  else {
      setloading(1);
      setdisable(1);
      CreateProfile();
    }
  };

   useEffect(() => {
     //Getuser()
   }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
                       <StatusBar backgroundColor={'#26295E'} barStyle="light-content" />
         <CustomHeader
                headerlabel={'Create Profile'}
                iconPress={() => { navigation.goBack() }}
                icon={'arrow-back'}
                type={'singleicon'}
            />

        <View>

<View style={styles.userimage}>
{user_image != '' ?
        <TouchableOpacity onPress={()=> refRBSheet.current.open()}>
                  <Image
                    source={{ uri: user_image }}
                    style={styles.image}
                    resizeMode='contain'/>
        </TouchableOpacity>

                :
                    <TouchableOpacity onPress={()=> refRBSheet.current.open()}>
            <Image
            source={appImages.User}
            style={{ width: wp(10), height: hp(5),
             }}
             resizeMode='contain' />
                 </TouchableOpacity>
              }
     <TouchableOpacity onPress={()=> refRBSheet.current.open()}
     style={{position:"absolute",bottom:hp(0),right:wp(0)}}
     >
    <Image
            source={appImages.Camera}
            style={{ width: wp(12), height: hp(6),position:"absolute",bottom:hp(0),right:wp(0)
             }}
             resizeMode='contain'/>
     </TouchableOpacity>


</View>
          <View>
            <CustomTextInput
              icon={appImages.email}
              type={"withouticoninput"}
              term={username}
              returnType={"next"}
              onNext={() => { ref_input2.current.focus() }}
              placeholder="Enter Username"
              onTermChange={(newUsername) => setusername(newUsername)}
            />
            <CustomTextInput
                onRef={ref_input2}
              icon={appImages.lock}
              type={"withouticoninput"}
              term={fname}
              returnType={"next"}
              onNext={() => { ref_input2.current.focus() }}
              placeholder="Enter First Name"
              onTermChange={(newFname) => setfname(newFname)}
            />
                     <CustomTextInput
                         onRef={ref_input3}
              icon={appImages.lock}
              type={"withouticoninput"}
              term={lname}
              placeholder="Enter Last Name"
              onTermChange={(newLname) => setlname(newLname)}
            />
          </View>
        </View>
        <View style={{ flex:0.7,marginTop: hp(0) ,marginBottom:hp(20)}}>
          <CustomButtonhere
            title={"CREATE"}
            widthset={80}
            topDistance={18}
            loading={loading}
            disabled={disable}
            onPress={() => {
              formValidation();
            }}
          />
        </View>
        <CamerBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={'From Gallery'}
        type={'onepic'}
        takePhotoFromCamera={takePhotoFromCamera}
        choosePhotoFromLibrary={choosePhotoFromLibrary}
      />
            <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom: hp(20),
            zIndex: 999,
          }}
        >
          {snackbarValue.value}
        </Snackbar>
        <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.failed}
              text={'Error'}
              subtext={'User Already Registered'}
          buttontext={'GO BACK'}
 onPress={()=> {setModalVisible(false)}}
                /> 
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateProfile;
