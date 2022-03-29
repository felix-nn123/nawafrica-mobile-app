import http from "./httpService"

const URL='https://nawafrica.com'


export async function  getMapKey(){
  return http.get(`${URL}/map`)
 }