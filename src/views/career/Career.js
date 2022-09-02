import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import Header from '../../shared/components/header/Header'
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom'

const Career = ({ navigation }) => {
    return (
        <SafeAreaView style={ styles.container }>
            <Header 
                navigation = {navigation}
                isVisible = 'true'
            />

            <View style={[ styles.container, styles.justifyContainer]}>
                <TouchableOpacity
                    style={[ styles.button ]}
                    onPress={() => { navigation.navigate('virtual') }}
                >
                    <Text style={ styles.menuOptionTitle }>Mis clases</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[ styles.button ]}
                    onPress={() => { navigation.navigate('courses') }}
                >
                    <Text style={ styles.menuOptionTitle }>Mis Materias / Cursos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[ styles.button ]}
                    onPress={() => { navigation.navigate('exams') }}
                >
                    <Text style={ styles.menuOptionTitle }>Exámenes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[ styles.button ]}
                    onPress={() => { navigation.navigate('notes') }}
                >
                    <Text style={ styles.menuOptionTitle }>Notas oficiales</Text>
                </TouchableOpacity>
                
            </View>

            <Tabbarbottom 
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default Career

const styles = StyleSheet.create({
    container: {
        flex: 1,        
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
    menuOptionTitle: {
        fontFamily: 'regular'
    }
})
