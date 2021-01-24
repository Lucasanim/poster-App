import React from 'react'
import { View } from 'react-native'
import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import {Card,Text, Avatar } from 'react-native-elements'

const PostComponent = ({post, nav, owners}) => {

    const ReturnPostHeader = (item) => {
        if(owners && owners != undefined){
            var it = owners.filter((i) => i.id === item.user)[0]
            // console.log('it:', it)
            if(it){
                return (<TouchableOpacity
                    style={{flexDirection:'row', marginBottom:20}}
                    key={it.id}
                    onPress={()=>nav(it)}
                >
                    <View style={{flex:0.2}} >
                        {
                            it.avatar
                            ? <Avatar source={{uri:it.avatar}} />
                            : <Avatar
                                rounded 
                                title={`${it.first_name[0]}${it.last_name[0]}`.toUpperCase()} 
                                containerStyle={{backgroundColor:'#9c9c9c'}}
                                />
                        }
                    </View>
                    <View style={{flex:1}}>
                        <Text
                            style={{fontSize:16, fontWeight:'bold'}}
                        >
                            {it.first_name} {it.last_name}
                        </Text>

                        <Text
                            style={{fontSize:14}}
                        >
                            @{it.username}
                        </Text>
                    </View>
                </TouchableOpacity>
                )
            }else{
                return null
            }
        }else{
            return null
        }
    }
    
    return <FlatList
            data={post}
            keyExtractor={(item) => item.id.toString() }
            renderItem={({item}) => {
                return <TouchableOpacity
                    
                >
                    <Card>
                        {
                            ReturnPostHeader(item)
                        }
                        <Card.Title> {item.title} </Card.Title>
                           
                        {
                            item.image
                            ?<Card.Image
                                source={{uri:item.image}}
                                style={{height: 300, resizeMode:'contain'}}
                                PlaceholderContent={<ActivityIndicator/>}
                            />
                            :null
                        }

                        <Card.Divider/>
                        <Text>{item.description}</Text>
                    </Card>
                </TouchableOpacity>
            }}
        />
    
}

export default PostComponent