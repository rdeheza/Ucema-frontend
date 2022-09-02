import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Keyboard, ActivityIndicator } from 'react-native';
import { useToast } from 'react-native-styled-toast'
import performLogin from '../../shared/services/Login/Login';
import storeData from '../../shared/services/storeData';
import getToken from '../../shared/services/Token/Token';
import mainStore from '../../shared/Store'
import getData from '../../shared/services/getData';

const LoginForm = ({ navigation }) => {
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { toast } = useToast()
    const { cleanForceCloseApp } = mainStore();

    const saveOnLocalStorage = (response, token) => {
        storeData('user', response.username);
        storeData('userid', response.userid);
        storeData('token', token);
        setLoading(false);

        navigation.navigate('Logged');
    }

    const _validateForm = () => {

        cleanForceCloseApp();

        Keyboard.dismiss();
        setLoading(true)
        if ( user && password ) {
            performLogin(user, password)
                .then( response => {
                    if ( !response.message && response.username && response.userid ) {

                        getToken(response.userid, response.username, response.cookie)
                            .then( token => {
                                if (token) {
                                    toast({ message: `Bienvenido! ${response.username}`, subMessage: 'Inicio de sesión satisfactorio 👋', intent: "SUCCESS" })
                                    setTimeout(function() {
                                        setUser(null);
                                        setPassword(null);

                                        saveOnLocalStorage(response, token);

                                    }, 3000);
                                } else {
                                    toast({ message: 'Error de inicio de sesión', subMessage: 'No se ha obtenido un Token de sesión válido', intent: "ERROR" })
                                    setLoading(false)
                                }
                            })
                                                        
                    } else {
                        toast({ message: 'Error de inicio de sesión', subMessage: response.message, intent: "ERROR" })
                        setLoading(false)
                    }
                })            
        } else {
            toast({ message: 'Error de inicio de sesión', subMessage: 'El usuario y/o contraseña en blanco', intent: "ERROR" })
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => { }
    }, [])

    return (
        <View style={ styles.container }>                
            <TextInput 
                style={[ styles.input, styles.marginTop, styles.userInput ]} 
                placeholder="usuario" 
                autoCapitalize = 'none'
                onChangeText={ ( text ) => { setUser(text) }}
                value={user || ''}
            />
            <TextInput 
                style={ styles.input }  
                autoCapitalize = 'none'
                placeholder="contraseña"
                onChangeText={ ( passwordText ) => { setPassword( passwordText ) }}
                secureTextEntry={true}
                value={password || ''}
            />
            {isLoading && (
            <ActivityIndicator
                style={{ height: 80 }}
                color="#FFF"
                size="large"
            />
            )}
            <TouchableOpacity 
                style={styles.loginButton}
                onPress={ () => _validateForm() }    
            >
                <Text style={ styles.loginButtonText } >Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginForm

const styles = StyleSheet.create({
    container:{
        paddingBottom: 20
    },  
    input: {
        height: 40,
        marginBottom: 20,
        width: 250,
        backgroundColor: '#FFF',
        paddingLeft: 15,
        fontFamily: 'regular'
    },
    marginTop: {
        marginTop: 20
    },
    loginButton: {
        borderRadius: 20,
        backgroundColor: '#302E2B',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    loginButtonText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontFamily: 'regular'
    }
})
