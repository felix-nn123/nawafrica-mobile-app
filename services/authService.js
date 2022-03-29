import http from "./httpService"
import jwtDecode from "jwt-decode"
import authtoken from '../utils/AuthStorage'

http.setJwt(getJwt())

const URL='https://nawafrica.com'

export async function  getJwt(){   
const token=await authtoken.getToken()   
if(token) return (token)            
}

export function loginWithJwt(jwt){
authtoken.storeToken(jwt)                        
}

export function login(data){
    return http.post(`${URL}/auth`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
    })    
    }


export function loginNowWithGoogle(data){
    return http.post(`${URL}/auth/loginWithGoogle`, data, {
        headers:{
            'Content-Type':'application/json',
        }
    })
}

export function loginNowWithFacebook(data){
    return http.post(`${URL}/auth/loginWithFacebook`, data, {
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export function logout(){
authtoken.removeToken() 
}
    
export function getCurrentUser(){
try {      
const jwt =authtoken.getToken();    
return  jwt&&jwtDecode(jwt)           
} catch (ex) {           
return null    
}   
}

const auth={
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
}

export default auth