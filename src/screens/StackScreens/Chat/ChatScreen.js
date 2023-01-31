import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";

/////////////////////app components//////////////
import DashboardCard from "../../../components/CustomCards/DashboardCard";

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
} from "react-native-gifted-chat";

import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { LinkPreview } from "@flyerhq/react-native-link-preview";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setExchangeOffer_OtherListing } from "../../../../redux/actions";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////app images///////////////
import { appImages } from "../../../constant/images";
import Colors from "../../../utills/Colors";

const ChatScreen = ({ route, navigation }) => {
  ////////////////redux/////////////
  const { exchange_other_listing, exchange_my_listing } = useSelector(
    (state) => state.userReducer
  );

  ///////////top view state//////////
  const [showView, setShowView] = useState(true);

  //////////////chat states/////////////
  const [messages, setMessages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [login_user, setLoginUser] = useState("");
  const [doc_id, setDocID] = useState("");

  const getAllMessages = async () => {
    var user = await AsyncStorage.getItem("Userid");
    setLoginUser(user);
    const docid =
      route.params.userid > user
        ? user + "-" + route.params.userid
        : route.params.userid + "-" + user;
    console.log("doc id here:", docid);
    setDocID(docid);
    //messagelist()
    //  const querySanp = firestore().collection('chats')
    //  .doc(docid)
    //  .collection('messages')
    //  .orderBy('createdAt',"desc")
    //  .get()
    // const allmsg =   querySanp.docs.map(docSanp=>{
    //      return {
    //          ...docSanp.data(),
    //          createdAt:docSanp.data().createdAt.toDate()
    //      }
    //  })
    //  setMessages(allmsg)
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
  const ref = useRef();
  useEffect(() => {
    getAllMessages();
    // messagelist()
    //onSend()
    requestCameraPermission();
    console.log(
      "lisrting data here:",
      exchange_other_listing,
      route.params.userid,
      "user here in login",
      login_user
    );
    // ref.current.capture().then((uri) => {
    //   console.log("do something with ", uri);
    //   handleImageUpload(uri.substring(uri.lastIndexOf("/") + 1), uri);
    // });
  }, []);
  const onCapture = useCallback((uri) => {
    console.log("do something with ", uri);
  }, []);
  const messagelist = () => {
    console.log("here data");
    const querySnapShot = firestore()
      .collection("chats")
      .doc(doc_id)
      .collection("messages")
      .orderBy("createdAt", "desc");
    // .get()
    querySnapShot.onSnapshot((snapShot) => {
      const allMessages = snapShot.docs.map((snap) => {
        return { ...snap.data(), createdAt: new Date() };
      });
      setMessages(allMessages);
    });
  };
  useLayoutEffect(() => {
    console.log("here data");
    const querySnapShot = firestore()
      .collection("chats")
      .doc(doc_id)
      .collection("messages")
      .orderBy("createdAt", "desc");
    // .get()
    querySnapShot.onSnapshot((snapShot) => {
      const allMessages = snapShot.docs.map((snap) => {
        return { ...snap.data(), createdAt: new Date() };
      });
      setMessages(allMessages);
    });
  }, [route.params.navtype === "chat"]);
  const onSend = useCallback((messages = []) => {
    handleSend(messages);
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages),
    // );
  }, []);
  const handleSend = async (messageArray) => {
    // handleSend(messageArray);
    console.log("here", messageArray);
    var user = await AsyncStorage.getItem("Userid");
    const docid =
      route.params.userid > user
        ? user + "-" + route.params.userid
        : route.params.userid + "-" + user;
    console.log(
      "fsfsf",
      user,
      ",,,reciever id:",
      route.params.userid,
      "....array",
      messageArray
    );

    let myMsg = null;
    if (imageUrl !== "") {
      const msg = messageArray[0];
      myMsg = {
        ...msg,
        //text: "price hree",
        senderId: user,
        receiverId: route.params.userid,
        image: imageUrl,
        user: {
          _id: user,
          name: "ali",
        },
      };
    } else {
      const msg = messageArray[0];
      route.params.navtype === "price_offer"
        ? (myMsg = {
            ...msg,
            textimg1: exchange_other_listing.images[0],
            textprice: "200",
            type: "price_offer",
            senderId: user,
            receiverId: route.params.userid,
            user: {
              _id: user,
              name: "ali",
            },
          })
        : route.params.navtype === "exchange_offer"
        ? (myMsg = {
            ...msg,
            textimg1: exchange_other_listing.images[0],
            textimg2: exchange_my_listing.images[0],
            textprice: "200",
            type: "exchange_offer",
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
            //text: msg.text,
            //textprice:'200',
            type: "simple_text",
            senderId: user,
            receiverId: route.params.userid,
            user: {
              _id: user,
              name: "ali",
            },
          })
        : null;
    }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
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
    console.log("here imga ein handle upload:", fileName, filePath);
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
          console.log("url", url);
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
            borderWidth: 0.5,
            borderRadius: wp(5),
            width: wp(82),
            position: "absolute",
            top: 0,
            left: wp(2),
            bottom: hp(0),
            marginTop: hp(1),
          }}
          textInputStyle={{ color: "black" }}
        />
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
        {/* <TouchableOpacity onPress={()=> choosePhotoFromLibrary()}> */}
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
              // marginBottom: 14,
            }}
          />
        </View>
        {/* </TouchableOpacity> */}
      </Send>
    );
  };

  const view = (price, image) => {
    let isImage = true;
    let message = "";
    handleSend(message, isImage, price, image);
  };
  const CustomBubbleText = (props) => {
    console.log(
      "props?.currentMessage?.user?.name  ",
      props.currentMessage.text
    );
    return (
      <View>
        {/* <Text
          style={{
            color: "#fff",
            paddingHorizontal: 10,
            paddingVertical: 3,
            fontWeight: "bold",
          }}
        > */}

        {props.currentMessage.type === "price_offer" ? (
          <View style={styles.p_mainview}>
            <Image
              source={{ uri: IMAGE_URL + props.currentMessage.textimg1 }}
              style={styles.p_image}
              resizeMode="cover"
            />
            <View style={{}}>
              <Text style={styles.p_text}>
                {"Item Price " + props.currentMessage.textprice}
              </Text>
              <Text style={styles.p_text}>
                {"Offer Price " + props.currentMessage.textprice}
              </Text>
            </View>
          </View>
        ) : props.currentMessage.type === "exchange_offer" ? (
          <View>
            <View
              style={styles.e_mainview}
            >
              <View
                style={styles.e_itemview}
              >
                <Image
                  source={{ uri: IMAGE_URL + props.currentMessage.textimg1 }}
                  style={styles.e_image}
                  resizeMode="contain"
                />
                <Text
                  style={styles.e_text}
                >
                  {"Item Name "}
                </Text>
                <Text
           style={styles.e_text}
                >
                  {props.currentMessage.textprice}
                </Text>
              </View>

              <MaterialCommunityIcons
                name={"swap-horizontal-bold"}
                size={30}
                color={Colors.Appthemecolor}
                onPress={() => navigation.toggleDrawer()}
              />
              <View
        style={styles.e_itemview}
              >
                <Image
                  source={{ uri: IMAGE_URL + props.currentMessage.textimg2 }}
                  style={styles.e_image}
                  resizeMode="contain"
                />
                <Text
          style={styles.e_text}
                >
                  {"Item Name "}
                </Text>
                <Text
              style={styles.e_text}
                >
                  {props.currentMessage.textprice}
                </Text>
              </View>
            </View>
            {/* <Text
              style={{
                color: "#fff",
                paddingHorizontal: 10,
                paddingVertical: 3,
                fontWeight: "bold",
              }}
            >

              {props.currentMessage.textprice}
            </Text> */}
          </View>
        ) : (
          <Text
            style={{
              color: "#fff",
              paddingHorizontal: 10,
              paddingVertical: 3,
              fontWeight: "bold",
            }}
          >
            {props.currentMessage.text}
          </Text>
        )}
        {/* {props?.currentMessage?.text} */}
        {/* </Text> */}
        {/* <HighlightText
          highlightStyle={{ backgroundColor: "#fcba03" }}
          searchWords={[props?.currentMessage?.highlightText]}
          textToHighlight={props?.currentMessage?.text}
          style={{
            fontSize: 16,
            lineHeight: 20,
            // marginTop: 5,
            marginBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            color: "#fff",
            ...props?.style,
          }}
        /> */}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader
        onPress={() => {}}
        username={"predata.username"}
        picture={appImages.dogIcon}
        onlineStatus={"Online"}
        viewstate={true}
      />
      <GiftedChat
        alwaysShowSend
        //renderLoading={() =>  <ActivityIndicator size="large" color="#0000ff" />}
        // renderComposer= {()=>messagelist()}
        renderInputToolbar={(props) => {
          return <CustomInputToolbar {...props} />;
        }}
        renderSend={(props) => {
          return <SendComponent {...props} />;
        }}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: login_user,
        }}
        // renderMessageImage={(props) => (
        //   <Image
        //     {...props}
        //     style={{
        //       borderRadius: 15,
        //       width: 150,
        //       height: 150,
        //       alignSelf: 'center'
        //     }}
        //   />
        // )}
        renderBubble={(props) => {
          console.log("here in bubble:", props);
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor:
                    props.currentMessage.image != ""
                      ? Colors.inactivetextinput
                      : "orange",
                  width: props.currentMessage.image != "" ? wp(80) : wp(70),
                  marginBottom: hp(1.2),
                  paddingTop: hp(2),
                  paddingHorizontal: wp(3),
                },
              }}
            />
          );
        }}
        renderMessageText={(props) => {
          return <CustomBubbleText {...props} />;
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
