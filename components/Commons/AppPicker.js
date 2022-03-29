import React, { useState } from 'react'
import { Button, FlatList , Modal, Platform, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import { MaterialCommunityIcons, AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons';

import AppText from './AppText';
import PickerItems from './PickerItems';


const AppPicker = ({
  items, 
  icon, 
  AntIcon,
  placeholder,
  onSelectItem, 
  selectedItem,
  SetToDefault,
  Font5Icon,
  EntyIcon,
  PickerItemComponent=PickerItems
}) => {
const [modalVisible, setModalVisible]=useState(false)
const modalShow=()=>{
  setModalVisible(true)               
}

const anyItem=()=>{
  setModalVisible(false)
  SetToDefault("") 
}


return (
<>
<TouchableWithoutFeedback onPress={modalShow}>
<View style={styles.container}>
{icon&&<MaterialCommunityIcons size={22} color="grey" name={icon} style={styles.icon}/>}
{AntIcon&&<AntDesign size={22} color="grey" name={AntIcon} style={styles.icon}/>}
{Font5Icon&&<FontAwesome5 size={22} color="grey" name={Font5Icon} style={styles.icon}/>}
{EntyIcon&&<Entypo size={22} color="grey" name={EntyIcon} style={styles.icon}/>}

{selectedItem?
<AppText style={styles.text}>{selectedItem.label}</AppText>
:
<AppText style={styles.placeholder}>{placeholder}</AppText>
}

<MaterialCommunityIcons size={22} color="grey" name="chevron-down" style={styles.icon}/>                                        
</View>
</TouchableWithoutFeedback>


<Modal visible={modalVisible} animationType="slide">
<Button onPress={()=>setModalVisible(false)} title="close"/>
<TouchableWithoutFeedback onPress={anyItem}>
<Text style={styles.selectAny}>Select Any</Text>
</TouchableWithoutFeedback>
<FlatList
data={items}
keyExtractor={(item)=>`${item.value}`}
renderItem={({item})=> (
<PickerItemComponent 
label={item.label}
onPress={()=>{
  setModalVisible(false)
  onSelectItem(item)
}}
/> 
)}
/>
</Modal>
</>
)
}

const styles = StyleSheet.create({
  container:{backgroundColor:"#d3d3d3", alignItems:"center", borderRadius:25, flexDirection:"row", width:"100%", padding:15, marginVertical:15 },
  textInput:{
fontSize:18, 
color:"#0c0c0c",
fontFamily:Platform.OS==='android'?'Roboto':"Avenir"
},
text:{
flex:1,
color:"#0c0c0c",
marginLeft:5
},
placeholder:{
  flex:1,
  marginLeft:5,
  color:"#0c0c0c"
},
selectAny:{
  marginLeft:20,
  marginTop:10,
  fontSize:18,
  fontFamily:Platform.OS==='android'?'Roboto':"Avenir"
}     
})
export default AppPicker
