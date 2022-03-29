import React, {useRef} from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import ReplyImageInput from './ReplyImageInput'
import Load from '../Commons/Load'

const ReplyImageInputList = ({imageUris=[], onRemoveImage, onAddImage, loadOtherPhoto}) => {
const scrollView = useRef()

return (
<View>
<ScrollView style={styles.container} horizontal ref={scrollView} onContentSizeChange={()=>scrollView.current.scrollToEnd()}>
{imageUris.map(uri=>(
<View key={uri.url} style={styles.image}>
<ReplyImageInput 
imageUri={uri.url} 
onChangeImage={()=>onRemoveImage(uri)}
/>
</View>
))}  

<Load visible={loadOtherPhoto}/>   
<ReplyImageInput onChangeImage={(uri)=>onAddImage(uri)}/>                                        
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

export default ReplyImageInputList
