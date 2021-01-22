import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import ResolveAuth from '../screens/ResolveAuthScreen'

const Stack = createStackNavigator()

const PublicAuthStack = () => {
    return <Stack.Navigator>
        {/* <Stack.Screen name='resolve' component={ResolveAuth} 
            options={() => ({
                headerShown:false
            })}
        /> */}
        <Stack.Screen name='login' component={Login} 
            options={() => ({
                headerShown:false
            })}
        />
        <Stack.Screen name='signup' component={SignUp} 
            options={() => ({
                headerShown:false
            })}
        />
    </Stack.Navigator>
}

export default PublicAuthStack