import React, {useState, useRef, useEffect} from 'react'
import {View, FlatList, TextInput, StyleSheet} from 'react-native'
import { Text, Button, Header} from 'react-native-elements'

import { useSelector } from 'react-redux'

import  useWebSocket, {ReadyState, } from  'react-native-use-websocket';

import MessageComponent from '../components/MessageComponent'

const Chat = ({route, navigation}) => {
    const {pk} = route.params

    const [text, setText] = useState('')

    const token = useSelector((state) => state.token)

    const flatListRef = useRef()

    // const [token, setToken] = useState('2fc7608d321d6a8965a27d98decd80f4f4f0774f')
    // const [token, setToken] = useState('473f9ef5bdd39c33c51d7d16ce1ee54786cb1f21')

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
    const SendMessage = () => {
        if(text){
            sendJsonMessage({
                "data": {'title': text},
            })
        }
    }

    useEffect(()=>{
        flatListRef.current.scrollToEnd()
    },[])

    return <View style={styles.container}>
        <Header
            leftComponent={{ icon:'arrow-back', color:'#fff', onPress:()=>navigation.goBack() }}
            centerComponent={{ text:'POSTER', style:{color:'#fff', fontSize:17} }}
        />
        <FlatList
            ref = {flatListRef}
            onContentSizeChange={()=> flatListRef.current.scrollToEnd()} 
            data={messageHistory.current}
            ListEmptyComponent={<Text></Text>}
            keyExtractor={(i,l)=>l.toString()}
            renderItem={({item}) => {
                return item && Object.keys(item).length !==0 ? <MessageComponent message={item} /> : null
                
            }}
        />
        <View style={styles.InputContainer} >
            <TextInput 
                placeholder='message'
                value={text}
                onChangeText={t => setText(t)}
                style={{flex:1}}
                multiline
            />
            <Button title='send' containerStyle={styles.SubmitButton} type='clear'
                onPress={()=>{
                    SendMessage()
                    setText('')
                }}
            />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white'
    },
    InputContainer: {
        flexDirection: 'row',
        margin: 5,
        backgroundColor: '#e8e8e8',
        borderRadius: 25,
    },
    SubmitButton: {
        flex:0.4,
        margin:5,
        
    }
})

export default Chat