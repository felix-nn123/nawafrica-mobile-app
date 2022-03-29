import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import * as yup from 'yup';
import jwtDecode from "jwt-decode"

import AppForm from '../components/Commons/AppForm'
import AppFormField from '../components/Commons/AppFormField';
import AppSubmitButton from '../components/Commons/AppSubmitButton';
import AppActivityIndicator from '../components/Commons/AppActivityIndicator';
import AppErrorMessage from './../components/Commons/AppErrorMessage';

import { login, loginWithJwt } from '../services/authService';
import useAuth from '../hooks/useAuth';


const validationSchema=yup.object().shape({
email:yup.string().email().min(1).required().label("Email"),
password:yup.string().min(4).required().label("Password")
})

const LoginScreen = () => {
const [loading, setLoading]=useState(false)
const {setUser}=useAuth()
const [error, setError]=useState(false)

const handleSubmit=async (data)=>{
try {
setLoading(true)
const {data:jwt}= await login({...data})
loginWithJwt(jwt)
const user=jwtDecode(jwt) 
setUser(user)
setLoading(false)   
} catch (ex) {
if(ex.response&&ex.response.status===400){
setError(true);
setLoading(false)
}  
}
}

return (
<>
{loading&&<AppActivityIndicator/>}
<AppErrorMessage error={error?"Invalid Email Or password":""} visible={error}/>
<View style={styles.container}>
<Image style={styles.image} source={require('../assets/logo.png')}/>
<AppForm
initialValues={{email:"", password:""}}
onSubmit={handleSubmit}
validationSchema={validationSchema}
>
<AppFormField
autoCapitalize="none"
autoCorrect={false}
icon="email"
keyboardType="email-address"
placeholder="Email"
textContentType="emailAddress"
name="email"
/>
<AppFormField
autoCapitalize="none"
autoCorrect={false}
icon="lock"
placeholder="Password"
textContentType="password"
secureTextEntry
name="password"
/>

<AppSubmitButton title="Login"/>
</AppForm>
</View>
</>
)
}


const styles = StyleSheet.create({
image:{
width:80,
height:80,
marginVertical:20,
marginTop:70,
marginLeft:"40%"
},
container:{
flex:1,
padding:10
},
error:{
color:"red"
}
})

export default LoginScreen
