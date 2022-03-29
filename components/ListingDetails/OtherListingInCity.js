import React, { useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import MapView, {Marker,PROVIDER_GOOGLE, Callout, Circle} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment'

import AppText from './../Commons/AppText';
import MySearchCard from './../SearchListing/MySearchCard';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const OtherListingInCity = ({listings, navigation}) => {
const [mapView, setMapView]=useState({
animateToRegion:(obj)=>obj
})
const [marker, setMarker]=useState([])
const [carouselRef, setCarouselRef]=useState({})
                                

const allLatLngItems=()=>{                               
const latListing=listings.filter(list=>list.location.coordinates.lat!=="")
return {latlngItems:latListing}
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
const onMarkerPress=(list, index)=>{
if(list.location&&list.location.coordinates&&list.location.coordinates.lat){
mapView&&mapView.animateToRegion({
latitude: list.location.coordinates.lat,
longitude: list.location.coordinates.lng,
latitudeDelta: LATITUDE_DELTA,
longitudeDelta: LONGITUDE_DELTA,
})
carouselRef.snapToItem(index)
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
                       



//function that render the varous items in our corousel
const renderCarouselItem=({item})=>{
return(
 <MySearchCard
title={item.title.length>11?capitalize(item.title).slice(0, 11)+ "..":capitalize(item.title)}
subTitle={`${item.bedrooms} Bedroom ${item.listing_type} In ${item.city}`}
price={`${`${item.price}`.length>11?commaSeparateNumber(`${item.price}`.slice(0,11))+ "..": commaSeparateNumber(item.price)} ${item.currency}`}
posted={calculateDate(item.dateposted)}
listing={item}
onPress={()=>navigation(item)}
/>
)
}


const {latlngItems}=allLatLngItems()

return (
<View>


{/* my map displayed */}
{latlngItems[0]&&
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
<Callout onPress={()=>navigation(listing)}>
 <AppText style={styles.mapTitle}>{capitalize(listing.title)}</AppText>
</Callout>
</Marker>                             
</View>
))}
</MapView>
</View>
}



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


</View>
)
}


const styles = StyleSheet.create({
mapContainers:{
height:650,
width:"100%",
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
map: {
width: '100%',
height: "100%",
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

export default OtherListingInCity