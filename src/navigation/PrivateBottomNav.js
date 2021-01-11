import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import Home from '../screens/Home'

const Tab = createMaterialBottomTabNavigator()

const PrivateBottomNav = () => {
    return <Tab.Navigator>
        <Tab.Screen name='home' component={Home} />
    </Tab.Navigator>
}

export default PrivateBottomNav