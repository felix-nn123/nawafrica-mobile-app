import React, {useState} from 'react'
import { useFormikContext } from 'formik'

import AppCheckbox from './AppCheckbox'
import AppErrorMessage from './AppErrorMessage';

const AppFormCheckbox = ({title, name}) => {
const [checked, setChecked]=useState("")

const { setFieldValue, errors,touched} =useFormikContext()

const onPress=()=>{
  if(checked){
   setChecked("")
   setFieldValue(name, "")
  }else{
   setFieldValue(name, "agreed")
   setChecked("agreed")
  }              
}

return (
<>
 <AppCheckbox
 title={title}
 checked={checked}
 onPress={onPress}
 />  

 <AppErrorMessage error={errors[name]} visible={touched[name]}/>                                                
</>
)
}

export default AppFormCheckbox
