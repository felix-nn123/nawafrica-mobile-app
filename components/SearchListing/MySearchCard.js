import React from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native';

import AppText from '../Commons/AppText';
import SearchCarousel from './SearchCarousel';

const MySearchCard = ({title, subTitle, price, posted, onPress, listing}) => {
return (
<View style={styles.card}>
  <View style={styles.cardContentContainer}>
  <View style={styles.titlePriceContainer}>
    <AppText style={styles.title}>{title}</AppText>
    <AppText style={styles.price}>{price}</AppText>
  </View>
  <View style={styles.subTitlePostedContainer}>
    <AppText style={styles.subTitle}>{subTitle}</AppText>
    <AppText style={styles.posted}>Posted: {posted}</AppText>
  </View>
  </View>  

<TouchableHighlight onPress={onPress}>
 <SearchCarousel
  listing={listing}
  /> 
</TouchableHighlight>
</View>
)
}

const styles = StyleSheet.create({
card:{
borderRadius:15,
backgroundColor:'rgba(0, 0, 0, 0.6)',
marginBottom:20,
overflow:"hidden"
},
cardContentContainer:{
flexDirection:"row",
padding:10               
},
titlePriceContainer:{
flex:1
},
subTitlePostedContainer:{
flex:1
},
Image:{
 width:"100%",
 height:300                
},
title:{
marginBottom:7,
fontWeight:"bold",
fontSize:22,
color:"white"
},
price:{
fontWeight:"bold",
fontSize:20,
color:"white"
},
subTitle:{
fontSize:14,
marginBottom:5,
color:"white"
},
posted:{
fontSize:14,
color:"white"
}
})

export default MySearchCard
