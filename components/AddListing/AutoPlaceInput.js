import React from 'react'
import { Platform, StyleSheet, View, Text} from 'react-native'
import { Entypo} from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AutoPlaceInput = ({settingLocationFromAddress, onChangeText, settingStreetAddress, width="100%",googleKey}) => {

return (
<View style={[styles.container, {width}]}>

<Entypo size={22} color="grey" name="location" style={styles.icon}/>
                                          
<GooglePlacesAutocomplete
placeholder='Address* (place,town, country, click suggestion to get coords)'
minLength={2} // minimum length of text to search
autoFocus={false}
listViewDisplayed='auto'    // true/false/undefined
fetchDetails={true}
renderDescription={row => row.description}
onPress={async (data, details = null) =>{ 

  settingStreetAddress(data.description)
  const { lat, lng } = details.geometry.location;

  settingLocationFromAddress({
    loaded:true,
    coordinates:{
    lat,
    lng                   
    }
    })

}}

textInputProps={{
  onChangeText: (text) => { onChangeText(text) }
}}
query={{
  key: googleKey,
  language: 'en',
}}
nearbyPlacesAPI='GooglePlacesSearch'
onFail={(error) => console.error(error)}
getDefaultValue={(value)=>console.log(value)}
GoogleReverseGeocodingQuery={{
 API : `https://developers.google.com/maps/documentation/geocoding/intro`
}}
GooglePlacesSearchQuery={{
   API : 'https://developers.google.com/places/web-service/search',
  rankby: 'distance',
  types: 'food'
}}

filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

/>
</View>
)
}

const styles = StyleSheet.create({
container:{
backgroundColor:"#d3d3d3", 
borderRadius:25, 
flexDirection:"row", 
width:"100%", 
padding:15, 
marginVertical:15 
},
textInput:{
fontSize:18, 
color:"#0c0c0c",
fontFamily:Platform.OS==='android'?'Roboto':"Avenir"
},
icon:{
marginRight:5,
marginTop:5
}          
})

export default AutoPlaceInput
