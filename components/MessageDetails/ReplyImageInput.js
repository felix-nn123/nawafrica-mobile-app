import React, { useEffect } from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'

import logger from '../../services/loggerService';


//component to select a single image
const ReplyImageInput = ({imageUri, onChangeImage}) => {

useEffect(()=>{
 requestPermissions()
}, [])

const handlePress=()=>{
if(!imageUri) selectImage()
else Alert.alert('Delete', 'Are you sure you want to delete this image?',[
{text:"Yes", onPress:()=>onChangeImage(null)},
{text:"No"}
])
}

const selectImage= async ()=>{
try {
  const result=await ImagePicker.launchImageLibraryAsync({
  quality:0.5,
  })
  if(!result.cancelled) onChangeImage(result.uri)
} catch (error) {
  logger.log("here are my error", error);
}
}

const requestPermissions=async ()=>{
try {
  const {granted}=await ImagePicker.requestCameraPermissionsAsync()
  if(!granted) alert("You need to enable Permission")
} catch (error) {
logger.log("camera error", error);
}
}
               
               

return (
<TouchableWithoutFeedback onPress={handlePress}>
<View style={styles.container}>
{!imageUri && <MaterialCommunityIcons style={styles.icon} name="camera" size={40}/>}   
{imageUri&&<Image source={{uri:imageUri}} style={styles.image}/>}                                           
</View>
</TouchableWithoutFeedback>
)
}


const styles = StyleSheet.create({
   container:{
   borderRadius:15,
   backgroundColor:"#d3d3d3",
   justifyContent:"center",
   alignItems:"center",
   height:100,
   width:100,
   overflow:"hidden"
   },
   image:{
   width:"100%",
   height:"100%"           
   },
   icon:{
   color:"grey"
   }  
})

export default ReplyImageInput