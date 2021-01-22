import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OtherProfileScreen from '../screens/OtherProfileScreen'
import Home from '../screens/Home'

const Stack = createStackNavigator()

const UsersStack = () => {
    return <Stack.Navigator>
        <Stack.Screen name='posts-list' component={Home} 
            options={()=>({
                headerShown:false
            })}
        />
        <Stack.Screen name='user' component={OtherProfileScreen}
            options={()=>({
                headerShown:false
            })}
        />
    </Stack.Navigator>
}

export default UsersStack
