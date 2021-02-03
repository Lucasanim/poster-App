import axios from '../axios/Axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const TryLocalLogin = () => async (dispatch) => {

    const token = await AsyncStorage.getItem('token')

    if(token){
        dispatch({type:'LOGIN', payload:token})
        console.log('THERE IS TOKEN')
        return true
    } else{
        console.log('THERE IS NOT TOKEN')
        return false
    }
}

export const Login = (callback, email, password) => async (dispatch) =>{
    const response = await axios.post('/account/token/', {
        email,
        password
    })
    console.log(response.data)
    const token = response.data.token
    console.log(token)
    try {
        await AsyncStorage.setItem('token', token)
    } catch (error) {
        console.log(error)
    }
    if(token){
        dispatch({type:'LOGIN', payload:token})
    }
}

export const SignUp = (callback, email, password, first_name, last_name, username,image) => async (dispatch) => {

    console.log('img:', image)

    const createFormData = (image, body) => {
        const data = new FormData();
        
        data.append("avatar", {
            name: image.path,
            type: image.mime,
            uri: image.path
            // Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });

        data.append('email', body.email)
        data.append('username', body.username)
        data.append('password', body.password)
        data.append('first_name', body.first_name)
        data.append('last_name', body.last_name)

        return data;
    };

    const response = await axios.post('/account/create/', createFormData(image, {
                                                                        email,
                                                                        first_name,
                                                                        last_name,
                                                                        username,
                                                                        password
                                                                    })
    )
    
    if(callback) callback()
}

export const FetchPosts = () => async (dispatch) => {
    const response = await axios.get('/post/posts/')
    console.log(response.data)
    dispatch(FetchPostOwner())
    dispatch({type:'FETCH_POST', payload:response.data})

    

    dispatch(FetchMyPost())
    dispatch(FetchMyProfile())
    
}

export const FetchMyPost = () => async (dispatch) => {
    const response = await axios.get('/post/my-posts/')
    dispatch({type:'FETCH_MY_POSTS', payload:response.data})
}

export const FetchMyProfile = () => async (dispatch) => {
    const response = await axios.get('/account/me/')
    console.log('profile:', response.data)
    dispatch({type:'FETCH_MY_PROFILE', payload: response.data})
}

// export const eCreateNewPost = (title, description, image) => async (dispatch) => {
//     const response = await axios.post('/post/my-posts/', {title, description})

//     console.log('POST!:', response.data)

//     const id = response.data.id
//     const form = new FormData()
//     form.append(image)
//     console.log('form:', form)
//     let config = {
//         headers: {
//             'Content-Type': 'multipart/form-data; '
//         }
//       }
//     if(id){
//         const res = await axios.post(`/post/my-posts/${id}/upload-image/`, form, config)
//         console.log('RES:', res.data)
//     }
// }

export const CreateNewPost = (title, description, image, callback) => async (dispatch) => {

    // const response = await axios.post('/post/my-posts/', {title, description})

    // const id = response.data.id

    const createFormData = (image, body) => {
        const data = new FormData();
        
        data.append("image", {
            name: image.path,
            type: image.mime,
            uri: image.path
            // Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });

        data.append('title', body.title)
        data.append('description', body.description)

        return data;
    };
    // if(image){
    //     if(id){
    //         const res = await axios.post(`/post/my-posts/${id}/upload-image/`, createFormData(image) )
    //         console.log('RES:', res.data)
    //     }
    // }

    if(callback){
        callback()
    }

    const response = await axios.post('/post/my-posts/', createFormData(image, {title, description}))
    
}

export const deletePost = (id) => async (dispatch) => {
    const response = await axios.delete(`/post/my-posts/${id}/`)
    dispatch(FetchMyPost())
}

export const FetchPostOwner = () => async (dispatch) => {
    const response = await axios.get(`/account/owner/`)
    console.log('RESP:', response.status)   
    if(response.status==200){
        dispatch({type:'FETCH_POST_OWNER', payload:response.data})
    }

    return response.data
    
}

export const FetchUsersPosts = (id) => async () => {
    const response = await axios.get(`/post/users-posts/?id=${id}`)
    console.log('usersposts:', response.data)
    return response.data
}

export const handleSearch = (text) => async () => {
    const response = await axios.get(`/account/search/?qs=${text}`)
    console.log(response.data)
    return response.data
}

export const HandleFollow = (id) => async (dispatch, getState) => {
    const user_id = getState().my_profile.id
    if(id!==user_id){
        const response = await axios.patch(`/account/follow/${id}/`)
        if(response.status == 200){
            dispatch(FetchPosts)
        }
    }
}

export const HandleUnfollow = (id) => async (dispatch) => {
    const response = await axios.patch(`/account/unfollow/${id}/`)
    if(response.status == 200){
        dispatch(FetchPosts)
    }
}

export const LogOut = () => async (dispatch) => {
    
    try {
        await AsyncStorage.removeItem('token')
        await dispatch({type:'LOT_OUT'})
    } catch (error) {
        
    }
}

export const EditProfile = (email, password,first_name, last_name, username,image, callback) => async () => {
    console.log(first_name)
    const createFormData = (image, body) => {
        const data = new FormData();
        if(image) data.append("avatar", {
                    name: image.path,
                    type: image.mime,
                    uri: image.path
                    // Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
                }); 

        if(body.email) data.append('email', body.email)
        if(body.username) data.append('username', body.username)
        if(body.first_name) data.append('first_name', body.first_name)
        if(body.last_name) data.append('last_name', body.last_name)
        if(body.password) data.append('password', body.password)

        return data;
    };

    // const response = await axios.patch('/account/me/',{
    //                                                 'email':email,
    //                                                 'first_name': first_name,
    //                                                 'last_name': last_name
    //                                             })
    const response = await axios.patch('/account/me/', createFormData(image, {email, username,first_name, last_name, password}))

    if (callback) callback()
}

export const FetchThreads = () => async (dispatch) => {
    const response = await axios.get('/chat/threads/')
    dispatch({type:'FETCH_THREADS', payload:response.data})
    console.log('threads:', response.data)
    return response.data
}

export const CreateNewThread = (id, callback) => async () => {
    const response = await axios.post('/chat/threads/create/', {'id':id})
    if(callback) callback(response.data.id)
}
