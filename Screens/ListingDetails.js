import React, {useEffect, useState, useContext} from 'react'
import _ from "lodash"
import moment from 'moment'
import { StyleSheet,  View, ScrollView, Dimensions } from 'react-native'
import { useScrollToTop } from '@react-navigation/native';
import { Audio } from 'expo-av';
import logger from '../services/loggerService';
import MapView, {Marker,PROVIDER_GOOGLE, Callout, Circle} from 'react-native-maps';

import AppActivityIndicator from './../components/Commons/AppActivityIndicator';
import TitlePrice from '../components/ListingDetails/TitlePrice'
import Address from '../components/ListingDetails/Address'
import MoreAboutListing from '../components/ListingDetails/MoreAboutListing'
import Description from '../components/ListingDetails/Description'
import LeaseType from '../components/ListingDetails/LeaseType'
import AppMap from '../components/Commons/AppMap'
import OwnerOtherDetails from '../components/ListingDetails/OwnerOtherDetails'
import ApplyButton from '../components/ListingDetails/ApplyButton'
import AppText from '../components/Commons/AppText'
import AppCarousel from './../components/Commons/AppCarousel';
import OtherListingInCity from '../components/ListingDetails/OtherListingInCity';

import { 
  getListingsById, 
  applyForAListing,
  getAllApplications,
  likeAListing,
  getAllLikes,
  getListings
} from '../services/listings'
import { getUserById } from '../services/registerService'

import useAuth from '../hooks/useAuth';

import UnreadMsgsContext from '../utils/MsgContext'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const ListingDetails = ({route}) => {
const [refresh, setRefresh]=useState(false)
const [listing, setListing]=useState({
title:"",
rent_or_sell:""
})
const [loadingListing, setLoadingListing]=useState(false)
const [list_owner, setList_owner]=useState({
verified:false,
picture:{
fileProfile:""
}
})
const [applyError,setApplyError]=useState("")
const [applicants, setApplicants]=useState([])
const [appliedAlready, setAppliedAlready]=useState(false)
                                
const [likeError,setLikeError]=useState("")
const [likers, setLikers]=useState([])
const [likedAlready, setLikedAlready]=useState(false)
                                
                                
const [carouselImages, setCarouselImage]=useState([])
const [doubleCarouselImages, setDoubleCarouselImages]=useState([])

const [listingInCity, setListingInCity]=useState([])

                                
// const [myReport,setMyReport]=useState("")
// const [errorReport, setErrorReport]=useState('')
                                
const [keys,setKey]=useState("")
const {user}=useAuth()

const [scroll, setScroll]=useState()

const [mapView, setMapView]=useState({
  animateToRegion:(obj)=>obj
})
                                
const myUreadMessages=useContext(UnreadMsgsContext)

const ref = React.useRef(null);
useScrollToTop(ref);
useEffect(()=>{
getListing()
},[])


//function to get all datas for a particular listing
const getListing=async ()=>{
try {
const ID=route.params.id
setLoadingListing(true)
const {data}= await getListingsById(ID)
setListing(data)
const {data:listOwner}=await getUserById(data.list_owner_id)
setList_owner(listOwner)

const {data:allListings}=await getListings() 
const listingInSameCity=allListings.filter(list=>list.country==data.country&&list.id!==data.id&&list.city===data.city)
const listingInSameCityBedrooms=allListings.filter(list=>list.country==data.country&&list.city===data.city&&list.bedrooms==data.bedrooms&&list.id!==data.id)
const allInCity=[...listingInSameCityBedrooms, ...listingInSameCity]

const newArray=new Set()

for(let i=0; i<allInCity.length; i++){
  newArray.add(allInCity[i])
}
setListingInCity(Array.from(newArray))
               
//function to apply for a listing
const {data:listApplicants}=await getAllApplications(ID)
setApplicants(listApplicants)
               
// functions to like a listing
const {data:likesListing}=await getAllLikes(ID)
setLikers(likesListing)
               
if(listApplicants.some(applicant =>applicant.applicant_id===user.id))
{
setAppliedAlready(true)
}else{
setAppliedAlready(false)
}
               
if(likesListing.some(likes =>likes.liker_id===user.id))
{
setLikedAlready(true)
}else{
setLikedAlready(false)
}
               
               
const carImages=data.other_photos
const parlourImage=data.parlour_photo
const bedroomImage=data.bedroom_photo
               
carImages.unshift(bedroomImage)
carImages.unshift(parlourImage)
               
const firstCar=  carImages.slice(0, 8)
const secondCar=  carImages.slice(8, 16)
const thirdCar=  carImages.slice(16, 24)
const fourthCar=  carImages.slice(24, 32)
const fifthCar=  carImages.slice(32, 40)
               
const doubleCar=[]
if(firstCar.length>0) doubleCar.push(firstCar)
if(secondCar.length>0) doubleCar.push(secondCar)
if(thirdCar.length>0) doubleCar.push(thirdCar)
if(fourthCar.length>0) doubleCar.push(fourthCar)
if(fifthCar.length>0) doubleCar.push(fifthCar)
               
setDoubleCarouselImages(doubleCar)
setCarouselImage(carImages)
                             
setLoadingListing(false)
                             
} catch (ex) {
if (ex.response && ex.response.status === 400) {
//logger.log(ex.response);
} 
}
}


//function to add commas in money
function commaSeparateNumber(val){
const myVal=Array.from(`${val}`)          
if(myVal.includes(',')){
return val
}else{
while (/(\d+)(\d{3})/.test(val.toString())){
val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
}
return val;            
}
}


// const onRefresh=async ()=>{ 
//   setRefresh(true)
//   const {data}= await getListings()
//   const publishData=data.filter(d=>d.publish==="publish")
//   const allUndeletedListing=publishData.filter(listing=>listing.status!=="deleted")
//   const sortedListing = _.orderBy(allUndeletedListing, [sortColumn.path], [sortColumn.order]);
//   setListings([...sortedListing])   
//   setRefresh(false)        
//   }


 //function to get the date the listing was posted
const calculateDate=(date)=>{
const postedDate=moment(parseInt(date))
const nowDate=moment(Date.now())
const diffInSec=nowDate.diff(postedDate, 'seconds')
const diffInMin=nowDate.diff(postedDate, 'minutes')
const diffInHour=nowDate.diff(postedDate, 'hours')
const diffInDay=nowDate.diff(postedDate, 'days')
const diffInMonth=nowDate.diff(postedDate, 'months')
const diffInYear=nowDate.diff(postedDate, 'years')

if(diffInSec<60) return `${diffInSec} sec${diffInSec>1?'s':''} ago`
if(diffInMin<60) return `${diffInMin} min${diffInMin>1?'s':''} ago`
if(diffInHour<24) return `${diffInHour} hr${diffInHour>1?'s':''} ago`
if(diffInDay<30) return `${diffInDay} day${diffInDay>1?'s':''} ago`
if(diffInMonth<12) return `${diffInMonth} Month${diffInMonth>1?'s':''} ago`

return `${diffInYear} Year${diffInYear>1?'s':''} ago`

} 


// function to like and unliked a listing
const handleLike=async ()=>{
try {
const { sound } = await Audio.Sound.createAsync(
require('../assets/mobileLike.mp3')
);

await sound.playAsync();

if(likers.some(liked =>liked.liker_id===user.id))
{
const likes=[...likers]
const like=likes.filter(li=>li.liker_id!==user.id)
setLikers(like)  
setLikedAlready(false)
}else{
const likes=[...likers]
const obj={
liker_id: user.id,
liked:true,
listing_id: listing.id,
}
  
likes.push(obj)
setLikers(likes)  
setLikedAlready(true)
}
  
await likeAListing(listing.id)

} catch (ex) {
if (ex.response && ex.response.status === 400) {
  setLikeError(ex.response.data)
}
}
}



const onPressApply=async ()=>{
if(listing.list_owner_id===user.id||user.post_rent_property==="I AM A PROPERTY OWNER"){
alert("List owners Or Landlords cannot apply for their listing, Please Create an account as a tenant")
}else{
try {
if(applicants.some(applicant =>applicant.applicant_id===user.id)){
                      
const { sound } = await Audio.Sound.createAsync(
require('../assets/apply_sound.mp3')
);

await sound.playAsync();

const appli=[...applicants]
const appl=appli.filter(app=>app.applicant_id!==user.id)
setApplicants(appl)  
setAppliedAlready(false)         
        
await applyForAListing(listing.id)
            
}else{
const { sound } = await Audio.Sound.createAsync(
require('../assets/apply_sound.mp3')
);
   
await sound.playAsync();

const appli=[...applicants]
const obj={
applicant_id: user.id,
list_owner_id: list_owner.id,
listing_id: listing.id,
}
      
appli.push(obj)
setApplicants(appli)
setAppliedAlready(true)
    
await applyForAListing(listing.id)
}
       
} catch (ex) {
if (ex.response && ex.response.status === 400) {
      
setApplyError(ex.response.data)
        
}          
}
}
}



const showNewSelectedListing=async (data)=>{
try {
  // setLoadingListing(true)
  setListing(data)
  const {data:listOwner}=await getUserById(data.list_owner_id)
  setList_owner(listOwner)

  scroll.scrollTo({x: 0, y: 0, animated: true});
  
  const {data:allListings}=await getListings() 
  const listingInSameCity=allListings.filter(list=>list.country==data.country&&list.id!==data.id&&list.city===data.city)
  const listingInSameCityBedrooms=allListings.filter(list=>list.country==data.country&&list.city===data.city&&list.bedrooms==data.bedrooms&&list.id!==data.id)
  const allInCity=[...listingInSameCityBedrooms, ...listingInSameCity]
  
  const newArray=new Set()
  
  for(let i=0; i<allInCity.length; i++){
    newArray.add(allInCity[i])
  }
  setListingInCity(Array.from(newArray))
                 
  //function to apply for a listing
  const {data:listApplicants}=await getAllApplications(data.id)
  setApplicants(listApplicants)


  // functions to like a listing
const {data:likesListing}=await getAllLikes(data.id)
setLikers(likesListing)
               
if(listApplicants.some(applicant =>applicant.applicant_id===user.id))
{
setAppliedAlready(true)
}else{
setAppliedAlready(false)
}
               
if(likesListing.some(likes =>likes.liker_id===user.id))
{
setLikedAlready(true)
}else{
setLikedAlready(false)
}
               
               
const carImages=data.other_photos
const parlourImage=data.parlour_photo
const bedroomImage=data.bedroom_photo
               
carImages.unshift(bedroomImage)
carImages.unshift(parlourImage)
               
const firstCar=  carImages.slice(0, 8)
const secondCar=  carImages.slice(8, 16)
const thirdCar=  carImages.slice(16, 24)
const fourthCar=  carImages.slice(24, 32)
const fifthCar=  carImages.slice(32, 40)
               
const doubleCar=[]
if(firstCar.length>0) doubleCar.push(firstCar)
if(secondCar.length>0) doubleCar.push(secondCar)
if(thirdCar.length>0) doubleCar.push(thirdCar)
if(fourthCar.length>0) doubleCar.push(fourthCar)
if(fifthCar.length>0) doubleCar.push(fifthCar)
               
setDoubleCarouselImages(doubleCar)
setCarouselImage(carImages)

mapView&&mapView.animateToRegion({
  latitude: data.location.coordinates.lat,
  longitude: data.location.coordinates.lng,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
  })
             
// setLoadingListing(false)
  
  
} catch (ex) {
  console.log("my error", ex.response)
  // logger.log(ex.response);
}
}


return (
<>
{loadingListing&&<AppActivityIndicator/>}
<ScrollView
style={styles.container}
ref={(c) => {setScroll(c)}}
>
{/* list_owner.verified */}
<TitlePrice
verified={list_owner.verified}
title={_.toUpper(listing.title.length>25?listing.title.slice(0, 25) +"...":listing.title)}
price={`${listing.price} ${listing.currency}`}
rentOrSell={listing.rent_or_sell}
numberOfUnreadMsgs={myUreadMessages&&myUreadMessages.length>9?"9+":myUreadMessages.length}
/>

<Address
street_address={listing.street_address}
/>

<MoreAboutListing
listingType={listing.listing_type}
rentOrSell={listing.rent_or_sell}
bedroom={listing.bedrooms}
kitchen={listing.kitchen}
advancedPayment={`${listing.advance_price?commaSeparateNumber(listing.advance_price):''} ${listing.currency}`}
/>

<Description
description={listing.details}
/>


{listing&&<LeaseType
fixedLeased={listing.fixed_agreement?`-Fixed Lease: The Tenant shall be allow to occupy the promises starting on An Agreed Date, And ends on An Agreed Date,("Lease Terms").If at the end of the Lease terms and no renewal is made, the Tenant:`:false}
renewFixedLease={listing.agreement_after_fixed_agreement&&listing.agreement_after_fixed_agreement.renew_fixed_agreement?"-May Renew The Fixed Lease Agreement":""}
continueFixedLeaseMonthToMonth={listing.agreement_after_fixed_agreement&&listing.agreement_after_fixed_agreement.continue_with_month_to_month?"-May continue to lease the same Premises under a month-to-month arrangement.":""}
mustVacateFixedLease={listing.agreement_after_fixed_agreement&&listing.agreement_after_fixed_agreement.vacateP?"-Must Vacate the Premises":""}
monthToMonthAgree={listing.month_to_month_agreement?`-Month-to-Month Lease:The Tenant shall be allowed to occupy the Premises on a month-to-month arrangement  starting on the Agreed Date,
and ends upon notice eg 30 days from either Party to the other Party ("Lease terms")`:''}
sold_agreement={listing.sold_agreement?"-Sold Lease: The Lsease shall be Permanently Sold to Whosoever that Buys it":""}
/>}






<View style={styles.mapContainer}>
{listing.location&&listing.location.coordinates.lat?
  <View style={styles.containerMap}>
<MapView style={styles.map} 
provider={PROVIDER_GOOGLE}
initialRegion={{
latitude: listing.location.coordinates.lat,
longitude: listing.location.coordinates.lng,
latitudeDelta: 0.0922,
longitudeDelta: 0.0421,              
}}
ref={(ref)=>setMapView(ref)}
>
<Circle
center={{latitude:listing.location.coordinates.lat, longitude:listing.location.coordinates.lng}}
radius={1000}
fillColor={'rgba(200, 300, 200, 0.5)'}
/>
<Marker
key={1}
coordinate={{latitude:listing.location.coordinates.lat, longitude:listing.location.coordinates.lng}}
title="Limbe"
>
<Callout>
 <AppText>{listing.title}</AppText>               
</Callout>
</Marker>                             
</MapView>
</View> 
:<AppText>....loading</AppText>}
</View>






<OwnerOtherDetails
image={{uri:list_owner.picture.fileProfile.url}}
user={`${list_owner.first_name} ${list_owner.last_name}`}
timeListed={calculateDate(listing.dateposted)}
numOfAppl={applicants.length}
numOfLikes={likers.length}
liked={likedAlready}
handleLike={handleLike}
/>


{carouselImages.length>0&&<AppCarousel
images={carouselImages}
/>}

{user.post_rent_property!=="I AM A PROPERTY OWNER"&&
<ApplyButton
onClick={onPressApply}
applicants={applicants}
appliedAlready={appliedAlready}
/>} 




{listingInCity.length>0&&<View style={{marginTop:150, width:"100%", height:700, borderTopColor:"#666362", borderTopWidth:1}}>
<AppText style={{textAlign:"center", fontWeight:"bold", color:"#666362"}}>Search available Listings in {listing.city}, {listing.country}</AppText>

<View style={{width:"100%", height:480}}>
<OtherListingInCity
listings={listingInCity}
navigation={showNewSelectedListing}
/>
</View>
</View>}

</ScrollView>
</>
)
}

const styles = StyleSheet.create({
mapContainer:{
padding:10
},
map:{
  width: '100%',
  height: "100%",
},
container:{
flex:1 
},
containerMap:{
  height:600,
  width:"100%",
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
applyContainer:{
marginVertical:10,
width:'100%'
},
applyBtn:{
width:"100%",
justifyContent:"center",
alignItems:"center",
backgroundColor:"#035aa6" 
}               
})

export default ListingDetails
