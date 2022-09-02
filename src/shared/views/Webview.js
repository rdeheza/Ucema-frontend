import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Header from '../../shared/components/header/Header'
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom'

import { WebView } from 'react-native-webview';

const WebviewContainer = ({ route, navigation }) => {
    const { url } = route.params;

    return (
        <SafeAreaView style={ styles.container }>
            <Header  
                navigation = {navigation}
                isVisible = 'true'                
            />
            <WebView 
                style={{ flex: 1 }}
                source={{ uri: url }} 
            />
            <Tabbarbottom
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default WebviewContainer

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    justifyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
