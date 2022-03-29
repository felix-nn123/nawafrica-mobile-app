import React from 'react'
import { useFormikContext } from 'formik'

import AppPicker from './AppPicker'
import AppErrorMessage from './AppErrorMessage'

const AppFormPick = ({items, name, placeholder, icon}) => {

 const { setFieldValue, errors,touched, values } =useFormikContext()

return (
<>
<AppPicker
items={items}
onSelectItem={(item)=>setFieldValue(name, item.label)}
placeholder={placeholder}
selectedItem={items.filter(item=>item.label===values[name])[0]}
icon={icon}
/>
<AppErrorMessage error={errors[name]} visible={touched[name]}/>                                                  
</>
)
}

export default AppFormPick
