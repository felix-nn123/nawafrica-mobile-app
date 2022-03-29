import React from 'react'
import MapView, {Marker,PROVIDER_GOOGLE, Callout, Circle} from 'react-native-maps';
import { StyleSheet, View} from 'react-native';

import AppText from '../Commons/AppText';

const SearchMap= ({listings, onPress, region, onRegionChange, onRegionChangeComplete, refs}) => {
function capitalize(s){
  return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};

return (
<View style={styles.mapContainers}>
<MapView style={styles.map} 
provider={PROVIDER_GOOGLE}
// initialRegion = {{...region}} 
// onRegionChange={region=>onRegionChange(region)} 
// onRegionChangeComplete={onRegionChangeComplete}
// ref={(ref)=>refs(ref)}
>

{listings.map(listing=>(
<View key={listing.id}>
<Circle
center={{latitude:listing.location.coordinates.lat, longitude:listing.location.coordinates.lng}}
radius={1000}
fillColor={'rgba(200, 300, 200, 0.5)'}
/>
<Marker
coordinate={{latitude:listing.location.coordinates.lat, longitude:listing.location.coordinates.lng}}
>
<Callout onPress={()=>onPress(listing)}>
{/* <Image style={styles.listingImage} source={{uri:listing.main_photo.path.url}}/> */}

 <AppText style={styles.mapTitle}>{capitalize(listing.title)}</AppText>
 <AppText>{listing.bedrooms} bedroom,  {listing.listing_type} in {listing.city}, {listing.country}</AppText>
</Callout>
</Marker>                             

</View>
))}
</MapView>
</View>
)
}

const styles = StyleSheet.create({
mapContainers: {
  height:600,
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
  textAlign:"center"
}
});

export default SearchMap
