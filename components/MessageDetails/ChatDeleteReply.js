import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import Chat from '../Home/Chat'

const ChatDeleteReply = ({numberOfUnreadMsgs, onReply, onDelete}) => {
return (
<View style={styles.container}>
<View style={styles.hisContainer}>
<View style={styles.replyDelContainer}>
 <FontAwesome onPress={onReply} size={25} color='black' name="mail-reply"/>

 <MaterialIcons onPress={onDelete} style={styles.delete} size={25} color='red' name="delete"/>
</View>
</View>


<View style={styles.chatContainer}>
<Chat
 numberOfUnreadMsgs={numberOfUnreadMsgs}
/>               
</View>
                                                   
</View>
)
}

const styles = StyleSheet.create({
container:{
width:"100%",
flexDirection:"row",
height:100               
},
hisContainer:{
flex:2,
},
replyDelContainer:{
  width:150,
  backgroundColor:"#d3d3d3",
  padding:7,
  paddingLeft:20,
  borderRadius:30,
  marginLeft:10,
  flexDirection:"row"
},
delete:{
 marginLeft:45                 
},
chatContainer:{
  flex:1,
  marginRight:20            
}               
})

export default ChatDeleteReply
