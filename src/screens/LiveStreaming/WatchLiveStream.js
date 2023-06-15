import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Keyboard,
  Switch,
  BackHandler,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { appImages } from "../../constant/images";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Header from "../../components/LiveStreaming/Header";
import CommentInput from "../../components/LiveStreaming/CommentInput";
import CommentsList from "../../components/LiveStreaming/CommentsList";
import ProductList from "./ProductList";
import BottomTabs from "../../components/LiveStreaming/BottomTabs";
import LiveStreaming from "../LiveStreaming";
import ConfirmationModal from "../../components/LiveStreaming/ConfirmationModal";

import { PermissionsAndroid, Platform } from "react-native";
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from "react-native-agora";
import { useFocusEffect } from "@react-navigation/native";

const appId = "2103cc766ad141bf90843544931573d8";
const channelName = "Test";
const token =
  "007eJxTYNCof8+Tseeu768JKoXGsude3zplWfjM7tmceyL23B+2bU5XYDAyNDBOTjY3M0tMMTQxTEqzNLAwMTY1MbE0NjQ1N06xOPm/K6UhkJHBUOMvCyMDBIL4LAwhqcUlDAwAo8MgdA==";
const uid = 0;

const WatchLiveStream = ({ navigation, route }) => {
  const ref_CommentFlatList = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);
  const [showBottomView, setShowBottomView] = useState(true);
  const [comment, setComment] = useState("");

  const [commentsList, setCommentsList] = useState([
    {
      id: 0,
      user_name: "John Doe",
      comment: "Sed consectetur vitae elit et ullamcorper",
    },
    {
      id: 1,
      user_name: "John Doe",
      comment: "Sed consectetur vitae elit et ullamcorper",
    },
    {
      id: 2,
      user_name: "John Doe",
      comment: "Sed consectetur vitae elit et ullamcorper",
    },
    {
      id: 2,
      user_name: "John Doe",
      comment: "Sed consectetur vitae elit et ullamcorper",
    },
    {
      id: 2,
      user_name: "John Doe",
      comment: "Sed consectetur vitae elit et ullamcorper",
    },
    {
      id: 2,
      user_name: "John Doe",
      comment: "Sed consectetur vitae elit et ullamcorper",
    },
    {
      id: 2,
      user_name: "John Doe",
      comment: "Sed consectetur vitae elit et ullamcorper",
    },
    {
      id: 2,
      user_name: "John Doe",
      comment: "Sed consectetur vitae elit et ullamcorper",
    },
    {
      id: 2,
      user_name: "John Doe",
      comment: "Sed consectetur vitae elit et ullamcorper",
    },
    {
      id: 2,
      user_name: "John Doe",
      comment: "Sed consectetur vitae elit et ullamcorper",
    },
    {
      id: 2,
      user_name: "John Doe",
      comment: "Sed consectetur vitae elit et ullamcorper",
    },
  ]);
  const [productsList, setProductsList] = useState([
    {
      id: 0,
      image: appImages.live_stream_bg,
      name: "Item Name",
      quantity: 20,
      price: 15,
      sold: false,
    },
    {
      id: 1,
      image: appImages.live_stream_bg,
      name: "Item Name",
      quantity: 20,
      price: 15,
      sold: true,
    },
    {
      id: 2,
      image: appImages.live_stream_bg,
      name: "Item Name",
      quantity: 20,
      price: 15,
      sold: false,
    },
    {
      id: 3,
      image: appImages.live_stream_bg,
      name: "Item Name",
      quantity: 20,
      price: 15,
      sold: false,
    },
    {
      id: 4,
      image: appImages.live_stream_bg,
      name: "Item Name",
      quantity: 20,
      price: 15,
      sold: false,
    },
  ]);

  const handleAddComment = async (comment) => {
    setComment("");
    Keyboard.dismiss();
    setTimeout(() => {
      let prevList = [...commentsList];
      let obj = {
        id: prevList?.length,
        user_name: "John Doe",
        comment: comment,
      };
      prevList.push(obj);
      setCommentsList(prevList);
    }, 200);
  };

  useEffect(() => {
    const backAction = () => {
      setShowModal(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  //   _______________________________________LIVE STREAM______________________________________________________________
  const agoraEngineRef = useRef(null); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHost] = useState(true); // Client role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(""); // Message to the user

  function showMessage(msg) {
    setMessage(msg);
  }
  const getPermission = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };
  const AgoraEngine = useRef();
  //   useEffect(() => {
  //     // Initialize Agora engine when the app starts
  //     setupVideoSDKEngine();
  //     setIsHost(true);

  //     join();
  //   });

  useFocusEffect(
    React.useCallback(() => {
      // Initialize Agora engine when the app starts
      setupVideoSDKEngine();
      setTimeout(() => {
        setIsHost(true);
        join();
      }, 200);
    }, [])
  );

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === "android") {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;

      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage("Successfully joined the channel " + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage("Remote user joined with uid " + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage("Remote user left the channel. uid: " + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
        // videoEncoderConfig: {
        //   width: 720,
        //   height: 1280,
        //   bitrate: 1200,
        //   frameRate: 30,
        //   orientationMode: 1,
        // },
      });

      agoraEngine.enableVideo();

      //   //   AgoraRTC.initWithConfig(config);
      //   agoraEngine.setVideoSource("camera"); // Use the camera as the video source
      //   // agoraEngine.setChannelProfile(0); // Set channel profile to live broadcasting
      //   // agoraEngine.setClientRole(1); // Set client role to broadcaster
      //   agoraEngine.enableVideo(); // Enable video
    } catch (e) {
      console.log("error : ", e);
    }
  };

  const join = async (isHost = true) => {
    console.log("join called.....");
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting
      );
      if (isHost) {
        agoraEngineRef.current?.startPreview();
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        });
      } else {
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleAudience,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage("You left the channel");
    } catch (e) {
      console.log(e);
    }
  };

  //   _______________________________________LIVE STREAM______________________________________________________________

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"light-content"}
      />
      <ConfirmationModal
        visible={showModal}
        setVisible={setShowModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          leave();
          navigation?.goBack();
        }}
      />
      {/* <ImageBackground source={appImages.live_stream_bg} style={{ flex: 1 }}> */}
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            height: hp(100) + StatusBar.currentHeight,
            width: wp(100),
            position: "absolute",
            paddingTop: 70,
            backgroundColor: "#000",
            //   alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isJoined && isHost ? (
            <React.Fragment key={0}>
              <RtcSurfaceView canvas={{ uid: 0 }} style={styles.videoView} />
              {/* <Text>Local user uid: {uid}</Text> */}
            </React.Fragment>
          ) : (
            <Text>
              {""}
              {/* {isHost ? "Join a channel" : ""} */}
            </Text>
          )}
          {isJoined && !isHost && remoteUid !== 0 ? (
            <React.Fragment key={remoteUid}>
              <RtcSurfaceView
                canvas={{ uid: remoteUid }}
                style={styles.videoView}
              />
              <Text>Remote user uid: {remoteUid}</Text>
            </React.Fragment>
          ) : (
            <Text style={{ color: "red", fontSize: 20, zIndex: 999 }}>
              {isJoined && !isHost ? "Waiting for a remote user to join" : ""}
            </Text>
          )}
          {/* <Text style={styles.info}>{message}</Text> */}
        </View>

        <Header
          userName={"Fig Nelson"}
          totalViewers={"100k"}
          duration={"20:01"}
          onBackPress={() => setShowModal(true)}
        />

        <View style={styles.bottomContainer}>
          {showBottomView && (
            <View
              style={{
                height: hp(40),
                justifyContent: "flex-end",
              }}
            >
              {selectedTab == 0 ? (
                <CommentsList data={commentsList} />
              ) : (
                <ProductList data={productsList} />
              )}
            </View>
          )}
          <BottomTabs
            selectedTab={selectedTab}
            onTabPress={(value) => {
              if (value == 2) {
                setShowBottomView(!showBottomView);
              } else {
                setSelectedTab(value);
              }
            }}
            showBottomView={showBottomView}
          />

          <CommentInput
            value={comment}
            onChangeValue={(text) => setComment(text)}
            onPress={(text) => handleAddComment(comment)}
          />
        </View>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

export default WatchLiveStream;

const styles = StyleSheet.create({
  bottomContainer: {
    height: hp(90),
    justifyContent: "flex-end",
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#0055cc",
    margin: 5,
  },
  main: { flex: 1, alignItems: "center" },
  scroll: { flex: 1, backgroundColor: "#ddeeff", width: "100%" },
  scrollContainer: { alignItems: "center" },
  videoView: {
    // width: wp(100),
    // height: hp(100) + 200,
    // backgroundColor: "red",

    height: hp(100) + StatusBar.currentHeight,
    width: wp(100),
    position: "absolute",
    paddingTop: 70,
    backgroundColor: "pink",
  },
  btnContainer: { flexDirection: "row", justifyContent: "center" },
  head: { fontSize: 12, marginVertical: 18, color: "gray" },
  info: { backgroundColor: "#ffffe0", paddingHorizontal: 8, color: "#0000ff" },
});
