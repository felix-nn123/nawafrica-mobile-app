import React from "react";

///we use the navigationRef in our AppNavigation to recieve push notificaion
const navigationRef=React.createRef()

const navigate=(name, params)=>navigationRef.current?.navigate(name, params)                

export default {
navigate
}