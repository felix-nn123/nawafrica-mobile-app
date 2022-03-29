import React, {useEffect} from 'react'
import { View, Image , StyleSheet, ImageBackground} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import logger from '../../services/loggerService';

import { AntDesign, Entypo } from '@expo/vector-icons';
import AppText from '../Commons/AppText';
import Load from '../Commons/Load'

const ProfilePicture = ({user, imageUri, onChangeImage, loadPicture, myListing}) => {

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
<ImageBackground resizeMethod="resize" source={myListing.length===0?require('../../assets/lion.jpg'):{uri:`${myListing[0].main_photo.path.url}`}}  style={styles.container}>
<View style={styles.imageContainer}>
{loadPicture?
<Load visible={loadPicture}/>
:imageUri?
<Image style={styles.image} source={{uri:imageUri}}/>:
  <AntDesign size={50} name="user"/>
}
<View style={styles.camaraContainer}>
<Entypo onPress={handlePress} style={styles.camera} name='camera' size={18} />
</View>
</View>

<View style={styles.namesContainer}>
<AppText style={styles.name}>{`${user.first_name} ${user.middle_name?user.middle_name:""} ${user.last_name}`}</AppText>
<AppText style={styles.email}>{user.email}</AppText>
</View>
</ImageBackground>
)
}

const styles = StyleSheet.create({
  container:{
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
   imageContainer:{
     width:150,
     height:150,
     borderRadius:75,
     overflow:"hidden",
     marginLeft:10,
     marginTop:10,
     marginBottom:10,
     marginRight:10,
     backgroundColor:"#d3d3d3",
     justifyContent:"center",
     alignItems:"center"
   },
   image:{
     width:"100%",
     height:"100%"
   },
   camaraContainer:{
     height:40,
     width:40,
     borderRadius:20,
     backgroundColor:"#d3d3d3",
     justifyContent:"center",
     alignItems:"center",
     position:"absolute",
     bottom:0,
     marginLeft:50
   } ,
   namesContainer:{
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#d3d3d3",
    padding:7,
    borderTopRightRadius:10,
    borderTopLeftRadius:10                 
   },
   name:{
     color:"#035aa6",
     fontSize:22,
     fontWeight:"bold"              
   },
   email:{
  fontStyle:'italic'
   },            
})

export default ProfilePicture
