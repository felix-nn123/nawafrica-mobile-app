import React from 'react'
import MapView, {Marker,PROVIDER_GOOGLE, Callout, Circle} from 'react-native-maps';
import { StyleSheet, View, Image} from 'react-native';

import AppText from './AppText';

const AppMap = ({geoLocation}) => {
const onPressListing=()=>{
  alert("Welcome")               
}
return (
<View style={styles.container}>
<MapView style={styles.map} 
provider={PROVIDER_GOOGLE}
initialRegion={{
latitude: geoLocation.lat,
longitude: geoLocation.lng,
latitudeDelta: 0.0922,
longitudeDelta: 0.0421,              
}}
>
<Circle
center={{latitude:geoLocation.lat, longitude:geoLocation.lng}}
radius={1000}
fillColor={'rgba(200, 300, 200, 0.5)'}
/>
<Marker
key={1}
coordinate={{latitude:geoLocation.lat, longitude:geoLocation.lng}}
title="Limbe"
>
<Callout onPress={onPressListing}>
 <Image style={styles.listingImage} source={require('../../assets/staircase.jpg')}/> 
 <AppText>my House</AppText>               
</Callout>
</Marker>                             
</MapView>
</View>
)
}

const styles = StyleSheet.create({
container: {
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
  width:100,
  height:100                
}
});

export default AppMap
