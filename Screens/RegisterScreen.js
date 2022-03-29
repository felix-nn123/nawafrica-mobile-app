import React, { useState } from 'react'
import { Image, StyleSheet, ScrollView} from 'react-native'
import * as yup from 'yup';

import AppForm from '../components/Commons/AppForm'
import AppFormField from '../components/Commons/AppFormField';
import AppSubmitButton from '../components/Commons/AppSubmitButton';
import AppFormPick from '../components/Commons/AppFormPick';
import AppFormCheckbox from '../components/Commons/AppFormCheckbox';
import AppText from '../components/Commons/AppText';

import { register } from '../services/registerService';
import auth from '../services/authService';


const validationSchema=yup.object().shape({
first_name:yup.string().min(1).required().label("First Name"),
last_name:yup.string().min(1).required().label("Last Name"),
middle_name:yup.string().label("Middle Name"),
email:yup.string().email().min(1).required().label("Email"),
password:yup.string().min(4).required().label("Password"),
confirm_password:yup.string().min(4).required().label("Password"),
post_rent_property:yup.string().required().label("Your Role"),
policies:yup.string().required().label("Policy")
})
               

const RegisterScreen = () => {
const [loading, setLoading]=useState(false)
const [error, setError]=useState("")
const {setUser}=useAuth()
const items= [{label:'I AM A PROPERTY OWNER', value:1}, {label:'LOOKING TO BUY/RENT PROPERTY', value:2}]
               
const handleSubmit=async (data)=>{
try {
let theData={...data}
if(theData.password!==theData.confirm_password){
setError("The confirm password is different from password")
}else{
delete theData.confirm_password
setError("")
setLoading(true)
const response=await register(theData)
auth.loginWithJwt(response.headers["x-auth-token"])
setUser(response.data)
setLoading(false)
}
                    
} catch (ex) {
if(ex.response&&ex.response.status===400){
setError(ex.response.data);
setLoading(false)
}  
}
}


// policies

return (
<ScrollView style={styles.container}>
<Image style={styles.image} source={require('../assets/logo.png')}/>
<AppForm
 initialValues={{email:"", password:""}}
 onSubmit={handleSubmit}
 validationSchema={validationSchema}
>
<AppFormField
 autoCorrect={false}
 icon="user"
 placeholder="First Name *"
 name="first_name"
 ant={true}
/>
<AppFormField
 autoCorrect={false}
 icon="user"
 placeholder="Middle Name"
 name="middle_name"
 ant={true}
/>

<AppFormField
 autoCorrect={false}
 icon="user"
 placeholder="Last Name *"
 name="last_name"
 ant={true}
/>

<AppFormField
 autoCapitalize="none"
 autoCorrect={false}
 icon="email"
 placeholder="Email *"
 keyboardType="email-address"
 textContentType="emailAddress"
 name="email"
/>
<AppFormField
 autoCapitalize="none"
 autoCorrect={false}
 icon="lock"
 placeholder="Password *"
 textContentType="password"
 secureTextEntry
 name="password"
/>
<AppFormField
 autoCapitalize="none"
 autoCorrect={false}
 icon="lock"
 placeholder="Confirm Password *"
 textContentType="password"
 secureTextEntry
 name="confirm_password"
/>

<AppFormPick
  items={items} 
  name="post_rent_property"
  placeholder="Your Role"
  icon="apps"
/>

<AppFormCheckbox
title="I agree to the TERMS AND CONDITIONS of nawafrica"
name="policies"
/>

<AppSubmitButton title="Register"/>
</AppForm>

<AppText style={styles.error}>{error}</AppText>

</ScrollView>
)
}

const styles = StyleSheet.create({
image:{
width:50,
height:50,
marginVertical:10,
marginTop:0,
marginLeft:"42%"
},
container:{
  flex:1,
  padding:10
},
error:{
  color:"red",
  fontSize:14,
  marginVertical:20,
  textAlign:"center"
}           
})

export default RegisterScreen
