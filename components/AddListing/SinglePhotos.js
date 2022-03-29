import React, { useEffect } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View, Image} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import logger from '../../services/loggerService';

import AppText from '../Commons/AppText';
import Load from '../Commons/Load'

const SinglePhotos = ({imageUri, onChangeImage, loadingImage, title='Main Photo*', error}) => {
useEffect(()=>{
 requestPermissions()
}, [])
                                 
const handlePress=()=>{
selectImage()
}
                                 
const selectImage= async ()=>{
try {
  const result=await ImagePicker.launchImageLibraryAsync({
  quality:0.5
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
<View style={styles.imageInputContainer}>
<AppText style={styles.titleText}>{title}</AppText>
{error&&<AppText style={styles.errorText}>{error}</AppText>} 
<TouchableWithoutFeedback onPress={handlePress}>
{/* loadingImage */}
<View style={styles.container}>
  {loadingImage?
  <Load visible={loadingImage}/>:
  imageUri?<Image source={{uri:imageUri}} style={styles.image}/>:
  <MaterialCommunityIcons style={styles.icon} name="camera" size={40}/>
  }

</View>
</TouchableWithoutFeedback>                                      
</View>
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
},
titleText:{
 marginVertical:5,
 fontWeight:'900',
 textAlign:"center"                
},
errorText:{
  fontSize:12,
  color:"red"
}               
})

export default SinglePhotos
