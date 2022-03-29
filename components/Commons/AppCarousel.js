import React, { useState } from 'react'
import { View, Image, StyleSheet, ScrollView, Dimensions, Text} from 'react-native'
import { Video} from 'expo-av';
import { MaterialCommunityIcons} from '@expo/vector-icons';
                 
const AppCarousel = ({images}) => {
const [active, setActive]=useState(0)
const video = React.useRef(null);
const [status, setStatus] = React.useState({});

const {width}=Dimensions.get("window")
const height=width* 1.5

const change=({nativeEvent})=>{
const slide=Math.ceil(nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width)
if(slide!==active){
    setActive(slide)             
}
}
                 
return (
<View style={{width, height}}>
<ScrollView 
pagingEnabled 
onScroll={change}
showsHorizontalScrollIndicator={false}
horizontal 
style={{width, height}}
>
  {images&&images.map(image=>(
    <View style={styles.theContainer} key={image.path?image.path.url:image.url}>
    {image.resource_type==='image'||image.path&&image.path.resource_type==='image'?
    <Image 
    key={image.id}
    style={{width, height, resizeMode:"cover"}} 
    source={{uri:image.path?image.path.url:image.url}}
    />
    :
    <View style={styles.container}>
    <Video
      ref={video}
      style={{width, height, resizeMode:"cover"}}
      source={{
        uri:image.path?image.path.url:image.url,
      }}
      useNativeControls
      resizeMode="contain"
      isLooping
      onPlaybackStatusUpdate={status => setStatus(() => status)}
    />

    {/* {!status.isPlaying&&<AntDesign size={50} style={styles.playAndPauseIcon} name='play' onPress={()=>video.current.playAsync()}/>}
    {status.isPlaying&&<AntDesign size={50} style={styles.playAndPauseIcon} name='pausecircle' onPress={()=>video.current.pauseAsync()}/>} */}

  </View> 
    }
    </View>  
    
    
    ))}
    </ScrollView>
    <View style={{flexDirection:"row", position:"absolute", bottom:0, alignSelf:"center"}}>
     {images&&images.map((image, index)=>(
   <Text key={image.path?image.path.url:image.url}><MaterialCommunityIcons style={index===active?styles.active:styles.inactive} name="home"/></Text>

     ))}

    </View>

</View>
)
}

const styles = StyleSheet.create({
  Image:{width:"100%",height:400,resizeMode:"contain"},
  active:{
color:"#fff",
fontSize:18
  },
  inactive:{
  color:"#888",
  fontSize:18      
  },
  playAndPauseIcon:{
    position:"absolute",
    zIndex:1,
    marginTop:110,
    marginLeft:10,
    color:'rgba(0, 0, 0, 0.6)'
   },
   theContainer:{
     justifyContent:"center",
     alignItems:"center",
   }           
})

export default AppCarousel
