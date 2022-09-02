// Permission
import { Platform, Linking, Alert } from "react-native";

import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import * as IntentLauncher from 'expo-intent-launcher';

import getData from '../../shared/services/getData';
import { getPushToken, savePushToken } from '../../shared/services/Notifications/notifications';

const registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted' || Platform.OS === 'android') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert(
        "Las notificaciones estan deshabilitadas",
        "Desea habilitarlas?",
        [
          { text: "Cancelar", onPress: () =>  {
            // ToDo: Debo guardar el cancelado, en el LocalStorage para no volver a pedirlo si cancelo 1 vez.
          }},
          { text: "Permitir", onPress: () => { 
            if (Platform.OS === 'ios') {
              Linking.openURL("app-settings:")
            } else {
              const bundleIdentifier = Application.applicationId;
              IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS, {
                data: `package:${bundleIdentifier}`,
              });
            }
          }},
        ],
        { cancelable: false }
      );
    }

    const pushToken = await Notifications.getExpoPushTokenAsync();

    const userid = getData('userid');
    const user = getData('user');
    const token = getData('token');

    user.then( userFounded => {
      if ( userFounded ) {
          token.then( tokenFounded => {
              if ( tokenFounded ) {
                userid.then( userIdFounded => {
                  if( userIdFounded != null ) { 
                    getPushToken(userIdFounded, tokenFounded, userFounded )
                      .then( response => {
                        if ( response.status != 200 ) {
                            
                        } else if ( response.data.data ) {
                          savePushToken(userIdFounded, pushToken.data, tokenFounded, userFounded)
                        } 

                      })
                  }       
              })
              }
          })
      }
    }) 

  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
};

export default registerForPushNotificationsAsync