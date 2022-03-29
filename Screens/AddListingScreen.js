import React, {useEffect, useState} from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'

import NameMessages from '../components/AddListing/NameMessages'
import AppTextInput from '../components/Commons/AppTextInput'
import AppPicker from '../components/Commons/AppPicker'
import TextAreaInput from '../components/AddListing/TextAreaInput'
import AppText from '../components/Commons/AppText'
import SinglePhotos from '../components/AddListing/SinglePhotos'
import MultiplePhotos from '../components/AddListing/MultiplePhotos'
import AppCheckbox from '../components/Commons/AppCheckbox'
import AppButton from '../components/Commons/AppButton'
import Titles from './../components/AddListing/Titles';
import AppPickerNoObj from '../components/Commons/AppPickerNoObj';
import UploadScreen from '../components/Commons/UploadScreen'
import AutoPlaceInput from './../components/AddListing/AutoPlaceInput';

import useAuth from '../hooks/useAuth';
import useLocation from './../hooks/useLocation';

import UnreadMsgsContext from '../utils/MsgContext';
import { Countries, Regions } from './../utils/regions';
import { uploadMultipleFileToCloudinary } from '../utils/imageUploadToCloudinary'

import { getCloudinarySignature } from '../services/cloudinaryService';
import { addListing } from '../services/listings'
import { getMapKey } from '../services/getMapKey'

const AddListingScreen = () => {
const myUreadMessages=React.useContext(UnreadMsgsContext)
const [uploadVisible, setUploadVisible]=useState(false)
const [loading, setLoading]=useState(false)
const {latitude, longitude}=useLocation()

const [title, setTitle]=useState("")

const [listingType,setListingType]=useState("")
const [listingTypes]=useState([
  {label:"Apartment", value:1}, 
  {label:"Studio", value:2}, 
  {label:"Single Room", value:3}, 
  {label:"Office", value:4}, 
  {label:"Store/Shop", value:5}, 
  {label:"Land", value:6}, 
  {label:"Condos", value:7}
])

const [rentalOrSale,setRentalOrSale]=useState("")
const [rentalOrSales]=useState([
  {label:"Rental", value:1}, 
  {label:"Sale", value:2}, 
])

const [bedrooms, setBedrooms]=useState("")
const [bathrooms,setBathrooms]=useState("")
const [kitchens,setKitchen]=useState("")
const [garages,setGarages]=useState("")
const [lotSize,setLotSize]=useState("")
const [buildingSize,setBuildingSize]=useState("")

const [keyword,setKeyword]=useState("")
const [keywords]=useState([
  {label:"Garage, Pool, Flowers, Garden, Playground", value:1}, {label:"Garage, Pool, Flowers, Garden", value:2}, 
  {label:"Pool, Flowers, Garden, Playground", value:3}, {label:"Flowers, Garden, Playground", value:4}, 
  {label:"Garage, Pool, Flowers", value:5}, {label:"Garden, Playground", value:6}, {label:"Pool, Flowers", value:7},
  {label:"Garage, Playground", value:8}, {label:"Garage, Pool", value:9}, {label:"Garage, Garden", value:10}, 
  {label:"Garage, Flowers", value:11}, {label:"Garage", value:12}, {label:"Pool, Garden", value:13}, 
  {label:"Pool, Playground", value:14},{label:"Flowers, Garden", value:15}, {label:"Flower, Playground", value:16}, 
  {label:"Pool", value:17}, {label:"Flowers", value:18}, {label:"Garden", value:19},{label:"Playground", value:20}
])

const [role, setRole]=useState([
  {label:"I am the Owner", value:1}, 
  {label:"I am an Agent / Broker", value:2}, 
  {label:"I am a Property Manager", value:3}
])
const [myRole, setMyRole]=useState("")

const [countries, setCountries]=useState([])
const [country, setCountry]=useState("")

const [states,setStates]=useState([])
const [state,setState]=useState("")

const [cities, setCities]=useState([])
const [city, setCity]=useState("")

const [zipCode,setZipCode]=useState("")
const [details, setDetails]=useState("")

const [price, setPrice]=useState("")
const [advancePrice, setAdvancePrice]=useState("")
const [currency,setCurrency]=useState("")

const [checkedPostion, setCheckedPostion]=useState("i am")

const [myImageData,setMyImageData]=useState()

const [mainPhotoPath, setMainPhotoPath]=useState("")
const [mainPhotoImageUri, setMainPhotoImageUri]=useState()
const [mainPhotoError, setMainPhotoError]=useState(false)
const [loadMainPhoto, setLoadMainPhoto]=useState(false)

const [parlourPhotoPath, setParlourPhotoPath]=useState("")
const [parlourPhotoImageUri, setParlourPhotoImageUri]=useState()
const [parlourPhotoError, setParlourPhotoError]=useState(false)
const [loadParlourPhoto, setLoadParlourPhoto]=useState(false)

const [bedroomPhotoPath, setBedroomPhotoPath]=useState("")
const [bedroomPhotoImageUri, setBedroomPhotoImageUri]=useState()
const [bedroomPhotoError, setBedroomPhotoError]=useState(false)
const [loadBedroomPhoto, setLoadBedroomPhoto]=useState(false)

const [otherPhotoPath, setOtherPhotoPath]=useState([])
const [otherPhotoError, setOtherPhotoError]=useState(false)
const [loadOtherPhoto, setLoadOtherPhoto]=useState(false)

const [fixedAgreement, setFixedAgreement]=useState("")
const [renewFixedAgreement, setRenewFixedAgreement]=useState("")
const [continueMonthTonMonth, setContinueMonthTonMonth]=useState("")
const [vacate, setVacate]=useState("")
const [monthToMonth, setMonthToMonth]=useState("")
const [soldAgreement, setSoldAgreement]=useState("")

const [publish, setPublish]=useState("publish")

const [uploadDataError ,setUploadDataError]=useState(false)
const [loadingProgress,setLoadingProgress]=useState(0)

const [addressChange, setAddressChange]=useState("")
const [streetAddress,setStreetAddress]=useState("")
const [locationFromAddress, setLocationFromAddress]=useState({
  loaded:false,
  coordinates:{
  lat:"",
  lng:""                   
  }
  })

const [googleKey, setGoogleKey]=useState('')

const {user}=useAuth()

useEffect(()=>{
  let Africas=Countries()
  setCountries(Africas)

  getDatas()

}, [])

const getDatas=async ()=>{
  setLoading(true)
  const {data:imagesData}=await getCloudinarySignature()
  setMyImageData(imagesData)
  const {data}= await getMapKey()
  setGoogleKey(data)
  setLoading(false)
}


const onPressCheckPosition=()=>{
  if(checkedPostion){
    setCheckedPostion("")

   }else{
    setCheckedPostion("i am")
   }  
}


const onChangeMainPhoto=async (data)=>{
  try {

    setLoadMainPhoto(true)
    const filesss=data

    if(filesss){
    const result=await uploadMultipleFileToCloudinary(filesss, myImageData)
     setMainPhotoPath(result)
    }

    setLoadMainPhoto(false)
    setMainPhotoError(false)
    setMainPhotoImageUri(data)
  } catch (ex) {
    setMainPhotoError(ex.response.data)     
  }
}

const onChangeParlourPhoto=async (data)=>{
  try {

    setLoadParlourPhoto(true)
    const filesss=data
    if(filesss){
    const result=await uploadMultipleFileToCloudinary(filesss, myImageData)
     setParlourPhotoPath(result)
    }

    setLoadParlourPhoto(false)
    setParlourPhotoError(false)
    setParlourPhotoImageUri(data)
  } catch (ex) {
    setMainPhotoError(ex.response.data)
      
  }
}



const onChangeBedroomPhoto=async (data)=>{
  try {
    setLoadBedroomPhoto(true)
    const filesss=data
    if(filesss){
    const result=await uploadMultipleFileToCloudinary(filesss, myImageData)
     setBedroomPhotoPath(result)
    }
    setLoadBedroomPhoto(false)
    setBedroomPhotoError(false)
    setBedroomPhotoImageUri(data)
  } catch (ex) {
    setBedroomPhotoError(ex.response.data)
      
  }
}

const onChangeOtherPhoto=async (data)=>{
  try {
    setLoadOtherPhoto(true)
    const filesss=data
    if(filesss){
    const result=await uploadMultipleFileToCloudinary(filesss, myImageData)
     setOtherPhotoPath([...otherPhotoPath, result])
    }
    setLoadOtherPhoto(false)
    setOtherPhotoError(false)
  } catch (ex) {
    setOtherPhotoError(ex)
      
  }
}


//function the set the state if user chooses fixed lease checkbox
const onChangeFixedLease=()=>{
  if(fixedAgreement){
       setFixedAgreement("")
    setRenewFixedAgreement("")
    setContinueMonthTonMonth("")
    setVacate("")
    setSoldAgreement("")
   }else{
    setMonthToMonth("")
    setFixedAgreement("Fixed Agreement")
    setRenewFixedAgreement("Renew Fixed Agreement")
    setSoldAgreement("")
   }
  }


//function the set the state if user chooses to renew fixed lease checkbox
const onChangeFixedLeaseRenew=()=>{
  if(renewFixedAgreement){
    setRenewFixedAgreement("") 
    setMonthToMonth("")
  }else{
    setRenewFixedAgreement("Renew Fixed Agreement")
    setContinueMonthTonMonth("")
    setFixedAgreement("Fixed Agreement")
    setVacate("")
    setMonthToMonth("")
    setSoldAgreement("")
  }
}


//function the set the state if user chooses to continue with month to month fixed lease checkbox
const onChangeContinueLease=()=>{
  if(continueMonthTonMonth){
    setContinueMonthTonMonth("")
    setFixedAgreement("")
    setRenewFixedAgreement("")
    setVacate("")
    setMonthToMonth("")
    setSoldAgreement("")
  }else{
  setContinueMonthTonMonth("Continue With Month-To-Month")
  setFixedAgreement("Fixed Agreement")
  setRenewFixedAgreement("")
  setVacate("")
  setMonthToMonth("")
  setSoldAgreement("")
}
}


//function the set the state if user chooses vacate lease checkbox
const onChangeVacate=(e)=>{
  if(vacate){
    setRenewFixedAgreement("")
    setContinueMonthTonMonth("")
    setVacate("")
    setFixedAgreement("")
    setMonthToMonth("")
    setSoldAgreement("")
  }else{
    setRenewFixedAgreement("")
    setContinueMonthTonMonth("")
    setVacate("Vacate")
    setFixedAgreement("Fixed Agreement")
    setMonthToMonth("")
    setSoldAgreement("")
  }
}


//function the set the state if user chooses month to mmonth checkbox
const onChangeMonthToMonth=()=>{
  if(monthToMonth){
    setMonthToMonth("")
    setSoldAgreement("")
  }else{
    setMonthToMonth("Month-To-Month Agreement")
    setFixedAgreement("")
    setRenewFixedAgreement("")
    setContinueMonthTonMonth("")
    setVacate("")
    setSoldAgreement("")
  }
}


//function to set value if we click sold agreement
const onChangeSold=()=>{
  if(soldAgreement){
    setMonthToMonth("")
    setSoldAgreement("")
  }else{
    setMonthToMonth("")
    setFixedAgreement("")
    setRenewFixedAgreement("")
    setContinueMonthTonMonth("")
    setVacate("")
    setSoldAgreement("Sold Agreement")
  }
}

const onChangePublish=()=>{
  if(publish){
    setPublish('')
  }else{
    setPublish('publish')
  }
}


const SubmitPost=async ()=>{
if(listingType.label==="Single Room"&&bedrooms!=1) return setUploadDataError('The number of bedroom for a Single Room listing Type must be equals 1')
if(listingType.label==="Studio"&&bedrooms!=2) return setUploadDataError('The number of bedrooms for Studio listing Type must be equals 2')
if(listingType.label==="Apartment"&&bedrooms<=2) return setUploadDataError('The number of bedrooms for an Apartment listing Type must be greater than 2')
if(listingType.label==="Land"&&bedrooms!=0) return setUploadDataError('The number of bedrooms for Land listing Type must be equals 0')
  
if(!fixedAgreement&&!monthToMonth&&!soldAgreement){
setUploadDataError("Choose an agreement for this listing");
}else{
try {
setUploadDataError(false)
setMainPhotoError(false)
setBedroomPhotoError(false)
setParlourPhotoError(false)
setOtherPhotoError(false)

const datas={
title,
listing_type:listingType.label,
location:checkedPostion?{
loaded:false,
coordinates:{
lat:latitude,
lng:longitude                  
} 
}:locationFromAddress.coordinates.lat?
locationFromAddress
:{
loaded:false,
coordinates:{
lat:"",
lng:""                   
}
},
rent_or_sell:rentalOrSale.label,
bedrooms,
bathrooms,
kitchen:kitchens,
garages,
lot_size:lotSize,
building_size:buildingSize,
keyword:keyword.label,
country,
state,
city,
currency,
street_address:streetAddress?streetAddress:addressChange,
zip_code:zipCode,
details,
price,
advance_price:advancePrice,
main_photo:mainPhotoPath,
parlour_photo:parlourPhotoPath,
bedroom_photo:bedroomPhotoPath,
listing_role:myRole.label,
publish:publish,
other_photos:otherPhotoPath,
fixedAgreement,
renewFixedAgreement,
continueMonthTonMonth,
vacate,
soldAgreement,
monthToMonth
}
setLoadingProgress(0)
setUploadVisible(true)

await addListing(datas, (progress)=>setLoadingProgress(progress))
setUploadDataError(false)
setUploadVisible(false)

setTitle('')
setListingType('')
setCheckedPostion('I am')
setRentalOrSale("")
setBedrooms('')
setBathrooms('')
setKitchen('')
setGarages('')
setLotSize("")
setBuildingSize('')
setKeyword("")
setCountry('')
setState('')
setCity('')
setCurrency('')
setStreetAddress("")
setZipCode('')
setDetails('')
setPrice('')
setAdvancePrice("")
setMainPhotoImageUri('')
setMainPhotoPath("")
setParlourPhotoImageUri('')
setParlourPhotoPath('')
setBedroomPhotoImageUri('')
setBedroomPhotoPath('')
setOtherPhotoPath([])
setMyRole('')
setPublish('publish')
setFixedAgreement("")
setRenewFixedAgreement('')
setContinueMonthTonMonth("")
setVacate('')
setSoldAgreement("")
setMonthToMonth("")
setMainPhotoError(false)
setBedroomPhotoError(false)
setParlourPhotoError(false)
setOtherPhotoError(false)
} catch (ex) {
if (ex.response && ex.response.status === 400) {
setLoadingProgress('')
setUploadDataError(ex.response.data)
setUploadVisible(false)
} 
}
}
}


return (
<>
<AutoPlaceInput
googleKey={googleKey}
settingLocationFromAddress={(coord)=>setLocationFromAddress(coord)}
onChangeText={(text)=>setAddressChange(text)}
settingStreetAddress={(address)=>setStreetAddress(address)}
/>
{/*<AppTextInput
placeholder="Address*"
fontIcon="address-book"
onChangeText={(data)=>setStreetAddress(data)}
value={streetAddress}
/> */}
<UploadScreen
progress={loadingProgress}
visible={uploadVisible}
onDone={()=>setUploadVisible(false)}
/>
<ScrollView style={styles.container}>
<NameMessages
user={user}
numberOfUnreadMsgs={myUreadMessages&&myUreadMessages.length>9?"9+":myUreadMessages.length}
/> 

<View style={styles.inputsContainer}>
<Titles
/>

<AppTextInput
icon="format-title"
placeholder="Enter the Title of Listing*"
onChangeText={(data)=>setTitle(data)}
value={title}
/>

<AppPicker
icon='format-list-bulleted-type'
placeholder="Listing Type*"
items={listingTypes}
onSelectItem={(data)=>{setListingType(data)}}
SetToDefault={(data)=>setListingType(data)}
selectedItem={listingType}
/>

<AppPicker
AntIcon="questioncircle"
placeholder="For Rent or for Sale*"
items={rentalOrSales}
onSelectItem={(data)=>{setRentalOrSale(data)}}
SetToDefault={(data)=>setRentalOrSale(data)}
selectedItem={rentalOrSale}
/>

<AppTextInput
icon="bed"
placeholder="Number of Bedrooms*"
onChangeText={(data)=>setBedrooms(data)}
keyboardType="numeric"
value={bedrooms}
/>

<AppTextInput
placeholder="Number of Bathrooms*"
fontIcon="bathtub"
onChangeText={(data)=>setBathrooms(data)}
keyboardType="numeric"
value={bathrooms}
/>

<AppTextInput
placeholder="Number of Kitchens*"
icon="food-fork-drink"
onChangeText={(data)=>setKitchen(data)}
keyboardType="numeric"
value={kitchens}
/>

<AppTextInput
placeholder="Number of Garages*"
icon="garage-alert-variant"
onChangeText={(data)=>setGarages(data)}
keyboardType="numeric"
value={garages}
/>

<AppTextInput
placeholder="Lot size in Meter Square"
onChangeText={(data)=>setLotSize(data)}
keyboardType="numeric"
value={lotSize}
/>

<AppTextInput
icon="warehouse"
placeholder="Building size in Meter Square"
onChangeText={(data)=>setBuildingSize(data)}
keyboardType="numeric"
value={buildingSize}
/>

<AppPicker
icon="feature-search"
placeholder="keyword and features of Listing*"
items={keywords}
onSelectItem={(data)=>{setKeyword(data)}}
SetToDefault={(data)=>setKeyword(data)}
selectedItem={keyword}
/>

<AppPicker
Font5Icon="critical-role"
placeholder="Listing Role*"
items={role}
onSelectItem={(data)=>{setMyRole(data)}}
SetToDefault={(data)=>setMyRole(data)}
selectedItem={myRole}
/>

<Titles
title='Address'
/>

<AppPickerNoObj
Font5Icon="globe-africa"
placeholder="Country*"
items={countries} 
SetToDefault={(data)=>setCountry(data)}
onSelectItem={(data)=>{
let state=Regions()

setCountry(data)

if(city||currency||state&&!country){
setCity('')
setCurrency('')
setState('')
setStates([])
} 
  
const statess=data!==""?state.filter(s=> s.country===data)[0].states:[]

const Citiess=data!==""?state.filter(s=> s.country===data)[0].cities:[]

let Currencys= data!==""?state.filter(s=> s.country===data)[0].currency:[]

setStates(statess)
setCities(Citiess)
setCurrency(Currencys[0])

}}
onSetDataToDefault={(data)=>{
setCountry(data)
setState('')
setCity('')
}}
selectedItem={country}
/>

<AppPickerNoObj
placeholder="State*"
EntyIcon="location"
items={states}
onSelectItem={(data)=>setState(data)}
onSetDataToDefault={(data)=>{setState(data)}}
selectedItem={state}
/>


<AppPickerNoObj
placeholder="City*"
icon="home-city"
items={cities}
onSelectItem={(data)=>setCity(data)}
onSetDataToDefault={(data)=>{setCity(data)}}
selectedItem={city}
/>


<AppTextInput
placeholder="ZipCode"
fontIcon="file-zip-o"
onChangeText={(data)=>setZipCode(data)}
value={zipCode}
/>

<TextAreaInput
onChangeText={(text)=>setDetails(text)}
value={details}
/>

<View style={styles.theLocationContainer}>
<AppCheckbox
title={checkedPostion?"I am in the position of this Listing":"I am not in the position of this Listing"}
checked={checkedPostion}
onPress={onPressCheckPosition}
textStyle={{fontSize:18}}
/>


</View>

<Titles
title='Price Info'
/>

<AppTextInput
placeholder="Price Per Month (Without country currency)*"
font5Icon="money-bill-wave"
onChangeText={(data)=>setPrice(data)}
keyboardType="numeric"
value={price}
/>

<AppTextInput
font5Icon="money-bill-wave"
placeholder="Advanced Payment (Without country currency)*"
onChangeText={(data)=>setAdvancePrice(data)}
keyboardType="numeric"
value={advancePrice}
/>


<Titles
title='Upload Photos'
/>

<View style={styles.mainPalorBedroomPhoto}>
<View style={styles.imagesContainer}>
<SinglePhotos
imageUri={mainPhotoImageUri}
onChangeImage={onChangeMainPhoto}
title='Main Photo*'
loadingImage={loadMainPhoto}
error={mainPhotoError}
/>
</View>
<View style={styles.imagesContainer}>
<SinglePhotos
imageUri={parlourPhotoImageUri}
onChangeImage={onChangeParlourPhoto}
loadingImage={loadParlourPhoto}
title='Parlour Photo*'
error={parlourPhotoError}
/>
</View>
<View style={styles.imagesContainer}>
<SinglePhotos
imageUri={bedroomPhotoImageUri}
onChangeImage={onChangeBedroomPhoto}
loadingImage={loadBedroomPhoto}
title='Bedroom*'
error={bedroomPhotoError}
/>
</View>
</View>


<View style={styles.multiplePhotoContainer}>
<MultiplePhotos
imageUris={otherPhotoPath}
onRemoveImage={(data)=>setOtherPhotoPath(otherPhotoPath.filter(image=>image!==data))}
onAddImage={onChangeOtherPhoto}
loadingImage={loadOtherPhoto}
error={otherPhotoError}
/>
</View>


<Titles
title='Listings Terms and conditions'
/>



<View style={styles.termsContainer}>
<AppCheckbox
title={`Fixed Lease. The Tenant shall be allow to occupy the Premises starting on An Agreed Date and ends on an Agreed Date.("Lease Terms"). At the end of the Lease Term and no renewal is made, the Tenant: (Check One)`}
checked={fixedAgreement}
onPress={onChangeFixedLease}

/>


<View style={styles.fixedLeaseTerms}>
<AppCheckbox
title={`Renew Your Fixed Lease Agreement.`}
checked={renewFixedAgreement}
onPress={onChangeFixedLeaseRenew}
/>

<AppCheckbox
title={`May continue to lease the Premises under the same terms of this agreement under a month-to-month arrangement.`}
checked={continueMonthTonMonth}
onPress={onChangeContinueLease}
/>

<AppCheckbox
title={`Must vacate the Premises`}
checked={vacate}
onPress={onChangeVacate}
/>

</View>

<AppCheckbox
title={`Month-to-Month Lease. The Tenant shall be allowed to occupy the Premises on a month-to-month agreement starting on on An Agreed Month
and ending upon notice 30 days from either Party to the other Party("Lease terms")`}
checked={monthToMonth}
onPress={onChangeMonthToMonth}
/>

<AppCheckbox
title={`Sold Lease. This Lease will be Sold permanently To whosever buys it ie The Customer("Lease terms")`}
checked={soldAgreement}
onPress={onChangeSold}
/>

</View>



<AppButton
title="Add Listing"
onPress={SubmitPost}
/>



<View style={styles.publishContainer}>
<AppCheckbox
title={publish?'Click here if you want to unpublish this Listing':`Click here to Publish this Listing`}
checked={publish}
onPress={onChangePublish}
/>
{uploadDataError&&<AppText style={styles.errorText}>{uploadDataError}</AppText>}
</View>



</View>

</ScrollView>
</>
)
}

const styles = StyleSheet.create({
container:{
flex:1,
padding:10            
},
inputsContainer:{
width:"100%",
marginTop:10              
},
mainPalorBedroomPhoto:{
flexDirection:"row",
marginVertical:5              
},
imagesContainer:{
flex:1,
justifyContent:"center",
alignItems:"center"               
},
multiplePhotoContainer:{
 marginVertical:10                
},
theLocationContainer:{
marginVertical:5,
width:"100%",
justifyContent:"center",
alignItems:"center"            
},
checkbox:{
height:100,
width:100                
},
fixedLeaseTerms:{
paddingLeft:50,
width:"100%"                
},
publishContainer:{
width:"100%",
height:100
},
errorText:{
color:"red",
fontSize:18,
textAlign:"center"
}             
})

export default AddListingScreen
