import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import Header from '../../shared/components/header/Header';
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom';
import Moment from 'moment';

import getData from '../../shared/services/getData';
import removeData from '../../shared/services/removeData';
import mainStore from '../../shared/Store';
import { useToast } from 'react-native-styled-toast';

import { getPushMessages, updatePushMessages } from '../../shared/services/Notifications/notifications';
import { height, textAlign } from 'styled-system';

const Item = ({ item }) => (
    <>
        <View style={[styles.item, item.STATUS == 1 ? styles.opaqueNotification : '', item.STATUS == 1 ? styles.borderRead : styles.borderUnread]} >
            <View style={[styles.notificationWrapper]} >

                <View style={{ flex: 1 }}>
                    <Text style={[styles.notificationTitle, item.STATUS == 1 ? styles.textGray : styles.textRed, styles.textUppercase, styles.textItalic]}>{item.TITULO}</Text>
                    <View style={[ styles.hourContainer]}>
                        <Text style={[styles.courseDayHour, styles.textGray]}>Notificado el: { Moment(item.FECHA).format('DD/MM/yyyy') }</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    { item.STATUS == 0
                        ? <Image source={ require('../../assets/navbar/notification_dot.png')} style={{ width: 15, height: 15}} />
                        : <></>
                    }
                </View>
                
            </View>
            <View style={[styles.notificationMessageWrapper]}>
                <Text>{ item.MENSAJE }</Text>    
            </View>  
        </View>
        {/* { item.newHour != "" 
            ? <View style={ styles.newClassAler }><Text style={[styles.textUppercase, styles.textRed, styles.textBold]}>nueva clase: { item.newHour }</Text></View>
            : <View style={ styles.newClassAler }><Text style={[styles.textUppercase, styles.textRed, styles.textBold]}>nueva clase: sin fecha</Text></View>
        } */}
    </>
);

const Notifications = ({ navigation }) => {
    const [notificationsData, setNotifications] = useState([]);
    const { isLoading, setLoading, setForceCloseApp } = mainStore(); // Notificaciones del alumno  
    const { toast } = useToast()

    const [pendingNotifications, setPendingNotifications] = useState(0)

    let changeNotificationStatus = null
    
    const setBadgeIcon = (notifications) => {
        let unread = notifications.filter( noti => {
            return noti.STATUS == 0
        }).length
        setPendingNotifications(unread)
    }

    const loadData = () => {

        const user = getData('user');
        const token = getData('token');
        const userid = getData('userid');

        setLoading(true)

        user.then( userFounded => {
            if ( userFounded ) {
                token.then( tokenFounded => {
                    if ( tokenFounded ) {
                        userid.then( userIdFounded => {
                            if ( userIdFounded ) {
                                getPushMessages(userIdFounded, tokenFounded, userFounded)
                                    .then( response => {
                                        if ( response.status != 200 ) {
                                            setForceCloseApp();
                                        } else if ( response.data.data ) {
                                            setNotifications(response.data.data)
                                            setBadgeIcon(response.data.data)
                                            setLoading(false);
                                        } else {
                                            toast({ message: 'Error en la obtención de la notificaciones', intent: "ERROR" })
                                            setLoading(false);
                                        }
                                    })
                            }
                        })
                    }
                })
            }
        })
    }

    const updateStatusMessage = (item) => {
        const token = getData('token');
    
        if (item.STATUS == 0) {
            token.then( tokenFounded => {
                if ( tokenFounded ) {
                    updatePushMessages(item.ID, tokenFounded)
                        .then( response => {
                            if ( response.status != 200 ) {
                                // Show toast
                            } else {
                                loadData()
                            }
                        })
                }
            })
        }
    }

    const renderItem = ({ item }) => {
        return <TouchableOpacity onPress={ () => { updateStatusMessage(item) }} ><Item item={item} /></TouchableOpacity>
    };

    // Register for Handler notification when app is running
    useEffect(() => {
        changeNotificationStatus = removeData('pendingNotification');
        loadData()
        return () => {}
    }, []);

    return (
        <SafeAreaView style={ styles.container }>
            <Header  
                navigation = {navigation}
                isVisible = 'true'                
            />

            <View style={[ styles.container ]}>
                <ImageBackground source={require('../../assets/notifications/notifications_bkg.png')} style={[ styles.headerContainer, { height: 100, width: '100%' }]}>
                    
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginRight: 10
                    }}>
                        <Image source={require('../../assets/notifications/icon.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        <View style={{
                            backgroundColor: '#910B26',
                            borderRadius: 50,
                            height: 25,
                            width: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: -10
                        }}><Text style={{ 
                            color: '#fff',
                            fontSize: 8,
                            fontFamily: 'boldItalic'
                        }}>{ pendingNotifications }</Text></View>
                    </View>
                    
                    <Text style={ styles.headerTitle }>notificaciones</Text>
                </ImageBackground>
                <View 
                    style={[ styles.notificationsContainer ]} 
                    contentContainerStyle={{paddingBottom: 30}}    
                >       
                      { isLoading 
                        ? 
                            <ActivityIndicator
                                style={{ flex: 1 }}
                                color="#666"
                                size="large"
                            /> 
                        :
                        (notificationsData.length > 0)
                            ?
                                <FlatList
                                    data={ notificationsData }
                                    renderItem={ renderItem }
                                    keyExtractor={ item => item.ID.toString() }
                                />
                            :
                                <View style={[ styles.notificationsListItems ]}>
                                    <Text style={{ fontSize: 16, fontFamily: 'regular' }}>No hay notificaciones al momento</Text>
                                </View>   
                        } 
                                     
                </View>
            </View>
            <Tabbarbottom
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerTitle: {
        fontFamily: 'boldItalic',
        textTransform: 'uppercase',
        fontSize: 18
    },
    notificationsContainer: {
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
    },
    notificationsListItems: {
        alignItems: 'center'
    },
    textGray: {
        color: '#58595B'
    },
    textRed: {
        color: '#910B26'
    },
    textCapitalize: {
        textTransform: 'capitalize'
    },
    textUppercase: {
        textTransform: 'uppercase'
    },
    item: {
        borderLeftWidth: 5,
        marginBottom: 10,
        backgroundColor: '#FFF'
    },
    borderRead: {
        borderLeftColor: '#BCBEC0',
    },
    borderUnread: {
        borderLeftColor: '#910B26',
    },
    notificationWrapper: {
        padding: 20,
        flexDirection: 'row'
    },
    notificationTitle: {
        fontFamily: 'bold',
        fontSize: 22
    },
    hourContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 5
    },
    notificationMessageWrapper: {
        padding: 15,
        backgroundColor: '#E6E7E8',
        fontFamily: 'medium'
    },
    opaqueNotification: {
        opacity: 0.5
    }
})
