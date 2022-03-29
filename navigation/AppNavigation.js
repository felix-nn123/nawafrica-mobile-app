import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons'

import ProfileNavigation from './ProfileNavigation'
import FeedNavigator from './FeedNavigator'
import LandsNavigation from './LandsNavigation'
import logger from '../services/loggerService'

import HousesNavigation from './HousesNavigation'
import MessagesNavigation from './MessagesNavigation'
import useNotification from './../hooks/useNotification'
import useAuth from './../hooks/useAuth'

const Tab = createBottomTabNavigator()
const AppNavigation = () => {
  const { user } = useAuth()

  logger.init()
  useNotification(user)

  return (
    <Tab.Navigator
      screenOptions={{
        activeBackgroundColor: 'tomato',
        activeTintColor: 'white',
        inactiveBackgroundColor: '#eee',
        inactiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name='Feed'
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name='home' color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name='Houses'
        component={HousesNavigation}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name='warehouse' color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name='Lands'
        component={LandsNavigation}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='landscape' color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name='messages'
        component={MessagesNavigation}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name='chat' color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name='account'
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name='user' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default AppNavigation
