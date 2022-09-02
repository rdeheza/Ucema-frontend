import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import Header from '../../shared/components/header/Header'
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom';

const Profile = ({ navigation }) => {
    return (
        <SafeAreaView style={ styles.container }>
            <Header 
                navigation = {navigation}
                isVisible = 'true'
            />

            <View style={[ styles.container, styles.justifyContainer]}>
                <TouchableOpacity
                    style={[ styles.button ]}
                    onPress={ () => { navigation.navigate('personaldata') }}
                >
                    <Text style={ styles.optionTitle} >Datos Personales</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={[ styles.button ]}
                    onPress={ () => { navigation.navigate('userpass') }}
                >
                    <Text style={ styles.optionTitle} >Mi usuario y Contraseña</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={[ styles.button ]}
                    onPress={ () => { navigation.navigate('otherData') }}
                >
                    <Text style={ styles.optionTitle} >Otros datos</Text>
                </TouchableOpacity>
            </View>

            <Tabbarbottom 
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5'
    },
    justifyContainer: {
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
    button : {
        padding: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 5,
        backgroundColor: '#FFF' 
    },
    optionTitle: {
        fontFamily: 'regular'
    }
})
