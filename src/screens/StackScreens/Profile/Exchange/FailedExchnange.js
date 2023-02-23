import React, { useEffect, useState, } from 'react';
import {
  SafeAreaView,FlatList,
 View, 
} from 'react-native';

//////////////////app components///////////////
import CustomHeader from '../../../../components/Header/CustomHeader';
import ExcahangeCard from '../../../../components/CustomCards/ExcahngeCard';
import NoDataFound from '../../../../components/NoDataFound/NoDataFound';

/////////////app styles////////////////
import styles from './styles';

////////////////api function////////////////
import { get_failed_Exchnages } from '../../../../api/GetExchanges';

const FailedExchange = ({ navigation }) => {
  ////////////////LIST DATA/////////
  const [data, setdata] = useState();

  useEffect(() => {
    get_failed_Exchnages().then((response) => {
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
          headerlabel={'Failed Exchanges'}
          iconPress={() => {
            navigation.goBack();a
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
            image={item.user2_item.images[0]===[]?null:item.user2_item.images[0]}
            maintext={'Item Name'}
            subtext={'username want to exchange with item name'}
            pricetext={'78'+$}
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

export default FailedExchange;