import React from 'react'
import {Entypo} from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import { Badge } from 'react-native-elements'

const Chat = ({numberOfUnreadMsgs}) => {
return (
<View style={styles.container}>
 <Badge style={styles.badge} value={numberOfUnreadMsgs}/>
 <Entypo style={styles.chatIcon} name="chat" size={40}/>                                                  
</View>
)
}

const styles = StyleSheet.create({
  container:{
   width:50,
   position:"absolute",
   right:10,
   zIndex:2,
   backgroundColor:"#fff",
   justifyContent:"center",
   alignItems:"center"             
  },
  badge:{
   position:"absolute",
   marginTop:20,            
  },
  chatIcon:{
  color: "#666362"                  
  }             
})

export default Chat
