import React from 'react'
import { StyleSheet, View } from 'react-native'

import {CheckBox} from 'react-native-elements'

const AppCheckbox = ({title, checked,  onPress, textStyle, iconStyle}) => {
return (
<View style={styles.container}>
<CheckBox
  title={title}
  checked={checked}
  onPress={onPress}
  textStyle={{...textStyle}}
  iconStyle={{...iconStyle}}
/>                                              
</View>
)
}


const styles = StyleSheet.create({
container:{
flexDirection:"row"
}                           
})

export default AppCheckbox
