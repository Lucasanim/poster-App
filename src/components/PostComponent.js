import React from 'react'
import { View } from 'react-native'
import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import {Card,Text, Avatar } from 'react-native-elements'

const PostComponent = ({post, owners, nav}) => {
    
    return <FlatList
            data={post}
            keyExtractor={(item) => item.id.toString() }
            renderItem={({item}) => {
                return <TouchableOpacity
                    
                >
                    <Card>
                        {
                            owners
                            ?owners.map((it)=>{
                                return (
                                    it.id == item.user
                                    ? <TouchableOpacity
                                        style={{flexDirection:'row'}}
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
                                        </View>
                                    </TouchableOpacity>
                                    :null
                                )
                            })
                            :null
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