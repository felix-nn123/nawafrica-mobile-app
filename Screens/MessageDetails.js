import React, {useEffect, useState, useContext} from 'react'
import _ from "lodash"
import io from "socket.io-client"
import { ScrollView, StyleSheet, Alert, View} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import logger from '../services/loggerService';

import URL from './../utils/http';
import AuthContext from './../utils/AuthContext';
import UnreadMsgsContext from './../utils/MsgContext';
import { uploadMultipleFileToCloudinary } from '../utils/imageUploadToCloudinary';

import { getCloudinarySignature } from './../services/cloudinaryService';
import {updateGivenMessageById, getAllMyUnreadMsgId ,  deleteGivenMessageById } from '../services/messageService';

import ChatDeleteReply from '../components/MessageDetails/ChatDeleteReply';
import SenderDate from '../components/MessageDetails/SenderDate';
import AppText from './../components/Commons/AppText';
import Msg from './../components/MessageDetails/Msg';
import ImagesSent from '../components/MessageDetails/ImagesSent';
import LargeImageModal from '../components/MessageDetails/LargeImageModal';
import ReplyModal from '../components/MessageDetails/ReplyModal';

const MessageDetails = ({route, navigation}) => {
const [socket, setSocket]=useState()
                 
const [message, setMessage]=useState({})
const [allSenderUnreadMsg, setAllSenderUnreadMsg]=useState([])
                 
const [subjectReply ,setSubjectReply]=useState("")
const [messageReply,setMessageReply]=useState("")
                 

const [modalVisible, setModalVisible]=useState(false)
const [modalVisibleReply, setModalVisibleReply]=useState(false)
const [downloadProgress, setDownloadProgress]=useState(0)
                 
const [sortColumn, setSortColumn]=useState({ 
path: "dateposted", 
 order: "desc" 
})
                 
const [loading, setLoading]=useState(true)

const [otherPhotoError ,setOtherPhotoError]=useState("")
const [loadOtherPhoto ,setLoadOtherPhoto]=useState(false)
const [otherPhotoPath ,setOtherPhotoPath]=useState([])
const [submitError, setSubmitError]=useState(false)
                 
const [selectedImage, setSelectedImage]=useState("")
const [myImageData, setMyImageData]=useState({})

const myUreadMessages=useContext(UnreadMsgsContext)
const {user}=useContext(AuthContext)


useEffect(() => {
const sock =io(URL.endpoint)
setSocket(sock)
getData()

if(user.post_rent_property==="LOOKING TO BUY/RENT PROPERTY"){
sock.on(`${user.id}unreadMsg`, (data)=>{
const sortedListing = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
setAllSenderUnreadMsg(sortedListing);
});
}else{
sock.on(`${user.id}unreadMsgTenant`, (data)=>{
const sortedListing = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
setAllSenderUnreadMsg(sortedListing);
});                 
}             
}, [])

const getData=async ()=>{
try {                
setLoading(true)
const queryData = route.params
await updateGivenMessageById(queryData.id) 
setMessage(queryData)
const {data:unread}=await getAllMyUnreadMsgId(queryData.sender_id)
setAllSenderUnreadMsg(unread)
const {data:imagesData}=await getCloudinarySignature()
setMyImageData(imagesData)
setLoading(false)
                 
} catch (error) {
 //logger.log("the error to recieve message details", error);                
} 
}


//function to Delete the message
const onDelete=async ()=>{
Alert.alert(
"DELETE",
"Are you sure you want to delete this message?",
[{text:"Yes", onPress:async ()=>{
await deleteGivenMessageById(message.id)
navigation.navigate('messagess')
}},
{text:"No"}
]
)
}

//Function to show the reply modal
const onReply=()=>{
  setModalVisibleReply(true)            
}


//function to download send images and files into your device
const onDownload=async (img)=>{
const downloadResumable = FileSystem.createDownloadResumable(
img.url,
FileSystem.documentDirectory + 'small.jpg',
{},
callback
);

const callback = downloadProgress => {
const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
setDownloadProgress(progress)
};

try {
const { uri } = await downloadResumable.downloadAsync();
//logger.log('Finished downloading to ', uri);
} catch (e) {
console.error(e);
}
}


//function to enlarge a given message
const showLargeImage=async (url)=>{
setModalVisible(true)
setSelectedImage(url)
}


//function to upload multiple photos when submitting a message
const onChangeOtherPhoto=async (data)=>{
try {
  const filesss=data
  
  const result=await uploadMultipleFileToCloudinary(filesss, myImageData)
  
  setOtherPhotoPath([...otherPhotoPath, result])
  setLoadOtherPhoto(false)
  setLoadOtherPhoto(true)
  
} catch (ex) {
  setOtherPhotoError(ex.response.data)
}
}

//function to attach emoji to message
const onEmojiClick=(emojiObject)=>{
const myEmojiMessage=messageReply +emojiObject
setMessageReply(myEmojiMessage)
}


//submit the reply message here
const onSubmitMessage=async ()=>{
const myData={
message:messageReply,
subject:subjectReply,
recipient_id:message.sender_id,
recipient_name:message.sender_name,
images:otherPhotoPath,
listing_id:message.listing_id,
listing_name:message.listing_name,
listing_address:message.listing_address,
sender:user.id,
reply:{
subject:message.subject,
body:message.body
} 
}

if(user.post_rent_property==="LOOKING TO BUY/RENT PROPERTY"){
socket.emit('messageTenant', myData, (error)=>{
if(error){
setSubmitError(error)
}else{
alert(`MESSAGE SENT TO ${message.sender_name.toUpperCase()}`)
setModalVisibleReply(false)
}
})
}else{
socket.emit('message', myData, (error)=>{
if(error){
setSubmitError(error)
}else{
alert(`MESSAGE SENT TO ${message.sender_name.toUpperCase()}`)
setModalVisibleReply(false)
}
})
}
    
    
if(messageReply&&subjectReply){
setMessageReply("")
setOtherPhotoPath([])
setSubjectReply("")
setSubmitError(false)
const { sound } = await Audio.Sound.createAsync(
require('../assets/messageSound.mp3')
);
await sound.playAsync();
}
}


return (
<ScrollView style={styles.container}>
<ChatDeleteReply
  numberOfUnreadMsgs={myUreadMessages&&myUreadMessages.length>9?"9+":myUreadMessages.length}
  onReply={onReply}
  onDelete={onDelete}
/>
<View style={styles.messageContainer}>

<View style={styles.subjectContainer}>
<AppText style={styles.title}>SUBJECT:</AppText>
{message.subject&&<AppText style={styles.theTitle}>{message.subject.toUpperCase()}</AppText>}
</View>

{message.sender_image&&<SenderDate
message={message}
/>}


{message.sender_image&&<Msg
message={message}
/>}


{message.images&&message.images.length>0&&
<ImagesSent
message={message}
onDownload={onDownload}
showLargeImage={showLargeImage}
/>
}

</View>
<LargeImageModal
image={selectedImage}
modalVisible={modalVisible}
onModalVisible={()=>setModalVisible(false)}
/>

<ReplyModal
modalVisibleReply={modalVisibleReply}
onModalVisibleReply={()=>setModalVisibleReply(false)}
onChangeSubject={(data)=>setSubjectReply(data)}
onChangeMessage={(data)=>setMessageReply(data)}
messageReply={messageReply}
imageUris={otherPhotoPath}
onRemoveImage={(data)=>{
const myData=otherPhotoPath.filter(image=>image!==data)
setOtherPhotoPath(myData)
}}
onAddImage={(data)=>onChangeOtherPhoto(data)}
loadOtherPhoto={loadOtherPhoto}
onEmojiClick={onEmojiClick}
onPressSendBtn={onSubmitMessage}
error={submitError}
message={message}
/>

</ScrollView>
)
}

const styles = StyleSheet.create({
container:{
  flex:1,
  padding:5              
},
messageContainer:{
width:"100%",
padding:10,
borderRadius:10,
borderWidth:2,
borderColor:'#d3d3d3',
backgroundColor:"#d3d3d3"                
},
subjectContainer:{
 width:"100%",
 height:50,
 borderBottomColor:"#d3d3d3",
 borderBottomWidth:2,
 flexDirection:"row",
 alignItems:"center",
 backgroundColor:"white",
 paddingLeft:10,
 borderRadius:10             
},
title:{
 fontWeight:"bold"                
},
theTitle:{
color:"#231F20",
fontSize:15,
marginLeft:10,
fontWeight:"bold"                
}            
})

export default MessageDetails
