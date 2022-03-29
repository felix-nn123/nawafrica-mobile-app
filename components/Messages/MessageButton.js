import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const MessageButton = ({
  onPress,
  title = 'Login',
  backgroundColor = '#035aa6',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonInnerContainer,
        { backgroundColor: backgroundColor },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>
        <MaterialCommunityIcons
          name='message-bulleted'
          size={24}
          color='white'
        />
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonInnerContainer: {
    backgroundColor: '#035aa6',
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'San Francisco',
    fontWeight: 'bold',
  },
})

export default MessageButton
