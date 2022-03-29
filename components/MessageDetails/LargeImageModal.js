import React from 'react'
import {Modal, Image, StyleSheet, View} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const LargeImageModal = ({image, modalVisible, onModalVisible}) => {
return (
<>
<Modal visible={modalVisible} animationType="slide">
<View style={styles.cancelContainer}>
<MaterialIcons onPress={onModalVisible} name='cancel' size={35}/>                 
</View>
<Image style={styles.image} source={{uri:image.url}}/>
</Modal>                                                 
</>
)
}

const styles = StyleSheet.create({
cancelContainer:{
 position:"absolute",
 zIndex:1,
 right:20,
 width:40,
 height:40,
 backgroundColor:"white",
 justifyContent:"center",
 alignItems:"center"                
},
image:{
height:"100%",
width:"100%"                 
}               
})

export default LargeImageModal
