import React from 'react'
import {View} from 'react-native'
import {Text} from 'react-native-elements'

import AuthForm from '../components/AuthForm'

const EditProfileScreen = () => {
    return <View style={{backgroundColor:'white', flex:1}} >
        <Text h4>
            Edit your profile
        </Text>
        <AuthForm 
            signup={true}
        />
    </View>
}

export default EditProfileScreen