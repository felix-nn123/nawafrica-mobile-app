import React from 'react'
import { StyleSheet, View} from 'react-native';
import { FlatList } from 'react-native';
import TableButton from './TableButton';
import AppText from '../Commons/AppText';

const MsgTable = ({messages, deleteItem, MessageDetails}) => {


const item =({item})=>{
 return (
  <View style={{flexDirection:"row", marginTop:2, width:"100%"}}>
     <View style={{width:"33%", backgroundColor:"#d3d3d3", justifyContent:"center", alignItems:"center", paddingTop:7, paddingBottom:7}}>
       <AppText onPress={()=>MessageDetails(item)} style={item.visited===true?{textAlign:"center", color:"#035aa6", fontSize:18}:{textAlign:"center", color:"black", fontSize:18}}>{item.sender_name}</AppText>
     </View> 
     <View style={{width:"33%", backgroundColor:"#d3d3d3", justifyContent:"center", alignItems:"center"}}>
       <AppText onPress={()=>MessageDetails(item)} style={item.visited===true?{textAlign:"center", color:"#035aa6", fontSize:18}:{textAlign:"center", color:"black", fontSize:18}}>{item.listing_name}</AppText>
     </View>  
     <View style={{width:"33%", backgroundColor:"#d3d3d3", justifyContent:"center", alignItems:"center"}}>
       <View style={{width:"70%"}}>
       <TableButton title='delete' onPress={()=>deleteItem(item)}/>
       </View>
     </View>             
  </View>                
 )                
}

return (
<View style={{flex:1, justifyContent:"center", alignItems:"center", marginTop:'10%'}}>
<View style={{flexDirection:"row"}}>
     <View style={{width:"33.5%", backgroundColor:"grey", padding:7}}>
       <AppText style={{textAlign:"center", fontWeight:"bold"}}>Sender</AppText>
     </View> 
     <View style={{width:"33%", backgroundColor:"grey", padding:7}}>
       <AppText style={{textAlign:"center", fontWeight:"bold"}}>Listing Name</AppText>
     </View>  
     <View style={{width:"33%", backgroundColor:"grey", padding:7}}>
       <AppText style={{textAlign:"center", fontWeight:"bold"}}>Action</AppText>
     </View>             
  </View>
<FlatList
data={messages}
keyExtractor={(item)=>`${item.id}`}
renderItem={item}
/>

</View>

)
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
head: { height: 40, backgroundColor: '#808B97' },
text: { margin: 6, fontSize:17 },
row: { flexDirection: 'row', backgroundColor: '#FFF1C1', padding:5 },
btn: { backgroundColor: 'red',  borderRadius: 10, padding:3},
btnText: { textAlign: 'center', color: '#fff', fontSize:17}
});

export default MsgTable
