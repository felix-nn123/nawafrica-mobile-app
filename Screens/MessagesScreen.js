import React, {useState, useEffect, useContext} from 'react'
import _ from "lodash"
import io from 'socket.io-client'
import { StyleSheet, View, ScrollView, RefreshControl, Alert, Keyboard} from 'react-native';
import { Audio } from 'expo-av';
import { useScrollToTop } from '@react-navigation/native';

import AppText from '../components/Commons/AppText';
import AppActivityIndicator from './../components/Commons/AppActivityIndicator';
import NameAndChat from '../components/Messages/NameAndChat';
import MessageButton from '../components/Messages/MessageButton';
import MsgTextInput from '../components/Messages/MsgTextInput';
import MsgSort from '../components/Messages/MsgSort';
import InboxTitle from '../components/Messages/InboxTitle';
import MsgTable from '../components/Messages/MsgTable';
import MessageModal from '../components/Messages/MessageModal';

import AuthContext from './../utils/AuthContext';
import UnreadMsgsContext from './../utils/MsgContext';
import { uploadMultipleFileToCloudinary } from '../utils/imageUploadToCloudinary'
import URL from '../utils/http';

import { getRecipentMessages, deleteGivenMessageById } from './../services/messageService';
import { getCloudinarySignature } from '../services/cloudinaryService'
import { getApplications } from '../services/listings'
import {registeredUsers} from './../services/registerService'



const MessagesScreen = ({navigation}) => {
let sortedItems=[{label:"Date", value:"dateposted"}, {label:"Sender", value:"sender_name"}, {label:"Listing", value:"listing_name"}, {label:"Address", value:"listing_address"}]
const [refresh, setRefresh]=useState(false)

const [selectedSortItem , setSelectedSortItem]=useState({})

const [applications,setApplications]=useState([])
const [selectedApplication, setSelectedApplication]=useState()
const [sortColumns, setSortColumns]=useState({ 
 path: "appicant_name", 
 order: "asc" 
})
const [sortColumn, setSortColumn]=useState({ 
path: "dateposted", 
 order: "desc" 
})
     
const [otherPhotoError,setOtherPhotoError]=useState("")
const [loadOtherPhoto,setLoadOtherPhoto]=useState(false)
   
const [message, setMessage]=useState("")
const [subject, setSubject]=useState("")
const [otherPhotoPath,setOtherPhotoPath]=useState([])
const [messages, setMessages]=useState([])
const [submitError, setSubmitError]=useState(null)
   
const [socket, setSocket]=useState()
const [loadingMessage, setLoadingMessage]=useState(true)
const [loadingSearchMessage,setLoadingSearchMessage]=useState(false)
const [myImageData, setMyImageData]=useState({})

const [modalVisible, setModalVisible]=useState(false)

const [allUsers, setAllUsers]=useState([])
   
const myUreadMessages=useContext(UnreadMsgsContext)
const {user}=useContext(AuthContext)

const ref = React.useRef(null);
useScrollToTop(ref);
useEffect(()=>{    
const sock=io(URL.endpoint)
setSocket(sock)
if(user.post_rent_property!=="LOOKING TO BUY/RENT PROPERTY"){
sock.on(`${user.id}messagesTenant`, (data)=>{
const sortedListing = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
setMessages(sortedListing)
})
}else{
sock.on(`${user.id}messages`, (data)=>{
const sortedListing = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
setMessages(sortedListing)
})   
}

getAllMyDatas()
      
}, [])


//function to get all messages sent to a particular landlord
const getAllMyDatas=async ()=>{
try {
  setLoadingMessage(true)
 const {data}=await getApplications()
 if(user.post_rent_property==="LOOKING TO BUY/RENT PROPERTY"){
   const myAppl= data.filter(d=>d.applicant_id===user.id)
   setApplications(myAppl)
 }else{
  const myAppl= data.filter(d=>d.list_owner_id===user.id)
  const sortedListing = _.orderBy(myAppl, [sortColumns.path], [sortColumns.order]);
  setApplications(sortedListing)  
 }

 
 const {data:messages}=await getRecipentMessages(user.id)
 const sortedMessages = _.orderBy(messages, [sortColumn.path], [sortColumn.order]);
 setMessages(sortedMessages)
 
 const {data:imagesData}=await getCloudinarySignature()
 setMyImageData(imagesData)

 const {data:all}=await registeredUsers()
 setAllUsers(all);
 
 setLoadingMessage(false)
    
 } catch (error) {
    //  //logger.log("error in getAllMyDatas function in MessagesScreen", error);
 }
 }


 //function to upload multiple photos when writing the tenant
const onChangeOtherPhoto=async (data)=>{
  try {
    setLoadOtherPhoto(true)
    const filesss=data
    
    const result=await uploadMultipleFileToCloudinary(filesss, myImageData)
    
    setOtherPhotoPath([...otherPhotoPath, result])
    setLoadOtherPhoto(false)
    
  } catch (ex) {
    setOtherPhotoError(ex.response.data)
  }
}




//function to attach emoji to message 
const onEmojiClick=(emojiObject)=>{
const myEmojiMessage=message +emojiObject
setMessage(myEmojiMessage)
}

    
//function to submit the compose message to the tenant
const onSubmitMessage=async ()=>{
const myData={
message,
subject,
selectedApplication:`${selectedApplication.id}`,
images:otherPhotoPath,
sender:user.id    
}

    
if(user.post_rent_property==="LOOKING TO BUY/RENT PROPERTY"){
socket.emit('messageTenant', myData,async (error)=>{
if(error){
setSubmitError(error)
}else{
Keyboard.dismiss()
alert(`MESSAGE SENT TO ${selectedApplication.list_owner_name.toUpperCase()}`)
setModalVisible(false)
setMessage("")
setSelectedApplication("")
setOtherPhotoPath([])
setSubject("")
setSubmitError(null)
    
const { sound } = await Audio.Sound.createAsync(
require('../assets/messageSound.mp3')
);
await sound.playAsync();
  }
  })
  }else{


socket.emit('message', myData,async (error)=>{
if(error){
setSubmitError(error)
}else{
alert(`MESSAGE SENT TO ${selectedApplication.appicant_name.toUpperCase()}`)
setModalVisible(false)
setMessage("")
setSelectedApplication("")
setOtherPhotoPath([])
setSubject("")
setSubmitError(null)
    
const { sound } = await Audio.Sound.createAsync(
require('../assets/messageSound.mp3')
);
await sound.playAsync();
}
})
}
}
    

//function to delete a given message
const onDelete=(data)=>{
  Alert.alert(
    "DELETE",
    "Are you sure you want to delete this message?",
    [{text:"Yes", onPress:()=> LetUsDelete(data)},
    {text:"No"}
    ]
    )
}

const LetUsDelete=async (data)=>{
  try {
    const allMessages=[...messages]
    const theRemainingMessage=allMessages.filter(mess=>mess.id!==data.id)
    setMessages(theRemainingMessage)
    await deleteGivenMessageById(data.id)       
    } catch (error) {
    // //logger.log("error in onDelete function in MessagesScreen", error);   
    }
}
    
    
//sorting the of listings
const onSort=(data)=>{
setSelectedSortItem(data)
const isListings=[...messages]
const value  = data.value
const column={...sortColumns}  
column.path=value
const sortedListing = _.orderBy(isListings, [column.path], [column.order]);
setMessages(sortedListing)
}
    
    
//function to search a listing
const onSearchSender=async (data)=>{
const value = data
if(value){
const tableData=searchTable(value, messages)
setMessages(tableData)
// setFromSearch(true)
}else{
try {
setLoadingSearchMessage(true)
const {data:messages}=await getRecipentMessages(user.id)
const sortedMessages = _.orderBy(messages, [sortColumn.path], [sortColumn.order]);
setMessages(sortedMessages) 
setLoadingSearchMessage(false)       
} catch (error) {
// logger.log("error in onSearchSender function in MessagesScreen", error);     
}
}
}


                    
const searchTable=(value, data)=>{
let filteredArray=[]
for (var i=0; i<data.length; i++){
value=value.toLowerCase()
let title=data[i].sender_name.toLowerCase()
    
if(title.includes(value)){
filteredArray.push(data[i])
}
}
return filteredArray                   
}
    
    

const ArrangeTableArray=()=>{
if(messages){
let tableData=[]
messages.forEach(message => {
const sms=[`${message.sender_name}`, `${message.listing_name}`, message.visited, message.id]
tableData.push(sms)
});
    
return tableData
}
}
    
const MessageDetails=(item)=>{
navigation.navigate('messageDetails', {...item})
}

const onRefresh=async ()=>{ 
setRefresh(true)
const {data:messages}=await getRecipentMessages(user.id)
const sortedMessages = _.orderBy(messages, [sortColumn.path], [sortColumn.order]);
setMessages(sortedMessages)
setRefresh(false)           
}

return (
<>
{loadingMessage&&<AppActivityIndicator/>}  
<ScrollView
ref={ref} 
style={styles.container}
refreshControl={
<RefreshControl
refreshing={refresh}
onRefresh={onRefresh}
/>
}
>
<NameAndChat
name={user.first_name}
numberOfUnreadMsgs={myUreadMessages&&myUreadMessages.length>9?"9+":myUreadMessages.length}
/>  
 
<View style={styles.messageBtnCon}>
<MessageButton title='Compose Message' onPress={()=>setModalVisible(true)}/> 
</View>


<View style={styles.msgInput}>
<MsgTextInput
placeholder="search Sender"
onChange={onSearchSender}
/>
</View>

<View style={styles.sortContainer}>
<MsgSort
items={sortedItems}
placeholder={sortedItems[0].label}
onSelectItem={onSort}
selectedItem={selectedSortItem}
SetToDefault={(data)=>setSelectedSortItem({})}
/>
</View>

<View style={styles.title}>
<InboxTitle/>
</View>

<View style={styles.tableContainer}>
{messages.length>0?<MsgTable
deleteItem={onDelete}
messages={messages}
MessageDetails={MessageDetails}
/>:<View style={styles.noMessageContainer}><AppText>No Message Available</AppText></View>}
</View>



<MessageModal
  modalVisible={modalVisible}
  onModalVisible={()=>setModalVisible(false)}
  onPressSendBtn={onSubmitMessage}
  onChangeSubject={(data)=>setSubject(data)}
  onChangeMessage={(data)=>setMessage(data)}
  imageUris={otherPhotoPath}
  onRemoveImage={(data)=>{
    const myData=otherPhotoPath.filter(image=>image!==data)
    setOtherPhotoPath(myData)
    }}
  onAddImage={(data)=>onChangeOtherPhoto(data)}
  loadOtherPhoto={loadOtherPhoto}
  error={submitError}
  items={applications}
  onSelectItem={(item)=>setSelectedApplication(item)}
  selectedItem={selectedApplication}
  // SetToDefault
  message={message}
  allUsers={allUsers}
  user={user}
  valueSubject={subject}
  onEmojiClick={onEmojiClick}
/>
 
</ScrollView>   

</>
)
}

const styles = StyleSheet.create({
messageBtnCon:{
padding:10,
},
msgInput:{
padding:10 
},
sortContainer:{
width:"100%",
padding:10 
},
title:{
width:"100%",
marginTop:10  
},
MsgTable:{
width:"100%"   
},
tableContainer:{
width:'100%',
justifyContent:"center",
alignItems:"center" 
},
noMessageContainer:{
width:"90%",
height:50,
justifyContent:"center",
alignItems:"center",
backgroundColor:"grey",
marginTop:20,
borderRadius:30
}   
})

export default MessagesScreen
