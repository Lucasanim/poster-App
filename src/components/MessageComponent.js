import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Avatar} from 'react-native-elements'

import { useSelector } from 'react-redux'

const MessageComponent = ({message}) => {
    const full_date = message.hour.split(' ')
    var hour = ''
    for(let i =0 ;i <5;i++){
        hour += full_date[1][i]
    }
    const date = full_date[0]

    const me = useSelector((state) => state.my_profile)

    return <>
        <Text>{date}</Text>
        {
            message.owner == me.username
            ?<View style={styles.me_container} >
                <Text style={styles.message_text}>{message.text}</Text>
                <Text style={styles.hour} >{hour}</Text>
            </View>
            :<View style={styles.other_row_container} >
                {
                    message.owner_avatar && <Avatar
                                                source={{uri: `http://192.168.100.107:8000/media/${message.owner_avatar}`}}
                                                rounded
                                                containerStyle={{marginTop:10}}
                                            />
                }

                <View style={styles.other_container} >
                    <View>
                        <Text style={styles.user_name_text} >{message.owner}</Text>
                        <Text style={styles.message_text} >{message.text}</Text>
                    </View>
                    <Text style={styles.hour} >{hour}</Text>
                </View>
            </View>
        }
    </>
}

const styles = StyleSheet.create({
    me_container: {
        maxWidth:'80%',
        alignSelf:'flex-end',
        backgroundColor: '#4287f5',
        margin:10,
        borderRadius: 15
    },
    other_container: {
        maxWidth:'70%',
        alignSelf:'flex-start',
        backgroundColor: '#e8e8e8',
        margin: 10,
        borderRadius: 15
    },
    other_row_container: {
        flexDirection:'row'
    },
    sub_row_container: {

    },
    user_name_text: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop:10,
        paddingHorizontal:10
    },
    message_text: {
        fontSize: 17,
        padding:10
    },
    hour: {
        alignSelf: 'flex-end',
        fontSize: 12,
        paddingBottom:10,
        paddingHorizontal:10
    }
})

export default MessageComponent