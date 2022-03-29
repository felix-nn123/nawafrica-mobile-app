import React from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'


const MessageImages = ({img, onDownload, showLargeImage}) => {         
return (
<View style={styles.imagesContainer}>
{/* <TouchableWithoutFeedback onPress={()=>onDownload(img)}>
<View  style={styles.downloadIcon}>
<AntDesign name='clouddownloado' size={25}/>
</View>
</TouchableWithoutFeedback> */}

<TouchableWithoutFeedback onPress={()=>showLargeImage(img)}>
<Image style={styles.image} source={{uri:img.url}}/>
</TouchableWithoutFeedback>
</View>
)
}

const styles = StyleSheet.create({
 imagesContainer:{
  width:200,
  height:200,
  backgroundColor:"white",
  marginTop:5,
  borderRadius:5,
  overflow:"hidden",
  padding:2,
  marginRight:5             
 }, 
 image:{
  width:"100%",
  height:"100%",
  borderRadius:5                
 },
 downloadIcon:{
 position:"absolute",
 zIndex:1,
 width:30,
 height:30,
 backgroundColor:"white",
 justifyContent:"center",
 alignItems:"center"                
 }              
})

export default MessageImages
