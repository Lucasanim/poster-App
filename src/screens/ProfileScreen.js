import React, {useEffect} from 'react'
import {View} from 'react-native'
import {Header} from 'react-native-elements'

import { useDispatch, useSelector } from 'react-redux'

import { deletePost, FetchMyPost, FetchMyProfile } from '../redux/Actions'

import ProfileComponent from '../components/ProfileComponent'

const ProfileScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const my_posts = useSelector((state) => state.my_posts)
    const my_profile = useSelector((state) => state.my_profile)

    const fetch = () => {
        dispatch(FetchMyPost())
        dispatch(FetchMyProfile())
    }

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            fetch()
          });
      
          return unsubscribe;
    },[navigation])
    return <View>
        <Header 
            centerComponent={{text:'My profile', style:{color:'#fff', fontSize:17}}}
        />
        <ProfileComponent 
            posts={my_posts}
            profile={my_profile}
            del={(id)=>{
                dispatch(deletePost(id))
            }}
            isMine={true}
            nav={navigation}
        />
    </View>
}

export default ProfileScreen