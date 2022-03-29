import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import { Entypo } from '@expo/vector-icons';

const TextAreaInput = ({onChangeText, value=''}) => {
return (
<View style={styles.textArea}>
{!value&&<Entypo style={styles.messageIcon} name="address" size={30}/> }                
<TextInput
style={styles.textInput}
placeholder='Details*(Please provide Detail locations, amenities, neighbourhood about this property)'
clearButtonMode='always'
numberOfLines={5}
multiline
onChangeText={onChangeText}
/>
</View>
)
}

const styles = StyleSheet.create({
textInput:{               
fontSize:20,
backgroundColor:"#d3d3d3",
marginBottom:5,
borderRadius:20,
padding:5      
},
textArea:{
width:"100%",
},
messageIcon:{
 position:"absolute",
 zIndex:1,
 marginTop:10,
 marginLeft:10
}                
})

export default TextAreaInput
