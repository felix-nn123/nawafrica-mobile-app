import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppText from '../Commons/AppText'

import Chat from '../Home/Chat'

const NameAndChat = ({name, numberOfUnreadMsgs}) => {
return (
<View style={styles.container}>
<View style={styles.nameContainer}>
<AppText style={styles.welcome}>Welcome {name}</AppText>
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
 paddingTop:20,
 paddingLeft:10,
 paddingRight:10              
},
nameContainer:{
 flex:2               
},
chatContainer:{
flex:1,
justifyContent:"center",
alignItems:"center",
height:55
},
welcome:{
fontWeight:"bold",
fontSize:22,
color:"#666362"                 
}                
})

export default NameAndChat
