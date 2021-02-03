import React, {useState} from 'react'
import {View, Text, FlatList, Button, TextInput} from 'react-native'

import  useWebSocket, {ReadyState, } from  'react-native-use-websocket';

const Chat = ({route}) => {
    const {pk} = route.params

    const [text, setText] = useState('')

    // const [token, setToken] = useState('2fc7608d321d6a8965a27d98decd80f4f4f0774f')
    const [token, setToken] = useState('473f9ef5bdd39c33c51d7d16ce1ee54786cb1f21')

    //socket
    const socketUrl = `ws://192.168.100.107:8000/chat/socket/${pk}/`
    const { sendMessage, sendJsonMessage, lastMessage, readyState, getWebSocket, lastJsonMessage } = useWebSocket(socketUrl,{
      queryParams:{
        'token': token
      },
      onMessage: (event) => {
        // console.log('ev:',event)
      },
      shouldReconnect: () => true
    });
    //-Socket
    
    const  messageHistory = React.useRef([]);
  
    messageHistory.current = React.useMemo(
        () =>  messageHistory.current.concat(lastJsonMessage),
        [lastJsonMessage]
    );
    // messageHistory.current = React.useMemo(
    //   () =>  messageHistory.current.concat(lastJsonMessage),
    //   [lastMessage]
    // );
    
    const  connectionStatus = {
        [ReadyState.CONNECTING]:  'Connecting',
        [ReadyState.OPEN]:  'Open',
        [ReadyState.CLOSING]:  'Closing',
        [ReadyState.CLOSED]:  'Closed',
        [ReadyState.UNINSTANTIATED]:  'Uninstantiated',
    }[readyState];

    const messages_filter = () => {
        var a = messageHistory.current.filter( i => i.thread == pk)
        return a
    }

    const b = messages_filter()
    const create = () => {
        sendJsonMessage({
        "action": "create",
        "request_id": 12,
        "data": {'title': text},
        })
    }

    return <View style={{flex:1}}>
        <Text>The WebSocket is currently {connectionStatus}</Text>
        <Button title="CREATE" onPress={create} />
        <FlatList
            data={messageHistory.current}
            ListEmptyComponent={<Text>nada</Text>}
            keyExtractor={(i,l)=>l}
            renderItem={({item}) => {
                return (
                    <View>
                        <Text>{item.text}</Text>
                    </View>
                )
            }}
        />
        <View style={{flexDirection:'row'}} >
            <TextInput 
                placeholder='text'
                value={text}
                onChangeText={t => setText(t)}
            />
            <Button title='send' onPress={create} />
        </View>
    </View>
}

export default Chat