import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import AppText from '../Commons/AppText'

const MoreAboutListing = ({listingType, rentOrSell, bedroom, kitchen, advancedPayment}) => {
return (
<View style={styles.container}>
   <AppText style={styles.firstPara}><Text style={styles.rentOrSell}>{listingType} for {rentOrSell}</Text> | {bedroom} bedroom(s), | {kitchen} Kitchen(s)</AppText>   
   <AppText style={styles.secondPara}>Advanced Payment/Security Fee : {advancedPayment}</AppText>                                             
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
rentOrSell:{
fontWeight:"bold",
fontSize:20             
 },
 firstPara:{
 color:"#666362",
 fontSize:16              
 },
 secondPara:{
color:"#666362",
fontSize:16                 
 }            
})
export default MoreAboutListing
