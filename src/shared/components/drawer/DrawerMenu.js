import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItemList
  } from '@react-navigation/drawer';

const DrawerMenu = ({ ...props }) => {
    
    return (
        <DrawerContentScrollView {...props}>
            <View style={ styles.drawerImageContainer }>
                <Image source={ require('../../../assets/header/logo.png') } style={{ width: 200, resizeMode: 'contain'}} />
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

export default DrawerMenu

const styles = StyleSheet.create({
    drawerImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        marginBottom: 20
    }
})
