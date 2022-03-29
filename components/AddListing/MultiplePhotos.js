import React, {useRef} from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import AppText from '../Commons/AppText'
import ImageAndVideoPicker from '../Commons/ImageAndVideoPicker'


const MultiplePhotos = ({imageUris=[], onRemoveImage, onAddImage, loadingImage, error}) => {
const scrollView = useRef()

return (
<>
<AppText style={styles.title}>Upload Multiple Photos And Short Videos*</AppText> 
<View>
{error&&<AppText style={styles.errorText}>{error}</AppText>}
<ScrollView style={styles.container} horizontal ref={scrollView} onContentSizeChange={()=>scrollView.current.scrollToEnd()}>
{imageUris.map(uri=>(
<View key={uri.url} style={styles.image}>
<ImageAndVideoPicker
imageUri={uri.url} 
onChangeImage={()=>onRemoveImage(uri)}
theImage={uri}
/>
</View>
))}   
<ImageAndVideoPicker loadingImage={loadingImage} onChangeImage={(uri)=>onAddImage(uri)}/>                                           
</ScrollView>
</View>                                                 
</>
)
}

const styles = StyleSheet.create({
container:{
flexDirection:"row"
},
image:{
marginRight:10
 },
 title:{
  textAlign:"center"                
 },
 errorText:{
  fontSize:12,
  color:"red"                
 }              
})
                

export default MultiplePhotos
