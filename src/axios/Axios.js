import axios from 'axios'
import Axios from 'axios'

export default Axios.create({
    baseURL:'http://192.168.100.107:8000',
    headers:{
        'Authorization':'Token 473f9ef5bdd39c33c51d7d16ce1ee54786cb1f21'
    }
})