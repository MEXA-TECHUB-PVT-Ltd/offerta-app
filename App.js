import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//////////////notification/////////////////
// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { Provider } from "react-redux";
import { Store } from "./src/redux/store";

//Screens
import AuthNav from "./src/navigation/AuthNav/AuthNav";
///////////////Drawer stack///////////////
import Drawerroute from "./src/navigation/Drawer/Drawer";
import AddBanner from "./src/screens/Drawer/Banner/AddBanner";
import PaymentMethod from "./src/screens/Drawer/Banner/PaymentMethod";
///////////////////Bottomtab stack//////////
import Categories from "./src/screens/StackScreens/Dashboard/Categories";
import Filter from "./src/screens/StackScreens/Dashboard/Filter";
import ChatScreen from "./src/screens/StackScreens/Chat/ChatScreen";
import Search from "./src/screens/StackScreens/Dashboard/Search";
import Settings from "./src/screens/StackScreens/Settings/Settings";
//////////////////Home screens/////////////
import MainListingsDetails from "./src/screens/StackScreens/Dashboard/OtherListings/MainListingDetails";
//////////////Buy//////////////
import ConfirmAddress from "./src/screens/StackScreens/Dashboard/OtherListings/Buy/ConfirmAddress";
import Checkout from "./src/screens/StackScreens/Dashboard/OtherListings/Buy/Checkout";
import CardDetails from "./src/screens/StackScreens/Dashboard/OtherListings/Buy/CardDetails";
import CommentsDetails from "./src/screens/StackScreens/Dashboard/OtherListings/CommentsDetails";
import OtherProfile from "./src/screens/StackScreens/Dashboard/OtherListings/OtherProfile";
import SelectedList from "./src/screens/StackScreens/Dashboard/OtherListings/SelectedList";
import ExchangeOfferList from "./src/screens/StackScreens/Dashboard/OtherListings/ExchangeOfferList";
import ExchangeOffer from "./src/screens/StackScreens/Dashboard/OtherListings/ExchangeOffer";
import PriceOffer from "./src/screens/StackScreens/Dashboard/OtherListings/PriceOffer";
import FilterListings from "./src/screens/StackScreens/Dashboard/FilterListings";

/////////////////Profile///////////////
import Listings from "./src/screens/StackScreens/Profile/Listings";
import LikedItems from "./src/screens/StackScreens/Profile/LikedItems";
import Promotions from "./src/screens/StackScreens/Profile/Promotions";
import SalesOrders from "./src/screens/StackScreens/Profile/SalesOrders";
import Followers from "./src/screens/StackScreens/Profile/Followers";
import Followings from "./src/screens/StackScreens/Profile/Followings";
import Reviews from "./src/screens/StackScreens/Profile/Reviews";
////////Exchanges Screens////////
import Exchanges from "./src/screens/StackScreens/Profile/Exchange/Exchanges";
import IncomingExchange from "./src/screens/StackScreens/Profile/Exchange/IncomingExchange";
import OutGoingExchange from "./src/screens/StackScreens/Profile/Exchange/OutGoingExchange";
import SucessExchange from "./src/screens/StackScreens/Profile/Exchange/SucessExchange";
import FailedExchange from "./src/screens/StackScreens/Profile/Exchange/FailedExchnange";
//////////Listings Screens/////////////
import ListingsDetails from "./src/screens/StackScreens/Profile/Listings/ListingsDetails";
import Insights from "./src/screens/StackScreens/Profile/Listings/Insights";
import Promote from "./src/screens/StackScreens/Profile/Promote/Promote";
import Payment from "./src/screens/StackScreens/Profile/Promote/Payment";

////////////////////camera//////////////////////
import CameraViewScreen from "./src/components/CameraBottomSheet/CameraView";

/////////////////drawer///////////
import BlogsDetails from "./src/screens/StackScreens/Drawer/BlogsDetails";

import dynamicLinks from "@react-native-firebase/dynamic-links";
const Stack = createNativeStackNavigator();
function App() {
  //const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [initialRoute, setInitialRoute] = React.useState("Home");

  const handleDynamicLink = (link) => {
    // Handle dynamic link inside your own application
    if (link.url === "https://offertademoapp.page.link/offerta") {
      // ...navigate to your offers screen
    }
  };

  React.useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);
  // React.useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open
  //   //   messaging().onMessage(remoteMessage => {
  //   //     navigation.navigate('GooglePassword');
  //   //     console.log(props.navigation)
  //   // });
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification.body,
  //     );
  //     AsyncStorage.setItem('Notification', remoteMessage.notification.body);

  //     //navigation.navigate('UpdateProfile');
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification.body,
  //         );
  //         AsyncStorage.removeItem('Notification');
  //         AsyncStorage.setItem('Notification', remoteMessage.notification.body);
  //         //navigation.navigate('UpdateProfile');s
  //         //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //         //setInitialRoute(remoteMessage.data.type);
  //       }
  //       setLoading(false);
  //     });
  //   if (loading) {
  //     return null;
  //   }
  // }, []);
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="AuthNav"
            component={AuthNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Drawerroute"
            component={Drawerroute}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddBanner"
            component={AddBanner}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PaymentMethod"
            component={PaymentMethod}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Filter"
            component={Filter}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Listings"
            component={Listings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Exchanges"
            component={Exchanges}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="IncomingExchange"
            component={IncomingExchange}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OutGoingExchange"
            component={OutGoingExchange}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SucessExchange"
            component={SucessExchange}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FailedExchange"
            component={FailedExchange}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LikedItems"
            component={LikedItems}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Promotions"
            component={Promotions}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SalesOrders"
            component={SalesOrders}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ListingsDetails"
            component={ListingsDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Insights"
            component={Insights}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Promote"
            component={Promote}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Followers"
            component={Followers}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Followings"
            component={Followings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Reviews"
            component={Reviews}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MainListingsDetails"
            component={MainListingsDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ConfirmAddress"
            component={ConfirmAddress}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CardDetails"
            component={CardDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CommentsDetails"
            component={CommentsDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OtherProfile"
            component={OtherProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SelectedList"
            component={SelectedList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ExchangeOfferList"
            component={ExchangeOfferList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ExchangeOffer"
            component={ExchangeOffer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PriceOffer"
            component={PriceOffer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FilterListings"
            component={FilterListings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CameraViewScreen"
            component={CameraViewScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BlogsDetails"
            component={BlogsDetails}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
