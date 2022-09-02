import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import LoginForm from './LoginForm';
import { expo } from '../../../app.json';

const Auth = ({ navigation }) => {

    return (
        <>
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{ flexGrow : 1 }}
            keyboardVerticalOffset = { 0 } 
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={ styles.container }>
                    <ImageBackground source={require('../../assets/bkg_login.jpg')} style={ styles.header }>
                        <Text style={[ styles.headerTitle ]}>BIENVENIDO a la APP de</Text>
                        <Image source={require('../../assets/logo_login.png')} style={ styles.headerImageLogo }/>
                    </ImageBackground>
                    <View
                        style={ styles.form }>
                        <ImageBackground source={require('../../assets/form_bkg.png')} style={ styles.formBkg }>
                            <Text style={ styles.formTitle }>iniciar sesión</Text>
                            <LoginForm
                                navigation={navigation}
                            ></LoginForm>
                        </ImageBackground>                
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
        </KeyboardAvoidingView>
        <View style={ styles.footerContainer}>
            <Text style={[ styles.textWhite, styles.textCapitalize ]}>© Asociación Civil Universidad del CEMA</Text>
            <Text style={[ styles.textWhite, styles.textCapitalize ]}>v. {expo.version} </Text>
        </View>
        </>
    )
}

export default Auth

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#910B26',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40
    },
    headerTitle: {
        color: '#302E2B',
        fontSize: 24,
        fontFamily: 'light'
    },
    headerImageLogo: {
        width: '85%',
        height: '50%',
        resizeMode: 'contain'
    },
    form: {
        flex: 2,
        padding: 20
    },
    formBkg: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    formTitle: {
        color: '#FFF',
        fontSize: 28,
        textTransform: "uppercase",
        paddingTop: 20,
        fontFamily: 'light'
    },
    footerContainer: {
        backgroundColor: '#910B26',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textWhite: {
        color: '#FFF'
    },
    textCapitalize: {
        textTransform: 'capitalize'
    }
  })
