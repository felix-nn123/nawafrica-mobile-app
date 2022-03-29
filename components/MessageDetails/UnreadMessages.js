import React from 'react'
import { StyleSheet, View } from 'react-native'

import AppText from '../Commons/AppText'
import MsgTable from '../Messages/MsgTable'

const UnreadMessages = ({message, UnreadMessages, deleteUnreadMsg, MessageDetails}) => {
return (
<View style={styles.container}>
 <View style={styles.firstContainer}>
<AppText style={styles.heading}>ALL UNREAD MESSAGES FROM {message.sender_name&&message.sender_name.toUpperCase()}</AppText>
</View>   

<MsgTable
messages={UnreadMessages}
deleteItem={deleteUnreadMsg} 
MessageDetails={MessageDetails}
/>
</View>
)
}

const styles = StyleSheet.create({
 container:{
  backgroundColor:'#d3d3d3',
  width:"100%",
  padding:2,
  marginTop:10,
  borderRadius:10             
 },
 firstContainer:{
 height:50,
 width:"100%",
 backgroundColor:"white",
 justifyContent:"center",
 alignItems:"center",
 borderBottomColor:"black",
 borderBottomWidth:1                
 },
 heading:{
fontSize:16,
fontWeight:"bold",
color:"#035aa6"            
 }                
})

export default UnreadMessages
