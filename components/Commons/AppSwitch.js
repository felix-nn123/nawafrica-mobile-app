import React from 'react'
import { Switch, View } from 'react-native'

const AppSwitch = ({value=false, onValueChange}) => {
return (
<Switch value={value} onValueChange={onValueChange}/>
)
}

export default AppSwitch
