import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native'

import Header from '../../shared/components/header/Header';
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom';

// Example FlatList
import getData from '../../shared/services/getData';
import getCanceledClasses from '../../shared/services/Career/Canceled';
import { useToast } from 'react-native-styled-toast';
import mainStore from '../../shared/Store';
import Moment from 'moment';

const Item = ({ item }) => (
    <>
        <View style={[styles.item]}>
            <View style={[styles.courseTitleWrapper]} >
                <Text style={[styles.courseTitle, styles.textWhite, styles.textUppercase]}>{item.desc_curso}</Text>
                <Text style={[styles.courseTeacher, styles.textWhite]}>{item.profesor}</Text>
                <View style={[ styles.hourContainer]}>
                    <Image source={require('../../assets/courses/clock.png')}  style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10  }} />
                    <Text style={[styles.courseDayHour, styles.textWhite]}>{item.fecha} - {item.hora_desde}</Text>
                </View>
            </View>
            <View style={[styles.courseUbicationWrapper]} >
                <Text style={[styles.textWhite, styles.textBold, styles.textUppercase, styles.canceledTitle]}>cancelada</Text>
            </View>   
        </View>
        {/* { item.newHour != "" 
            ? <View style={ styles.newClassAler }><Text style={[styles.textUppercase, styles.textRed, styles.textBold]}>nueva clase: { item.newHour }</Text></View>
            : <View style={ styles.newClassAler }><Text style={[styles.textUppercase, styles.textRed, styles.textBold]}>nueva clase: sin fecha</Text></View>
        } */}
    </>
);

const Canceled = ({ navigation }) => {
    const { careersFullModel, careerSelected, isLoading, setLoading, setForceCloseApp } = mainStore(); // Carreras del alumno
    const [ canceledClasses, setCanceledClasses ] = useState([]);    
    const { toast } = useToast()
    
    const loadData = ( ) => {
        
        const user = getData('user');
        const token = getData('token');
        const userid = getData('userid');
        const careerData = careersFullModel.filter( career => career.descred == careerSelected );

        user.then( userFounded => {
            if ( userFounded ) {
                token.then( tokenFounded => {
                    if ( tokenFounded ) {
                        userid.then( userIdFounded => {
                            if ( userIdFounded ) {
                                getCanceledClasses(userIdFounded, careerData[0].identificacion, careerData[0].programa, careerData[0].orientiacion, Moment().year(), careerData[0].descred, tokenFounded, userFounded)
                                    .then( response => {
                                        if ( response.status != 200 ) {
                                            setForceCloseApp();
                                        } else if ( response.data.data ) {
                                            setCanceledClasses(response.data.data);
                                            setLoading(false);
                                        } else {
                                            toast({ message: 'Error en la obtención de datos', intent: "ERROR" })
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
    
    const renderItem = ({ item }) => {
        return <Item item={item} onPress={() => setSelectedId(item.id)} />;
    };

    useEffect(() => {
        // setLoading(true);
        loadData()
        return () => { }
    }, [ careersFullModel, careerSelected, isLoading ])

    return (
        <SafeAreaView style={ styles.container }>
            <Header 
                navigation = {navigation}
                isVisible = 'true'
            />
            <View style={[ styles.container, styles.justifyContainer]}>
                <Text style={[ styles.textCapitalize, styles.textItalic, styles.textBold, styles.title, { marginBottom: 20}]}>clases canceladas</Text>
                
                <View style={[ styles.cancelDisclaimerContainer ]}>
                    <TouchableOpacity
                        onPress={ () => navigation.navigate('comunity') }
                    >
                        <Text
                            style={[styles.cancelDisclaimerButtonText]}
                        >La fecha reprogramada la encontrarás en https://ucema.edu.ar/comunidad/ (Sección: Tus Cursos  Clases Canceladas), en las próximas 72 horas</Text>
                    </TouchableOpacity>
                </View>

                { isLoading 
                    ? 
                        <ActivityIndicator
                            style={{ flex: 1 }}
                            color="#666"
                            size="large"
                        /> 
                    :
                        (canceledClasses.length > 0)
                        ?
                        <FlatList
                            data={ canceledClasses }
                            renderItem={ renderItem }
                            keyExtractor={ item => `${item.desc_curso}${item.f_cla}${item.desc_curso}` }
                        />
                        :
                        <Text style={{ flex: 1 }}>No hay clases canceladas hasta el momento.</Text>
                }
                
                

            </View>

            <Tabbarbottom 
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default Canceled

const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },
    justifyContainer: {
        justifyContent: 'center',
        padding: 25,
    },
    yearContainer: {
        backgroundColor: '#E6E7E8',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 5,
        padding: 10,
        marginBottom: 10
    },
    textWhite: {
        color: '#FFF'
    },
    textViolet: {
        color: '#3C345A'
    },
    textCapitalize: {
        textTransform: 'capitalize'
    },
    textUppercase: {
        textTransform: 'uppercase'
    },
    textBold: {
        fontWeight: 'bold'
    }, 
    textItalic :{
        fontStyle: 'italic'
    },
    textRed: {
        color: '#910B26'
    },
    item: {
        backgroundColor: '#6F6AA0',
        padding: 10,
        marginBottom: 5,
        flexDirection: 'row'
    },
    courseTitleWrapper: {
        flex: 2,
    },
    courseUbicationWrapper: {
        height: 35,
        backgroundColor: '#910B26',
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hourContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10
    },
    courseTitle: {
        fontFamily: 'bold',
        fontSize: 14
    },
    courseTeacher: {
        fontFamily: 'lightItalic',
        fontSize: 12
    },
    courseDayHour: {
        fontFamily: 'bold',
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 14
    },
    newClassAler: {
        marginBottom: 15
    },
    title: {
        fontSize: 20,
        fontFamily: 'mediumItalic'
    },
    canceledTitle: {
        fontSize: 12
    },
    cancelDisclaimerContainer: {
        backgroundColor: '#fff3cd',
        marginBottom: 20,
        padding: 10
    },
    cancelDisclaimerButtonText: {
        color: '#664d03',
        fontWeight: 'bold',
        textAlign: 'left'
    }
})
