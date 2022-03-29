import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Entypo} from '@expo/vector-icons';

//use as a button 
const ReplyAppButton = ({onPress, title="Login", backgroundColor="#035aa6"}) => {
return (
<>
<TouchableOpacity style={[styles.buttonInnerContainer, {backgroundColor:backgroundColor}]} onPress={onPress}>
<Entypo color={"white"} name='paper-plane' size={25}/>
</TouchableOpacity>                                               
</>
)
}

const styles = StyleSheet.create({
buttonInnerContainer:{
backgroundColor:"#035aa6",
justifyContent:"center",
alignItems:"center",
borderRadius:30,
marginVertical:10,
width:"100%",
padding:2
} ,
buttonText:{
color:"white",
fontSize:20,
fontFamily:Platform.OS==='android'?"Roboto":"San Francisco",
fontWeight:"bold"
}        
})

export default ReplyAppButton