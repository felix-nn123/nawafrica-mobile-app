import http from "./httpService"

const URL='https://nawafrica.com'

export function postingToCloudinary(data){
return http.post(`${URL}/cloudinary`, data, {
'Content-Type':'application/json'
})
}

export function getCloudinarySignature(){
return http.get(`${URL}/cloudinarySignature`)
}