import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Async + API para carreras (combo)
import RNPickerSelect from 'react-native-picker-select'
import getData from '../../../shared/services/getData'

import mainStore from '../../../shared/Store'
import { useToast } from 'react-native-styled-toast'

const Header = ({ navigation, isVisible = false}) => {
    const [userName, setUserName] = useState("");
    const { careers, careerSelected, isLoading, fetchCarrers, setCareer, setLoading, cleanCareers, cleanCareersFullModel, cleanToken, cleanUserLogged, token, userLogged, forceCloseApp } = mainStore();
    const { toast } = useToast()

    const removeLocalStorage = ( showToast ) => {
        AsyncStorage.getAllKeys()
            .then(keys => {
                AsyncStorage.multiRemove(keys)
                cleanCareers();
                cleanCareersFullModel();
            })
            .then(() => {
                if ( showToast) {
                    toast({ message: 'Cierre de sesion exitoso', intent: "SUCCESS" });
                } else {
                    toast({ message: 'Se ha cerrado su sesión por seguridad', intent: "ERROR" });
                }
                navigation.navigate('Auth')
            });
    }

    useEffect(() => {
        const user = getData('user');
        const token = getData('token');
        const userid = getData('userid');

        user.then( userFounded => {
            if ( userFounded ) {
                token.then( tokenFounded => {
                    if ( tokenFounded ) {
                        userid.then( userIdFounded => {
                            if ( userIdFounded ) {
                                setUserName(userFounded)

                                if ( careers.length == 0 ) {
                                    fetchCarrers(userIdFounded, tokenFounded, userFounded)
                                } else {
                                    setLoading(false)
                                }

                            }
                        })
                    }
                })
            }
        })

        if (forceCloseApp) {
            removeLocalStorage( false )
        }

        return () => { }
    }, [forceCloseApp]);
    

    return (
        <View style={[ styles.container ]}>
            <View style={ styles.logoContainer }>
                <Image source={require('../../../assets/header/logo.png')}  style={{ width: 100, height: 40, resizeMode: 'contain'  }} />
                <View style={ styles.menuOptionsContainer }>
                    <TouchableOpacity
                        onPress={ () => { navigation.openDrawer() }}
                    >
                        <Image source={require('../../../assets/header/menu_icon.png')} style={{ width: 40, height: 40  }} />
                    </TouchableOpacity>
                    { isVisible 
                        ? <TouchableOpacity onPress={ () => { navigation.goBack() }} >
                            <Image 
                                source={require('../../../assets/header/backbutton_icon.png')} 
                                style={{ width: 40, height: 40, marginLeft: 5  }}
                        />
                        </TouchableOpacity>
                        : <></> }
                    <TouchableOpacity
                        onPress={ () => {
                            Alert.alert(
                                "Cerrar Sesión",
                                "¿Seguro que desea cerrar sesión?",
                                [
                                    { text: "Cancelar", onPress: () =>  {}},
                                    { text: "Cerrar Sesión", onPress: () => removeLocalStorage( true ) }
                                ],
                                { cancelable: false }
                            );
                        }}
                    >
                        <Image source={require('../../../assets/header/close_session_icon.png')} style={{ width: 36, height: 36, marginLeft: 5  }} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={ styles.userContainer }>
                <View style={ styles.userInfoContainer}>
                    <Text style={ styles.userInfoWelcomeText }>Hola!</Text>
                    <Text style={ styles.userInfoNameText }>{userName}</Text>
                </View>
                <RNPickerSelect
                    onValueChange={ (value) => {
                        if (value && !isLoading) {
                            setCareer(value)
                        }
                    }}
                    style={{
                        ...styles,
                        iconContainer: {
                            top: 15,
                            right: 10,
                        },
                        placeholder: {
                            fontSize: 12,
                            fontFamily: 'regular',
                        },
                    }}
                    useNativeAndroidPickerStyle={false} 
                    value={ careerSelected }
                    items={ careers }
                    placeholder={{ 
                        label: 'Seleccione una carrera...',
                        value: null
                    }}
                    Icon={() => {
                        return (
                        <View
                            style={{
                                backgroundColor: 'transparent',
                                borderTopWidth: 8,
                                borderTopColor: 'gray',
                                borderRightWidth: 8,
                                borderRightColor: 'transparent',
                                borderLeftWidth: 8,
                                borderLeftColor: 'transparent',
                                width: 0,
                                height: 0,
                            }}
                        />
                        );
                    }}
                />
                {/* <View style={ styles.userAvatarContainer}>
                    <Image source={require('../../../assets/header/avatar.svg')} />
                </View> */}
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        height: 120,
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#fff'
    },
    logoContainer: { 
        flex: 1,
        justifyContent: 'center'
    },
    menuOptionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    userContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingLeft: 15
    },
    userInfoWelcomeText: {
        fontSize: 24,
        color: '#910B26',
        textTransform: 'uppercase',
        fontFamily: 'light'
    },
    userInfoNameText: {
        fontSize: 18,
        fontFamily: 'light'
    },
    inputIOS: {
        fontSize: 14,
        paddingVertical: 12,
        paddingLeft: 30,
        paddingRight: 30,
        color: '#666'
    },
    inputAndroid: {
        fontSize: 14,
        color: '#666',
        paddingRight: 30,
        paddingVertical: 5,
        width: 150
    }
})







