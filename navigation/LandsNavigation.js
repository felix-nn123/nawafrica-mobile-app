import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import HouseSale from '../Screens/HouseSale';
import ListingDetails from './../Screens/ListingDetails';
import SearchListing from './../Screens/SearchListing';
import LandsScreen from './../Screens/LandsScreen';
import LandsRent from './../Screens/LandsRent';
import LandsSale from '../Screens/LandsSale';

const Stack=createStackNavigator()

const LandsNavigation = () => {
return (
<Stack.Navigator>
<Stack.Screen name="Lands_screen" component={LandsScreen} options={{title:"Lands"}}/>  
<Stack.Screen name="rent_Land" component={LandsRent} options={{title:"Rent A Land"}}/> 
<Stack.Screen name="sell_Land" component={LandsSale} options={{title:"Buy A Land"}}/>      
<Stack.Screen name="listingDetail" component={ListingDetails} options={{headerShown:false}}/>   
<Stack.Screen name="searchListing" component={SearchListing} options={{headerShown:false}}/>                                               
</Stack.Navigator>
)
}

export default LandsNavigation