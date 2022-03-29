import React from 'react'
import { Text, StyleSheet, Image, View, ImageBackground, Platform, StatusBar, SafeAreaView} from 'react-native'

import AppButton from '../components/Commons/AppButton'

const WelcomeScreen = ({navigation}) => {
                 
return (
<ImageBackground resizeMethod="resize" source={require('../assets/lion.jpg')}  style={styles.welcomeOuterContainer}>
<SafeAreaView style={styles.welcomeInnerContainer}>

<View style={styles.welcomeImageContainer}>
<Image style={styles.welcomeLogo} source={require('../assets/logo.png')}/>
<Text style={styles.welcomeLogoText}>Search Properties In Africa</Text>
</View>

<View style={styles.loginButtonContainer}>
<AppButton
title="Login"
onPress={()=>navigation.navigate('Login')}
/>
</View>  

<View style={styles.signupButtonContainer}>
<AppButton
title="Register"
onPress={()=>navigation.navigate("Register")}
backgroundColor="#ffa500"
/>
</View>  

</SafeAreaView>
</ImageBackground>
)
}

const styles = StyleSheet.create({
welcomeOuterContainer:{
flex:1,
width:"100%",
height:"100%",
justifyContent:"flex-end" 
},

welcomeLogo:{
width:120,
height:120,
},
welcomeImageContainer:{
justifyContent:"center",
alignItems:"center",
width:"100%",
height:200,
position:'absolute',
marginHorizontal:"15%",
marginTop:100
} ,
welcomeInnerContainer:{
flex:1,
padding:Platform.os==="android"?0:StatusBar.currentHeight,
},
welcomeLogoText:{
color:"#fff",
fontSize:35,
textAlign:"center",
fontWeight:"bold",
fontFamily:Platform.OS==='android'?"Roboto":"San Francisco"
},
loginButtonContainer:{
width:"100%",
position:"absolute",
bottom:70,
marginLeft:"10%"
},
buttonColor:{
backgroundColor:"red"
},
signupButtonContainer:{
position:"absolute",
bottom:5,
width:"100%",
marginLeft:"10%"
}
})

export default WelcomeScreen
