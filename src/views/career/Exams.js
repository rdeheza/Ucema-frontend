import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import Header from '../../shared/components/header/Header'
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom'

// Async + API
import getData from '../../shared/services/getData';
import getUserExams from '../../shared/services/Career/Exams'
import { useToast } from 'react-native-styled-toast'
import mainStore from '../../shared/Store'
import Moment from 'moment';

const Item = ({ item }) => (
    <View style={[styles.item]}>
        <View style={[styles.courseTitleWrapper]} >
            <Text style={[styles.courseTitle, styles.textWhite, styles.textUppercase]}>{item.profesor}</Text>
            {/* <Text style={[styles.courseTeacher, styles.textWhite]}>{item.sede}</Text> */}
            <View style={[ styles.hourContainer]}>
                <Image source={require('../../assets/courses/clock.png')}  style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10  }} />
                <Text style={[styles.courseDayHour, styles.textWhite]}>{item.dia} / {item.hora_desde}</Text>
            </View>
            <Text style={[styles.courseTeacher, styles.textWhite]}>{item.descripcion} (Sede: {item.sede})</Text> 
            <Text style={[styles.courseTeacher, styles.textWhite]}>Modalidad: {item.modalidad}</Text> 
            
        </View>
        {/* <View style={[styles.courseUbicationWrapper]} >
            <Image source={require('../../assets/courses/pinExam.png')}  style={{ width: 30, height: 30, resizeMode: 'contain' }} />
            <Text style={[styles.textViolet, styles.textBold]}>{item.descripcion} </Text>
        </View> */}
    </View>
);

const Exams = ({ navigation }) => {
    const { careersFullModel, careerSelected, isLoading, setLoading, setForceCloseApp } = mainStore(); // Carreras del alumno
    const [examData, setExamData] = useState([]); // Cursos de la carrera
    const { toast } = useToast()

    const renderItem = ({ item }) => {
        return <Item item={item} />;
    };

    // Simulate API response
    const loadData = () => {        

        const user = getData('user');
        const token = getData('token');
        const userid = getData('userid');
        const careerData = careersFullModel.filter( career => career.descred == careerSelected )

        user.then( userFounded => {
            if ( userFounded ) {
                token.then( tokenFounded => {
                    if ( tokenFounded ) {
                        userid.then( userIdFounded => {
                            if ( userIdFounded ) {
                                getUserExams(userIdFounded, careerData[0].identificacion, careerData[0].programa, careerData[0].orientiacion, tokenFounded, userFounded)
                                    .then( response => {
                                        if ( response.status != 200 ) {
                                            setForceCloseApp();
                                        } else if ( response.data.data ) {
                                            setExamData(response.data.data);
                                            setLoading(false);
                                        } else {
                                            toast({ message: 'Error en la obtención de los exámenes', intent: "ERROR" });
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

    useEffect(() => {        
        loadData()   
        return () => { }
    }, [careersFullModel, careerSelected, isLoading])

    return (
        <SafeAreaView style={ styles.container }>
            <Header 
                navigation = {navigation}
                isVisible = 'true'
            />
            <View style={[ styles.container, styles.justifyContainer]}>
                
                <View style={[ styles.headerTitleWrapper ]}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={[ styles.title, styles.textWhite, styles.textCapitalize, styles.textItalic, styles.textBold ]}>exámenes finales</Text>
                    </View>
                </View>
                
                
                <View style={[ styles.yearContainer ]}>
                    <Text style={[ styles.textViolet, styles.textUppercase, styles.textItalic, styles.textBold, styles.yearTitle ]}>año {Moment().year()}</Text>
                </View>

                
                    { isLoading 
                        ? 
                            <ActivityIndicator
                                style={{ flex: 1 }}
                                color="#FFF"
                                size="large"
                            /> 
                        :
                            ( examData.length > 0 )
                            ?
                                <FlatList
                                    data={ examData }
                                    renderItem={renderItem}
                                    keyExtractor={item => `${item.dia}-${item.hora_desde}-${item.profesor}`}
                                /> 
                            :
                            <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: "#FFF"}}>No hay exámenes al momento</Text>
                    }
            </View>

            <Tabbarbottom 
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default Exams

const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },
    justifyContainer: {
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#3C345A'
    },
    yearTitle: {
        flex: 1  
    },
    semestreSegment: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    headerTitleWrapper: { 
        justifyContent: 'center', 
        flexDirection: 'row', 
        alignItems: 'flex-start' 
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
    item: {
        backgroundColor: '#6F6AA0',
        padding: 20,
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
    },
    hourContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
    inputIOS: {
        fontSize: 20,
        marginBottom: 20,
        color: '#FFF',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 20,
        marginBottom: 20,
        color: '#FFF',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    title: {
        fontSize: 20,
        fontFamily: 'mediumItalic'
    }
})
