import * as React from 'react';
import {View,Text,ActivityIndicator,Image} from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles';
import Colors from '../../utills/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const CustomButtonhere = ({
    icon,
    mode,
    title,
    onPress,
    loading,
    disable,
    widthset,
    iscolor,
    image,
    topDistance
}) => {
    return(
<View style={[styles.container,{top:hp(topDistance)}]}>
  <Button 
  icon={icon}
  color={Colors.Appthemecolor}
  mode={mode}
  contentStyle={[styles.buttoncontent,{width:wp(widthset),
      backgroundColor:iscolor==='login'?'white':Colors.Appthemecolor,
  color:iscolor==='login'?'white':Colors.Appthemecolor}]}
  style={[styles.button,{width:wp(widthset),
    backgroundColor:iscolor==='login'?'white':Colors.Appthemecolor}]}
  labelStyle={[styles.label,{color:iscolor==='login'?Colors.Appthemecolor:'white',
  backgroundColor:iscolor==='login'?'white':Colors.Appthemecolor,width:wp(widthset/2)
}]}
  onPress={onPress}
  disabled={disable}
  loading={loading}
  >
    {title} 
  </Button>
  </View>
    )
};

export default CustomButtonhere;