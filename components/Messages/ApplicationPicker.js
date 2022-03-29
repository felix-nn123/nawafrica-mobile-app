import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import AppText from '../Commons/AppText'

const ApplicationPicker = ({label, onPress, image}) => {
return (
<TouchableOpacity onPress={onPress}>
<View style={styles.container}>
<View style={styles.imageContainer}>
{image?<Image style={styles.image} source={{uri:image}}/>:
<AntDesign name='user' size={25}/>
}
</View>

<View style={styles.labelContainer}>
<AppText>{label}</AppText>              
</View>

</View>                                                
</TouchableOpacity>
)
}

const styles = StyleSheet.create({
text:{
 padding:20                
},
container:{
 width:"100%",
 flexDirection:"row",
 padding:5,                
},
imageContainer:{
height:50,
width:50,
borderRadius:50,
overflow:"hidden",
backgroundColor:"#d3d3d3",
justifyContent:"center",
alignItems:"center",
marginRight:10
},
image:{
height:"100%",
width:"100%"
},
labelContainer:{
 justifyContent:"center"                
}             
})

export default ApplicationPicker
