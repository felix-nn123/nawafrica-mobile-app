import React, { useEffect } from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { Video} from 'expo-av';
import logger from '../../services/loggerService';

import Load from './Load';


const ImageAndVideoPicker = ({imageUri, onChangeImage, loadingImage, theImage}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
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
     mediaTypes:ImagePicker.MediaTypeOptions.All
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
  {loadingImage?
  <Load visible={loadingImage}/>:
  imageUri&&theImage.resource_type==='image'?<Image source={{uri:imageUri}} style={styles.image}/>:
  imageUri&&theImage.resource_type==='video'?
  <>
  <Video
  ref={video}
  style={{width:"100%", height:"100%"}}
  source={{
    uri:imageUri,
  }}
  useNativeControls
  resizeMode="contain"
  isLooping
  onPlaybackStatusUpdate={status => setStatus(() => status)}
  />

    {!status.isPlaying&&<AntDesign size={35} style={styles.playAndPauseIcon} name='play' onPress={()=>video.current.playAsync()}/>}
    {status.isPlaying&&<AntDesign size={35} style={styles.playAndPauseIcon} name='pausecircle' onPress={()=>video.current.pauseAsync()}/>}


  </>
  :
  <MaterialCommunityIcons style={styles.icon} name="camera" size={40}/>
  }                                       
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
  },
  playAndPauseIcon:{
   position:"absolute",
   zIndex:1
  } 
})


export default ImageAndVideoPicker