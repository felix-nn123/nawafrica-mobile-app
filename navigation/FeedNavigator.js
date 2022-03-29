import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import ListingDetails from './../Screens/ListingDetails';
import HomeScreen from '../Screens/HomeScreen';
import SearchListing from '../Screens/SearchListing';

const Stack=createStackNavigator()
const FeedNavigator = () => {
return (
<Stack.Navigator>
<Stack.Screen name="listings" component={HomeScreen} options={{headerShown:false}}/>    
<Stack.Screen name="listingDetail" component={ListingDetails} options={{headerShown:false}}/>   
<Stack.Screen name="searchListing" component={SearchListing} options={{headerShown:false}}/>                                               
</Stack.Navigator>
)
}

export default FeedNavigator
