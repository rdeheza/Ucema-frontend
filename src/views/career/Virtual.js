import React from 'react'
import { StyleSheet, Text, View,Image, TouchableOpacity, SafeAreaView } from 'react-native'
import Header from '../../shared/components/header/Header'
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom'

const Virtual = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header
                navigation={navigation}
                isVisible='true'
            />
            <View style={[styles.container, styles.justifyContainer]}>
                {/* <TouchableOpacity
                        style={[ styles.button ]}
                    onPress={ () => { navigation.navigate('classroom') }}
                >
                    <Text style={ styles.menuOption }>Aula</Text>
                </TouchableOpacity> */}
                 <TouchableOpacity
                        style={[ styles.button ]}
                    onPress={ () => { navigation.navigate('programmed') }}
                >
                    <Text style={ styles.menuOption }>Clases programadas</Text>
                </TouchableOpacity> 
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => { navigation.navigate('calendar') }}
                >
                    {/*  <Image source={require('../../assets/home/calendar_icon.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />  */}
                  {/*   <Text style={[styles.optionMenu, styles.colorCalendar]}>Mis clases virtuales</Text> */}
                    <Text style={[styles.menuOption]}>Mis clases virtuales</Text>
                   {/*  */}

                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => { navigation.navigate('canceled') }}
                >
                    <Text style={styles.menuOption}>Clases Canceladas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => { navigation.navigate('comunity') }}
                >
                    <Text style={styles.menuOption}>Comunidad</Text>
                </TouchableOpacity>
            </View>

            <Tabbarbottom
                navigation={navigation}
            />
        </SafeAreaView>
    )
}

export default Virtual

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    justifyContainer: {
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
    button: {
        padding: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 5,
        backgroundColor: '#FFF'
    },
    menuOption: {
        fontFamily: 'regular'
    },
    optionMenu: {
        flex: 1,
        marginLeft: 20,
        fontSize: 14,
        textTransform: 'uppercase',
        fontFamily: 'regular'
    },
    colorCalendar: {
        color: '#490A19'     
    },
    borderCalendar:{
        borderLeftWidth: 8,
        borderLeftColor: '#490A19'        
    },
})
