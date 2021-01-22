import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import Icon from 'react-native-vector-icons/Ionicons'

import ProfileStack from './ProfileStack'
import ProfileDrawer from './ProfileDrawerNav'
import UsersStack from './UsersStack'
import CreatePostScreen from '../screens/CreatePostScreen'
import SearchScreen from '../screens/SearchScreen'

const Tab = createMaterialBottomTabNavigator()

const PrivateBottomNav = () => {
    return <Tab.Navigator shifting={true}>
        <Tab.Screen name='home' component={UsersStack} 
            options={()=>({
                tabBarIcon:()=><Icon name='home-outline' size={25} />,
                title:'',
                tabBarColor:'white'
            })}
        />
        <Tab.Screen name='search' component={SearchScreen} 
            options={()=>({
                tabBarIcon:()=><Icon name='search-outline' size={25} />,
                title:'',
                tabBarColor:'white'
            })}
        />
        <Tab.Screen name='create' component={CreatePostScreen}
            options={()=>({
                tabBarIcon:()=><Icon name='add-circle-outline' size={25} />,
                title:'',
                tabBarColor:'white'
            })}
        />
        <Tab.Screen name='profile' component={ProfileDrawer}
            options={()=>({
                tabBarIcon:()=><Icon name='person-outline' size={25} />,
                title:'',
                tabBarColor:'white'
            })}
        />
    </Tab.Navigator>
}

export default PrivateBottomNav