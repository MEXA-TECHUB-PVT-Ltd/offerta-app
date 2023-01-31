import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar
} from 'react-native';

///////////////app components//////////
import Loader from '../../components/Loader/Loader';

////////////////app store data//////////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoaderScreen = ({navigation}) => {
  ////////////////loading/////////////
  const [loading, setloading] = useState(true);
  const getData = async () => {
    try {
      await AsyncStorage.getItem('Userid')
        .then(db => {
          setloading(false)
          console.log('usertype', {db});
          if (db === null) {
            setloading(false)
            navigation.navigate('Login');
          }
          else{
            setloading(false)
            navigation.navigate('Drawerroute');
          }
        })
        .done();
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

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
    backgroundColor: 'white',
  },
});
