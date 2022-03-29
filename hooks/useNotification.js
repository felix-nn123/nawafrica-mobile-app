import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import { registerPushToken } from '../services/expoPushToken'
import Constants from 'expo-constants'
import navigationRef from './../navigation/rootNavigation'
import logger from '../services/loggerService'

import { getMessageById } from '../services/messageService'

const useNotification = (user) => {
  const [token, setToken] = useState()

  useEffect(() => {
    registerForPushNotificationsAsync()
    Notifications.addNotificationReceivedListener((notification) =>
      notificationListener(notification)
    )

    return () => {
      registerForPushNotificationsAsync()
      Notifications.addNotificationReceivedListener((notification) =>
        notificationListener(notification)
      )
    }
  }, [])

  const notificationListener = async (notification) => {
    const { data: item } = await getMessageById(notification.data.id)

    navigationRef.navigate('messageDetails', { ...item })
  }

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync()
          finalStatus = status
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!')
          return
        }
        const { data: token } = await Notifications.getExpoPushTokenAsync()
        const { data: myTokenResult } = registerPushToken(token, user.id)
        setToken(token)
      } else {
        alert('Must use physical device for Push Notifications')
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        })
      }
    } catch (error) {
      logger.log('error registering for push notification', error)
    }
  }

  return token
}

export default useNotification
