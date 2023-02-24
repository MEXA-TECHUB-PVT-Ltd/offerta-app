import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../components/Button/CustomButton";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";
import CustomModal from "../../../components/Modal/CustomModal";

/////////////////dropdowns/////////////
import CountryDropDown from "../../../components/Dropdowns/Location/Country";
import CityDropDown from "../../../components/Dropdowns/Location/City";

////////////////country picker package/////////////
import CountryPicker from "react-native-country-picker-modal";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";

////////////////api functions///////////
import { post_shipping_Address } from "../../../api/ShippingAddress";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import {
  setCountryName,
  setStateName,
  setCityName,
} from "../../../redux/actions";

const ShippingAddresss = ({ navigation, route }) => {
  /////////////////////////redux///////////////////
  const { country_name, state_name, city_name } = useSelector(
    (state) => state.locationReducer
  );
  const dispatch = useDispatch();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  //////////////link dropdown////////////////
  const refCountryddRBSheet = useRef();
  const refCityddRBSheet = useRef();

  ////////////country picker states/////////////
  const [CountryPickerView, setCountryPickerView] = useState(false);
  const [countryCode, setCountryCode] = useState("92");
  const [countryname, setCountryName] = useState("Pak");

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  const [shipping_state, setShipping_State] = useState({
    nick_name: "",
    user_name: "",
    country: countryname,
    city: city_name,
    state: state_name,
    address_1: "",
    address_2: "",
    zip_code: "",
    phone_number: "",
  });
  ////////////LISTING LIKES//////////
  const create_shippingAddress = (props) => {
    console.log("shipping states:", props);
    setloading(1);
    setdisable(1);
    post_shipping_Address(props).then((response) => {
      console.log("exchnage response hereL:", response.data);
      setloading(0);
      setdisable(0);
      setModalVisible(true);
    });
  };
  const handleChange = (value, key) => {
    setShipping_State({ ...shipping_state, [key]: value });
  };

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={"Add Shipping Address"}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <View>
          <CustomTextInput
            type={"withouticoninput"}
            texterror={"invalid"}
            term={shipping_state.nick_name}
            placeholder="Enter your nick name"
            onTermChange={(value) => handleChange(value, "nick_name")}
          />
          <CustomTextInput
            type={"withouticoninput"}
            term={shipping_state.user_name}
            placeholder="Enter your name"
            onTermChange={(value) => handleChange(value, "user_name")}
          />
          <CustomTextInput
            type={"withouticoninput"}
            term={shipping_state.address_1}
            placeholder="Enter address 1"
            onTermChange={(value) => handleChange(value, "address_1")}
          />
          <CustomTextInput
            type={"withouticoninput"}
            term={shipping_state.address_2}
            placeholder="Enter address 2"
            onTermChange={(value) => handleChange(value, "address_2")}
          />
          <TouchableOpacity onPress={() => refCountryddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={country_name}
              editable={false}
              disable={false}
              placeholder="Select Country"
              onTermChange={(value) => handleChange(value, "country")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => refCityddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={city_name}
              editable={false}
              disable={false}
              placeholder="Select City"
              onTermChange={(value) => handleChange(value, "city")}
            />
          </TouchableOpacity>
          {/* <View
            style={{
              flexDirection: "row",
              marginHorizontal: wp(8),
              justifyContent: "space-between",
            }}
          >
            <CustomTextInput
              type={"iconinput_short"}
              icon={appImages.downarrow}
              term={shipping_state.city}
              length={"small"}
              placeholder="City"
              onTermChange={(value) => handleChange(value, "city")}
              // length={"small"}
            />
            <CustomTextInput
              type={"iconinput"}
              icon={appImages.downarrow}
              term={shipping_state.state}
              length={"small"}
              width={20}
              placeholder="State"
              onTermChange={(value) => handleChange(value, "state")}
            />
          </View> */}
          <CustomTextInput
            type={"iconinput"}
            term={shipping_state.zip_code}
            placeholder="Enter ZIP code"
            keyboard_type={"numeric"}
            onTermChange={(value) => handleChange(value, "zip_code")}
          />
          <CustomTextInput
            type={"withouticoninput"}
            term={shipping_state.phone_number}
            placeholder="Enter Phone Number"
            keyboard_type={"numeric"}
            onTermChange={(value) => handleChange(value, "phone_number")}
          />
        </View>

        <View style={{ marginBottom: hp(12) }}>
          <CustomButtonhere
            title={"SAVE"}
            widthset={80}
            topDistance={10}
            loading={loading}
            disabled={disable}
            onPress={() => {
              create_shippingAddress(shipping_state);
              //navigation.navigate("Drawerroute");
            }}
          />
        </View>
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={"Success"}
          subtext={"Shipping Address Sucessfully"}
          buttontext={"OK"}
          onPress={() => {   setModalVisible(false),route.params.navtype ==="Buy"?navigation.navigate("ConfirmAddress"):
          navigation.navigate("ShippingAddressList");
          }}
        />
        <CountryDropDown
          refRBSheet={refCountryddRBSheet}
          onClose={() => refCountryddRBSheet.current.close()}
        />
        <CityDropDown
          refRBSheet={refCityddRBSheet}
          onClose={() => refCityddRBSheet.current.close()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShippingAddresss;