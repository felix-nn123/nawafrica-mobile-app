import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from './../Screens/ProfileScreen';
import AddListingScreen from '../Screens/AddListingScreen';

const Stack=createStackNavigator()
const ProfileNavigation = () => {
return (
<Stack.Navigator>
<Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>      
<Stack.Screen name="ComposeListing" component={AddListingScreen} options={{title:"Compose A Listing"}}/>   
{/* <Stack.Screen name="Register" component={RegisterScreen}/>   */}
</Stack.Navigator>
)
}

export default ProfileNavigation
