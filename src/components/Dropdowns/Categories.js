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
import { setCategoryName, setCategoryId,setSubCategoryName,setSubCategoryId } from "../../redux/actions";

//////////////api helper functions////////
import { GetCategories,GetSubCategories } from "../../api/GetApis";

const Categories = (props) => {
  /////////////redux states///////
  const { category_name } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  //////////dropdownlink data/////////////
  const [dddata, setdddata] = useState();
  const [subdddata, setsubdddata] = useState();

  ///////////////HotelTypes function///////////////
  const GetItemCategories = async () => {
    GetCategories()
    .then((response) => {
      setdddata(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
  }
    ///////////////HotelTypes function///////////////
    const GetItemSubCategories = async () => {
      GetSubCategories()
      .then((response) => {
        setsubdddata(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
      };
  useEffect(() => {
    props.type === 'subcategory'?
    GetItemSubCategories():
    GetItemCategories()

  }, []);
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
          height: hp(95),
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
        <Text style={styles.bottomsheettext}>Select Category</Text>
      </View>
      <FlatList
        data={props.type === 'subcategory'?subdddata:dddata}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
          activeOpacity={0.7}
            onPress={() => {
                props.type === 'subcategory'?dispatch(setSubCategoryName(item.name)):dispatch(setCategoryName(item.name)),
                props.type === 'subcategory'?dispatch(setSubCategoryId(item.id)):dispatch(setCategoryId(item.id)),
                props.refRBSheet.current.close();
            }}
          >
            <View style={styles.card}>
              <Text style={styles.cardtext}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </RBSheet>
  );
};

export default Categories;
