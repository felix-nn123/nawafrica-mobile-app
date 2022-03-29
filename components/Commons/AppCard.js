import React from 'react'
import {Text, StyleSheet, View } from 'react-native'
import moment from 'moment'

import MyCard from './MyCard'

const AppCard = ({onPress, listings, onDeleteList}) => {

function capitalize(s){
return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};

                              
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


return (
<View style={styles.cardDisplayContainer}>
{listings?listings.map(listing=>(
<View key={`${listing.id}`}>
<MyCard
title={listing.title.length>11?capitalize(listing.title).slice(0, 11)+ "..":capitalize(listing.title)}
subTitle={`${listing.listing_type!=="Land"?`${listing.bedrooms} Bedroom`:""} ${listing.listing_type} In ${listing.city}`}
price={`${`${listing.price}`.length>11?commaSeparateNumber(`${listing.price}`.slice(0,11))+ "..": commaSeparateNumber(listing.price)} ${listing.currency}`}
posted={calculateDate(listing.dateposted)}
image={{uri:listing.main_photo.path.secure_url?listing.main_photo.path.secure_url:listing.main_photo.path.url}}
onPress={()=>onPress(listing)}
onDeleteList={()=>onDeleteList(listing)}
listing={listing}
/>
</View>
)):
<Text>...loading</Text>
}                                              
</View>
)
}

const styles = StyleSheet.create({
cardDisplayContainer:{
padding:20,
backgroundColor:"#f8f4f4",
flex:1
}                
})

export default AppCard
