import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'

import {Header, Avatar, Text} from 'react-native-elements'

import {useSelector, useDispatch} from 'react-redux'

import  useWebSocket, {ReadyState} from  'react-native-use-websocket';

import {FetchThreads as Fetch_Threads} from '../redux/Actions'

import axios from '../axios/Axios'

const ChatListScreen = ({navigation}) => {

  const dispatch = useDispatch()

  const me = useSelector((state) => state.my_profile)

  const[threads, setThreads] = useState([])
  console.log(threads)
  const FetchThreads = async() => {
    const data = await dispatch(Fetch_Threads())
    setThreads(data)
  }
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
    const unsubscribe = navigation.addListener('focus', () => {
      FetchThreads()
    });

    return unsubscribe;
  },[navigation])
  
  return (
    <View style={styles.Container}>
        <Header
            leftComponent={{ icon:'arrow-back', color:'#fff', onPress:()=>navigation.goBack() }}
            centerComponent={{ text:'POSTER', style:{color:'#fff', fontSize:17} }}
        />
      <FlatList
        ListEmptyComponent={<Text>empty</Text>}
        data={threads}
        keyExtractor={ i => i.id.toString()}
        renderItem={({ item }) =>
          item &&  <TouchableOpacity
                onPress={()=>navigation.navigate('chat', {pk:item.id})}
                style={styles.ThreadComponent}
            >
              {
                item.avatar 
                ?<Avatar
                  source={{uri: `http://192.168.100.107:8000/media/${item.avatar}`}}
                  rounded
                  size='large'
                  containerStyle={styles.AvatarContainer}
                /> : null
              }
              {
                item.name
                ? <Text style={styles.NameText}>{item.name}</Text> : null
              }
              <Text style={styles.UserText} >{item.users.filter(i => i !== me.username)}</Text>
            </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: 'white'
  },
  ThreadComponent: {
    backgroundColor: 'white',
    alignContent:'center',
    alignItems:'center',
    // justifyContent:'center',
    flexDirection:'row'
  },
  AvatarContainer: {
    margin:10
  },
  NameText: {

  },
  UserText: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});

export default ChatListScreen
