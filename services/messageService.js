import http from "./httpService"

const URL='https://nawafrica.com'

export function getRecipentMessages(id){
return http.get(`${URL}/messages/${id}`)
}

export function deleteGivenMessageById(id){
return http.delete(`${URL}/messages/${id}`)
}

export function updateGivenMessageById(id){
return http.put(`${URL}/messages/${id}`)
}

export function getMessageById(id){
return http.get(`${URL}/messages/message/${id}`)
}

export function getAllMyUnreadMsgId(id){
return http.get(`${URL}/messages/unreadMsg/${id}`)
}

export function getRecipientUnreadMsgById(id){
 return http.get(`${URL}/messages/recipientUnreadMessages/${id}`)             
}
