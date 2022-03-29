import React, { useEffect, useState, useContext } from 'react'
import AppCard from '../components/Commons/AppCard'
import _ from 'lodash'
import { Alert } from 'react-native';
import { StyleSheet, ScrollView, RefreshControl, View, ImageBackground, Button } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import AppActivityIndicator from '../components/Commons/AppActivityIndicator';
import AppPickerNoObj from '../components/Commons/AppPickerNoObj';
import NumberOfListingsBar from '../components/Commons/NumberOfListingsBar';
import AppTextInput from './../components/Commons/AppTextInput';
import AppButton from '../components/Commons/AppButton';
import Chat from '../components/Home/Chat';

import {Countries} from "../utils/regions"
import {Regions} from "../utils/regions"
import selectedCountryInputs from '../utils/translateInput'
import UnreadMsgsContext from '../utils/MsgContext';

import useLocation from './../hooks/useLocation';

import { deleteAListingByUpdateStatus, getListings  } from './../services/listings';

const LandsSale = ({navigation}) => {
const [refresh, setRefresh]=useState(false)
const [listings, setListings]=useState([])
const [loadingListings, setLoadingListings]=useState(false)
const [sortColumn, setSortColumn]=useState({ 
 path: "dateposted", 
 order: "desc" 
})
                                  
const [showSearchContainer, setShowSearchContainer]=useState(false)
const [height, setHeight]=useState(0)
                                  
const [africaCountries, setAfricaCountries]=useState([])
const [selectedAfricaCountry, setSelectedAfricaCountry]=useState("")
                                  
const [states,setStates]=useState([])
const [selectedState,setSelectedState]=useState('')
                                  
const [cities,setCities]=useState([])
const [selectedCity,setSelectedCity]=useState("")
                                  
const [currency, setCurrency]=useState([])
const [selectedCurrency,setSelectedCurrency]=useState("")
                                  
const [bedroom,setBedroom]=useState([])
const [selectedBedroom, setSelectedBedroom]=useState("")
                                  
const [listing,setListing]=useState([])
const [selectedListing, setSelectedListing]=useState("")
                                  
const [keyword ,setKeyword]=useState([])
const [selectedKeyword, setSelectedKeyword]=useState("")
                                  
const [price, setPrice]=useState("")
                                  
// const [location, setLocation]=useState("")
const [locationError, setLocationError]=useState({
loaded:false,
error:""                 
})

const [userLocation, setUserLocation]=useState({
  country:"",
  city:""
})
                                  
const myUreadMessages=useContext(UnreadMsgsContext)
                                  
const location=useLocation()
                 
                 
const ref = React.useRef(null);
useScrollToTop(ref);
useEffect(()=>{
getAllListings()
// onSuccess()
}, [])  
                 
                 
                 
                 
//function to get all the datas for a given user
const getAllListings=async ()=>{
// AuthStorage.removeToken()
// setUser(null)
 try {
 setLoadingListings(true)
 const {data}= await getListings()
 const myData=data.filter(d=>d.rent_or_sell==="Sale"&&d.listing_type==="Land")
 const publishData=myData.filter(d=>d.publish==="publish")
 const allUndeletedListing=publishData.filter(listing=>listing.status!=="deleted")
 const sortedListing = _.orderBy(allUndeletedListing, [sortColumn.path], [sortColumn.order]);
 setListings([...sortedListing])
                  
 // fields involve to fill the select drop down in the search container
 let Africas=Countries()
 setAfricaCountries(Africas)
                  
 const Bedrooms=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
 setBedroom(Bedrooms)
                                
const Listingss=["Land"];
setListing(Listingss)
                                
const Keywords=["Garage, Pool, Flowers, Garden, Playground","Garage, Pool, Flowers, Garden","Pool, Flowers, Garden, Playground","Flowers, Garden, Playground","Garage, Pool, Flowers","Garden, Playground","Pool, Flowers","Garage, Playground","Garage, Pool","Garage, Garden","Garage, Flowers","Garage","Pool, Garden","Pool, Playground", "Flowers, Garden","Flower, Playground" ,"Pool", "Flowers", "Garden", "Playground"]
setKeyword(Keywords)
                                
// //code to get the user current location
// if(!('geolocation' in navigator)){
// setLocation({
// ...location,
// loaded:true,
// error:{
// code:0,
// message:'geolocation not supported'
// }
// })
// }else{
// navigator.geolocation.getCurrentPosition(onSuccess, onError, {
// enableHighAccuracy:true
// })
// }
                                
// onSuccess()
setLoadingListings(false)        
} catch (ex) {   
if (ex.response && ex.response.status === 500) {
setError("NO INTERNET")
} 
}                            
}
                                
// // //function to get the latitude and longitude base on the users location
// const onSuccess=()=>{    
                                
// // function to get towns and country base on the users location
// let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${"AIzaSyA2CpB2hPku6Sivjnh8AItdex87_F46ovE"}`;
// fetch(url)
// .then(response => response.json())
// .then(data => {
// const myLocation= data.results[0].formatted_address
// const locationArray=myLocation.split(',')
// const locationObj={
// country:locationArray[locationArray.length-1].trim(),
// city:selectedCountryInputs(locationArray[locationArray.length-2].trim())
// }
                                
// setUserLocation(locationObj)
// setSelectedAfricaCountry(locationArray[locationArray.length-1].trim())
// setSelectedCity(selectedCountryInputs(locationArray[locationArray.length-2].trim()))    
// })
// .catch(err=> console.warn("error from onSuccess function", err.message))
// }
                                                                                         
// const onError=error=>{
// setLocationError({
// loaded:true,
// error
// })
// setLocation({
// loaded:false,
// coordinates:{
// lat:"",
// lng:""
// }
// })
// }
                                               
const onRefresh=async ()=>{ 
setRefresh(true)
const {data}= await getListings()
const myData=data.filter(d=>d.rent_or_sell==="Sale"&&d.listing_type==="Land")
const publishData=myData.filter(d=>d.publish==="publish")
const allUndeletedListing=publishData.filter(listing=>listing.status!=="deleted")
const sortedListing = _.orderBy(allUndeletedListing, [sortColumn.path], [sortColumn.order]);
setListings([...sortedListing]) 
setRefresh(false)        
}
                                
const onPressShow=()=>{
if(showSearchContainer){
setShowSearchContainer(false)
setSelectedAfricaCountry('')
setSelectedCity('')
setSelectedCurrency('')
setSelectedState('')
setSelectedListing('')
setSelectedBedroom('')
setPrice('')
setSelectedKeyword('')
setHeight(0)
}else{
setShowSearchContainer(true)
setHeight(750)
}
}
                                
const onPressToMaps=()=>navigation.navigate('searchListing', 
{ 
country:selectedAfricaCountry, 
state:selectedState, 
city:selectedCity, 
bedrooms:selectedBedroom,
keyword:selectedKeyword,
listing_type:'Land',
price,
rentOrSell:"Sale"
})
                                
//function use for filtering and paginating listings
const  getPagedData=()=>{
let filtered=[...listings]

if(selectedBedroom){
filtered=filtered.filter(filter=>filter.bedrooms===selectedBedroom)
}

if(selectedListing){
filtered=filtered.filter(filter=>filter.listing_type===selectedListing)
}
  
if(price){
filtered=filtered.filter(filter=>Number(filter.price)>=Number(price.trim())) 
}
                 
if(selectedKeyword){
filtered=filtered.filter(filter=>filter.keyword===selectedKeyword) 
}
                     
if(selectedCity){
filtered=filtered.filter(filter=>filter.city.trim()===selectedCity.trim()); 
}
                                               
if(selectedState){
filtered=filtered.filter(filter=>filter.state===selectedState)
}
                                
if(selectedAfricaCountry){
filtered=filtered.filter(filter=> filter.country===selectedAfricaCountry);  
}
                                        
return {totalCount:filtered.length, data: filtered }
                                
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
     let allItems=[...listings]
     const all=allItems.filter(item=>item.id!==id)
     setListings(all)
  
     await deleteAListingByUpdateStatus(id)
  //   await deleteAListing(id)            
  } catch (ex) {
      //logger.log("error from onDelete function in ListingScreen component");
  }
}

                                
                                
const { totalCount, data:items } = getPagedData();

return (
<>
{loadingListings&&<AppActivityIndicator/>}
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


<Button onPress={onPressShow} style={styles.searchingButtonContainer} title={`${showSearchContainer?"Close":"Open"} Search Device`}/>
<View style={{height,padding:10}}>
{showSearchContainer&&<ImageBackground resizeMethod="resize" source={require('../assets/lion.jpg')}  style={styles.welcomeOuterContainer}>
<AppPickerNoObj
items={africaCountries} 
placeholder="country"
onSelectItem={(data)=>{
let state=Regions()

setSelectedAfricaCountry(data)

if(selectedCity||selectedCurrency||selectedState||selectedListing||selectedBedroom||price||selectedKeyword&&!selectedAfricaCountry){

setSelectedCity('')

setSelectedCurrency('')

setSelectedState('')

setSelectedListing('')

setSelectedBedroom('')

setPrice('')

setSelectedKeyword('')

} 
  
const statess=data!==""?state.filter(s=> s.country===data)[0].states:[]

const Citiess=data!==""?state.filter(s=> s.country===data)[0].cities:[]

let Currencys= data!==""?state.filter(s=> s.country===data)[0].currency:[]

setStates(statess)

setCities(Citiess)

setCurrency(Currencys) 

}}
selectedItem={selectedAfricaCountry}
onSetDataToDefault={(data)=>{
setSelectedAfricaCountry(data)
setSelectedCity('')
setSelectedCurrency('')
setSelectedState('')
setSelectedListing('')
setSelectedBedroom('')
setPrice('')
setSelectedKeyword('')
}}
/>

<AppPickerNoObj
items={states} 
placeholder="state/region"
onSelectItem={(data)=>{
setSelectedState(data)
}}
selectedItem={selectedState}
onSetDataToDefault={(data)=>{
setSelectedState(data)
}}
/>

<AppPickerNoObj
items={cities} 
placeholder="city/town"
onSelectItem={(data)=>{
setSelectedCity(data)
}}
selectedItem={selectedCity}
onSetDataToDefault={(data)=>{
setSelectedCity(data)
}}
/>

<AppPickerNoObj
items={bedroom} 
placeholder="Bedroom"
onSelectItem={(data)=>{
setSelectedBedroom(data)
}}
selectedItem={selectedBedroom}
onSetDataToDefault={(data)=>{
setSelectedBedroom(data)
}}
/>

<AppPickerNoObj
items={listing} 
placeholder="Listing Type (Any)"
onSelectItem={(data)=>{
setSelectedListing(data)
}}
selectedItem={selectedListing}
onSetDataToDefault={(data)=>{
setSelectedListing(data)
}}
/>

<AppTextInput
icon="billboard"
placeholder="Max Price"
onChange={(text)=>setPrice(text)}
keyboardType="numeric"
textContentType="telephoneNumber"
/>

<AppPickerNoObj
items={keyword} 
placeholder="Keyword (Any)"
onSelectItem={(data)=>{
setSelectedKeyword(data)
}}
selectedItem={selectedKeyword}
onSetDataToDefault={(data)=>{
  setSelectedKeyword(data)
}}
/>

<AppButton
onPress={onPressToMaps}
title="Research"
/>
</ImageBackground>}
</View>

{showSearchContainer&&<NumberOfListingsBar
data={`${totalCount===0?"No":totalCount} Available Lands In ${selectedAfricaCountry?`${selectedCity&&selectedCountryInputs(selectedCity) + ", "}${selectedCountryInputs(selectedAfricaCountry)}`:userLocation.city&&selectedAfricaCountry?`${userLocation.city}, ${userLocation.country}`:"Nawafrica Marketplace"} For Rental`}
/>}
{!showSearchContainer&&totalCount===0&&
<NumberOfListingsBar
data={`${totalCount===0?"No":totalCount} Available Lands In ${selectedAfricaCountry?`${selectedCity&&selectedCountryInputs(selectedCity) + ", "}${selectedCountryInputs(selectedAfricaCountry)}`:userLocation.city&&selectedAfricaCountry?`${userLocation.city}, ${userLocation.country}`:"Nawafrica Marketplace"} For Rental`}
/>
}

<Chat
 numberOfUnreadMsgs={myUreadMessages&&myUreadMessages.length>9?"9+":myUreadMessages.length}
/>

<AppCard
onPress={(listing)=>navigation.navigate("listingDetail", {id:listing.id})}
listings={items}
onDeleteList={onDelete}
/>                                               
</ScrollView>
</>
)
}

const styles = StyleSheet.create({
container:{
flex:1
},
welcomeOuterContainer:{
width:"100%",
height:"100%"
},
searchingButtonContainer:{
width:"30%"
}      
})

export default LandsSale
