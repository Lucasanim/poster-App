import React, {useState} from 'react'
import { Text, Input, Button, Avatar } from 'react-native-elements'

import Icon from 'react-native-vector-icons/Ionicons'

import ImagePicker from 'react-native-image-crop-picker'

import {Login} from '../redux/Actions'

const AuthForm = ({action, signup}) => {

    const [email, setEmail] = useState('')

    const [fisrtName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')

    const [img, setImg] = useState('')

    const HandleChooseAPhoto = () => {
        ImagePicker.openPicker({
            cropping: true,
            mediaType:'photo'
          }).then(image => {
              setImg(image)
            console.log(image);
          });
    }

    return<>
        {
            signup
            ?<>
                <Avatar
                    icon={{ name:'person' }}
                    containerStyle={{backgroundColor:'gray'}}
                    rounded
                    size='xlarge'
                    source={img.path &&{uri:img.path}}
                />
                <Button type='outline' title='Choose a photo'
                    onPress={HandleChooseAPhoto}
                    buttonStyle={{margin:10}}
                />
            </>
            :null
        }
        <Input 
            placeholder='email@address.com'
            leftIcon={{ type: 'Ionicons', name: 'mail', color:'gray' }}
            autoCapitalize='none'
            autoCompleteType='off'
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        {
            signup
            ?<>
                <Input 
                    placeholder='First name'
                    leftIcon={{ type: 'Ionicons', name: 'person', color:'gray' }}
                    autoCapitalize='none'
                    value={fisrtName}
                    onChangeText={(text) => setFirstName(text)}
                />
                <Input 
                    placeholder='Last name'
                    leftIcon={{ type: 'Ionicons', name: 'person', color:'gray' }}
                    autoCapitalize='none'
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
            </>
            :null
        }
        <Input 
            placeholder='Password'
            leftIcon={{ type: 'Ionicons', name: 'lock', color:'gray' }}
            secureTextEntry={true}
            autoCapitalize='none'
            autoCorrect={false}
            autoCompleteType='off'
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
        <Button 
            title='Continue'
            icon={
                <Icon 
                    name='md-checkmark-circle-sharp'
                    size={30}
                    color='white'
                />
            }
            onPress={()=>{
                action(email, password, fisrtName, lastName, img)
            }}
        />
    </>
}

export default AuthForm