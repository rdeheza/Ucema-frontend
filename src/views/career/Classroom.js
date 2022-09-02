import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import Header from '../../shared/components/header/Header';
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom';
import Moment from 'moment';

// Example FlatList
import getClassroomsList from '../../shared/services/Career/Classroom';
import getData from '../../shared/services/getData';
import { useToast } from 'react-native-styled-toast';
import mainStore from '../../shared/Store'

const Item = ({ item }) => (
    <View style={[styles.item]}>
        <View style={[styles.courseTitleWrapper]} >
            <Text style={[styles.courseTitle, styles.textWhite, styles.textUppercase]}>{item.materia}</Text>
            <Text style={[styles.courseTeacher, styles.textWhite]}>{item.profesor}</Text>
            <View style={[ styles.hourContainer]}>
                <Image source={require('../../assets/courses/clock.png')}  style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10  }} />
            <Text style={[styles.courseDayHour, styles.textWhite]}>{item.desde} - {item.hasta}</Text>
            </View>
        </View>
        <View style={[styles.courseUbicationWrapper]} >
            <Image source={require('../../assets/courses/pinExam.png')}  style={{ width: 30, height: 30, resizeMode: 'contain' }} />
            <Text style={[styles.textViolet, styles.textBold]}>{item.aula} </Text>
        </View>        
    </View>
);

const Classroom = ({ navigation }) => {

    const today = Moment();
    const [classroomData, setClassroomData] = useState([]);
    const [date, setDate] = useState(today.format('DD/MM/yyyy'));
    const { toast } = useToast();
    const { setForceCloseApp, isLoading, setLoading } = mainStore();

    const loadData = () => {

        const user = getData('user');
        const token = getData('token');
        const userid = getData('userid');

        setLoading(true);

        user.then( userFounded => {
            if ( userFounded ) {
                token.then( tokenFounded => {
                    if ( tokenFounded ) {
                        userid.then( userIdFounded => {
                            if ( userIdFounded ) {

                                getClassroomsList(date, userIdFounded, tokenFounded, userFounded)
                                    .then( response => {
                                        if ( response.status != 200 ) {
                                            setForceCloseApp();
                                        } else if ( response.data.data ) {
                                            setClassroomData(response.data.data);
                                            setLoading(false);
                                        } else {
                                            toast({ message: 'Error en la obtención de datos', intent: "ERROR" });
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
        return <Item item={item} />;
    };

    useEffect(() => {
        
        loadData();        
        
        return () => { }
    }, [])

    return (
        <SafeAreaView style={ styles.container }>
            <Header 
                navigation = {navigation}
                isVisible = 'true'
            />
            <View style={[ styles.container, styles.justifyContainer]}>
                <Text style={[ styles.sectionTitle, styles.textCapitalize, styles.textItalic, styles.textBold]}>aulas</Text>
                <View style={[ styles.yearContainer ]}>
                    <Text style={[ styles.textViolet, styles.textUppercase]}>Aulas para el día { date } </Text>                  
                </View>

                { isLoading 
                    ? 
                        <ActivityIndicator
                            style={{ flex: 1 }}
                            color="#666"
                            size="large"
                        /> 
                    :
                        (classroomData.length > 0)
                            ?
                            <FlatList
                                data={ classroomData }
                                renderItem={ renderItem }
                                keyExtractor={ item => `${item.programa}${item.materia}${item.hasta}` }
                            />
                            :
                            <Text style={{ flex: 1 }}>No hay clases del día...</Text>                        
                } 
            </View>            

            <Tabbarbottom 
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default Classroom

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
        color: '#3C345A',
        fontFamily: 'medium'
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
    item: {
        backgroundColor: '#6F6AA0',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        marginBottom: 5,
        flexDirection: 'row'
    },
    courseTitleWrapper: {
        flex: 3,
    },
    courseUbicationWrapper: {
        flex: 1,
        backgroundColor: '#E6E7E8',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    hourContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 5
    },
    courseTitle: {
        fontFamily: 'bold',
        fontSize: 16
    },
    courseTeacher: {
        fontFamily: 'lightItalic'
    },
    courseDayHour: {
        fontFamily: 'bold',
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 14
    },
    sectionTitle: {
        fontFamily: 'mediumItalic'
    }
})
