import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, BackHandler } from 'react-native';

import Header from '../../shared/components/header/Header';
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom';

// Push Notifications
import registerForPushNotificationsAsync from '../../services/firebase/permissionrequest'

const Home = ({ navigation }) => {
    // Register for Push
    useEffect(() => {
        registerForPushNotificationsAsync();
    }, [])

    // Block backbutton on Android
    useEffect(() => {
        
        const onBackAction = () => { return true };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackAction);
        return () => backHandler.remove('hardwareBackPress', onBackAction);

    }, [])

    return (

        <View style={ styles.container }>
            <Header 
                navigation={navigation}
            />

            <View style={[ styles.container, styles.justifyContainer]}>
                <TouchableOpacity
                    style={[ styles.button, styles.borderProfile ]}
                    onPress={ () => { navigation.navigate('profile') }}
                >
                    <Image source={require('../../assets/home/profile_icon.png')}  style={{ width: 30, height: 30, resizeMode: 'contain'  }} />
                    <Text style={[ styles.optionMenu, styles.colorProfile ]}>Mi perfil</Text>
                    <Image source={require('../../assets/home/arrow.png')}  style={{ width: 30, height: 30, resizeMode: 'contain'  }} />
                </TouchableOpacity>
                 <TouchableOpacity
                    style={[ styles.button, styles.borderCareer ]}
                    onPress={ () => { navigation.navigate('career') }}
                >
                    <Image source={require('../../assets/home/career_icon.png')}  style={{ width: 30, height: 30, resizeMode: 'contain'  }} />
                    <Text style={[ styles.optionMenu, styles.colorCareer ]}>Mi Carrera / Mis Materias</Text>
                    <Image source={require('../../assets/home/arrow.png')}  style={{ width: 30, height: 30, resizeMode: 'contain'  }} />
                </TouchableOpacity> 
{/*                 <TouchableOpacity
                    style={[ styles.button, styles.borderCalendar ]}
                    onPress={ () => { navigation.navigate('calendar') }}
                >
                    <Image source={require('../../assets/home/calendar_icon.png')}  style={{ width: 30, height: 30, resizeMode: 'contain'  }} />
                    <Text style={[ styles.optionMenu, styles.colorCalendar ]}>Mis clases virtuales</Text>
                    <Image source={require('../../assets/home/arrow.png')}  style={{ width: 30, height: 30, resizeMode: 'contain'  }} />
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={[ styles.button, styles.borderUcema ]}
                    onPress={ () => { navigation.navigate('ucema') }}
                >
                    <Image source={require('../../assets/home/pin_icon.png')}  style={{ width: 30, height: 30, resizeMode: 'contain'  }} />
                    <Text style={[ styles.optionMenu, styles.colorUcema ]}>Ucema</Text>
                    <Image source={require('../../assets/home/arrow.png')}  style={{ width: 30, height: 30, resizeMode: 'contain'  }} />
                </TouchableOpacity>
            </View> 
        
            <Tabbarbottom
                navigation={navigation}
            />
        </View>    

    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#e5e5e5'
    },
    justifyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    button : {
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#FFF'  
    },
    optionMenu: {
        flex: 1,
        marginLeft: 20,
        fontSize: 14,
        textTransform: 'uppercase',
        fontFamily: 'regular'
    },
    borderProfile:{
        borderLeftWidth: 8,
        borderLeftColor: '#6D6D6D'
    },
    borderCareer:{
        borderLeftWidth: 8,
        borderLeftColor: '#212121'        
    },
    borderCalendar:{
        borderLeftWidth: 8,
        borderLeftColor: '#490A19'        
    },
    borderUcema:{
        borderLeftWidth: 8,
        borderLeftColor: '#910B26'        
    },
    colorProfile: {
        color: '#6D6D6D',
    },
    colorCareer: {
        color: '#212121'   
    },
    colorCalendar: {
        color: '#490A19'     
    },
    colorUcema: {
        color: '#910B26'      
    }
})
