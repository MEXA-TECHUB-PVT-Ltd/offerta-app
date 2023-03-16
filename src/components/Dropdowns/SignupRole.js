import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

///////////////////app pakages///////////////
import RBSheet from "react-native-raw-bottom-sheet";

////////////app styles//////////////
import styles from "./styles";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setsignupRole} from "../../redux/actions";

const SignupRole = (props) => {
  /////////////redux states///////
  const { product_condition } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  //////////dropdownlink data/////////////
  const [dddata] = useState([
    {id:'1',role:'user'},
    {id:'2',role:'company'},
]);
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
          borderTopLeftRadius: wp(10),
          borderTopRightRadius: wp(10),
          height: hp(35),
        },
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 0,

        }}
      >
        <Text style={styles.bottomsheettext}>{"Select Product Condition"}</Text>
      </View>
      <FlatList
        data={dddata}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
          activeOpacity={0.7}
            onPress={() => {
              dispatch(setsignupRole(item.role)),
                props.refRBSheet.current.close();
            }}
          >
            <View style={styles.card}>
              <Text style={styles.cardtext}>{item.role}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </RBSheet>
  );
};

export default SignupRole;
