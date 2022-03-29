import React from 'react'
import { StyleSheet, View } from 'react-native'

import AppText from './AppText';

const NumberOfListingsBar = ({data, showSearchContainer=false, noListing=false}) => {
  showSearchContainer
return (
<View style={showSearchContainer&&noListing?styles.container1:styles.container}>
 <AppText style={styles.text}>{data}</AppText>                                             
</View>
)
}

const styles = StyleSheet.create({
  container:{
    padding:10,
    backgroundColor:"#035aa6",
    width:"100%"          
  },
  container1:{
    padding:10,
    backgroundColor:"#035aa6",
    width:"100%"          
  },
  text:{
    color:"#fff",
    textAlign:"center"               
  }             
})

export default NumberOfListingsBar
