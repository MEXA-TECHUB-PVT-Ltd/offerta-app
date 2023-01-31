import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

/////////app icons//////////
import Ionicons from "react-native-vector-icons/Ionicons";

////////////app colors///////////////
import Colors from "../../utills/Colors";

////////////////app fonts////////////
import { fontFamily } from "../../constant/fonts";

//////////////////////responsive library//////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CustomTextInput = ({
  term,
  placeholder,
  onTermChange,
  type,
  icon,
  disable,
  editable,
  length,
  returnType,
  onNext,
  onRef,
  mode,
  secureTextEntry,
  onclick,
  multiline,
  keyboard_type,
}) => {
  const [isfocused, setisFocused] = useState(false);
  return (
    <View>
      <View
        style={[
          styles.TextFieldView,
          {
            borderColor:
              isfocused == true
                ? Colors.activetextinput
                : Colors.inactivetextinput,
            height: multiline === true ? hp(20) : hp(7),
            borderRadius: multiline === true ? wp(8) : wp(10),
          },
        ]}
      >
        <TextInput
          style={[
            styles.TextField,
            {
              width:
                length === "small"
                  ? wp(20)
                  : type === "iconinput"
                  ? wp(63)
                  : wp(70),
              textAlignVertical: multiline === true ? "top" : null,
              height: multiline === true ? hp(20) : null,
              marginTop: multiline === true ? hp(3) : null,
            },
          ]}
          ref={onRef}
          autoCorrect={false}
          clearTextOnFocus={true}
          placeholder={placeholder}
          value={term}
          editable={editable}
          disabled={disable}
          returnKeyType={returnType}
          keyboardType={keyboard_type}
          placeholderTextColor={Colors.inputplaceholder}
          onFocus={() => setisFocused(true)}
          onChangeText={onTermChange}
          onEndEditing={() => setisFocused(false)}
          onSubmitEditing={onNext}
          secureTextEntry={secureTextEntry}
        ></TextInput>
        {type === "iconinput" && mode === "password" ? (
          <TouchableOpacity onPress={onclick}>
            {secureTextEntry ? (
              <Ionicons
                name="lock-closed"
                color={Colors.inputtextcolor}
                size={20}
                style={{ marginRight: wp(8) }}
              />
            ) : (
              <Ionicons
                name="lock-open"
                color={Colors.inputtextcolor}
                size={20}
                style={{ marginRight: wp(8) }}
              />
            )}
          </TouchableOpacity>
        ) : type === "iconinput" ? (
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextField: {
    fontSize: hp(1.6),
    marginHorizontal: 20,
    fontFamily: fontFamily.Poppins_Regular,
    color: "#6B6B6B",
    width: wp(65),
  },
  TextFieldView: {
    flexDirection: "row",
    height: hp(7),
    width: wp(85),
    borderRadius: wp(10),
    marginTop: hp(1),
    marginBottom: hp(1),
    borderColor: "#6B6B6B",
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: wp(8),
    width: wp(3.5),
    height: hp(2.5),
  },
  ErrorText: {
    fontSize: 12,
    color: "red",
    marginHorizontal: 20,
  },
});

export default CustomTextInput;
