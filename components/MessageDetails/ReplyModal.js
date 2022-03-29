import React, {useState} from 'react'
import { Modal, View, StyleSheet, TextInput} from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import EmojiSelector, { Categories } from "react-native-emoji-selector";

import AppText from '../Commons/AppText';
import AppTextInput from '../Commons/AppTextInput';
import ReplyAppButton from './ReplyAppButton';
import ReplyImageInputList from './ReplyImageInputList';

const ReplyModal = ({
  modalVisibleReply, 
  onModalVisibleReply, 
  onPressSendBtn, 
  onChangeSubject, 
  onChangeMessage, 
  messageReply, 
  imageUris, 
  onRemoveImage, 
  onAddImage,
  loadOtherPhoto,
  error,
  message,
  onEmojiClick
}) => {

const [showEmoji, setShowEmoji]=useState(false)

const onPressShowEmoji=()=>{
if(showEmoji){
  setShowEmoji(false)
}else{
  setShowEmoji(true)
}
}

const onEmojiSelected=(emoji)=>{
  onEmojiClick(emoji);
  setShowEmoji(false)
}

return (
<Modal visible={modalVisibleReply} animationType="slide">
<View style={styles.container}>
<View style={styles.titleCancelContainer}>
<View style={styles.cancelContainer}>
<MaterialIcons onPress={onModalVisibleReply} name='cancel' size={35}/>                 
</View>

<View>
 <AppText style={styles.titleText}>Reply {message.sender_name}</AppText>

{error&&<AppText style={styles.errors}>{error}</AppText>}
</View>


</View>


<View style={styles.inputContainer}>
<AppTextInput
placeholder="Subject"
icon='text-subject'
onChange={onChangeSubject}
/>

<View style={styles.textArea}>
{!messageReply&&<AntDesign style={styles.messageIcon} name='message1' size={50}/>}                 
<TextInput
style={styles.textInput}
placeholder='Text Message'
clearButtonMode='always'
numberOfLines={19}
multiline
onChangeText={onChangeMessage}
value={messageReply}
/>
</View>

<ReplyImageInputList
imageUris={imageUris}
onRemoveImage={onRemoveImage}
 onAddImage={onAddImage}
 loadOtherPhoto={loadOtherPhoto}
/>

{showEmoji&&
<View style={styles.emojiContainer}>
<EmojiSelector
  category={Categories.symbols}
  onEmojiSelected={emoji => onEmojiSelected(emoji)}
/>
</View>}

<View style={styles.btnEmojiImageContainer}>


<View style={styles.btnContainer}>
<ReplyAppButton 
 onPress={onPressSendBtn}
 title='Send'
 />
</View>


<View style={styles.paperClipContainer}>
  <MaterialIcons onPress={onPressShowEmoji} color={'gray'} name='tag-faces' size={35}/>               
</View>
</View>

</View>


</View>

</Modal>
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
},
container:{
flex:1,
padding:10,               
},
titleCancelContainer:{
 flexDirection:"row"                
},
titleText:{
 fontWeight:"bold",
 fontSize:20               
},
inputContainer:{
 width:"100%",
 height:900,
 marginTop:30,
 borderTopColor:"#d3d3d3",
 borderTopWidth:1                
},
textInput:{               
fontSize:20,
borderTopColor:"#d3d3d3",
borderTopWidth:1,
borderBottomColor:"#d3d3d3",
borderBottomWidth:1,
marginBottom:5       
},
textArea:{
width:"100%"                 
},
messageIcon:{
 position:"absolute",
 color:"#d3d3d3",
 marginTop:20               
},
btnEmojiImageContainer:{
 width:"100%",
 height:150,
 flexDirection:"row"              
},
btnContainer:{
 width:"30%",
 height:50,              
},
paperClipContainer:{
marginTop:7,
marginLeft:30,
},
scrollViewProtect:{
  width:"100%",
  height:100               
},
errors:{
color:"red",
fontSize:12
},
emojiContainer:{
  position:"absolute",
  zIndex:1,
  height:300,
  width:200,
  marginLeft:150,
  marginTop:300
}
})

export default ReplyModal
