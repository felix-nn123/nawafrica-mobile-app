import React from 'react'
import { StyleSheet, View } from 'react-native'

import AppText from '../Commons/AppText'

const LeaseType = ({fixedLeased, sold_agreement,renewFixedLease, continueFixedLeaseMonthToMonth, mustVacateFixedLease, monthToMonthAgree}) => {
return (
<View style={styles.container}>
  <AppText style={styles.title}>Lease Type :</AppText> 
  {fixedLeased!==""&&<AppText style={styles.leaseType}>{fixedLeased}</AppText>} 
  {renewFixedLease!==""&&<AppText style={styles.continue}>{renewFixedLease}</AppText>}
  {continueFixedLeaseMonthToMonth!==""&&<AppText style={styles.continue}>{continueFixedLeaseMonthToMonth}</AppText>}
  {mustVacateFixedLease!==""&&<AppText style={styles.continue}>{mustVacateFixedLease}</AppText>}   

  {monthToMonthAgree!==""&&<AppText style={styles.leaseType}>{monthToMonthAgree}</AppText>}       
  {sold_agreement!==""&&<AppText style={styles.leaseType}>{sold_agreement}</AppText>}     
</View>
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
borderRadius:5                  
},
title:{
fontSize:22,
fontWeight:"bold",
color: "#666362" 
},
leaseType:{
color: "#666362",
marginLeft:10,
fontSize:17                 
},
continue:{
color: "#666362",
marginLeft:50,
fontSize:17               
}           
})

export default LeaseType
