import React from 'react'
import { View, StyleSheet, Platform, StatusBar} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

import AppText from './AppText';

const OffLineNotice = () => {
const netInfo=useNetInfo()
if(netInfo.type!=="unknown"&&netInfo.isInternetReachable===false)
return (
<View style={styles.container}>
 <AppText style={styles.text}>Your Device is Offline</AppText>                                                  
</View>
)

else return null
}

const styles = StyleSheet.create({
container:{
backgroundColor:"#FF7F7F",
height:50,
position:'absolute',
zIndex:5,
width:"100%",
marginTop:Platform.OS==='android'?StatusBar.currentHeight:0,
alignItems:"center",
justifyContent:"center"           
},
text:{
color:"white",  
fontSize:15          
}             
})

export default OffLineNotice
