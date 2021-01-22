import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Card, Button, Avatar } from 'react-native-elements'

import { useDispatch, useSelector } from 'react-redux'

import { LogOut } from '../redux/Actions'

const LoutOutScreen = ({navigation}) => {

    const disparch = useDispatch()

    const me = useSelector((state)=>state.my_profile)

    const handleLogOut = () => {
        disparch(LogOut())
    }

    return <View style={styles.container} >
        <Card>
            <Card.Title>HI {me.first_name}!</Card.Title>
            <Avatar
                title={`${me.first_name[0]}${me.last_name[0]}`}
                containerStyle={{backgroundColor:'gray', alignSelf:'center'}}
                rounded
                size='xlarge'
                source={me.avatar && {uri:me.avatar}}
            />
            <Card.Title>Are you sure to want to log out?</Card.Title>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <Button 
                    type='solid'
                    title='Lot out'
                    onPress={()=>handleLogOut()}
                    buttonStyle={{backgroundColor:'red'}}
                />
                <Button 
                    type='outline'
                    title='Cancel'
                    onPress={()=> navigation.navigate('profilestack')}
                />
            </View>
        </Card>
    </View>
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignContent:'center',
        flex:1,
        backgroundColor:'white'
    }
})

export default LoutOutScreen