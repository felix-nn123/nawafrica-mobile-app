import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

import logger from '../services/loggerService';

const key='token'

const storeToken=async authToken=>{
try {
await SecureStore.setItemAsync(key, authToken);             
} catch (error) {
 logger.log("my store token", error);                
}
}


const getToken=async ()=>{
try {
  const token= await SecureStore.getItemAsync(key)    
  return token           
} catch (error) {
logger.log("Error getting Token", error);              
}
}


const removeToken=async ()=>{
try {
await SecureStore.deleteItemAsync(key)               
} catch (error) {
 logger.log("Delete Auth Token", error);                
}               
}


const getUser=async ()=>{
 const token=await getToken()            
 if(token) return jwtDecode(token)  
 return null  
}



export default {
 storeToken,
 getToken,
 removeToken,
 getUser             
}
