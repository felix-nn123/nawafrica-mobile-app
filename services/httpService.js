import axios from 'axios'
import logger from './loggerService'

axios.interceptors.response.use(null, (error) => {
  const expectError =
    error.response &&
    error.response.status === 404 &&
    error.response.status < 500
  if (!expectError) {
    logger.log(error)
  }
  return Promise.reject(error)
})

async function setJwt(jwt) {
  const token = await jwt
  if (token) axios.defaults.headers.common['x-auth-token'] = token
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  setJwt,
  delete: axios.delete,
}

export default http
