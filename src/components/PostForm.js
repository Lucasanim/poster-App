import React, {useState} from 'react'
import {
    View,
    Image
} from 'react-native'
import {
    Input,
    Text,
    Button
} from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker';


const PostForm = ({action}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [img, setimg] = useState('')

    // const HandleChooseAPhoto = () => {
    //     const options = {noData:false}
    //     launchImageLibrary(options, response => {
    //         if(response.uri){
    //             setUti(response)
    //             console.log('IMAGE:', response)
    //         }
    //     })
    // }

    const HandleChooseAPhoto = () => {
        ImagePicker.openPicker({
            cropping: true,
            mediaType:'photo'
          }).then(image => {
              setimg(image)
            console.log(image);
          });
    }

    return(
        <View style={{  }}>
            <Input 
                placeholder='Title'
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <Input 
                placeholder='Description'
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
        {img
          ?<Image
            source={{ uri: img.path }}
            style={{ width: 200, height: 200, alignSelf:'center', margin:10, resizeMode:'contain'}}
          />
          :null
        }
        <View style={{flexDirection:'row'}}>
            <Input
                disabled
                value={img.path}
                containerStyle={{flex:0.9}}
            />
            <Button 
                title="Choose a Photo" 
                onPress={HandleChooseAPhoto}
                style={{flex:0.5, margin:10}}
                type='outline'
            />
        </View>

        <Button 
            title='Done!'
            containerStyle={{width:100, alignSelf:'center', borderRadius:30}}
            onPress={() => action(title, description, img) }
        />

      </View>
    )
}

export default PostForm