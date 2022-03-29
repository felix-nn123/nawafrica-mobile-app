import React from 'react'
import { useFormikContext } from 'formik'

import AppErrorMessage from './AppErrorMessage'
import AppTextInput from './AppTextInput'

const AppFormField = ({name, ant, ...otherProps}) => {
                 
const {setFieldTouched, handleChange, errors,touched,values } =useFormikContext()

return (
<>
<AppTextInput
{...otherProps}
onBlur={()=>setFieldTouched(name)}
onChange={handleChange(name)}
values={values[name]}
ant={ant}
/>

<AppErrorMessage error={errors[name]} visible={touched[name]}/>
                                                   
</>
)
}

export default AppFormField
