import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Header from '../../shared/components/header/Header'
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom'

const Email = ({ navigation }) => {
    return (
        <SafeAreaView style={ styles.container }>
            <Header  
                navigation = {navigation}
                isVisible = 'true'                
            />
            <View style={[ styles.container, styles.justifyContainer]}>
                <Text>Email</Text>
            </View>
            <Tabbarbottom
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default Email

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    justifyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
