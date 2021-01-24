import React from 'react'
import {View} from 'react-native'
import { Text, Button} from 'react-native-elements'

import { useDispatch } from 'react-redux'

import AuthForm from '../components/AuthForm'

import { SignUp as signup } from '../redux/Actions'

const SignUp = ({navigation}) => {

    const dispatch = useDispatch()

    return <View style={{flex:1, backgroundColor:'white'}}>
        {/* <Text h1 style={{alignSelf:'center', flex:0.1, margin:40}} >REGISTER</Text> */}
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
            <AuthForm 
                action={(email, password, first_name, last_name, username,img)=>{
                    dispatch(signup(
                        ()=>navigation.navigate('login'),
                        email,
                        password,
                        first_name,
                        last_name,
                        username,
                        img
                    ))
                }}
                signup={true}
            />
            <Button 
                title="Already have an account?"
                type='clear'
                onPress={()=> navigation.navigate('login')}
            />
        </View>
    </View>
}

export default SignUp