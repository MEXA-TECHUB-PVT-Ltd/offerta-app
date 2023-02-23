import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../components/Button/CustomButton";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";
import SliderModal from "../../../components/Modal/ModalSlider";

//////////////////app dropdown////////////////
import Categories from "../../../components/Dropdowns/Categories";
import FilterDD from "../../../components/Dropdowns/FilterDD";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryName,
  setLocationAddress,
  setSortByDD,
  setLocationLat,
  setLocationLng,
  setSliderDistance,
} from "../../../redux/actions";

/////////////app styles////////////////
import styles from "./styles";

////////height width//////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";

////////////////Current location function//////////////
import {
  locationPermission,
  getCurrentLocation,
} from "../../../api/CurrentLocation";

const Filter = ({ navigation, route }) => {
  /////////////redux states///////
  const { category_name, post_within, location_address, sort_by,slider_distance } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  ////////Bottom sheet references/////////
  const refddRBSheet = useRef();
  const refpostwithinddRBSheet = useRef();
  const refsortByddRBSheet = useRef();

  ///////////////data states////////////////////
  const [listing_price, setListing_Price] = React.useState("");
  useEffect(() => {
    getLiveLocation();
  }, []);
  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const { latitude, longitude, heading } = await getCurrentLocation();
      dispatch(setLocationLat(latitude));
      dispatch(setLocationLng(longitude));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={"Apply Filters"+slider_distance}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <CustomTextInput
              type={"withouticoninput"}
              term={slider_distance}
              placeholder="Enter distance"
              editable={false}
              disable={false}
              onTermChange={(distance) => setSliderDistance(distance)}
            />
          </TouchableOpacity>
          <CustomTextInput
            type={"withouticoninput"}
            term={listing_price}
            placeholder="Enter Price"
            onTermChange={(price) => setListing_Price(price)}
          />
          <TouchableOpacity onPress={() => refddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={category_name}
              editable={false}
              disable={false}
              placeholder="Select Category"
              onTermChange={(category) => setCategoryName(category)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refpostwithinddRBSheet.current.open()}
          >
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={post_within}
              editable={false}
              disable={false}
              placeholder="Posted within"
              onTermChange={(category) => setCategoryName(category)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => refsortByddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={sort_by}
              editable={false}
              disable={false}
              placeholder="Sort by"
              onTermChange={(sortby) => setSortByDD(sortby)}
            />
          </TouchableOpacity>
          <View style={{ marginBottom: hp(15) }}>
            <CustomButtonhere
              title={"UPLOAD"}
              widthset={80}
              topDistance={10}
              // loading={loading}
              // disabled={disable}
              onPress={() => {
                navigation.navigate("FilterListings", {
                  itemprice: listing_price,
                });
              }}
            />
          </View>
        </View>
        <Categories
          refRBSheet={refddRBSheet}
          onClose={() => refddRBSheet.current.close()}
        />

        <FilterDD
          refRBSheet={refsortByddRBSheet}
          onClose={() => refsortByddRBSheet.current.close()}
        />
        <FilterDD
          refRBSheet={refpostwithinddRBSheet}
          onClose={() => refpostwithinddRBSheet.current.close()}
          type={"PostedRange"}
        />
        <SliderModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={"Select Distance"}
          subtext={"Item Upload Sucessfully"}
          buttontext={"OK"}
          onPress={() => {
            setModalVisible(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Filter;
