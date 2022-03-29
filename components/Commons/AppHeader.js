import React from 'react'
import { View, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import useAuth from '../../hooks/useAuth'
import AppText from './AppText'

const AppHeader = () => {
  const { user } = useAuth()
  return (
    <View
      style={{
        width: '100%',
        height: 40,
        backgroundColor: '#666362',
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          flex: 3,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 5,
        }}
      >
        {user.picture &&
        user.picture.fileProfile &&
        user.picture.fileProfile.url ? (
          <Image
            style={{ height: 30, width: 30, borderRadius: 15 }}
            source={{ uri: user.picture.fileProfile.url }}
          />
        ) : (
          <AntDesign color='white' size={30} name='user' />
        )}

        <AppText
          style={{
            marginLeft: 5,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          {user.first_name}
        </AppText>
      </View>
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={require('../../assets/logo.png')}
        />
      </View>
    </View>
  )
}

export default AppHeader
