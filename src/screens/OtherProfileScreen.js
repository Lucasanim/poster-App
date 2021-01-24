import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import { Header } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'

import { deletePost, FetchUsersPosts, FetchPostOwner } from '../redux/Actions'

import ProfileComponent from '../components/ProfileComponent'

const OtherProfileScreen = ({navigation, route}) => {
    
    const user = route.params.user

    const dispatch = useDispatch()

    const [posts, setPosts] = useState('')

    const follows = useSelector((state) => state.posts_owners)

    const fetch = async () => {
        let res = await dispatch(FetchUsersPosts(user.id))
        console.log(res)
        setPosts(res)
    }

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            fetch()
          });
      
          return unsubscribe;
    },[navigation])
    return <View style={{backgroundColor:'white', flex:1}} >
        <Header 
            leftComponent={{ icon:'arrow-back', color:'#fff', onPress:()=>navigation.goBack() }}
            centerComponent={{ text:user.username, style:{color:'#fff', fontSize:17} }}
        />
        <ProfileComponent 
            posts={posts}
            profile={user}
            del={(id)=>{
                dispatch(deletePost(id))
            }}
            fs={follows}
        />
    </View>
}

export default OtherProfileScreen