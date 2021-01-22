import React from 'react'
import { 
    View,
} from 'react-native'

import { useDispatch } from 'react-redux'

import PostForm from '../components/PostForm'

import { CreateNewPost } from '../redux/Actions'

const CreatePostScreen = ({navigation}) => {

    const dispatch = useDispatch()

    return <View style={{backgroundColor:'white', flex:1}} >
        <PostForm 
            action={(title, description, image) => {
                dispatch(CreateNewPost(title, description, image, () => navigation.navigate('home')))
            }}
        /> 
    </View>
}

export default CreatePostScreen