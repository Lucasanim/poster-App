import React, {useEffect} from 'react'
import {View} from 'react-native'
import {Text, Header} from 'react-native-elements'

import { useDispatch, useSelector } from 'react-redux'

import { FetchPosts, FetchPostOwner } from '../redux/Actions'

import PostComponent from '../components/PostComponent'

const Home = ({navigation}) => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)
    // console.log('POSTS:', posts)

    const posts_owners = useSelector((state) => state.posts_owners)

    // console.log('owners:', posts_owners)

    const fetchPosts = async() => {
        dispatch(FetchPostOwner())
        dispatch(FetchPosts())
    }

    useEffect(()=>{
        fetchPosts()
        const unsubscribe = navigation.addListener('focus', () => {
            fetchPosts()
          });
          return unsubscribe;
    },[navigation])

    return <View style={{backgroundColor:'white', flex:1}} >
        <Header 
            centerComponent={{ text:'POSTER', style:{color:'#fff', fontSize:17} }}
        />
        <PostComponent 
            post={posts}
            owners={posts_owners}
            nav={(user)=>navigation.navigate('user', {user})}
        />
    </View>
    
}

export default Home