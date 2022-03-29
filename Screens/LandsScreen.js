import React from 'react'
import { StyleSheet, ImageBackground, View} from 'react-native'
import AppButton from '../components/Commons/AppButton'


const LandsScreen = ({navigation}) => {
return (
<ImageBackground removeClippedSubview={false} source={require('../assets/lands_show.jpg')} style={styles.container}>

<View style={styles.buttonContainer}>  

<AppButton onPress={()=>navigation.navigate("rent_Land")} title='Rent A Land'/>   

<AppButton onPress={()=>navigation.navigate("sell_Land")} title='Buy A Land'/>  

</View>
                                         
</ImageBackground>
)
}

const styles = StyleSheet.create({
container:{
width:"100%",
height:'100%'             
},
buttonContainer:{
flex:1,
justifyContent:"center",
alignItems:'center',
padding:10                 
}                
 })
export default LandsScreen
