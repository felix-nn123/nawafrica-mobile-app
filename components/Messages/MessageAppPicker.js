import React, { useState } from 'react'
import { Button, FlatList , Modal, Platform, StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ApplicationPicker from './ApplicationPicker';
import AppText from './../Commons/AppText';


const MessageAppPicker = ({
  items, 
  icon, 
  placeholder,
  onSelectItem, 
  selectedItem,
  SetToDefault,
  PickerItemComponent=ApplicationPicker,
  allUsers,
  user
}) => {
const [modalVisible, setModalVisible]=useState(false)
const modalShow=()=>{
  setModalVisible(true)               
}

const anyItem=()=>{
  setModalVisible(false)
  SetToDefault("") 
}

const selectedImage=(application)=>{
  if(user.post_rent_property==="LOOKING TO BUY/RENT PROPERTY"){
    const theUser=allUsers.filter(user=>user.id===application.list_owner_id)[0]
    return theUser.picture&&theUser.picture.fileProfile&&theUser.picture.fileProfile.url?theUser.picture.fileProfile.url:null
  }else{
    const theUser=allUsers.filter(user=>user.id===application.applicant_id)[0]
    return theUser.picture&&theUser.picture.fileProfile&&theUser.picture.fileProfile.url?theUser.picture.fileProfile.url:null
  }
}

return (
<>
<TouchableWithoutFeedback onPress={modalShow}>
<View style={styles.container}>
{icon&&<MaterialCommunityIcons size={22} color="grey" name={icon} style={styles.icon}/>}

{selectedItem?
<AppText style={styles.text}>{`${user.post_rent_property==="LOOKING TO BUY/RENT PROPERTY"?selectedItem.list_owner_name:selectedItem.appicant_name} @ ${selectedItem.listing_name}`}</AppText>
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
keyExtractor={(item)=>`${item.id}`}
renderItem={({item})=> (
<PickerItemComponent 
label={`${user.post_rent_property==="LOOKING TO BUY/RENT PROPERTY"?item.list_owner_name:item.appicant_name} @ ${item.listing_name}`}
onPress={()=>{
  setModalVisible(false)
  onSelectItem(item)
}}
image={selectedImage(item)}
/>
)}
ItemSeparatorComponent={()=><View style={{width:"100%", height:1, backgroundColor:"#d3d3d3"}}/>}
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
},
placeholder:{
  flex:1,
  marginLeft:5
},
selectAny:{
  marginLeft:20,
  marginTop:10,
  fontSize:18,
  fontFamily:Platform.OS==='android'?'Roboto':"Avenir"
}     
})
export default MessageAppPicker