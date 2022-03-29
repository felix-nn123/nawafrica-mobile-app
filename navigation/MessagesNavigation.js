import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import MessagesScreen from '../Screens/MessagesScreen';
import MessageDetails from '../Screens/MessageDetails'
// import MessageCompose from './../Screens/MessageCompose';

const Stack=createStackNavigator()
const MessagesNavigation = () => {
return (
<Stack.Navigator>
<Stack.Screen name="messagess" component={MessagesScreen} options={{headerShown:false}}/>    
<Stack.Screen name="messageDetails" component={MessageDetails} options={{title:"Message Details"}}/> 
</Stack.Navigator>
)
}

export default MessagesNavigation
