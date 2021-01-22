import React, {useState} from 'react'
import { 
    View,
    FlatList,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native'
import { 
    Text,
    Card,
    Avatar,
    Divider,
    Button,
    Tooltip,
} from 'react-native-elements'

import Icon from 'react-native-vector-icons/Ionicons'

import {useDispatch, useSelector} from 'react-redux'

import {HandleFollow, HandleUnfollow, FetchPostOwner} from '../redux/Actions'

const ProfileComponent = ({posts, profile, del, isMine, nav, fs}) => {
    const dispatch = useDispatch()

    const [follows, setFollows] = useState(fs)

    let first_letter = profile.first_name[0]
    let second_letter = profile.last_name[0]

    // actions

    const handleDelete = (id) => {
        Alert.alert(
            'Are you sure to want to delete this post?',
            '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'Yes', onPress: () => {
                  del(id)
              } }
            ],
            { cancelable: true }
        );
    }

    const HandleFollowButton = async () => {
        let a = await dispatch(FetchPostOwner())
        setFollows(a)
    }

    // actions 

    return (
        // <ScrollView style={{backgroundColor:'white'}}>
        <ScrollView style={{backgroundColor:'white'}} >
            <Card>

                {/* profile */}

                <View style={{flexDirection:'row', backgroundColor:'white', alignItems:'center'}} >
                    {
                        profile.avatar
                        ?<Avatar 
                            title={`${first_letter}${second_letter}`}
                            source={{uri:profile.avatar}}
                            rounded
                            size='large'
                            containerStyle={{margin:5}}
                        />
                        :<Avatar 
                            title={`${first_letter}${second_letter}`.toUpperCase()}
                            rounded
                            size='large'
                            containerStyle={{margin:5, backgroundColor:'gray'}}
                        />
                    }
                    
                    <Text>{profile.first_name} {profile.last_name}</Text>
                </View>

                <Divider style={{marginHorizontal:30}} />

                <View style={{flexDirection:'row', justifyContent:'space-around', backgroundColor:'white',height:60, alignItems:'center'}} >
                    <TouchableOpacity>
                        <Text style={{fontWeight:'bold', fontSize:17}}>{
                            posts.length ? posts.length : 0
                        }</Text>
                        <Text style={{fontWeight:'bold', fontSize:17}}>Posts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontWeight:'bold', fontSize:17}}>{
                            profile.follower ? profile.follower : 0
                        }</Text>
                        <Text style={{fontWeight:'bold', fontSize:17}}>Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontWeight:'bold', fontSize:17}}>{
                            profile.follow ? profile.follow : 0
                        }</Text>
                        <Text style={{fontWeight:'bold', fontSize:17}}>Follows</Text>
                    </TouchableOpacity>
                </View>

                <Divider style={{marginHorizontal:40}} />
                
                <View style={{flexDirection:'row', justifyContent:'space-around', backgroundColor:'white',height:60, alignItems:'center'}} >
                    {
                        isMine
                        ?<Button title='edit' type='outline' containerStyle={{width:'70%'}} 
                            onPress={()=> nav.navigate('editprofile')}
                        />
                        :<>
                            {
                                follows.includes(profile)
                                ?<Button title='Following' type='outline' containerStyle={{width:'30%'}}
                                    onPress={()=>{
                                        dispatch(HandleUnfollow(profile.id)),
                                        HandleFollowButton()
                                    }}
                                />
                                :<Button title='Follow' type='solid' containerStyle={{width:'30%'}} 
                                    onPress={()=>{
                                        dispatch(HandleFollow(profile.id)),
                                        HandleFollowButton()
                                    }}
                                />
                            }
                            <Button title='Message' type='outline' containerStyle={{width:'30%'}} />
                        </>
                    }
                </View>
            </Card>

            {/* posts */}

            <FlatList 
                style={{marginBottom:10}}
                data={posts}
                keyExtractor={(item)=>item.id.toString()}
                ListEmptyComponent={
                    <Card>
                        <Card.Title>
                            {isMine ? 'You have not posts' : 'There is not posts availables!'}
                        </Card.Title>
                    </Card>
                }
                numColumns={1}
                renderItem={({item}) => {
                    return <TouchableOpacity>
                        <Card>
                            
                            <View style={{flexDirection:'row'}} >

                                <Card.Title style={{flex:1}} >{item.title}</Card.Title>
                                
                                <View style={{flex:0.1}} >
                                    <Tooltip 
                                        closeOnlyOnBackdropPress={true}
                                        overlayColor={'rgba(0, 0, 0, 0.70)'}
                                        withPointer={false}
                                        backgroundColor={'rgba(250, 250, 250, 1.0)'}
                                        popover={
                                            <TouchableOpacity
                                                onPress={()=>handleDelete(item.id)}
                                            >
                                                {
                                                    isMine
                                                    ?<Text
                                                        style={{color:'#348feb', fontSize:17}}
                                                    >
                                                        Delete
                                                    </Text>
                                                    :null
                                                }
                                            </TouchableOpacity>
                                        }
                                        
                                    >
                                    <Icon name='ios-ellipsis-vertical' size={17} />
                                </Tooltip>
                                </View>
                                

                            </View>
                            {
                                item.image
                                ?<Card.Image 
                                    source={{uri:item.image}}
                                    style={{height:300, resizeMode:'contain'}}
                                    PlaceholderContent={<ActivityIndicator/>}
                                />
                                :null
                            }
                            <Card.Divider />
                            <Text>{item.description}</Text>
                            
                        </Card>
                        
                    </TouchableOpacity>
                }}
            />
        </ScrollView>
    )
}
export default ProfileComponent