import * as React from "react";
import { View, Text, ActivityIndicator,TouchableOpacity } from "react-native";

//////////////////navigation/////////////////
import { useNavigation } from '@react-navigation/native';

////////////app styles////////////
import styles from "./styles";
import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////app icons////////////
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//////////////app pakages/////////////
import { Avatar } from "react-native-paper";

///////////////////////Pic URL///////////////
import { IMAGE_URL } from "../../utills/ApiRootUrl";

const ProfileCard = (props) => {
console.log('here props:',props)

  const navigation = useNavigation();
  return (
    <View style={styles.profilecard}>
      {props.userlogo === ''?
        <Avatar.Text size={wp(25)} label={props.username === ''?null:props.username.substring(0, 2).toUpperCase()}
        style={{backgroundColor:Colors.Appthemecolor}}
        />
      :
      <Avatar.Image
       source={{uri:IMAGE_URL+props.userlogo}}
      //source={props.userlogo}
      size={wp(25)}
      style={{ backgroundColor: Colors.appgreycolor }}
    />
      }

      {/* <View style={{
           // justifyContent: "center", alignContent: 'center',
          width:wp(60)
        }}> */}
      <Text style={styles.itemmaintext}>{props.username}</Text>
      <Text style={styles.itemsubtext}>{props.useremail}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf:'center',
          marginTop:hp(1.5),
          marginBottom:hp(1),
          //backgroundColor:"red",
          width:props.type==="other"?wp(45):wp(62)
        }}
      >
        <View style={{alignItems:'center'}}>
          {props.type==="other"?
                <Icon
                name={"facebook"}
                size={25}
                color={"blue"}
              />:
                 <Text style={styles.verticletext}>{props.followers}</Text>
              }
       
          <Text style={styles.verticletext} onPress={()=> navigation.navigate('Followers')}>{props.text1}</Text>
        </View>
        <View style={styles.verticleLine}></View>
        <View style={{alignItems:'center'}}>
        {props.type==="other"?
                <Icon
                name={"star"}
                size={25}
                color={"orange"}
              />:
          <Text style={styles.verticletext}>{props.following}</Text>
            }
          <Text style={styles.verticletext} onPress={()=> navigation.navigate('Followings')}>{props.text2}</Text>
        </View>
        {
        props.type ==="other"?null:
        <View style={styles.verticleLine}></View>
        }

        <View style={{alignItems:'center'}}>
          <Text style={styles.verticletext}>{props.reviews}</Text>
          <Text style={styles.verticletext} onPress={()=> navigation.navigate('Reviews')}>{props.text3}</Text>
        </View>
      </View>
      {/* </View> */}
    </View>
  );
};

export default ProfileCard;
