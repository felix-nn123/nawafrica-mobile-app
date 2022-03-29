import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

//use as a button 
const AppButton = ({onPress, title="Login", backgroundColor="#035aa6"}) => {
return (
<>
<TouchableOpacity style={[styles.buttonInnerContainer, {backgroundColor:backgroundColor}]} onPress={onPress}>
<Text style={styles.buttonText}>
{title}            
</Text>
</TouchableOpacity>                                               
</>
)
}

const styles = StyleSheet.create({
buttonInnerContainer:{
backgroundColor:"#035aa6",
padding:15,
justifyContent:"center",
alignItems:"center",
borderRadius:30,
marginVertical:10,
width:"100%"
} ,
buttonText:{
color:"white",
fontSize:20,
fontFamily:Platform.OS==='android'?"Roboto":"San Francisco",
fontWeight:"bold"
}        
})

export default AppButton



