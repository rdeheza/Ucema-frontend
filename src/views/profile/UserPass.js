import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import Header from '../../shared/components/header/Header'
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom'

import getData from '../../shared/services/getData'

const UserPass = ({ navigation }) => {
    const [username, setUsername] = useState(null)
    const _validateForm = () => { }

    useEffect(() => {
        const user = getData('user');
        user.then( userFounded => {
            if ( userFounded ) {
                setUsername(userFounded) 
            }
        })
        return () => { }
    }, [])

    return (
        <SafeAreaView style={ styles.container }>
            <Header 
                navigation = {navigation}
                isVisible = 'true'
            />

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                        style={{ flexGrow : 1 }}
                        keyboardVerticalOffset = { 0 } 
                    >
                    <ScrollView style={[ styles.container, styles.justifyContainer]}>
                        <View styles={[ styles.sectionTitleWrapper ]}>
                            <Text style={[ styles.sectionTitle, styles.textUppercase ]}>mi usuario y contraseña</Text>
                        </View>                            
                        <View>
                            <Text style={[ styles.labelText, styles.textItalic, styles.textBold ]}>Usuario</Text>
                            <TextInput style={[ styles.input, styles.marginTop, styles.inputDisabled ]} editable={false} value={username}/>
                            
                            <Text style={[ styles.labelText, styles.textItalic, styles.textBold ]}>Contraseña Actual</Text>
                            <TextInput style={[ styles.input, styles.marginTop ]} secureTextEntry={true} />
                            
                            <Text style={[ styles.labelText, styles.textItalic, styles.textBold ]}>Contraseña Nueva</Text>
                            <TextInput style={[ styles.input, styles.marginTop ]} secureTextEntry={true} />

                            <Text style={[ styles.labelText, styles.textItalic, styles.textBold ]}>Re-ingrese contraseña</Text>
                            <TextInput style={[ styles.input, styles.marginTop ]} secureTextEntry={true} />

                            <TouchableOpacity 
                                style={styles.resetPasswordButton}
                                onPress={ () => _validateForm() }    
                            >
                                <Text style={ styles.resetPasswordButtonText } >cambiar contraseña</Text>
                            </TouchableOpacity>
                        </View>                        
                    </ScrollView>
                    </KeyboardAvoidingView>  
                    
                </TouchableWithoutFeedback>
            
            <Tabbarbottom 
                navigation = {navigation}
            />
        </SafeAreaView> 
        
    )
}

export default UserPass

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    justifyContainer: {
        backgroundColor: '#e5e5e5',
        padding: 20
    },  
    input: {
        height: 35,
        marginBottom: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingLeft: 15
    },
    inputDisabled: {
        opacity: .5
    },
    marginTop: {
        marginTop: 10
    },
    textCapitalize: {
        textTransform: 'capitalize'
    },
    textUppercase: {
        textTransform: 'uppercase'
    },
    textBold: {
        fontWeight: 'bold'
    },
    textNormal: {
        fontWeight: '400',
        fontFamily: 'light'
    },
    labelText: {
        fontFamily: 'light'
    },
    sectionTitleWrapper: {
        padding: 10
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'mediumItalic',
        marginBottom: 40
    },
    resetPasswordButton: {
        backgroundColor: '#910B26',
        padding: 10,
        alignItems: 'center'
    },
    resetPasswordButtonText: {
        color: '#FFF',
        textTransform: 'uppercase'
    }

})
