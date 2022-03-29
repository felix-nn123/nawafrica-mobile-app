import React from 'react'
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native'

//use to place items above the notch of your phone
const AppScreen = ({children}) => {
return (
<SafeAreaView style={styles.screen}>
   {children}                                                
</SafeAreaView>
)
}

const styles = StyleSheet.create({
screen:{
flex:1,
paddingTop:Platform.OS==='android'?StatusBar.currentHeight:0
}
})

export default AppScreen
