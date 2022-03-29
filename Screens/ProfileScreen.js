import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, RefreshControl, Alert } from 'react-native'
import { Entypo, MaterialCommunityIcons, FontAwesome5, MaterialIcons, AntDesign} from 'react-native-vector-icons';
import _ from 'lodash'
import { useScrollToTop } from '@react-navigation/native';
import logger from '../services/loggerService';

import AuthStorage from '../utils/AuthStorage';
import { uploadMultipleFileToCloudinary } from '../utils/imageUploadToCloudinary'

import useAuth from '../hooks/useAuth';

import ProfilePicture from '../components/Profile/ProfilePicture';
import AppText from '../components/Commons/AppText';
import ProfileAddress from '../components/Profile/ProfileAddress';
import ProfileButton from '../components/Profile/ProfileButton';
import AppActivityIndicator from '../components/Commons/AppActivityIndicator';
import AppCard from '../components/Commons/AppCard';

import { getCloudinarySignature } from '../services/cloudinaryService';
import { ProfileImages } from '../services/ProfileService';
import { getListings } from '../services/listings';
import { deleteAListingByUpdateStatus } from './../services/listings';

const ProfileScreen = ({navigation}) => {
const [myListing, setMyListings]=useState([])
const [loading, setLoading]=useState(false)
const [sortColumn, setSortColumn]=useState({ 
  path: "dateposted", 
  order: "desc" 
 })

const {user, setUser}=useAuth()

const [imageUri, setImageUri]=useState(user.picture&&user.picture.fileProfile&&user.picture.fileProfile.url?user.picture.fileProfile.url:null)
const [myImageData,setMyImageData]=useState()
const [loadPicture,setLoadPicture]=useState(false)
const [refresh, setRefresh]=useState(false)

const ref = React.useRef(null);
useScrollToTop(ref);
useEffect(()=>{
getMyListings()
}, [])

const getMyListings=async ()=>{
//get All Listing     
try {
  setLoading(true)
const {data:allListings}=await getListings() 
const usersListings=allListings.filter(listing=>listing.list_owner_id===user.id) 
const allUndeletedListings=usersListings.filter(listing=>listing.status!=='deleted')
const sortedListing = _.orderBy(allUndeletedListings, [sortColumn.path], [sortColumn.order]);
setMyListings(sortedListing)

const {data:imagesData}=await getCloudinarySignature()
setMyImageData(imagesData)
setLoading(false)
  
} catch (ex) {
  //logger.log(ex)
}        
}

const onProfileUpload=async (data)=>{
  try {

  setLoadPicture(true)
  const filesss=data
  let result
  if(filesss){
   result=await uploadMultipleFileToCloudinary(filesss, myImageData)

   const {data:resultFromBackend}=await ProfileImages(user.id, {fileProfile:result})

   setImageUri(resultFromBackend.picture.fileProfile.url)

  }
  setLoadPicture(false)
} catch (ex) {
  //logger.log(ex)
    
}
}

//refreshs the scroll view 
const onRefresh=async ()=>{ 
  setRefresh(true)
  const {data:allListings}=await getListings() 
  const usersListings=allListings.filter(listing=>listing.list_owner_id===user.id) 
  const allUndeletedListings=usersListings.filter(listing=>listing.status!=='deleted')
  const sortedListing = _.orderBy(allUndeletedListings, [sortColumn.path], [sortColumn.order]);
  setMyListings(sortedListing) 
  setRefresh(false)        
  }
  


// //function to delete a listing from the listing table
const onDelete=(data)=>{
  Alert.alert(
    "DELETE",
    "Are you sure you want to delete this Listing?",
    [{text:"Yes", onPress:()=> letsDelete(data.id)},
    {text:"No"}
    ]
    )
  }
const letsDelete=async (id)=>{
    try {
     let allItems=[...myListing]
     const all=allItems.filter(item=>item.id!==id)
     setMyListings(all)
  
     await deleteAListingByUpdateStatus(id)
  //   await deleteAListing(id)            
  } catch (ex) {
      //logger.log("error from onDelete function in ListingScreen component");
  }
}


return (
<>
{loading&&<AppActivityIndicator/>}
<ScrollView 
ref={ref}
style={styles.profileContainer}
refreshControl={
  <RefreshControl
  refreshing={refresh}
  onRefresh={onRefresh}
  />
  }
>
<View style={styles.imageContainer}>
<ProfilePicture
user={user}
imageUri={imageUri}
onChangeImage={onProfileUpload}
loadPicture={loadPicture}
myListing={myListing}
/>
</View>

{user.country||user.states||user.city||user.street_address||user.profession||user.contact||user.passport
&&<View style={styles.addressContainer}>
   <AppText style={styles.headindAddress}>ADDRESS</AppText>  

{user.country&&
<ProfileAddress
title="Country"
content={user.country}
/>}
{user.states&&
<ProfileAddress
title="State"
content={user.states}
Icon={<Entypo style={styles.icon} size={20} name="location"/>}
/>}
{user.city&&
<ProfileAddress
title="City"
content={user.city}
Icon={<MaterialCommunityIcons style={styles.icon} size={20} name="home-city"/>}
/>}
{user.street_address&&
<ProfileAddress
title="Street Address"
content={user.street_address}
Icon={<FontAwesome5 style={styles.icon} size={20} name="street-view"/>}
/>
}

{user.profession&&
<ProfileAddress
title="Profession"
content={user.profession}
Icon={<MaterialCommunityIcons style={styles.icon} size={20} name="professional-hexagon"/>}
/>
}

{user.contact&&
<ProfileAddress
title="Contact"
content={user.contact}
Icon={<MaterialIcons style={styles.icon} size={20} name="contact-phone"/>}
/>
}

{user.passport&&
<ProfileAddress
title="Passport/ID Card #"
content={user.passport}
Icon={<MaterialCommunityIcons style={styles.icon} size={20} name="identifier"/>}
/>
}
 

</View>}

<View style={styles.actionOuterContainer}>
<View style={styles.actionContainer}>
{user.post_rent_property!=="LOOKING TO BUY/RENT PROPERTY"&&<ProfileButton
title='Add Listing'
Icon={<AntDesign style={styles.plus} name="pluscircle"/>}
onPress={()=>navigation.navigate('ComposeListing')}
/>}

<ProfileButton
onPress={()=>{
AuthStorage.removeToken()
setUser(null)                
}}
/>
</View>



</View>


{myListing.length>0&&<View style={styles.cardContainer}>
  <View style={styles.listingTitleContainer}>
    <AppText style={styles.listingTitle}>Posted Listings</AppText>
  </View>
<AppCard
onPress={(listing)=>navigation.navigate("listingDetail", {id:listing.id})}
listings={myListing}
onDeleteList={onDelete}
/>
</View>}


</ScrollView>

</>
)
}

const styles = StyleSheet.create({
 imageContainer:{
 width:"100%",
 justifyContent:"center",
 alignItems:"center"                
 },

 addressContainer:{
 width:"100%",
 padding:10,
 backgroundColor:"#f8f4f4"      
 },
 headindAddress:{
textAlign:"center",
fontWeight:"bold",
fontSize:20
 },
 actionOuterContainer:{
 width:"100%",
 justifyContent:"center",
 alignItems:"center",
 marginTop:80
 },
 actionContainer:{
   width:300,
   height:120,
   backgroundColor:"#ffa500",
   borderRadius:10,
   paddingLeft:20,
   paddingRight:20,
  justifyContent:"center"        
 },
 plus:{
   marginRight:10               
 },
 cardContainer:{
   marginTop:100,
   backgroundColor:'#f8f4f4'
 },
 listingTitleContainer:{
   width:"100%",
   alignItems:"center",
   justifyContent:"center",
   marginTop:10,
   marginBottom:10
 },
 listingTitle:{
   fontWeight:"bold",
   fontSize:18
 },
profileContainer:{
flex:1
 }          
})

export default ProfileScreen
