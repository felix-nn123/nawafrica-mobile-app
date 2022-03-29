import React from 'react'
import { StyleSheet, View } from 'react-native'
import AnimatedLottieView from 'lottie-react-native'

const Load = ({visible}) => {
if(!visible) return null
return (
<View style={styles.overlay}>
<AnimatedLottieView
autoPlay
loop
source={require('../../assets/animations/flying.json')}
/>
</View>
)
}

const styles = StyleSheet.create({
overlay:{
height:100,
width:100,
zIndex:1,
backgroundColor:"white",
opacity:0.5,
justifyContent:"center",
alignItems:"center"
}              
})

export default Load
