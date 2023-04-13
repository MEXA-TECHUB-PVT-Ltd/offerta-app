/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Text, TextInput } from "react-native";
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";
import { navigationRef } from "./RootNavigation";
import { Store } from "./src/redux/store";
import { setChatCount, setNotificationCount } from "./src/redux/actions";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

PushNotification.createChannel(
  {
    channelId: "fcm_fallback_notification_channel", // (required)
    channelName: "fcm_fallback_notification_channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    let data = notification;
    console.log("new notification received ::::: ", data);
    console.log(
      "data.userInteraction_______________ ::::: ",
      data.userInteraction
    );

    console.log("user_id in notification  :  ", data?.data?.user_id);

    //   navigationRef?.current?.navigate('NotificationStackScreens', {
    //     data,
    //   });

    if (data.userInteraction) {
      console.log("navigationRef : ", navigationRef);
      if (data?.data?.type == "chat") {
        navigationRef?.current?.navigate("ChatScreen", {
          navtype: "chatlist",
          userid: data?.data?.user_id,
        });
      } else {
        // navigationRef?.current?.navigate("NotificationStackScreens", {
        //   data,
        // });

        navigationRef?.current?.navigate("BottomTab", {
          screen: "Notification",
        });
      }
    } else {
      if (data?.data?.type == "chat") {
        let prev_chatCount = Store.getState().userReducer.chatCount;
        Store.dispatch(setChatCount(prev_chatCount + 1));
      } else {
        let prev_notificationCount =
          Store.getState().userReducer.notificationCount;
        Store.dispatch(setNotificationCount(prev_notificationCount + 1));
      }
    }
  },
  requestPermissions: Platform.OS === "ios",
});

AppRegistry.registerComponent(appName, () => App);

//ADD this
if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}
