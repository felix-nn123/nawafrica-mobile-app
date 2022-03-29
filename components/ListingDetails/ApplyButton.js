import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

import AppText from '../Commons/AppText'

const ApplyButton = ({onClick, appliedAlready}) => {
return (
<View style={styles.applyContainer}>
{appliedAlready&&<TouchableOpacity style={styles.applyBtn} onPress={onClick}>
 <AppText style={styles.text}>APPLY NOW</AppText>
</TouchableOpacity>}

{!appliedAlready&&
<TouchableOpacity style={styles.applyBtn1} onPress={onClick}>
 <AppText style={styles.text1}>UNAPPLY NOW</AppText>
</TouchableOpacity>}
</View>
)
}

const styles = StyleSheet.create({
applyContainer:{
marginVertical:10,
width:'100%',
padding:10
},
applyBtn:{
width:"100%",
justifyContent:"center",
alignItems:"center",
backgroundColor:"#035aa6",
padding:5,
borderRadius:10 
},
applyBtn1:{
width:"100%",
justifyContent:"center",
alignItems:"center",
backgroundColor:"white",
color:"#035aa6",
borderWidth:1,
borderColor:"#035aa6", 
padding:5,
borderRadius:10 
},
text:{
color:"white"               
},
text1:{
color:"#035aa6"                 
}               
})

export default ApplyButton
