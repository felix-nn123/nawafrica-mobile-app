import React from 'react'
import { StyleSheet, View } from 'react-native'

import AppText from '../Commons/AppText'

const Address = ({street_address}) => {
return (
<View style={styles.container}>
  <AppText style={styles.title}>Address: </AppText>
  <AppText style={styles.text}>{street_address}</AppText>                                                 
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
 text:{
  color: "#666362",
  marginLeft:10                
 }              
})
export default Address
