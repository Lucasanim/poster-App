import React, {useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'
import { TryLocalLogin } from '../redux/Actions'

import PrivateBottomNav from './PrivateBottomNav'
import PublicAuthStack from './PublicAuthStack'

const Container = ({navigation}) => {

    const dispatch = useDispatch()

    const token = useSelector((state) => state.token)

    const [state, setState] = useState(false)

    const tryLogin = async() => {
        let test = await dispatch(TryLocalLogin())
        setState(test)
    }

    useEffect(()=>{
        tryLogin()
    },[token])
    return (
        <NavigationContainer>
            {
                state
                ?<PrivateBottomNav />
                :<PublicAuthStack />
            }
        </NavigationContainer>
    )
    
}

export default Container