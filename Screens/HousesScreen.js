import React from 'react'
import { StyleSheet, ImageBackground, View} from 'react-native'

import AppButton from '../components/Commons/AppButton'

const HousesScreen = ({navigation}) => {
return (
<ImageBackground removeClippedSubview={false} source={require('../assets/house_key.jpg')} style={styles.container}>

<View style={styles.buttonContainer}>

<AppButton onPress={()=>navigation.navigate("rent_House")} title='Rent A House'/>   

<AppButton onPress={()=>navigation.navigate("sell_House")} title='Buy A House'/>   

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
export default HousesScreen
