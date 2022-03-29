import React from 'react'
import { StyleSheet } from 'react-native'

import AppText from '../Commons/AppText'

const InboxTitle = () => {
return (
<AppText style={styles.text}>Messages Inbox</AppText>
)
}


const styles = StyleSheet.create({
 text:{
   textAlign:"center",
   fontWeight:"bold",
   fontSize:22,
   color:"#666362"                
 }                
})

export default InboxTitle
