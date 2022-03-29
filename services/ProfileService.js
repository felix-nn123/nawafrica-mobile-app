import http from "./httpService"

const URL='https://nawafrica.com'

export function  ProfileImages(id, formData){
const configs = {
    headers: {
      'Content-Type': 'application/json',
    },
  }               
return http.put(`${URL}/upload/${id}`, formData, configs)               
}