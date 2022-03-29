import http from './../services/httpService';

const registerToken=(pushToken)=>http.post('/expoPushToken', {token:pushToken})

export default registerToken
