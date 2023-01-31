import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";

//////////////////app components///////////////////
import CustomModal from "../Modal/CustomModal";
import CustomTextInput from "../TextInput/CustomTextInput";

////////////app icons////////////////
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

///////////////app packages/////////////
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


//////////////////app Images////////////////
import { appImages } from "../../constant/images";
import { Colors } from "react-native/Libraries/NewAppScreen";

const DescriptionBottomSheet = (props) => {

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

  /////////////redux states///////
  const { nav_place } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ////////////////textinput state//////////////
  const [description, setDescription] = useState();
  return (
    <RBSheet
      //sstyle={{flex:1}}
      ref={props.refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      openDuration={50}
      closeDuration={50}
      animationType="fade"
      //height={500}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(52, 52, 52, 0.5)",
        },
        draggableIcon: {
          backgroundColor: "white",
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: hp(50),
        },
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
         paddingHorizontal:wp(7)
        }}
      >
        <Text style={styles.maintext}>
          {props.title}
        </Text>
        <TouchableOpacity onPress={() => props.refRBSheet.current.close()}>
          <Ionicons
            name={"close"}
            size={22}
            color={Colors.Appthemecolor}
            onPress={() => props.refRBSheet.current.close()}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginTop:hp(3), paddingHorizontal:wp(7)}}>
        <Text style={styles.subtext}>
          {props.subtitle}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginHorizontal: wp("5%"),
        }}
      >
        <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={description}
            multiline={true}
            placeholder="Description"
            onTermChange={(desc) => setDescription(desc)}
          />
      </View>

      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>setModalVisible(true)}
        >
          <Text style={styles.btnText}>{props.btntext}</Text>
        </TouchableOpacity>
        <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.sucess}
              text={'Sucess'}
              subtext={props.btntext==="REPORT"?"Report Sucessfully":'Review Added Successfully'}
          buttontext={'OK'}
 onPress={()=> { setModalVisible(false)}}
                /> 
      </View>
    </RBSheet>
  );
};

export default DescriptionBottomSheet;
