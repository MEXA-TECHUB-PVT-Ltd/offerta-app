import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

///////////////app components//////////
import Loader from "../../components/Loader/Loader";

////////////////app store data//////////////////
import AsyncStorage from "@react-native-async-storage/async-storage";
import TranslationStrings, {
  ChangeAppLanguage,
} from "../../utills/TranslationStrings";

const LoaderScreen = ({ navigation }) => {
  ////////////////loading/////////////
  const [loading, setloading] = useState(true);
  const getData = async () => {
    try {
      getSelectedLanguage();
      await AsyncStorage.getItem("Userid")
        .then((db) => {
          setloading(false);
          console.log("usertype", { db });
          if (db === null) {
            setloading(false);
            navigation.replace("Login");
          } else {
            setloading(false);
            navigation.replace("Drawerroute");
          }
        })
        .done();
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const getSelectedLanguage = async () => {
    let language = await AsyncStorage.getItem("Language");
    if (language) {
      console.log("language : ", language);
      ChangeAppLanguage(language);
      ChangeAppLanguage(language);
      console.log("______________", TranslationStrings.getLanguage());
    } else {
      ChangeAppLanguage("en");
      console.log("else_________________________________");
      await AsyncStorage.setItem("Language", "en");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"white"} barStyle="dark-content" />
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};
export default LoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
