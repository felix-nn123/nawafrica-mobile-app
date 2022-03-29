import React from 'react'
import { StyleSheet } from 'react-native'

import AppText from '../Commons/AppText'

const Titles = ({title="Listing Info"}) => <AppText style={styles.heading}>{title}</AppText>

const styles = StyleSheet.create({
heading:{
textAlign:"center",
fontWeight:"bold",
fontStyle:"italic",
color:"#035aa6",
marginVertical:10
}                 
})
export default Titles
