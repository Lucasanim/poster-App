import React from 'react'
import {View} from 'react-native'
import { Input, Text, Button } from 'react-native-elements'

import {useDispatch} from 'react-redux'

import AuthForm from '../components/AuthForm'

import { Login as login } from '../redux/Actions'

const Login = ({navigation}) => {

    const dispatch = useDispatch()

    return <View style={{flex:1, backgroundColor:'white'}}>
        <Text h1 style={{alignSelf:'center', flex:0.1, margin:40}} >LOGIN</Text>
        <View style={{flex:0.5, justifyContent:'center', alignItems:'center'}} >
            <AuthForm 
                action={(email, password)=>{
                    dispatch(login(
                        console.log('LOGIN'),
                        email,
                        password
                    ))
                }
                }
            />
            <Button 
                title="You don't have an account yet?"
                type='clear'
                onPress={()=> navigation.navigate('signup')}
            />
        </View>
    </View>
}

export default Login