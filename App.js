import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import 'react-native-gesture-handler'
import io from 'socket.io-client'
import logger from './services/loggerService'
import { Audio } from 'expo-av'

import OffLineNotice from './components/Commons/OffLineNotice'
import AppScreen from './components/Commons/AppScreen'
import AppHeader from './components/Commons/AppHeader'

import AppNavigation from './navigation/AppNavigation'
import AuthNavigation from './navigation/AuthNavigation'
import navigationTheme from './navigation/navigationTheme'
import navigationRef from './navigation/rootNavigation'

import AuthStorage from './utils/AuthStorage'
import AuthContext from './utils/AuthContext'
import UnreadMsgsContext from './utils/MsgContext'
import URL from './utils/http'

import { getRecipientUnreadMsgById } from './services/messageService'

export default function App() {
  const [user, setUser] = useState({})
  const [isReady, setIsReady] = useState(false)
  const [unreadMsgs, setUnreadMsgs] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const user = await AuthStorage.getUser()
      if (user) setUser(user)
      //funtion to get all unread messages for a given user
      if (user) {
        const { data: unreadMsg } = await getRecipientUnreadMsgById(user.id)
        setUnreadMsgs(unreadMsg)

        const socket = io(URL.endpoint)
        //funtion to get the lasted message send to the uses
        socket.on(`${user.id}latestMsg`, async (data) => {
          setUnreadMsgs(data)
          const { sound } = await Audio.Sound.createAsync(
            require('./assets/messageSound.mp3')
          )
          await sound.playAsync()
        })
      }
    } catch (error) {
      logger.log('get messages error===', error)
    }
  }

  const restoreUser = async () => {
    try {
      const user = await AuthStorage.getUser()
      if (user) setUser(user)
    } catch (error) {
      logger.log('get Userr error===', error)
    }
  }

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    )

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <UnreadMsgsContext.Provider value={unreadMsgs}>
          <AppScreen>
            {/* {user && user.id && <AppHeader />} */}
            <NavigationContainer ref={navigationRef} theme={navigationTheme}>
              {user && user.id ? <AppNavigation /> : <AuthNavigation />}
            </NavigationContainer>
          </AppScreen>
        </UnreadMsgsContext.Provider>
      </AuthContext.Provider>
      <OffLineNotice />
    </>
  )
}
