import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppText from '../Commons/AppText'
import Chat from '../Home/Chat'

const NameMessages = ({numberOfUnreadMsgs, user}) => {
return (
<View style={styles.container}>
<View style={styles.nameContainer}>
<AppText style={styles.name}>Welcome {user.first_name}</AppText>
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
  flexDirection:"row",
  width:"100%"             
 },
 chatContainer:{
   flex:1,
   height:100               
 },
 nameContainer:{
   flex:1,             
 },
 name:{
   fontWeight:"bold",
   fontSize:22               
 }            
})

export default NameMessages
