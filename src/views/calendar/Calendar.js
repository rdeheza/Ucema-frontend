import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../shared/components/header/Header';
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom';

import getData from '../../shared/services/getData';
import getDayClasses from '../../shared/services/DayClasses/DayClasses';
import Moment from 'moment';
import * as WebBrowser from 'expo-web-browser';
import mainStore from '../../shared/Store';

const Item = ({ item }) => (
    <View style={ styles.classContainer }>
        <Text style={ styles.classTitle }>{item.descrip_mat} {item.descrip_prog} </Text>
        <Text style={ styles.classDayHour }>{ Moment(item.fecha).format("DD/MM/yyyy")} - de {item.hora_desde} a {item.hora_hasta}</Text>
    </View>    
);


const Calendar = ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [coursesOfDay, setCoursesOfDay] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { setForceCloseApp } = mainStore();

    const today = Moment().format('DD/MM/yyyy').replace("/","").replace("/","");
    const lastDayWeek = Moment().add(5, 'days').format('DD/MM/yyyy').replace("/","").replace("/","")

    const _handlePressButtonAsync = async () => {
        await WebBrowser.openBrowserAsync('https://ucema.edu.ar/misclases');
    };

    const renderItem = ({ item }) => {
        return <Item item={item} />;
    };

    const loadData = () => {

        const user = getData('user');
        const token = getData('token');
        const userid = getData('userid');

        user.then( userFounded => {
            if ( userFounded ) {
                token.then( tokenFounded => {
                    if ( tokenFounded ) {
                        userid.then( userIdFounded => {
                            if ( userIdFounded ) {
                                getDayClasses(userIdFounded, today, lastDayWeek, tokenFounded, userFounded)
                                    .then( response => {
                                        if ( response.status != 200 ) {
                                            setForceCloseApp();
                                        } else if ( response.data.data ) {

                                            setUserName(userFounded)
                                            setCoursesOfDay(response.data.data)
                                            setLoading(false)
                                        } else {
                                            toast({ message: 'Error en la obtención de las clases del dia', intent: "ERROR" })
                                        }
                                    })
                            }
                        })
                    }
                })
            }
        })
    }

    useEffect(() => {

        loadData();    

        

        return () => {}
    }, [])

    return (
        <SafeAreaView style={ styles.container }>
            <Header 
                navigation = {navigation}
                isVisible = 'true'
            />


            { isLoading 
                ? 
                    <ActivityIndicator
                        style={{ flex: 1 }}
                        color="#FFF"
                        size="large"
                    /> 
                :

                ( coursesOfDay.length > 0 ) 
                ?
                    <FlatList
                        ListHeaderComponent={
                            <View style={{ marginBottom: 20 }}>
                                <Text style={[ styles.text ]} >Estimado { userName }</Text>
                                <Text style={[ styles.text ]} >A continuación, se muestran las clases a las que deberá asistir de manera online durante los próximos días:</Text>
                            </View>
                        }
                        data={ coursesOfDay }
                        renderItem={ renderItem }
                        keyExtractor={ item => `${item.idClase}` }
                        style={ styles.coursesList }
                        ListFooterComponent={
                            <>
                            <View style={{ marginTop: 20 }}>
                                <Text style={[ styles.text ]} >Para acceder a sus clases deberá dar click en el boton de IR A CLASES ONLINE. Allí deberá colocar su usuario y contraseña de UCEMA, y luego hacer click en el botón "ir a mi clase"</Text>
                                <Text style={[ styles.text ]} >NOTA: Por favor, si Ud. tiene alguna duda o problema para acceder, comuníquese con secretaría academica</Text>
                            </View>
                            <View style={{ marginTop: 20, marginBottom: 50 }}>
                                <TouchableOpacity 
                                    style={styles.goToOnlineClassessButton}
                                    onPress={ () => _handlePressButtonAsync() }    
                                >
                                    <Text style={ styles.goToOnlineClassessButtonText } >Ir a clases online</Text>
                                </TouchableOpacity>
                            </View>
                            </>
                        }
                    />
                : 
                 <Text style={{ flex: 1, paddingTop: 30, paddingLeft: 15 }}>No hay clases para la semana entrante...</Text>
            }         

            <Tabbarbottom 
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default Calendar

const styles = StyleSheet.create({
    container: {
        flex: 1   
    },
    classesContainer: {
        flex: 1,
        marginTop: 20
    },
    text: {
        fontFamily: 'regular',
        fontSize: 14
    },
    coursesList: {
        flex: 1,
        padding: 16
    },
    classContainer: {
        paddingTop: 10,
        paddingBottom: 10
    },
    classTitle: {
        fontFamily: 'bold'
    },
    classDayHour: {
        marginTop: 5,
        fontFamily: 'regular'
    },
    goToOnlineClassessButton: {
        borderRadius: 20,
        backgroundColor: '#302E2B',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    goToOnlineClassessButtonText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontFamily: 'regular'
    }
})

