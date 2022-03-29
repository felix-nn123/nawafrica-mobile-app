import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import AppText from '../Commons/AppText'

const SenderDate = ({message}) => {

function capitalize(s){
return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};
                 
const myUrl=message.sender_image&&message.sender_image.length>200?JSON.parse(message.sender_image):message.sender_image
return (
<>
<View style={styles.imageNameContainer}>
<View style={styles.picImage}>
{message.sender_image&&message.sender_image.length>200?
<Image style={styles.Image} source={{uri:`${myUrl.url}`}}/>
:message.sender_image&&message.sender_image.length<200?
<Image style={styles.Image} source={{uri:myUrl.url}}/>
:
<View style={styles.noImageListingDetCon} className="noImageListingDetCon">
<AntDesign name='user' size={35} />
</View>
}

</View>

<View style={styles.nameCite}>
<AppText style={styles.nameText}>{capitalize(message.sender_name)} @ {capitalize(message.listing_name)}</AppText>
</View>


</View>

<View style={styles.dates}>
<AppText style={styles.dateText}>Date Sent: {message.create_date}</AppText>
</View>
</>
)
}

const styles = StyleSheet.create({
imageNameContainer:{
width:"100%",
flexDirection:"row",
marginTop:10,  
alignItems:"center",
backgroundColor:"white",
paddingLeft:5,
paddingTop:5,
paddingBottom:5,
borderRadius:5              
}, 
picImage:{
width:70,
height:70,
borderRadius:70,
backgroundColor:"#d3d3d3",
overflow:"hidden"                
}, 
nameCite:{
marginLeft:7,
color:"#035aa6"                
},
nameText:{
color:"#035aa6"                 
},
Image:{
width:"100%",
height:"100%"
},
dates:{
width:"100%",
height:30,
justifyContent:"center",
alignItems:"center",
marginTop:10,
backgroundColor:"white",
borderRadius:5
},
dateText:{
fontSize:15               
}               
})

export default SenderDate
