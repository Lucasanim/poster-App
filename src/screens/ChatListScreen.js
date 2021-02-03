import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native'

import {Header} from 'react-native-elements'

import  useWebSocket, {ReadyState} from  'react-native-use-websocket';


const ChatListScreen = ({navigation}) => {

  const [pk, setPk] = useState('3')
  const[threads, setThreads] = useState([])
  const [user, setUser] = useState('')

  const fetchs = async() => {
    const response = await fetch('http://192.168.100.107:8000/chat/threads/',{
      method:'GET',
      headers:{
        'Authorization': 'token 473f9ef5bdd39c33c51d7d16ce1ee54786cb1f21'
      },
    }).then(response => response.json())
    .then(data => setThreads(data))
  }

  const [token, setToken] = useState('f3d815c7a50998199efff71ab26e8df786827307')

    //socket
    // const socketUrl = `ws://192.168.100.107:8000/socket/`
    // const { sendMessage, sendJsonMessage, lastMessage, readyState, getWebSocket, lastJsonMessage } = useWebSocket(socketUrl,{
    //   queryParams:{
    //     'token': token
    //   },
    //   onMessage: (event) => {
    //     console.log('ev:',event)
    //   },
    //   shouldReconnect: () => true
    // });

  useEffect(()=>{
    fetchs()
  },[])
  
  return (
    <View style={{flex:1}}>
        <Header 
            centerComponent={{ text:'POSTER', style:{color:'#fff', fontSize:17} }}
            // rightComponent={{icon:'home', onPress:()=>navigation.navigate('chat-list')}}
        />
      <FlatList
        ListEmptyComponent={<Text>empty</Text>}
        data={threads}
        renderItem={({ item }) =>
          // item && <Text>{item.data.text}</Text>
          // item && <Text>{}a</Text>
          // item && <Text>{Object.keys(item)}</Text>

        //   item && item.text && <Text>{item.text} of {item.owner}</Text>
          item &&  <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('chat', {pk:item})
                }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default ChatListScreen
