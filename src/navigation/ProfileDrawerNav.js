import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import ProfileStack from './ProfileStack'
import EditProfileScreen from '../screens/EditProfileScreen';
import LogOutScreen from '../screens/LogOutScreen';

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="profilestack" component={ProfileStack} 
        options={()=>({
          title:'Profile'
        })}
      />
      
      <Drawer.Screen name="editprofile" component={EditProfileScreen} 
        options={()=>({
          title:'Edit my profile'
        })}
      />
      
      <Drawer.Screen name="logout" component={LogOutScreen} 
        options={()=>({
          title:'Log out'
        })}
      />
      
    </Drawer.Navigator>
  );
}

export default MyDrawer