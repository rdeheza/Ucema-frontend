import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, Text, FlatList, ActivityIndicator } from 'react-native'

import Header from '../../shared/components/header/Header'
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom'
import { useToast } from 'react-native-styled-toast'
import mainStore from '../../shared/Store'
import getData from '../../shared/services/getData';
import getUserNotes from '../../shared/services/Career/Notes'

const Item = ({ item }) => (
    <View style={[styles.item]}>
        <View style={[styles.courseCodWrapper, { width: 70 }]} >
            <View style={{borderRadius: 50, borderColor: "#FFF", borderWidth: 1, padding: 5, width: 45, height: 45, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[styles.courseTitle, styles.textWhite, styles.textUppercase, styles.textBold, { fontSize: 12} ]}>{item.n_id_materia}</Text>
            </View>
        </View>
        <View style={[styles.courseNameWrapper, { justifyContent: 'center', flex: 2 } ]} >
            <Text style={[styles.courseTitle, styles.textWhite, styles.textUppercase, { fontSize: 12} ]}>{item.d_publica}</Text>
        </View>
        <View style={[styles.courseDateWrapper, { flex: 1 } ]} >
            <View style={{ alignItems: 'center' }}>
                <Text style={[styles.courseTitle, styles.textWhite, styles.textUppercase, styles.textBold, { fontSize: 18} ]}>{item.nota}</Text>
                <Text style={[styles.courseTitle, styles.textWhite, styles.textUppercase, { fontSize: 12} ]}>{item.f_rinde}</Text>
            </View>
            
        </View>        
    </View>
);

const Notes = ({ navigation }) => {
    const { careersFullModel, careerSelected, isLoading, setLoading, setForceCloseApp } = mainStore();
    const [ notesData, setNotesData] = useState([]); // Cursos de la carrera
    const { toast } = useToast()

    const renderItem = ({ item }) => {
        return <Item item={item} />;
    };

    // Simulate API response
    const loadData = () => {

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
                                getUserNotes(userIdFounded, careerData[0].identificacion, careerData[0].programa, careerData[0].orientiacion, tokenFounded, userFounded)
                                    .then( response => {
                                        if ( response.status != 200 ) {
                                            setForceCloseApp();
                                        } else if ( response.data.data ) {
                                            setNotesData(response.data.data);
                                            setLoading(false);
                                        } else if ( response.data == undefined || (response.data && response.data.data == 0) || (response.data.data3 && response.data.data3.length == 0) ) { 
                                            setLoading(false);
                                        } else {
                                            toast({ message: 'Error en la obtención de las notas', intent: "ERROR" });
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
                <Text style={[ styles.textCapitalize, styles.textItalic, styles.textBold, styles.title]}>mis notas finales</Text>
                <Text style={[ styles.textCapitalize, styles.textItalic, styles.textBold, styles.title]}>histórica académica</Text>

                <View style={[ styles.yearContainer ]}>
                    <View style={[ styles.notesHeaderWrapper ]}>
                        <Text style={[ styles.notesHeaderText, styles.textViolet, styles.textCapitalize, { width: 60 } ]}>cod.</Text>
                        <Text style={[ styles.notesHeaderText, styles.textViolet, styles.textCapitalize, { flex: 2} ]}>materia</Text>
                        <Text style={[ styles.notesHeaderText, styles.textViolet, styles.textCapitalize, { flex: 1} ]}>nota fecha</Text>
                    </View>
                    
                </View>
                { isLoading 
                    ? 
                        <ActivityIndicator
                            style={{ flex: 1 }}
                            color="#666"
                            size="large"
                        /> 
                    :
                        ( notesData.length > 0 )
                        ?
                            <FlatList
                                data={notesData}
                                renderItem={renderItem}
                                keyExtractor={item => `${item.n_id_materia}` }
                            />
                        :
                            <Text style={{ paddingTop: 15, flex: 1, justifyContent: 'center', alignItems: 'center', color: "#333"}}>No hay notas disponibles al momento</Text>
                }
            </View>
            <Tabbarbottom 
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default Notes

const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },
    justifyContainer: {
        justifyContent: 'center',
        padding: 16
    },
    textCapitalize: {
        textTransform: 'capitalize'
    }, 
    textItalic :{
        fontStyle: 'italic'
    },
    textViolet: {
        color: '#3C345A'
    },
    yearContainer: {
        backgroundColor: '#E6E7E8',
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    notesHeaderWrapper: {
        flexDirection: 'row',
    },
    notesHeaderText: {
        textAlign: 'center'
    },
    item: {
        flexDirection: 'row',
        flex: 1
    },
    courseCodWrapper: {
        backgroundColor: '#4D4675',
        justifyContent: 'center',
        alignItems: 'center'
    },
    courseNameWrapper: {
        backgroundColor: '#6F6AA0',
        padding: 15
    },
    courseDateWrapper: {
        backgroundColor: '#8584B2',
        padding: 15
    },
    courseTitle: {
        color: '#FFF',
        fontFamily: 'medium'
    },
    textBold: {
        fontFamily: 'bold'
    },
    textUppercase: {
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 20,
        fontFamily: 'mediumItalic'
    }
})
