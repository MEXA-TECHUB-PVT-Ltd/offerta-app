import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';


//Screens
import { DrawerContent } from './CustomDrawer';
import BottomTab from '../BottomTab/BottomTab';
import PrivacyTerms from '../../screens/Drawer/Privacy_Policy';
import TermsCondition from '../../screens/Drawer/Terms_Conditions';
import Language from '../../screens/Drawer/Language';
import InviteFriends from '../../screens/Drawer/InviteFriends';
import BannerAdvertisment from '../../screens/Drawer/Banner/BannerAdvertisment';
import ShippingAddresss from '../../screens/Drawer/ShippingAdress/ShippingAdress';
import Blogs from '../../screens/Drawer/Blogs';

const Drawer = createDrawerNavigator();

export default function Drawerroute() {

    return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen 
        options={{
          headerShown: false,
          }}
      name="BottomTab" component={BottomTab}/>
        <Drawer.Screen 
        options={{
          headerShown: false,
          }}
      name="PrivacyTerms" component={PrivacyTerms}/>
        <Drawer.Screen 
        options={{
          headerShown: false,
          }}
      name="TermsCondition" component={TermsCondition}/>
        <Drawer.Screen 
        options={{
          headerShown: false,
          }}
      name="Language" component={Language}/>
        <Drawer.Screen 
        options={{
          headerShown: false,
          }}
      name="InviteFriends" component={InviteFriends}/>
         <Drawer.Screen 
        options={{
          headerShown: false,
          }}
      name="BannerAdvertisment" component={BannerAdvertisment}/>
        <Drawer.Screen 
        options={{
          headerShown: false,
          }}
      name="ShippingAddresss" component={ShippingAddresss}/>
              <Drawer.Screen 
        options={{
          headerShown: false,
          }}
      name="Blogs" component={Blogs}/>
    </Drawer.Navigator>
    
        
    );
  }