

////here we get the notification token only when our user is logged hence in AppNavigation we do the follow

import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import { registerPushToken } from './../services/expoPushToken';
import navigation from '../navigation/rootNavigation';


import ProfileScreen from './../Screens/ProfileScreen';
import FeedNavigator from './FeedNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';

 const Tab=createBottomTabNavigator()
const AppNavigation = () => {

//step 1 :register the app to get a token
const registerForPushNotification=async ()=>{
try {
const permission= await Permissions.askAsync(Permissions.NOTIFICATIONS)

if(!permission.granted) return;
                 
const token=Notifications.getExpoPushTokenAsync()

registerPushToken(token)
                 
} catch (error) {
 console.log('error getting push token')                
}
}

useEffect(()=>{
registerForPushNotification()

//this will redirect our user to the message detail screen whenever the user taps a notification
Notifications.addListener(notification=>navigation.navigate(notification))

}, [])


//step2: store the token in a database
//we go to to our database and add a column call pushNotificationToken that we will update the register user and 
//add his push token






//step 3: send a notification to a user that is recieving the message
//to send a push notification you need to use one of the sdk provided by expo, so go to our expo documentation, then
//to  Guide and finally Push Notification, there select expo-server-sdk-node

//in our baakend in utils, we create a new file called pushNotification

//implement this as seen in the documentation
const {Expo}=require('expo-server-sdk')

const sendPushNotification=async (targetExpoPushToken, message)=>{
const expo=new Expo()

const chunks= expo.chunkPushNotifications([
 {to:targetExpoPushToken, sound:"default", body:message}                
])

const sendChunks=async ()=>{
chunks.forEach(async chunk=>{
 console.log('sending chunks', chunk)                
})
}

}


//step 4:Handle recieved notification



return (
<Tab.Navigator screenOptions={{
activeBackgroundColor:"tomato",
activeTintColor:"white",
inactiveBackgroundColor:"#eee",
inactiveTintColor:"black"
}}
>
<Tab.Screen name="Feed" component={FeedNavigator} options={{headerShown:false}}  options={{tabBarIcon:({size, color})=>(<MaterialCommunityIcons name="home" color={color} size={size}/>),}}/>      
<Tab.Screen name="account" component={ProfileScreen}/>                                         
</Tab.Navigator>
)
}

export default AppNavigation


