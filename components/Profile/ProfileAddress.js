import React from 'react'
import { StyleSheet, View } from 'react-native'
import {Entypo} from 'react-native-vector-icons'

import AppText from '../Commons/AppText'

const ProfileAddress = ({title, content, Icon=<Entypo name="globe" size={20} style={styles.icon}/>}) => {
return (
<View style={styles.country}>
{Icon}
<AppText style={styles.titleCountry}>{title} :</AppText>
<AppText style={styles.nation}>{content}</AppText>
</View> 
)
}

const styles = StyleSheet.create({
country:{
width:"100%",
flexDirection:"row",
alignItems:"center"
},
titleCountry:{
 fontWeight:"900",
 fontSize:20,
 marginLeft:7              
},
nation:{
 marginLeft:10              
}                
})

export default ProfileAddress
