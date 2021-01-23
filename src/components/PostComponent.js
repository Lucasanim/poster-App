import React from 'react'
import { View } from 'react-native'
import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import {Card,Text, Avatar } from 'react-native-elements'

import { useSelector } from 'react-redux'

const PostComponent = ({post, nav, owners}) => {
    
    // var owners = useSelector((state) => state.posts_owners)
    // console.log('OWNERSCREEN:', owners)

    const ReturnPostHeader = (item) => {
        var it = owners.filter((i) => i.id === item.user)[0]
        // console.log('it:', it)
        if(it){
            return (<TouchableOpacity
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
            </TouchableOpacity>)
        }else{
            return<Text>A</Text>
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
                            // owners && owners !== undefined
                            // console.log(owners)
                            // owners.map((it, index)=>{
                            //     return (
                            //         it.id == item.user
                            //         ? <TouchableOpacity
                            //             style={{flexDirection:'row'}}
                            //             key={it.id}
                            //             onPress={()=>nav(it)}
                            //         >
                            //             <View style={{flex:0.2}} >
                            //                 {
                            //                     it.avatar
                            //                     ? <Avatar source={{uri:it.avatar}} />
                            //                     : <Avatar
                            //                         rounded 
                            //                         title={`${it.first_name[0]}${it.last_name[0]}`.toUpperCase()} 
                            //                         containerStyle={{backgroundColor:'#9c9c9c'}}
                            //                       />
                            //                 }
                            //             </View>
                            //             <View style={{flex:1}}>
                            //                 <Text
                            //                     style={{fontSize:16, fontWeight:'bold'}}
                            //                 >
                            //                     {it.first_name} {it.last_name}
                            //                 </Text>
                            //             </View>
                            //         </TouchableOpacity>
                            //         :null
                            //     )
                            // })
                            // :null
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