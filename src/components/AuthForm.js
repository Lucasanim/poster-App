import React, {useState, useEffect} from 'react'
import { Text, Input, Button, Avatar } from 'react-native-elements'

import Icon from 'react-native-vector-icons/Ionicons'

import ImagePicker from 'react-native-image-crop-picker'

const AuthForm = ({action, signup, image}) => {

    const [email, setEmail] = useState('')

    const [username, setUsername] = useState('')
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

    const setDefaults = () => {
        setImg('')
        setEmail('')
        setUsername('')
        setFirstName('')
        setLastName('')
        setPassword('')
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
                    source={
                        img
                        ? img.path &&{uri:img.path}
                        : {uri:image}
                    }
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
                    placeholder='Username'
                    leftIcon={{ type: 'Ionicons', name: 'person', color:'gray' }}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
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
                action(email, password, fisrtName, lastName, username,img)
                signup
                ? setDefaults()
                :null
            }}
        />
    </>
}

export default AuthForm