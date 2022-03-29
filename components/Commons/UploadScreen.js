import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { Modal, StyleSheet, View} from 'react-native'

import * as Progress from 'react-native-progress';
import { Svg } from 'react-native-svg';

const UploadScreen = ({visible=false,progress=0, onDone}) => {
return (
<Modal visible={visible}>
<View style={styles.container}>
{progress<1?
<Progress.Pie animated indeterminateAnimationDuration={2000} color={"#035aa6"} progress={progress} size={120} />:
<AnimatedLottieView
autoPlay
loop={false}
source={require('../../assets/animations/lf20_z1xh5r3y (1).json')}
style={styles.animation}
onAnimationFinish={onDone}
/>
}
</View>
</Modal>
)
}

const styles = StyleSheet.create({
  container:{
  alignItems:"center",
  flex:1,
  justifyContent:"center"
  },
  animation:{
    width:300,
    height:300
  },           
})

export default UploadScreen
