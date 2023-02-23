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

////////////////redux//////////////
import { setLoginUserShippingAddress } from "../../../redux/LoginUserActions";
import { useDispatch, useSelector } from "react-redux";

////////////////api functions///////////
import {
  update_shipping_Address,
} from "../../../api/ShippingAddress";

const UpdateShippingAddress = ({ navigation, route }) => {

  ////////////////redux/////////////
  const { login_user_shipping_address } = useSelector(
    (state) => state.loginuserReducer
  );
  const dispatch = useDispatch();

    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

      //////////////link dropdown////////////////
  const refCountryddRBSheet = useRef();
  const refCityddRBSheet = useRef();

      ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  ////////////country picker states/////////////
  const [CountryPickerView, setCountryPickerView] = useState(false);
  const [countryCode, setCountryCode] = useState("92");
  const [countryname, setCountryName] = useState("Pak");

  const [shipping_state, setShipping_State] = useState({
    shipping_id:login_user_shipping_address.id,
    nick_name: login_user_shipping_address.user_id,
    user_name:login_user_shipping_address.user_id,
    country: login_user_shipping_address.country,
    city: login_user_shipping_address.city,
    state: login_user_shipping_address.state,
    address_1: login_user_shipping_address.address_1,
    address_2: login_user_shipping_address.address_2,
    zip_code: login_user_shipping_address.zip_code,
    phone_number: login_user_shipping_address.phone_no,
  });
  ////////////LISTING LIKES//////////
  const update_shippingAddress = (props) => {
    setloading(1);
    setdisable(1);
    update_shipping_Address(props).then((response) => {
      //console.log("exchnage response hereL:", response.data);
      setloading(0);
      setdisable(0);
      setModalVisible(true)
    });
  };
  const handleChange = (value, key) => {
    setShipping_State({ ...shipping_state, [key]: value });
  };

  useEffect(() => {
    console.log("here we go",login_user_shipping_address)
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {CountryPickerView == true ? (
          <CountryPicker
            withFilter={true}
            withCallingCode={true}
            withModal={true}
            withFlag={true}
            withFlagButton={true}
            withCountryNameButton={true}
            onSelect={(e) => {
              console.log("country here", e);
              var name = e.name.substring("4");
              setCountryPickerView(false);
              if (e.name === "Antarctica") {
                setCountryCode("672");
              }
              if (e.name === "Bouvet Island") {
                setCountryCode("55");
              } else {
                setCountryCode(JSON.parse(e.callingCode));
              }
              //setCountryFlag(JSON.parse(e.flag))
              //setCountryCode(JSON.parse(e.callingCode))
              setCountryName(e.name);
            }}
            onClose={(e) => {
              setCountryPickerView(false);
            }}
            visible={CountryPickerView}
          />
        ) : (
          <View></View>
        )}
        <CustomHeader
          headerlabel={"Shipping Address"}
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
            title={"Update"}
            widthset={80}
            topDistance={10}
            loading={loading}
            disabled={disable}
            onPress={() => {
              update_shippingAddress(shipping_state);
              //navigation.navigate("Drawerroute");
            }}
          />
        </View>
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={"Success"}
          subtext={"Update Shipping Address Sucessfully"}
          buttontext={"OK"}
          onPress={() => {
            setModalVisible(false),
            navigation.navigate("ShippingAddressList")
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

export default UpdateShippingAddress;
