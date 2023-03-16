import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  TouchableOpacity,
  Button,
  TextInput,
} from "react";
import {
  SafeAreaView,
  View,
  Image,
  PermissionsAndroid,
  Text,
} from "react-native";

///////////////import app components/////////////
import CamerBottomSheet from "../../../components/CameraBottomSheet/CameraBottomSheet";

//////////////////app icons////////////////
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

////////////////app styles/////////////////////
import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////app pakages//////////////////
import ImagePicker from "react-native-image-crop-picker";

//////////////app components///////////////////
import ChatHeader from "../../../components/Chat/ChatHeader";

///////////////////app Packages//////////////
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Composer,
} from "react-native-gifted-chat";

//////////////furestore/////////////
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import {
  setExchangeOffer_MyListing,
  setExchangeOffer_OtherListing,
} from "../../../redux/actions";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////app images///////////////
import { appImages } from "../../../constant/images";
import Colors from "../../../utills/Colors";

////////////////api function////////////
import { post_User_Chat_Room } from "../../../api/ChatApis";

/////////////////////get api function////////////
import { get_Other_UserData } from "../../../api/GetApis";

import { useIsFocused  } from '@react-navigation/native';

const ChatScreen = ({ route, navigation }) => {
  console.log("here in chat",route.params)

  const isFocused = useIsFocused();

  ////////////////redux/////////////
  const { exchange_other_listing, exchange_my_listing, user_image } =
    useSelector((state) => state.userReducer);

  ////////////previos data//////////
  const [predata] = useState(route.params);

  ////////Bottom sheet references/////////
  const refRBSheet = useRef();

  /////////////////create room chat//////////
  const Chat_Room = (props) => {
    post_User_Chat_Room(props).then((response) => {});
  };

  //////////////chat states/////////////
  const [messages, setMessages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  /////////////login user//////////
  const [login_user, setLoginUser] = useState("");

  /////////get login user//////////
  const getUserMessages = async () => {
    var user = await AsyncStorage.getItem("Userid");
    setLoginUser(user);
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const AllMessages = async () => {
    var user = await AsyncStorage.getItem("Userid");
    const doc_id =
      route.params.userid > user
        ? user + "-" + route.params.userid
        : route.params.userid + "-" + user;

    const messageRef = firestore()
      .collection("chats")
      .doc(doc_id)
      .collection("messages")
      .orderBy("createdAt", "desc");

    messageRef.onSnapshot((querySnap) => {
      const allmsg = querySnap.docs.map((docsnap) => {
        const data = docsnap.data();
        if (data.createdAt) {
          return {
            ...docsnap.data(),
            createdAt: docsnap.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docsnap.data(),
            createdAt: new Date(),
          };
        }
      });
      //console.log("here all messages",allmsg)
      setCount(count+1)
      setMessages(allmsg);
    });
  };
  const ref = useRef();
  /////////////user data states/////////////
  const [username, setUsername] = useState("");
  const [userimage, setImage] = useState("");
  const GetUserData = async () => {
    get_Other_UserData(route.params.userid).then((response) => {
      console.log('yuser data:',response.data)
      setUsername(response.data.full_name);
      setImage(response.data.image);
      //AllMessages();
    });
  };

  const[count,setCount]=useState(0)
  const countfunc=()=>{
    if (count === 0) {
      setCount(count+1),
      onSend(),
      setExchangeOffer_OtherListing(""),
      setExchangeOffer_MyListing("")
        }
  }
  useEffect(() => {

    if (count === 0) {
      setCount(count+1),
      onSend(),
      setExchangeOffer_OtherListing(""),
      setExchangeOffer_MyListing("")
        }
        console.log("previous data", predata,count);
    GetUserData();

    //getUserMessages()
    requestCameraPermission();
  
  }, [isFocused]);
  const onSend = useCallback((messages = []) => {
    //console.log("here data", messages);
    setCount(count+1)
    handleSend(messages);
    Chat_Room(route.params.userid);
  }, []);
  const handleSend = async (messageArray) => {
    console.log("here chat message value array", messageArray);
    var user = await AsyncStorage.getItem("Userid");
    const docid =
      route.params.userid > user
        ? user + "-" + route.params.userid
        : route.params.userid + "-" + user;

    let myMsg = null;
   // var count = 0;
    // if (imageUrl !== "") {
    //   const msg = messageArray[0];
    //   myMsg = {
    //     ...msg,
    //     //text: "price hree",
    //     senderId: user,
    //     receiverId: route.params.userid,
    //     image: imageUrl,
    //     user: {
    //       _id: user,
    //       name: "ali",
    //     },
    //   };
    // } else {
    const msg = messageArray[0];
    console.log("here chat message value", msg);
    route.params.navtype === "price_offer"
      ? (myMsg = {
          ...msg,
          textimg1: exchange_other_listing.images[0],
          textprice: route.params.item_price,
          offerprice: route.params.offerprice,
          offerid: route.params.offerid,
          type: "price_offer",
          senderId: user,
          receiverId: route.params.userid,
          user: {
            _id: user,
            name: "ali",
          },
        })
      : route.params.navtype === "exchange_offer" && count===0
      ? (myMsg = {
          ...msg,
          text:"exchange_offer" ,
          textimg1: exchange_other_listing.images[0],
          textimg2: exchange_my_listing.images[0],
          textprice1: route.params.itemprice1,
          textprice2: route.params.itemprice2,
          itemname1: route.params.item1,
          itemname2: route.params.item2,
          type: "exchange_offer",
          senderId: user,
          receiverId: route.params.userid,
          user: {
            _id: user,
            name: "ali",
          },
          count:1
        })
      : route.params.navtype === "chatlist" && user_image === ""
      ? (myMsg = {
          ...msg,
          type: "simple_text",
          senderId: user,
          receiverId: route.params.userid,
          user: {
            _id: user,
            name: "ali",
          },
        })
      : route.params.navtype === "chatlist"
      ? (myMsg = {
          ...msg,
          text_image: user_image,
          type: "image_text",
          senderId: user,
          receiverId: route.params.userid,
          user: {
            _id: user,
            name: "ali",
          },
        })
      : (myMsg = {
        ...msg,
        text_image:"image",
        //type: "image_text",
        senderId: user,
        receiverId: route.params.userid,
        user: {
          _id: user,
          name: "ali",
        },
      })
    //}
    setExchangeOffer_MyListing("");
    setExchangeOffer_OtherListing("");
    setCount(count+1)
    //countfunc()
    setMessages([]);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg),
    );
    firestore()
      .collection("chats")
      .doc(docid)
      .collection("messages")
      .add({
        ...myMsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    messages.forEach((message) => {});
   // myMsg = "";
   setCount(count+1)
    AllMessages();
    setImageUrl("");
    setImageData(null);
  };

  ////////////////////library image//////////////////
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log("here image", image.path);
      setImageData(image.path);
      //uplaodImage(image)
      handleImageUpload(
        image.path.substring(image.path.lastIndexOf("/") + 1),
        image.path
      );
    });
  };

  const handleImageUpload = useCallback(async (fileName, filePath) => {

    try {
      if (!fileName) return;
      // let fileName = file?.path?.split('/').pop();

      const uploadTask = storage().ref().child(fileName).putFile(filePath);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          // );
        },
        (error) => {
          // alert(error);
        },
        async () => {
          const url = await storage().ref(fileName).getDownloadURL();
       
          setImageUrl(url);
          //onSend(message)
          //handleSend(message, url, );
        }
      );
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const CustomInputToolbar = (props) => {

    return (
      <View
        style={{
          // justifyContent: "center",
          // alignItems: "center",
          bottom: hp(3),
          height: hp(10),
          borderWidth: hp(0.1),
          paddingBottom: hp(3),
          borderColor: Colors.inactivetextinput,
          borderTopRightRadius: wp(3),
          borderTopLeftRadius: wp(3),
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        {/* <View
          style={{
            backgroundColor: "red",
            position: "absolute",
            top: 0,
            left: wp(2),
            width: "100%",
          }}
        > */}
        <InputToolbar
          {...props}
          containerStyle={{
            //   backgroundColor: 'red',
            height: hp(7),
            borderColor: "#ccc",
            borderTopColor: "#ccc",
            borderWidth: 0.3,
            borderRadius: wp(5),
            marginLeft: wp(5),
            width: wp(76),
            position: "absolute",
            top: 0,
            left: wp(2),
            bottom: hp(0),
            marginTop: hp(1),
          }}
          textInputStyle={{ color: "black" }}
          // renderComposer={(props) => (
          //   <Composer
          //     {...props}
          //     textInputProps={{
          //       value:
          //         route.params.navtype === "price_offer"
          //           ? "Price Offer"
          //           : route.params.navtype === "exchange_offer"
          //           ? "Exchange Offer"
          //           : "",
          //     }}
          //   />
          // )}
        />
        {/* <TouchableOpacity onPress={()=> choosePhotoFromLibrary()}> */}
        <View style={{ position: "absolute", top: hp(3) }}>
          <MaterialCommunityIcons
            name={"camera"}
            size={30}
            color={"black"}
            onPress={() => refRBSheet.current.open()}
          />
        </View>
        {/* </TouchableOpacity> */}

        {/* </View> */}
      </View>
    );
  };

  const SendComponent = (props) => {
    return (
      <Send
        {...props}
        containerStyle={{
          borderWidth: 0,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: hp(6),
            width: wp(12),
            borderRadius: wp(10),
            position: "absolute",
            bottom: hp(0),
            left: wp(2),
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Image
            source={appImages.sendicon}
            style={{
              height: 20,
              width: 20,
              resizeMode: "contain",
            }}
          />
        </View>
      </Send>
    );
  };
  const CustomBubbleText = (props) => {
    //console.log("here daata of msg:",props)
    return (
      <View>
        {props.currentMessage.type === "price_offer" ? (
          <View style={styles.p_mainview}>
            <Image
              source={{ uri: IMAGE_URL + props.currentMessage.textimg1 }}
              style={styles.p_image}
              resizeMode="cover"
            />
            <View style={{}}>
              <Text
                style={styles.p_text}
                onPress={() =>
                  navigation.navigate("PriceOfferNoti", {
                    item_img: props.currentMessage.textimg1,
                    offer_price: props.currentMessage.offerprice,
                    offerid: props.currentMessage.offerid,
                    itemprice: props.currentMessage.textprice,
                    navtype: "chat",
                    userid: props.currentMessage.receiverId,
                  })
                }
              >
                {"Item Price " + props.currentMessage.textprice}
              </Text>
              <Text
                style={styles.p_text}
                onPress={() =>
                  navigation.navigate("PriceOfferNoti", {
                    item_img: props.currentMessage.textimg1,
                    offer_price: props.currentMessage.offerprice,
                    offerid: props.currentMessage.offerid,
                    itemprice: props.currentMessage.textprice,
                    navtype: "chat",
                    userid: props.currentMessage.receiverId,
                  })
                }
              >
                {"Offer Price " + props.currentMessage.offerprice}
              </Text>
            </View>
          </View>
        ) : props.currentMessage.type === "exchange_offer" ? (
          <View>
            <View style={styles.e_mainview}>
              <View style={styles.e_itemview}>
                <Image
                  source={{ uri: IMAGE_URL + props.currentMessage.textimg1 }}
                  style={styles.e_image}
                  resizeMode="contain"
                />
                <Text
                  style={styles.e_text}
                  onPress={() =>
                    navigation.navigate("ExchangeNoti", {
                      item_img1: props.currentMessage.textimg1,
                      item_img2: props.currentMessage.textimg2,
                      itemprice1: props.currentMessage.textprice1,
                      itemname1: props.currentMessage.itemname1,
                      itemname2: props.currentMessage.itemname2,
                      itemprice2: props.currentMessage.textprice2,
                      navtype: "chat",
                      userid: props.currentMessage.receiverId,
                    })
                  }
                >
                  {props.currentMessage.itemname1}
                </Text>
                <Text
                  style={styles.e_text}
                  onPress={() =>
                    navigation.navigate("ExchangeNoti", {
                      item_img1: props.currentMessage.textimg1,
                      item_img2: props.currentMessage.textimg2,
                      itemname1: props.currentMessage.itemname1,
                      itemname2: props.currentMessage.itemname2,
                      itemprice1: props.currentMessage.textprice1,
                      itemprice2: props.currentMessage.textprice2,
                      navtype: "chat",
                      userid: props.currentMessage.receiverId,
                    })
                  }
                >
                  {props.currentMessage.textprice2}
                </Text>
              </View>

              <MaterialCommunityIcons
                name={"swap-horizontal-bold"}
                size={30}
                color={"white"}
                //onPress={() => navigation.toggleDrawer()}
              />
              <View style={styles.e_itemview}>
                <Image
                  source={{ uri: IMAGE_URL + props.currentMessage.textimg2 }}
                  style={styles.e_image}
                  resizeMode="contain"
                />
                <Text
                  style={styles.e_text}
                  onPress={() =>
                    navigation.navigate("ExchangeNoti", {
                      item_img1: props.currentMessage.textimg1,
                      item_img2: props.currentMessage.textimg2,
                      itemname1: props.currentMessage.itemname1,
                      itemname2: props.currentMessage.itemname2,
                      itemprice1: props.currentMessage.textprice1,
                      itemprice2: props.currentMessage.textprice2,
                      navtype: "chat",
                      userid: props.currentMessage.receiverId,
                    })
                  }
                >
                  {props.currentMessage.itemname2}
                </Text>
                <Text
                  style={styles.e_text}
                  onPress={() =>
                    navigation.navigate("ExchangeNoti", {
                      item_img1: props.currentMessage.textimg1,
                      item_img2: props.currentMessage.textimg2,
                      itemname1: props.currentMessage.itemname1,
                      itemname2: props.currentMessage.itemname2,
                      itemprice1: props.currentMessage.textprice1,
                      itemprice2: props.currentMessage.textprice2,
                      navtype: "chat",
                      userid: props.currentMessage.receiverId,
                    })
                  }
                >
                  {props.currentMessage.textprice2}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <Text
            style={{
              color: "#fff",
              paddingHorizontal: wp(1),
              paddingVertical: 0,
              //fontWeight: "bold",
            }}
          >
            {props.currentMessage.text}
          </Text>
        )}
      </View>
    );
  };
  const [composerValue, setComposerValue] = useState("Hello world");

  // useEffect(() => {
  //   // Save the default value to the database
  //   //onSend(composerValue);
  // }, []);

  function saveComposerValueToDatabase(value) {
    // Save the value to the database
  }
  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader
        onPress={() => {}}
        username={username}
        picture={{ uri: IMAGE_URL + userimage }}
        onlineStatus={"Online"}
        viewstate={true}
      />
      <GiftedChat
        alwaysShowSend
        //text={composerValue}
        //onInputTextChanged={setComposerValue}
        // renderComposer={renderComposer}
        renderInputToolbar={(props) => {
          return <CustomInputToolbar {...props} />;
        }}
        renderSend={(props) => {
          return <SendComponent {...props} />;
        }}
        messages={messages}
        onSend={(text) => {
          onSend(text);
        }}
        user={{
          _id: predata.userid,
        }}
        custontext={{}}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  color: Colors.Appthemecolor,
                  backgroundColor:
                    props.currentMessage.text != ""
                      ? Colors.Appthemecolor
                      : "orange",
                  width: props.currentMessage.text != "" ? wp(80) : wp(70),
                  marginBottom: hp(1.2),
                  paddingTop: hp(2),
                  paddingHorizontal: wp(3),
                },
                left: {
                  color: Colors.Appthemecolor,
                  backgroundColor:
                    props.currentMessage.text != ""
                      ? Colors.inactivetextinput
                      : "orange",
                  //width: props.currentMessage.text != "" ? wp(80) : wp(70),
                  marginBottom: hp(1.2),
                  paddingTop: hp(1),
                  paddingHorizontal: wp(2),
                },
              }}
            />
          );
        }}
        renderMessageText={(props) => {
          return <CustomBubbleText {...props} />;
        }}
      />
      <CamerBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={"From Gallery"}
        type={"Chat_image"}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
