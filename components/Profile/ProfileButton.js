import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileButton = ({
onPress, 
title="Logout", 
Icon=<MaterialCommunityIcons name='logout' size={15}/>, 
backgroundColor="#035aa6"}) => {
return (
<>
<TouchableOpacity style={[styles.buttonInnerContainer, {backgroundColor:backgroundColor}]} onPress={onPress}>
<Text style={styles.buttonText}>
{Icon}
{title}            
</Text>
</TouchableOpacity>                                               
</>
)
}

const styles = StyleSheet.create({
buttonInnerContainer:{
backgroundColor:"#035aa6",
padding:5,
justifyContent:"center",
alignItems:"center",
borderRadius:30,
marginVertical:10,
width:"100%"
} ,
buttonText:{
color:"white",
fontSize:16,
fontFamily:Platform.OS==='android'?"Roboto":"San Francisco",
fontWeight:"bold"
}        
})

export default ProfileButton
