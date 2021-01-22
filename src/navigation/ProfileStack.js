import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ProfileScreen from '../screens/ProfileScreen'

const stack = createStackNavigator()

const ProfileStack = () => {
    return <stack.Navigator>
        <stack.Screen name='profile' component={ProfileScreen} 
            options={()=>({
                headerShown:true
            })}
        />
    </stack.Navigator>
}

export default ProfileStack