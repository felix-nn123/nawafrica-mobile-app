import http from './httpService'

const URL = 'https://nawafrica.com'

export function register(formData) {
  return http.post(`${URL}/register`, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function registerWithGoogle(data) {
  return http.post(`${URL}/register/google_signup`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function registerWithFacebook(data) {
  return http.post(`${URL}/register/facebook_signup`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

//function to get all registered users
export function registeredUsers() {
  return http.get(`${URL}/register`)
}

export function getUserById(id) {
  return http.get(`${URL}/register/${id}`)
}

export function updateNameAndContact(id, data) {
  return http.put(`${URL}/register/nameAndContact/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function updateAddress(id, data) {
  return http.put(`${URL}/register/address/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function updateDescription(id, data) {
  return http.put(`${URL}/register/description/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function deleteUser(id) {
  return http.delete(`${URL}/register/${id}`)
}

export function forgotYourPassword(data) {
  return http.post(`${URL}/register/forgotPassword`, data, {
    'Content-Type': 'application/json',
  })
}

export function changeMyPassword(id, body) {
  return http.put(`${URL}/register/new-password/${id}`, body, {
    'Content-Type': 'application/json',
  })
}

export function updateLandlordsPaymentMethod(id, body) {
  return http.put(`${URL}/register/landlord_payment/${id}`, body, {
    'Content-Type': 'application/json',
  })
}

export function getLandlordsPaymentMethod(id) {
  return http.get(`${URL}/register/landlord_payment/${id}`)
}
