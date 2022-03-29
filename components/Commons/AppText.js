import React from 'react'
import {StyleSheet, Platform, Text } from 'react-native'

//use to display text to user
const AppText = ({children, onPress, style, ...otherProps}) => {
return (
<Text onPress={onPress} style={[styles.text, style]} {...otherProps}>
   {children}                                                
</Text>
)
}

const styles = StyleSheet.create({
text:{
fontSize:18,
fontFamily:Platform.OS==='android'?'Roboto':"Avenir"
}              
})

export default AppText
