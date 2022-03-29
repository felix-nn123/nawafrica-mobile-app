import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from '../services/loggerService';

import moment from 'moment';

const store=async (key, value)=>{
try {
const item={
   value,
   timeStamp:Date.now()           
}

await  AsyncStorage.setItem(key, JSON.stringify(item))               
} catch (error) {
  logger.log("caching error", error);               
}
}


const get =async (key)=>{
try {
const value=await AsyncStorage.getItem(key)    
const item=value  

if(!item) return null;

const now=moment(Date.now)
const storedTime=moment(item.timeStamp)
const isExpired=now.diff(storedTime, 'hours')>24;

if(isExpired){
await AsyncStorage.removeItem(key)
return null                 
}else{
return item.value
}
} catch (error) {
logger.log("error getting the catch==", error);               
}
}


export default {
store,
get
}