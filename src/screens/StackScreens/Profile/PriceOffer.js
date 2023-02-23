import React, { useEffect, useState, } from 'react';
import {
  SafeAreaView,FlatList,
 View,
} from 'react-native';

//////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import ExcahangeCard from '../../../components/CustomCards/ExcahngeCard';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';

/////////////app styles////////////////
import styles from './styles';

/////////////////////api function//////////////
import { get_Incoming_Exchnages } from '../../../api/GetExchanges';

const PriceOfferList = ({ navigation }) => {
  ////////////////LIST DATA/////////
  const [data, setdata] = useState();

  useEffect(() => {
    get_Incoming_Exchnages().then((response) => {
      console.log("here data:",response.data)
      if (response.data.msg === "No Result") {
        setdata("");
      } else {
        setdata(response.data);
      }

    });
  }, []);

  return (

    <SafeAreaView style={styles.container}>
               <CustomHeader
          headerlabel={'In coming Exchanges'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'chevron-back'}
        />
<View style={{flex:1}}>
{data === "" ? (
        <NoDataFound icon={"exclamation-thick"} text={"No Data Found"} />
      ) : (
<FlatList
          data={data}
          renderItem={({ item }) => (
            <ExcahangeCard
            image={item.user_item.images[0]===[]?null:IMAGE_URL+item.user_item.images[0]}
            maintext={item.user_item.title}
            subtext={item.user_item.description}
            pricetext={item.user_item.price}
            />
          )}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
</View>


    </SafeAreaView>
  )
};

export default PriceOfferList;