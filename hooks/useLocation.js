import{useEffect, useState} from 'react'
import logger from '../services/loggerService';
import * as Location from 'expo-location'

const useLocation = () => {
const [location, setLocation]=useState({});

const getLocation=async ()=>{
try {
let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
setErrorMsg('Permission to access location was denied');
return;
}

const {coords:{latitude, longitude}}=await Location.getLastKnownPositionAsync();
setLocation({latitude, longitude})
                 
} catch (error) {
logger.log("location error", error);
}
}

useEffect(()=>{
getLocation()
}, [])

return location

}

export default useLocation
