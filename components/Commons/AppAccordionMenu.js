import React from 'react'
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const AppAccordionMenu = ({SECTIONS, activeSections, onSetActiveSections}) => {

const renderHeader = (section, isActive) => (
<Animatable.View
 duration={300}
 transition="backgroundColor"
 style={{backgroundColor: isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)'}}
 >
   <View style={styles.innerTextContainer}>
  <Text style={styles.header}>
    {section.title} 
  </Text>
  <MaterialCommunityIcons size={22} color="grey" name="chevron-down" style={styles.icon}/>   
  </View>
</Animatable.View>
);

const renderContent = (section, isActive) => (
<Animatable.View 
duration={300}
transition="backgroundColor"
style={{ backgroundColor: isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)'}}
>
  <Animatable.Text
  duration={300}
  easing="ease-out"
  animation={isActive ? 'zoomIn' : false}
  >{section.content}
  </Animatable.Text>
</Animatable.View>
);

const  updateSections = (activeSections) => {
  onSetActiveSections(activeSections)
};
                 
return (
<Accordion
  sections={SECTIONS}
  activeSections={activeSections}
  renderHeader={renderHeader}
  renderContent={renderContent}
  onChange={updateSections}
/>
)
}
const styles = StyleSheet.create({
  header:{
    color:"black",
    fontWeight:"bold",
    fontSize:20,
    padding:5,
  },
  innerTextContainer:{
    width:"100%",
    backgroundColor:"#ffa500",
    marginTop:0.5
  },
  icon:{
    position:"absolute",
    right:5
  }
})

export default AppAccordionMenu
