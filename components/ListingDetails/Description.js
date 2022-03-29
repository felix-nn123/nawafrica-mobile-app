import React from 'react'
import { StyleSheet, View } from 'react-native'

import AppText from '../Commons/AppText'

const Description = ({description}) => {
return (
<View style={styles.container}>
<AppText style={styles.title}>Description/Overview :</AppText>
<AppText style={styles.description}>{description}</AppText>                                                 
</View>
)
}

const styles = StyleSheet.create({
container:{
padding:7, 
borderWidth:1,
borderColor:"#666362",
marginLeft:5,
marginRight:5,
marginTop:5,
borderRadius:5                 
 },
 title:{
fontSize:22,
fontWeight:"bold",
color: "#666362"                 
 },
 description:{
color: "#666362",
marginLeft:10,
fontSize:17                   
 }               
})

export default Description
