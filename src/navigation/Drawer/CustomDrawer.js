import React,{useEffect,useState} from 'react';
import { View, StyleSheet,Image,TouchableOpacity } from 'react-native';
import {
    useTheme,
    Drawer,
    Text,
    Switch,
    IconButton,
    Avatar,
    Title
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

//////////////////app components//////////
import CustomModal from '../../components/Modal/CustomModal';

import AsyncStorage from '@react-native-async-storage/async-storage';

//////////////////app icons/////////////
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

////////////////app styles//////////////////
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import Colors from '../../utills/Colors';

/////////////////app images///////////
import { appImages } from '../../constant/images';

///////////////app fonts/////////////
import { fontFamily } from '../../constant/fonts';


export const DrawerContent= (props)=> {
    const paperTheme = useTheme();
          //Modal States
          const [modalVisible, setModalVisible] = useState(false);


    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const logout=async()=>
    {
      await AsyncStorage.removeItem('Userid');
      await AsyncStorage.removeItem('Userdata');
      await AsyncStorage.removeItem('UserEmail');
      props.navigation.navigate('Login')
    }
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{marginTop: 25,alignSelf:'center'}}>
                          <TouchableOpacity onPress={()=>props.navigation.navigate('Profile',{item:'profile',id:userid})}>
                       
                        <Avatar.Image 
                               source={appImages.draweruser}
                               style={{backgroundColor:'grey'}}
                                size={wp(20)}
                            />
                                 
                          </TouchableOpacity>
                        </View>
                        <View style={{alignSelf:'center',marginLeft:wp(4) }}>
                                <Title style={styles.title}>Username</Title>
                                <Title style={styles.caption}>Username</Title>
                            </View>
                    </View>
                         <View style={{marginTop:hp(3),height:hp(0.4),backgroundColor: 'rgba(112, 112,112, 0.1)',
                         width:wp(65),alignSelf:'center',marginBottom:hp(3)}}></View>
                    <Drawer.Section style={styles.drawerSection}
                    showDivider={false}
                    >
                    <DrawerItem 
                            icon={({color, size}) => (
                                <Image
                                source={appImages.drawerpayment}
                                style={styles.icon}
                                resizeMode='contain'
                              />
                            )}
                            label="Manage Stripe"
                            labelStyle={styles.subtitle}
                            onPress={() => {props.navigation.navigate('MyProfile')}}
                        />
        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image
                                source={appImages.drawercard}
                                style={styles.icon}
                              />
                            )}
                            label="Manage shipping address"
                            labelStyle={styles.subtitle}
                            onPress={() => {props.navigation.navigate('ShippingAddresss')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image
                                source={appImages.drawerlanguage}
                                style={[styles.icon,{width:wp(7)}]}
                                resizeMode='contain'
                              />
                            )}
                            label="Language"
                            labelStyle={styles.subtitle}
                           onPress={() => {props.navigation.navigate('Language')}}
                        />
                       
                      
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image
                                source={appImages.drawerchat}
                                style={styles.icon}
                                resizeMode='contain'
                              />
                            )}
                            label="Invite Friends"
                            labelStyle={styles.subtitle}
                            onPress={() => {props.navigation.navigate('InviteFriends')}}
                        />
                       <DrawerItem 
                            icon={({color, size}) => (
                                <Image
                                source={appImages.drawerbanner}
                                style={styles.icon}
                                resizeMode='contain'
                              />
                            )}
                            label="Banner Advertisement"
                            labelStyle={styles.subtitle}
                            onPress={() => {props.navigation.navigate('BannerAdvertisment')}}
                        />
                         <DrawerItem 
                             icon={({color, size}) => (
                              <Image
                              source={appImages.drawerblogs}
                              style={styles.icon}
                              resizeMode='contain'
                            />
                          )}
                            label="Blogs"
                            labelStyle={styles.subtitle}
                            onPress={() => {props.navigation.navigate('Blogs')}}
                        />
                         <DrawerItem 
                              icon={({color, size}) => (
                                <Image
                                source={appImages.drawerpolicy}
                                style={styles.icon}
                                resizeMode='contain'
                              />
                            )}
                            label="Privacy Policy"
                            labelStyle={styles.subtitle}
                           onPress={() => {props.navigation.navigate('PrivacyTerms')}}
                        />
                               <DrawerItem 
                              icon={({color, size}) => (
                                <Image
                                source={appImages.drawerterms}
                                style={styles.icon}
                                resizeMode='contain'
                              />
                            )}
                            label="Terms & Conditions"
                            labelStyle={styles.subtitle}
                            onPress={() => {props.navigation.navigate('TermsCondition')}}
                        />
                               {/* <DrawerItem 
                       icon={({color, size}) => (
                        <Image
                        source={require('../../assets/Drawer/text.png')}
                        style={{ width: wp(5), height: hp(2),tintColor: Colors.Appthemecolor}}
                      />
                    )}
                            label="Help Center"
                            labelStyle={styles.subtitle}
                           // onPress={() => {props.navigation.navigate('Assignment')}}
                        /> */}
  
           
                    </Drawer.Section> 
                </View>
                <Drawer.Section style={styles.bottomDrawerSection}
                     showDivider={false}
                >
                  <TouchableOpacity
                  onPress={()=> setModalVisible(true)}
                  style={{ borderRadius:wp(8),width:wp(60),height:hp(6),
                    alignSelf:'center',alignItems:"center",justifyContent:"center",
                  backgroundColor:Colors.Appthemecolor,marginBottom:hp(1)}}
                  >
                    <Text style={{color:'white',fontSize:hp(1.6),fontWeight:'bold'}}>LOGOUT</Text>
                  </TouchableOpacity>
 
            </Drawer.Section>

            </DrawerContentScrollView>
            <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={   appImages.confirm }
              text={'Confirmation'}
              type={'confirmation'}
              subtext={'Do you really want to Logout?'}
          buttontext={'Yes'}
          buttontext1={'Cancel'}
 onPress={()=> {setModalVisible(false)}}
 onPress1={()=> {logout()}}
                /> 
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      
    },
    userInfoSection: {
      marginTop: hp(3),
    paddingLeft: wp(8),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start'
    
  },
  caption: {
    fontSize: hp(1.6),
    fontFamily:fontFamily.Poppins_Regular,
    lineHeight:12
  },
    title: {
      fontSize: hp(2),
      marginTop: hp(5),
      fontFamily:fontFamily.Poppins_SemiBold
    },


    drawerSection: {
      marginTop:hp(0),
    
    },

      subtitle: {
        fontSize:hp(1.5),
        fontFamily:fontFamily.Poppins_Medium,
        color:'#404040',
      },
      bottomDrawerSection: {
        marginBottom: hp(3),
        marginTop:hp(10),
             
    },
icon:
{
 width: wp(6), 
 height: hp(2.3),
 tintColor: Colors.Appthemecolor
}
  });