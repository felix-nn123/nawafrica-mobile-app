import React, {useEffect, useState, useContext} from 'react'
import _ from 'lodash'
import { ImageBackground, ScrollView, StyleSheet, Button, View, RefreshControl , Dimensions} from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import MapView, {Marker,PROVIDER_GOOGLE, Callout, Circle} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment'

import AppActivityIndicator from './../components/Commons/AppActivityIndicator';
import AppPickerNoObj from './../components/Commons/AppPickerNoObj';
import AppTextInput from './../components/Commons/AppTextInput';
import AppPicker from '../components/Commons/AppPicker';
import NumberOfListingsBar from '../components/Commons/NumberOfListingsBar';
import Chat from '../components/Home/Chat';
import AppText from '../components/Commons/AppText';
import MySearchCard from './../components/SearchListing/MySearchCard';

import selectedCountryInputs from '../utils/translateInput'
import {Countries} from "../utils/regions"
import {Regions} from "../utils/regions"
import UnreadMsgsContext from './../utils/MsgContext';

import { getListings } from '../services/listings';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const SearchListing = ({route, navigation}) => {
const myUreadMessages=useContext(UnreadMsgsContext)
const [refresh, setRefresh]=useState(false)

const [listings, setListings]=useState('')
const [myQueryData, setMyQueryData]=useState({})
const [userLocation, setUserLocation]=useState({
  country:"",
  city:""
})
 
const [africaCountries, setAfricaCountries]=useState([])
const [selectedAfricaCountry, setSelectedAfricaCountry]=useState("")
const [cities, setCities]=useState([])
const [selectedState, setSelectedState]=useState("")

const [bedroom,setBedroom]=useState([])
const [selectedBedroom, setSelectedBedroom]=useState("")

const [keyword ,setKeyword]=useState([])
const [selectedKeyword, setSelectedKeyword]=useState("")
const [selectedCity, setSelectedCity]=useState("")

const [currency, setCurrency]=useState([])
const [selectedCurrency,setSelectedCurrency]=useState("")

const [listing,setListing]=useState([])
const [selectedListing, setSelectedListing]=useState("")

const [rentOrSell, setRentOrSell]=useState('')
const [myRentOrSell, setMyRentOrSell]=useState([{label:"Props. For Rent", value:"Rental"}, {label:"Props. For Sale", value:"Sale"}])
const [theRentOrSell, setTheRentOrSell]=useState('')    

const [sortBy, setSortBy]=useState([{label:"Date Posted", value:"dateposted"}, {label:"Price", value:"price"}, {label:"Bedrooms", value:"bedrooms"}])
const [theSortBy, setTheSortBy]=useState('')    
                 
const [price, setPrice]=useState("")
                 
const [loadingListings, setLoadingListings]=useState(false)
const [error, setError]=useState("")
                 
const [keys,setKey]=useState("")
                 
const [sortColumn, setSortColumn]=useState({ 
  path: "title", 
  order: "asc" 
 })
                 
const [sortColumnListing, setSortColumnListing]=useState({ 
  path: "dateposted", 
  order: "desc" 
 })


const [mapView, setMapView]=useState({
  animateToRegion:(obj)=>obj
})

const [carouselRef, setCarouselRef]=useState({
  
})

const [marker, setMarker]=useState([])

const [showSearchContainer, setShowSearchContainer]=useState(false)
const [height, setHeight]=useState(0)


//scroll the scrollView to the top when the bottom navigator is click                
const ref = React.useRef(null);
useScrollToTop(ref);

useEffect(()=>{
getData()
}, [])

//function to get all searched data
const getData=async ()=>{
try {
setLoadingListings(true)
const queryData = route.params
setMyQueryData(queryData)
setSelectedAfricaCountry(route.params.country)
setSelectedCity(route.params.city)
setSelectedBedroom(route.params.bedrooms)
setPrice(route.params.price)
setSelectedListing(route.params.listing_type)
setRentOrSell(route.params.rentOrSell)
                 
const {data}= await getListings()
const publishData=data.filter(d=>d.publish==="publish")
const allUndeletedListing=publishData.filter(listing=>listing.status!=="deleted")
const sortedListing = _.orderBy(allUndeletedListing, [sortColumnListing.path], [sortColumnListing.order]);


// fields involve to fill the select drop down in the search container
let Africas=Countries()
setAfricaCountries(Africas)

const Bedrooms=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
setBedroom(Bedrooms)

const Listingss=["Apartment", "Studio", "Single Room", "Office", "Store/Shop", "Land","Condos"];
setListing(Listingss)

const Keywords=["Garage, Pool, Flowers, Garden, Playground","Garage, Pool, Flowers, Garden","Pool, Flowers, Garden, Playground","Flowers, Garden, Playground","Garage, Pool, Flowers","Garden, Playground","Pool, Flowers","Garage, Playground","Garage, Pool","Garage, Garden","Garage, Flowers","Garage","Pool, Garden","Pool, Playground", "Flowers, Garden","Flower, Playground" ,"Pool", "Flowers", "Garden", "Playground"]
setKeyword(Keywords)

// const theListing=sortedListing.filter(listing=>listing&&listing.location&&listing.location.coordinates&&listing.location.coordinates.lat)

setListings(sortedListing)

setLoadingListings(false)
                 
} catch (ex) {
if (ex.response && ex.response.status === 400) {
setLoadingListings(false)
setError(ex.response.data)
}
}
}


//function use for filtering and paginating listings
const  getPagedData=()=>{
// mapview.fitToElements(true)
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
  
if(rentOrSell){
filtered=filtered.filter(filter=>filter.rent_or_sell===rentOrSell)
}
          
return {totalCount:filtered.length, data: filtered}
}

const allLatLngItems=()=>{
  const {data:items}=getPagedData()

  const latListing=items.filter(list=>list.location.coordinates.lat!=="")
  return {latlngItems:latListing}
}




               

//function the show or remove the search input
const onPressShow=()=>{
if(showSearchContainer){
setShowSearchContainer(false)
setSelectedAfricaCountry('')
setSelectedCity('')
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

//function that refresh on scrolling down
const onRefresh=async ()=>{ 
setRefresh(true)
const {data}= await getListings()
const publishData=data.filter(d=>d.publish==="publish")
const allUndeletedListing=publishData.filter(listing=>listing.status!=="deleted")
const sortedListing = _.orderBy(allUndeletedListing, [sortColumn.path], [sortColumn.order]);
setListings([...sortedListing])   
setRefresh(false)        
}


//google maps to capitalize
function capitalize(s){
  return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};
                                    


//function that calculate the time posted of the listing
const calculateDate=(date)=>{
const postedDate=moment(parseInt(date))
const nowDate=moment(Date.now())
const diffInSec=nowDate.diff(postedDate, 'seconds')
const diffInMin=nowDate.diff(postedDate, 'minutes')
const diffInHour=nowDate.diff(postedDate, 'hours')
const diffInDay=nowDate.diff(postedDate, 'days')
const diffInMonth=nowDate.diff(postedDate, 'months')
const diffInYear=nowDate.diff(postedDate, 'years')
                                                                    
if(diffInSec<60) return `${diffInSec} s ago`
if(diffInMin<60) return `${diffInMin} m ago`
if(diffInHour<24) return `${diffInHour} H ago`
if(diffInDay<30) return `${diffInDay} D ago`
if(diffInMonth<12) return `${diffInMonth} Mo ago`
                                                                    
return `${diffInYear} Y ago`
                                                                    
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


//function that render the varous items in our corousel
const renderCarouselItem=({item})=>{
return(
 <MySearchCard
title={item.title.length>11?capitalize(item.title).slice(0, 11)+ "..":capitalize(item.title)}
subTitle={`${item.bedrooms} Bedroom ${item.listing_type} In ${item.city}`}
price={`${`${item.price}`.length>11?commaSeparateNumber(`${item.price}`.slice(0,11))+ "..": commaSeparateNumber(item.price)} ${item.currency}`}
posted={calculateDate(item.dateposted)}
listing={item}
onPress={()=>navigation.navigate("listingDetail", {id:item.id})}
/>
)
}



//function that causes the map location to change as the carousl changes and showing the callout
const onCarouselChange=(index)=>{
const {latlngItems:items}=allLatLngItems()
const theItem=items[index]
if(theItem&&theItem.location&&theItem.location.coordinates&&theItem.location.coordinates.lat){
mapView&&mapView.animateToRegion({
latitude: theItem.location.coordinates.lat,
longitude: theItem.location.coordinates.lng,
latitudeDelta: LATITUDE_DELTA,
longitudeDelta: LONGITUDE_DELTA,
})

marker[index].showCallout()
}
}


//this will cause the map to change location and the carousel changes as the we click the marker
const onMarkerPress=(listing, index)=>{
if(listing.location&&listing.location.coordinates&&listing.location.coordinates.lat){
mapView&&mapView.animateToRegion({
latitude: listing.location.coordinates.lat,
longitude: listing.location.coordinates.lng,
latitudeDelta: LATITUDE_DELTA,
longitudeDelta: LONGITUDE_DELTA,
})
carouselRef.snapToItem(index)
}
}


//this will navigate the maps to the first item as we search in the input field
const navigatingToItem=()=>{
const {latlngItems}=allLatLngItems()
if(latlngItems[0]&&latlngItems[0].location&&latlngItems[0].location.coordinates&&latlngItems[0].location.coordinates.lat){
mapView&&mapView.animateToRegion({
latitude: latlngItems[0].location.coordinates.lat,
longitude: latlngItems[0].location.coordinates.lng,
latitudeDelta: LATITUDE_DELTA,
longitudeDelta: LONGITUDE_DELTA,
})
}
}

navigatingToItem()


const {latlngItems}=allLatLngItems()

const { totalCount, data:items } = getPagedData();

return (
<>
{loadingListings&&<AppActivityIndicator/>}
<ScrollView 
ref={ref} 
refreshControl={
<RefreshControl
refreshing={refresh}
onRefresh={onRefresh}
/>
}
style={styles.container
}>
<Button onPress={onPressShow} style={styles.searchingButtonContainer} title={`${showSearchContainer?"Close":"Open"} Search Device`}/>

<View style={{height,padding:10}}>
{showSearchContainer&&<ImageBackground resizeMethod="resize" source={items[0]?{uri:items[0].main_photo.path.secure_url}:require('../assets/lion.jpg')}  style={styles.welcomeOuterContainer}>
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
  
   const Citiess=data!==""?state.filter(s=> s.country===data)[0].cities:[]

   let Currencys= data!==""?state.filter(s=> s.country===data)[0].currency:[]

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
onChange={(text)=>setPrice(text)}
keyboardType="numeric"
textContentType="telephoneNumber"
placeholder="Maximum price"
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

<AppPicker
items={myRentOrSell} 
placeholder="Rent Or Sell Prop."
onSelectItem={(data)=>{
setRentOrSell(data.value)
setTheRentOrSell(data)
}}
selectedItem={theRentOrSell}
SetToDefault={(data)=>setTheRentOrSell(data)}
/>

<AppPicker
items={sortBy} 
placeholder="Sort By"
onSelectItem={(data)=>{
const isListings=[...listings]
const { value } = data
const column={...sortColumn}  
column.path=value
const sortedListing = _.orderBy(isListings, [column.path], [column.order]);
setListings(sortedListing)
}}
selectedItem={theSortBy}
SetToDefault={(data)=>{
  setSortBy(data)

}}
/>

</ImageBackground>}
</View>

{showSearchContainer&&<NumberOfListingsBar
data={`${totalCount===0?"No":totalCount} Available ${selectedListing?selectedListing:'Listing'} In ${selectedAfricaCountry?`${selectedCity&&selectedCountryInputs(selectedCity) + ", "}${selectedCountryInputs(selectedAfricaCountry)}`:userLocation.city&&selectedAfricaCountry?`${userLocation.city}, ${userLocation.country}`:"Nawafrica Marketplace"}`}
/>}

{!showSearchContainer&&totalCount===0&&
<NumberOfListingsBar
data={`${totalCount===0?"No":totalCount} Available ${selectedListing?selectedListing:'Listing'} In ${selectedAfricaCountry?`${selectedCity&&selectedCountryInputs(selectedCity) + ", "}${selectedCountryInputs(selectedAfricaCountry)}`:userLocation.city&&selectedAfricaCountry?`${userLocation.city}, ${userLocation.country}`:"Nawafrica Marketplace"}`}
/>
}

<Chat
 numberOfUnreadMsgs={myUreadMessages&&myUreadMessages.length>9?"9+":myUreadMessages.length}
/>




{/* my map displayed */}
{latlngItems[0]&&<View style={styles.mapContainer}>
<View style={styles.mapContainers}>
<MapView style={styles.map} 
provider={PROVIDER_GOOGLE}
initialRegion = {latlngItems[0].location.coordinates.lat?{
  latitude: latlngItems[0].location.coordinates.lat,
  longitude: latlngItems[0].location.coordinates.lng,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}:
{
  latitude: latlngItems[0].location.coordinates.lat,
  longitude: latlngItems[0].location.coordinates.lng,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
} 
ref={(ref)=>setMapView(ref)}
>
{latlngItems.map((listing, index)=>(
listing&&listing.location&&listing.location.coordinates&&listing.location.coordinates.lat&&
<View key={listing.id}>
<Circle
center={{latitude:listing.location.coordinates.lat, longitude:listing.location.coordinates.lng}}
radius={500}
fillColor={'rgba(200, 300, 200, 0.5)'}
/>
<Marker
coordinate={{latitude:listing.location.coordinates.lat, longitude:listing.location.coordinates.lng}}
ref={ref=>marker[index]=ref}
onPress={()=>onMarkerPress(listing, index)}
>
<Callout onPress={()=>navigation.navigate("listingDetail", {id:listing.id})}>
 <AppText style={styles.mapTitle}>{capitalize(listing.title)}</AppText>
</Callout>
</Marker>                             
</View>
))}
</MapView>
</View>
</View>}




{latlngItems[0]&&<Carousel
ref={(carousel) => { setCarouselRef(carousel)}}
sliderWidth={Dimensions.get('window').width}
itemWidth={300}
data={latlngItems}
renderItem={renderCarouselItem}
containerCustomStyle={styles.carousel}
removeClippedSubviews={false}
onSnapToItem={(index)=>onCarouselChange(index)}
/>
}


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
mapContainers: {
  height:700,
  width:"100%",
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
map: {
  width: '100%',
  height: "100%",
},
listingImage:{
  width:150,
  height:200,
  zIndex:1                
},
mapTitle:{
  textAlign:"center",
  fontWeight:"bold"
},
carousel:{
  position:"absolute",
  zIndex:2,
  bottom:10
}             
})

export default SearchListing
