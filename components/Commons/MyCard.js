import React from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import {Ionicons} from "@expo/vector-icons"

import useAuth from '../../hooks/useAuth';
import AppText from './AppText';

const MyCard = ({title, subTitle, price, posted, onPress, image=require('../../assets/house.jpg'), listing, onDeleteList}) => {
const {user}=useAuth()

return (
<View style={styles.card}>
  <TouchableWithoutFeedback onPress={onPress}>
  <Image style={styles.Image} source={image}/> 
  </TouchableWithoutFeedback>
  <View style={styles.cardContentContainer}>
  <View style={styles.titlePriceContainer}>
    <AppText style={styles.title}>{title}</AppText>
    <AppText style={styles.price}>{price}</AppText>
  </View>
  <View style={styles.subTitlePostedContainer}>
    <AppText style={styles.subTitle}>{subTitle}</AppText>
    <AppText style={styles.posted}>Posted: {posted}</AppText>
    {user.id===listing.list_owner_id&&<Ionicons 
    onPress={onDeleteList} 
    style={styles.deleteButton} 
    name='trash-bin' 
    size={22} 
    color={'#ff726f'}
    />}
  </View>
  </View>  
</View>
)
}
const styles = StyleSheet.create({
card:{
borderRadius:15,
backgroundColor:'#fff',
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
fontSize:22
},
price:{
fontWeight:"bold",
fontSize:20
},
subTitle:{
fontSize:14,
marginBottom:5
},
posted:{
  fontSize:14,
},
deleteButton:{
  position:"absolute",
  bottom:2,
  right:5
}
})
export default MyCard
