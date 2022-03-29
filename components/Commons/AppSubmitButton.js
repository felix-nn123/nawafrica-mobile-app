import React from 'react'
import { StyleSheet } from 'react-native';
import AppButton from './AppButton';
import { useFormikContext } from 'formik';

const AppSubmitButton = ({title}) => {
const {handleSubmit}=useFormikContext()
return (
<>
  <AppButton style={styles.button} title={title} onPress={handleSubmit}/>                                                 
</>
)
}

const styles = StyleSheet.create({
  button:{
    marginVertical:20

  }
})

export default AppSubmitButton
