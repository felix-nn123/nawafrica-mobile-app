import React, { useState } from 'react'
import { Button, FlatList , Modal, Platform, StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from '../Commons/AppText'
import MsgPicker from './MsgPicker';

const AppMsgPicker = ({
items, 
icon, 
placeholder,
onSelectItem, 
selectedItem,
SetToDefault,
PickerItemComponent=MsgPicker
}) => {
const [modalVisible, setModalVisible]=useState(false)
const modalShow=()=>{
setModalVisible(true)               
}
                 

return (
<>
<TouchableWithoutFeedback onPress={modalShow}>
<View style={styles.container}>
{icon&&<MaterialCommunityIcons size={22} color="grey" name={icon} style={styles.icon}/>}

{selectedItem.label?
<AppText style={styles.text}>{selectedItem.label}</AppText>
:
<AppText style={styles.placeholder}>{placeholder}</AppText>
}

<MaterialCommunityIcons size={22} color="grey" name="chevron-down" style={styles.icon}/>                                        
</View>
</TouchableWithoutFeedback>


<Modal visible={modalVisible} animationType="slide">
<Button onPress={()=>setModalVisible(false)} title="close"/>


<FlatList
data={items}
keyExtractor={(item)=>`${item.label}`}
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
container:{backgroundColor:"#d3d3d3", alignItems:"center", borderRadius:25, flexDirection:"row", marginLeft:20, width:"40%", padding:7},
textInput:{
fontSize:18, 
color:"#0c0c0c",
fontFamily:Platform.OS==='android'?'Roboto':"Avenir"
},
text:{
flex:1,
textAlign:"center"
},
placeholder:{
flex:1,
marginLeft:5
},
selectAny:{
marginLeft:20,
fontSize:18,
fontFamily:Platform.OS==='android'?'Roboto':"Avenir"
}   
})

export default AppMsgPicker
