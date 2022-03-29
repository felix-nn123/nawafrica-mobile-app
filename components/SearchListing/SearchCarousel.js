import React, { useState } from 'react'
import { View, Image, StyleSheet, ScrollView, Dimensions, Text, Button } from 'react-native'
import { Video } from 'expo-av';

import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';


const SearchCarousel = ({listing}) => {
const main_photo=listing.main_photo
const parlour_photo=listing.parlour_photo
const other_photo=listing.other_photos

const pictureArray=[{...main_photo}, {...parlour_photo}, ...other_photo]
const [active, setActive]=useState(0)
const video = React.useRef(null);
const [status, setStatus] = React.useState({});
const [image, setImage]=useState(pictureArray[0])
                 
const {width}=Dimensions.get("window")
const height=width* 0.5
                 
const change=({nativeEvent})=>{
const slide=Math.ceil(nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width)
if(slide!==active){
setActive(slide)             
}
}

const goToNextPic=()=>{
const theActive=active+1
if(theActive>pictureArray.length-1){
  setActive(pictureArray.length-1)
  setImage(pictureArray[pictureArray.length-1])
}else{
  setActive(theActive)
  setImage(pictureArray[theActive])
}
}

const goToPrevPic=()=>{
  const theActive=active-1
  if(theActive<0){
    setActive(0)
    setImage(pictureArray[0])
  }else{
    setActive(theActive)
    setImage(pictureArray[theActive])
  }
}

return (
<View style={{width:"100%", height:"100%"}}>
<MaterialIcons onPress={goToNextPic} style={styles.nextIcon} name="navigate-next" size={60}/>
<Ionicons onPress={goToPrevPic} style={styles.prevIcon} name="chevron-back-outline" size={50}/>
<ScrollView 
pagingEnabled 
onScroll={change}
showsHorizontalScrollIndicator={false}
horizontal 
style={{width:"100%", height:"100%"}}
>

<View style={{width:300, height:"100%"}}>
    {image.resource_type==='image'||image.path&&image.path.resource_type==='image'?
    <Image 
    key={image.path?image.path.url:image.url}
    style={{width, height, resizeMode:"cover"}} 
    source={{uri:image.path?image.path.url:image.url}}
    />
    :
    <>
    <Video
      ref={video}
      style={{width:"100%", height:"100%", marginLeft:25}}
      source={{
        uri:image.path?image.path.url:image.url,
      }}
      useNativeControls
      isLooping
      onPlaybackStatusUpdate={status => setStatus(() => status)}
    />
    <View style={styles.buttons}>
      <Button
        title={status.isPlaying ? 'Pause' : 'Play'}
        onPress={() =>
          status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
        }
      />
    </View>
  </> 
    }
    </View>  
    </ScrollView>
    <View style={{flexDirection:"row", position:"absolute", bottom:0, alignSelf:"center"}}>
     {pictureArray&&pictureArray.map((image, index)=>(
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
    nextIcon:{
      zIndex:5,
      position:"absolute",
      color:"white",
      right:1,
      marginTop:70
    },
    prevIcon:{
      zIndex:5,
      position:"absolute",
      color:"white",
      marginTop:70 
    }           
  })

export default SearchCarousel
