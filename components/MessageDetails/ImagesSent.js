import React, {useRef} from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import MessageImages from './MessageImages';

const ImagesSent = ({message, onDownload, showLargeImage}) => {
const scrollView = useRef()
  
return (
<ScrollView style={styles.container}  horizontal ref={scrollView} onContentSizeChange={()=>scrollView.current.scrollToEnd()}>
{message.images&&message.images.map(img=>(
<React.Fragment key={img.public_id}>
<MessageImages
img={img}
onDownload={onDownload}
showLargeImage={showLargeImage}
/>
</React.Fragment>
))}   
</ScrollView>
)
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row"
  }                
})

export default ImagesSent
