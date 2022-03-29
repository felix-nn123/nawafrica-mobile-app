import React from 'react'
import { Platform, StyleSheet, TextInput, View} from 'react-native'
import { MaterialCommunityIcons, AntDesign, FontAwesome , FontAwesome5} from '@expo/vector-icons';

const AppTextInput = ({icon, font5Icon, onChange, width="100%", fontIcon, ant=false, ...otherProps}) => {
return (
<View style={[styles.container, {width}]}>
{icon&&!ant&&<MaterialCommunityIcons size={22} color="grey" name={icon} style={styles.icon}/>}
{ant&&<AntDesign size={22} color="grey" name={icon} style={styles.icon}/>}
{fontIcon&&<FontAwesome size={22} color="grey" name={fontIcon} style={styles.icon}/>}
{font5Icon&&<FontAwesome5 size={22} color="grey" name={font5Icon} style={styles.icon}/>}
<TextInput onChangeText={onChange} style={styles.textInput}  {...otherProps}/>                                               
</View>
)
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#d3d3d3", 
    borderRadius:25, 
    flexDirection:"row", 
    width:"100%", 
    padding:15, 
    marginVertical:15 
  },
  textInput:{
fontSize:18, 
color:"#0c0c0c",
fontFamily:Platform.OS==='android'?'Roboto':"Avenir"
},
  icon:{
 marginRight:5
  }          
})
export default AppTextInput
