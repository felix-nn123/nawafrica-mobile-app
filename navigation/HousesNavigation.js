import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import HousesScreen from '../Screens/HousesScreen';
import HouseSale from '../Screens/HouseSale';
import HousesRent from '../Screens/HousesRent';
import ListingDetails from './../Screens/ListingDetails';
import SearchListing from './../Screens/SearchListing';

const Stack=createStackNavigator()

const HousesNavigation = () => {
return (
<Stack.Navigator>
<Stack.Screen name="allHouse" component={HousesScreen} options={{headerShown:false}}/>  
<Stack.Screen name="rent_House" component={HousesRent} options={{title:"Rent A House"}}/> 
<Stack.Screen name="sell_House" component={HouseSale} options={{title:"Buy A House"}}/>      
<Stack.Screen name="listingDetail" component={ListingDetails} options={{headerShown:false}}/>   
<Stack.Screen name="searchListing" component={SearchListing} options={{headerShown:false}}/>                                               
</Stack.Navigator>
)
}

export default HousesNavigation
