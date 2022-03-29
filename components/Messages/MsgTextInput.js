import React from 'react'
import { Platform, StyleSheet, TextInput, View} from 'react-native'

import { AntDesign } from '@expo/vector-icons';

const MsgTextInput = ({onChange, width="100%", ...otherProps}) => {
return (
<View style={[styles.container, {width}]}>
<AntDesign size={22} color="grey" name='search1' style={styles.icon}/>
<TextInput onChangeText={onChange} style={styles.textInput}  {...otherProps}/>                                               
</View>
)
}


const styles = StyleSheet.create({
container:{
backgroundColor:"#d3d3d3", 
borderRadius:25, 
flexDirection:"row", 
width:"100%", 
padding:7, 
},
textInput:{
fontSize:18, 
color:"#0c0c0c",
fontFamily:Platform.OS==='android'?'Roboto':"Avenir"
},
  icon:{
 marginRight:5
  }          
})

export default MsgTextInput
