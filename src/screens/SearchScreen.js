import React, {useState} from 'react'
import { View, FlatList } from 'react-native'
import { Text, SearchBar, ListItem, Avatar, Header } from 'react-native-elements'

import { useDispatch } from 'react-redux'

import { handleSearch } from '../redux/Actions'

const SearchScreen = ({navigation}) => {

    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState('')

    const HandleSearch = async (text) => {
        let user = await dispatch(handleSearch(text))
        text
        ?setUsers(user)
        :setUsers('')
    }

    const renderItem = ({ item }) => (
        <ListItem
            bottomDivider
            onPress={()=>navigation.navigate('user', {user:item})}
        >
            <Avatar
                rounded
                source={item.avatar && {uri: item.avatar}}
                title={`${item.first_name[0]} ${item.last_name[0]}`}
            />
            <ListItem.Content>
            <ListItem.Title>{item.first_name} {item.last_name}</ListItem.Title>
            <ListItem.Subtitle>{item.last_name}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )

    return <View style={{backgroundColor:'white', flex:1}} >
        <Header 
            centerComponent={{text:'Find new users', style:{color:'#fff', fontSize:17}}}
        />
        <SearchBar
            
            value={search}
            placeholder='Search'
            containerStyle={{backgroundColor:'white'}}
            // inputContainerStyle={{backgroundColor:'white', borderWidth:1}}
            round
            showLoading
            lightTheme
            onChangeText={(text)=>{
                HandleSearch(text)
                setSearch(text)
            }}
        />
        <FlatList
            data={users}
            // ListEmptyComponent={<Text>Empty list</Text>}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={renderItem}
        />
        
    </View>
}

export default SearchScreen
