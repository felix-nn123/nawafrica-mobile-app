import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppText from '../Commons/AppText'
import AppMsgPicker from './AppMsgPicker'

const MsgSort = ({items, placeholder, onSelectItem, selectedItem}) => {
return (
<View style={styles.container}>
    <AppText>Sort By</AppText>

     <AppMsgPicker
     items={items}
     placeholder={placeholder}
     onSelectItem={onSelectItem}
     selectedItem={selectedItem}
     />                                               
</View>
)
}

const styles = StyleSheet.create({
  container:{
   flexDirection:"row",
   alignItems:"center"                
  }               
})

export default MsgSort
