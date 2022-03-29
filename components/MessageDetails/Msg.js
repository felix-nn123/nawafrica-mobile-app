import React from 'react'
import { StyleSheet, View } from 'react-native'

import AppText from '../Commons/AppText'

const Msg = ({message}) => {
return (
<View style={styles.container}>
  <AppText style={styles.text}>{message.body}</AppText>                                                 
</View>
)
}

const styles = StyleSheet.create({
container:{
 width:"100%",
 backgroundColor:"white",
 padding:10,
 marginTop:5,
 borderRadius:5               
},
text:{
  textAlign:"center"
}               
})

export default Msg
