import React from 'react'
import {View} from 'react-native'
import {Text, Header} from 'react-native-elements'

import { useSelector, useDispatch } from 'react-redux'

import AuthForm from '../components/AuthForm'

import { EditProfile } from '../redux/Actions'

const EditProfileScreen = ({navigation}) => {

    const dispatch = useDispatch()

    const profile = useSelector((state)=>state.my_profile)

    return <View style={{backgroundColor:'white', flex:1, alignItems:'center'}} >
        <Header 
            leftComponent={{icon:'arrow-back',color:'#fff' ,onPress:()=>navigation.navigate('profilestack')}}
            centerComponent={{text:'Edit your profile', style:{color:'#fff', fontSize:17}}}
        />
        <AuthForm 
            signup={true}
            image={profile.avatar}
            action={(email, password, first_name, last_name, username,image)=>{
                dispatch(EditProfile(email, password,first_name, last_name, username,image, ()=> navigation.navigate('profilestack')))
            }}
        />
    </View>
}

export default EditProfileScreen