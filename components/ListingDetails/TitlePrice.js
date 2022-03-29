import React from 'react'
import { StyleSheet, View} from 'react-native'

import User from './../../iconComponent/User';

import AppText from '../Commons/AppText'
import Chat from './Chat';

const TitlePrice = ({verified=true,title, price, rentOrSell, numberOfUnreadMsgs}) => {
//function to add commas in money
function commaSeparateNumber(val){
const myVal=Array.from(`${val}`)          
if(myVal.includes(',')){
  return val
}else{
while (/(\d+)(\d{3})/.test(val.toString())){
  val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
}
return val;            
}
}

return (
<View style={styles.container}>
 <View style={styles.titleContainer}>
  <View style={styles.mainTitle}>
   {verified&&<User data-tip="Verified" height={30} width={30} fill="#035aa6"/>}  
   <AppText style={styles.title}>{title}</AppText>
  </View>
  <Chat
  numberOfUnreadMsgs={numberOfUnreadMsgs}
  />
 </View> 
 <View style={styles.priceContainer}>
   <AppText style={styles.price}>{commaSeparateNumber(price)} {rentOrSell==="Rental"?'/mo':''}</AppText>                
</View>                                              
</View>
)
}

const styles = StyleSheet.create({
  container:{
   width:"100%",
  },
  titleContainer:{
   padding:5,
   flexDirection:"row"             
  } ,
  mainTitle:{
  flexDirection:"row"
  },
  title:{
    marginLeft:5,
    fontWeight:"bold",
    fontSize:22,
    color: "#666362"            
  },
  priceContainer:{
   borderColor:"#ffa500",
   borderWidth:2,
   padding:5,
   width:"80%",
   marginLeft:5              
  },
  price:{
    fontWeight:"bold",
    fontSize:25,
    color: "#666362",
    textAlign:"center"             
  }      
})

export default TitlePrice
