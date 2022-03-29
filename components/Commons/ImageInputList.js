import React, {useRef} from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import ImageInput from './ImageInput'

const ImageInputList = ({imageUris=[], onRemoveImage, onAddImage}) => {
const scrollView = useRef()

return (
<View>
<ScrollView style={styles.container} horizontal ref={scrollView} onContentSizeChange={()=>scrollView.current.scrollToEnd()}>
{imageUris.map(uri=>(
<View key={uri} style={styles.image}>
<ImageInput 
imageUri={uri} 
onChangeImage={()=>onRemoveImage(uri)}
/>
</View>
))}   
<ImageInput onChangeImage={(uri)=>onAddImage(uri)}/>                                           
</ScrollView>
</View>
)
}

const styles = StyleSheet.create({
 container:{
 flexDirection:"row"
 },
 image:{
marginRight:10
 }              
})

export default ImageInputList
