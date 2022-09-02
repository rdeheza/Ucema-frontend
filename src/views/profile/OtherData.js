import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import Header from '../../shared/components/header/Header'
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom'

// API endpoint
import getExamPermission from '../../shared/services/Profile/ExamPermission'
import getTutorName from '../../shared/services/Profile/Tutor'
import getData from '../../shared/services/getData'
import { useToast } from 'react-native-styled-toast'

import mainStore from '../../shared/Store'


const OtherData = ({ navigation }) => {
    const [ ExamPermission, setExamPermission] = useState("");
    const [ tutorName, setTutorName] = useState("");
    const { toast } = useToast();
    const { isLoading, setLoading, careersFullModel, careerSelected, setForceCloseApp } = mainStore(); // Carreras del alumno

    // LoadData
    const loadData = () => {

        const user = getData('user');
        const token = getData('token');
        const userid = getData('userid');
        const careerData = careersFullModel.filter( career => career.descred == careerSelected )

        setLoading(true);

        user.then( userFounded => {
            if ( userFounded ) {
                token.then( tokenFounded => {
                    if ( tokenFounded ) {
                        userid.then( userIdFounded => {
                            if ( userIdFounded ) {

                                getExamPermission(userIdFounded, careerData[0].identificacion, careerData[0].programa, careerData[0].orientiacion, tokenFounded, userFounded)
                                .then( response => {
                                    if ( response.status != 200 ) {
                                        setForceCloseApp();
                                    } else if ( response.data.data ) {
                                        setExamPermission(response.data.data[0].permiso);
                                    } else if ( response.data == undefined) {
                                        setExamPermission("")
                                    } else {
                                        toast({ message: 'Error en la obtención del permiso de exámen', intent: "ERROR" })
                                    }
                                })

                                getTutorName(userIdFounded, tokenFounded, userFounded)
                                .then( response => {

                                    // console.log("TUTOR =>", response)

                                    if ( response.status != 200 ) {
                                        setForceCloseApp();
                                    } else if ( response.data.data ) {
                                        let data = response.data.data
                                        data.map( tutor => {
                                            setTutorName(tutor.tutor)
                                        })
                                    } else if ( response.data == undefined || (response.data.data && response.data.data.length == 0) || (response.data.data2 && response.data.data2.length == 0) ) {
                                        setTutorName("")
                                    } else {
                                        toast({ message: 'Error en la obtención del tutor', intent: "ERROR" })
                                    }
                                })


                                setLoading(false);
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
    }, [careersFullModel, careerSelected])


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
                            color="#666"
                            size="large"
                        /> 
                    :
                    <View style={[ styles.container, styles.justifyContainer]}>

                        <View styles={[ styles.sectionTitleWrapper ]}>
                            <Text style={[ styles.sectionTitle, styles.textUppercase ]}>otros datos</Text>
                        </View>
                        <View>
                            <Text style={[ styles.labelText, styles.textItalic, styles.textBold ]}>Habilitado para rendir exámenes</Text>
                            <TextInput style={[ styles.input, styles.marginTop, styles.textUppercase ]} editable={false} value={ExamPermission}/>

                            <Text style={[ styles.labelText, styles.textItalic, styles.textBold ]}>Tutor</Text>
                            <TextInput style={[ styles.input, styles.marginTop ]} editable={false} value={tutorName}/>

                            <TouchableOpacity 
                                style={styles.viewInvoicesButton}
                                onPress={ () => navigation.navigate('invoices') }    
                            >
                                <Text style={ styles.viewInvoicesButtonText } >ver ultimas facturas</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            }
            

            <Tabbarbottom 
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default OtherData

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    justifyContainer: {
        backgroundColor: '#e5e5e5',
        padding: 20
    },  
    input: {
        height: 40,
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingLeft: 20
    },
    marginTop: {
        marginTop: 10
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
    textNormal: {
        fontWeight: '400',
        fontFamily: 'light'
    },
    labelText: {
        fontFamily: 'light'
    },
    sectionTitleWrapper: {
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'mediumItalic',
        marginBottom: 40
    },
    viewInvoicesButton: {
        backgroundColor: '#910B26',
        padding: 10,
        alignItems: 'center'
    },
    viewInvoicesButtonText: {
        color: '#FFF',
        textTransform: 'uppercase'
    }
})
