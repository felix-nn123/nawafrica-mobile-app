import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const TableButton = ({onPress, title="Login", backgroundColor="red"}) => {
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
backgroundColor:"red",
padding:5,
justifyContent:"center",
alignItems:"center",
borderRadius:10,
marginVertical:2,
width:"100%"
} ,
buttonText:{
color:"white",
fontSize:16,
fontFamily:Platform.OS==='android'?"Roboto":"San Francisco",
fontWeight:"bold"
}        
})
                 

export default TableButton
