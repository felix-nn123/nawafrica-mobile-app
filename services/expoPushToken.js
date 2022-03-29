import http from './httpService'

const URL = 'https://nawafrica.com'

export const registerPushToken = async (pushToken, id) => {
  console.log('my push token==', pushToken)
  await http.put(`${URL}/expoPushTokens/${id}`, { token: pushToken })
}

export default {
  registerPushToken,
}
