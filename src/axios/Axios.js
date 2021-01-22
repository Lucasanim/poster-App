import Axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useSelector } from 'react-redux'

const instance = Axios.create({
    baseURL:'http://192.168.100.107:8000'
})

instance.interceptors.request.use(

    async(config) => {

        const token = await AsyncStorage.getItem('token')
        console.log('axios_token:', token)
        if(token){
            config.headers.Authorization = `Token ${token}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default instance