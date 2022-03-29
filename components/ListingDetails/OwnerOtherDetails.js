import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';


import AppText from '../Commons/AppText'


const OwnerOtherDetails = ({image, user, timeListed, numOfAppl, numOfLikes, liked, handleLike}) => {
return (
<>
<View style={styles.container}>

<View style={styles.listedByContainer}>
<AppText style={styles.listedTitle}>Listed By</AppText>  
<View style={styles.pictureContainer}>
{image?<Image style={styles.image} source={image}/>:
<AntDesign name='user' size={35}/>
}         
</View>
<AppText style={styles.name}>{user}</AppText>              
</View>


<View style={styles.listedSince}>
<AppText style={styles.listedTitle}>Listed Since</AppText>
<AppText style={styles.name}>{timeListed}</AppText>
</View>

<View style={styles.applRecieved}>
<AppText style={styles.listedTitle}>Appl. recieved</AppText>
<AppText style={styles.name}>{numOfAppl}</AppText>
</View>
                                                  
</View>
<View style={styles.separation}>
<View style={styles.likersContainer}>
<View style={styles.likerses}>
  <AppText style={styles.name}>Likes</AppText>
  {!liked&&<AppText style={styles.heart}><AntDesign onPress={handleLike} name='hearto' color="red" size={35}/></AppText>}  
  {liked&&<AppText style={styles.heart}><AntDesign onPress={handleLike} name='heart' color="red" size={35}/></AppText>}
  <AppText style={styles.nameNumber}>{numOfLikes}</AppText>         
</View>
</View>
</View>

</>
)
}

const styles = StyleSheet.create({
container:{
padding:7, 
borderWidth:1,
borderColor:"#666362",
marginLeft:5,
marginRight:5,
marginTop:5,
borderRadius:5,
flexDirection:"row"                 
 },
 listedTitle:{
 color:"#666362",
 fontSize:14,
 marginBottom:7                
 },
 listedByContainer:{
  marginLeft:10,
  alignItems:"center",
  width:'30%'
 },
 pictureContainer:{
 height:70,
 width:70,
 borderColor:'#666362',
 borderWidth:1,
 borderRadius:70,
 overflow:'hidden',
 justifyContent:"center",
 alignItems:'center'           
 },
 image:{
 width:"100%",
 height:"100%",                 
 },
 name:{
  color:'#666362',
  fontSize:16,
  fontWeight:"bold"               
 },
listedSince:{
marginLeft:'7%',
alignItems:"center",
height:70,
marginTop:20,
width:'30%'              
 },
 applRecieved:{
alignItems:"center",
height:70,
marginTop:20,
width:'30%'                 
 },
 likersContainer:{
  width:"100%",
  padding:7,
  borderWidth:1,
  borderColor:"#666362",
  justifyContent:"center",
  alignItems:"center"              
 },
 separation:{
  padding:5,
  borderRadius:50                
 },
 likerses:{
  width:200,
  padding:1,
 flexDirection:"row",
 alignItems:"center",
 justifyContent:"center"             
 },
 heart:{
 marginLeft:10                 
 },
 nameNumber:{
color:'#666362',
fontSize:16,
fontWeight:"bold",
marginLeft:10                
 }             
})

export default OwnerOtherDetails
