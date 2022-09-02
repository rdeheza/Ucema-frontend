import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, View, Image, Vibration } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';

// Push Notifications
import * as Notifications from 'expo-notifications';

// LocalStorage para PushNotification
import storeData from '../../../shared/services/storeData'
import getData from '../../../shared/services/getData';
import removeData from '../../../shared/services/removeData';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    }),
});

const Tabbarbottom = ({ navigation }) => {
    const [badge, setBadge] = useState(false)
    let changeNotificationStatus = null

    const removeNotification = () => {
        changeNotificationStatus = removeData('pendingNotification')
        changeNotificationStatus.then( response => {
            if ( response == null ) {
                setBadge(false)
                Notifications.setBadgeCountAsync(0);
                navigation.navigate('notifications')
            }
        })
    }

    const _checkPendingNotifications = async () => {
        changeNotificationStatus = getData('pendingNotification')
        changeNotificationStatus.then( response => {
            if ( response ) {
                setBadge(true)
            } else {
                setBadge(false)
            }
        })
    }

    // Register for Handler notification when app is running
    useEffect(() => {
        _checkPendingNotifications();
        
        const addNotificationReceivedListener = Notifications.addNotificationReceivedListener( response => {
            if (response) {
                Vibration.vibrate();
                changeNotificationStatus = storeData('pendingNotification', 'true')
                setBadge(true)
            }
            
        });
        const addNotificationResponseReceivedListener = Notifications.addNotificationResponseReceivedListener( () => {
            removeNotification()        
        });


        return () => {
            addNotificationReceivedListener.remove();
            addNotificationResponseReceivedListener.remove();
         }
    }, []);

    return (

        <ImageBackground
            source={require('../../../assets/navbar/background.png')} 
            style={ styles.container }
        >
            <View>
                <TouchableHighlight
                    onPress={ () => { 
                        removeNotification()                        
                    }}
                >   
                    <View style={{ flexDirection: "row" }}>
                        <Image 
                            source={require('../../../assets/navbar/notification_icon.png')} 
                            style={{ width: 30, height: 30, resizeMode: 'contain'  }}
                        />
                        { badge 
                            ? <Image source={ require('../../../assets/navbar/notification_dot.png')} style={{ width: 10, height: 10}} />
                            : <></>
                        }
                    </View>
                    
                </TouchableHighlight>
            </View>
            {/* <View>
                <TouchableHighlight
                    onPress={ () => { navigation.navigate('email') }}
                >
                    <Image 
                        source={require('../../../assets/navbar/envelop_icon.png')}  
                        style={{ width: 30, height: 30, resizeMode: 'contain'  }}
                    />
                </TouchableHighlight>
            </View> */}
            <View>
                <TouchableHighlight
                    onPress={ () => { navigation.navigate('contacts') }}
                >
                    <Image 
                        source={require('../../../assets/navbar/chat_icon.png')} 
                        style={{ width: 30, height: 30, resizeMode: 'contain'  }}
                    />
                </TouchableHighlight>
            </View>
        </ImageBackground>        
    )
}

export default Tabbarbottom

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        resizeMode: 'contain'
    }
})
