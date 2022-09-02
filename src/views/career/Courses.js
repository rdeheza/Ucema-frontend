import React, { useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import Header from '../../shared/components/header/Header';
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom';

// Async + API
import getUserCourses from '../../shared/services/Career/Courses';
import getData from '../../shared/services/getData';
import mainStore from '../../shared/Store'
import { useToast } from 'react-native-styled-toast'
import Moment from 'moment';

const Item = ({ item }) => (
    
    <View style={[styles.item]}>
        <Text style={[styles.courseTitle, styles.textWhite, styles.textUppercase]}>{item.descrip}</Text>
        <Text style={[styles.courseTeacher, styles.textWhite]}>{item.periodo}° {item.tipo_periodo}</Text>

        {/* <View style={[ styles.hourContainer]}>
            <Image source={require('../../assets/courses/clock.png')}  style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10  }} />
            <Text style={[styles.courseDayHour, styles.textWhite]}>{item.dia_semanal} / {item.hora}</Text>
        </View> */}
    </View>    
);

const Courses = ({ navigation }) => {
    const { careersFullModel, careerSelected, isLoading, setLoading } = mainStore(); // Carreras del alumno
    const [coursesData, setCourseData] = useState(null); // Cursos de la carrera
    const { toast } = useToast()

    const renderItem = ({ item }) => {
        return <Item item={item} />;
    };

    // LoadData
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
                                getUserCourses(userIdFounded, careerData[0].identificacion, careerData[0].programa, careerData[0].orientiacion, Moment().year(), careerData[0].descred, tokenFounded, userFounded)
                                    .then( response => {
                                        if ( response.status != 200 ) {
                                            setForceCloseApp();
                                        } else if ( response.data.data ) {
                                            setCourseData(response.data.data);
                                            setLoading(false);
                                        } else {
                                            toast({ message: 'Error en la obtención de los cursos', intent: "ERROR" });
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
                        <Text style={[ styles.textWhite, styles.textCapitalize, styles.textItalic, styles.textBold, styles.title]}>mis materias</Text>
                        <Text style={[ styles.textWhite, styles.textCapitalize, styles.textItalic, styles.textBold, styles.title]}>cursos</Text>
                    </View>
                    {/* <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={[ styles.textWhite, styles.textCapitalize, styles.textUppercase, styles.textBold, styles.title]}>carrera</Text>
                    </View> */}
                </View>
                
                
                <View style={[ styles.yearContainer ]}>
                    <Text style={[ styles.textViolet, styles.textUppercase, styles.textItalic, styles.textBold, styles.yearTitle ]}>año {Moment().year()}</Text>
                    <View style={styles.flexDirectionCustom}>
                        {/* <Text style={[ styles.textViolet, styles.textCapitalize, styles.textItalic, styles.textBold]}>semestre</Text> */}
                        
                        {/* <SegmentedControl
                            style={{ flex: 1, marginLeft:10 }}
                            values={['1', '2']}
                            selectedIndex={selectedIndex}
                            onChange={(event) => {
                                setIndex(event.nativeEvent.selectedSegmentIndex);
                                loadCoursesData(selectedCareer, event.nativeEvent.selectedSegmentIndex+1);
                            }}
                        /> */}

                    </View>
                </View>

                { isLoading 
                    ? 
                        <ActivityIndicator
                            style={{ flex: 1 }}
                            color="#FFF"
                            size="large"
                        /> 
                    :
                        (coursesData && coursesData.length > 0 )
                        ?
                            <FlatList
                                data={ coursesData }
                                renderItem={ renderItem }
                                keyExtractor={item => `${item.materia}${item.curso}${item.dia_semanal}` }
                            />
                        :
                        <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: "#FFF"}}>No hay cursos al momento</Text>
                }
                

            </View>

            <Tabbarbottom 
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default Courses

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    justifyContainer: {
        justifyContent: 'center',
        padding: 25,
        backgroundColor: '#3C345A'
    },
    yearTitle: {
        flex: 1  
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
    flexDirectionCustom: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
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
    title: {
        fontSize: 20
    },
    item: {
        backgroundColor: '#6F6AA0',
        padding: 20,
        marginBottom: 5
    },
    hourContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    courseTitle: {
        fontFamily: 'bold'
    },
    courseTeacher: {
        fontFamily: 'light',
        marginTop: 5,
        marginBottom: 5
    },
    courseDayHour: {
        fontWeight: 'bold'
    }
})
