import React from 'react'
import { useFormikContext } from 'formik';

import ImageInputList from './ImageInputList'
import AppErrorMessage from './AppErrorMessage';

const FormImagePicker = ({name}) => {
const { setFieldValue, errors,touched, values } =useFormikContext()

const handleAdd=(uri)=>{
setFieldValue(name,[...values[name], uri])
}

handRemove=(uri)=>{
setFieldValue(name, values[name].filter(url=>url!==uri))              
}

return (
<>
<ImageInputList imageUris={values[name]}
onAddImage={handleAdd}
onRemoveImage={handRemove}
/>
<AppErrorMessage error={errors[name]} visible={touched[name]}/>                                                   
</>
)
}


export default FormImagePicker
