import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import PrivateBottomNav from './PrivateBottomNav'
import PublicAuthStack from './PublicAuthStack'

const Container = () => {
    return (
        <NavigationContainer>
            {/* Here verify */}
            <PublicAuthStack />
        </NavigationContainer>
    )
    
}

export default Container