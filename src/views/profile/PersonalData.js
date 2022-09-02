import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import Header from '../../shared/components/header/Header';
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom';
import Moment from 'moment';

// API endpoint
import getUserData from '../../shared/services/Profile/Profile';
import getData from '../../shared/services/getData';
import { useToast } from 'react-native-styled-toast';
import mainStore from '../../shared/Store';

const PersonalData = ({ navigation }) => {
    const [userData, setUserData] = useState({});
    const { isLoading, setLoading, setForceCloseApp } = mainStore();
    const { toast } = useToast();

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
                                getUserData(userIdFounded, tokenFounded, userFounded)
                                    .then( response => {
                                        if ( response.status != 200 ) {
                                            setForceCloseApp();
                                        } else if ( response.data.data ) {
                                            setUserData(response.data.data)
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

    useEffect(() => {
        loadData()
        return () => { }
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
                            color="#666"
                            size="large"
                        /> 

                    :

                    <View style={[ styles.container, styles.justifyContainer]}>
                        <View styles={[ styles.sectionTitleWrapper ]}>
                            <Text style={[ styles.sectionTitle, styles.textUppercase ]}>datos personales</Text>
                        </View>
                        <View>
                            <Text style={[ styles.userInfo, styles.textCapitalize, styles.textNormal ]}>Apellido: <Text style={[styles.textBold, styles.textUppercase]}>{ userData.apellido }</Text></Text>
                            <Text style={[ styles.userInfo, styles.textCapitalize, styles.textNormal ]}>Nombre: <Text style={[styles.textBold, styles.textUppercase]}> { userData.nombre }</Text></Text>
                            <Text style={[ styles.userInfo, styles.textUppercase, styles.textNormal ]}>{userData.tipo_documento}: <Text style={[styles.textBold, styles.textUppercase]}> { userData.documento }</Text></Text>
                            <Text style={[ styles.userInfo, styles.textCapitalize, styles.textNormal ]}>Nacionalidad: <Text style={[styles.textBold, styles.textUppercase]}> { userData.nacionalidad }</Text></Text>
                            <Text style={[ styles.userInfo, styles.textCapitalize, styles.textNormal ]}>Sexo: <Text style={[styles.textBold, styles.textUppercase]}> { userData.sexo }</Text></Text>
                            <Text style={[ styles.userInfo, styles.textCapitalize, styles.textNormal ]}>Fecha de nacimiento: <Text style={[styles.textBold, styles.textUppercase]}> { userData.fecha_nacimiento ? Moment(userData.fecha_nacimiento).format('DD/MM/yyyy') : '' }</Text></Text>
                            <Text style={[ styles.userInfo, styles.textCapitalize, styles.textNormal ]}>Dirección postal: <Text style={[styles.textBold, styles.textUppercase]}> { userData.direccion }</Text></Text>
                            <Text style={[ styles.userInfo, styles.textCapitalize, styles.textNormal ]}>Teléfono: <Text style={[styles.textBold, styles.textUppercase]}> { userData.telefonos }</Text></Text>
                            <Text style={[ styles.userInfo, styles.textCapitalize, styles.textNormal ]}>Correo electrónico: <Text style={[styles.textBold, styles.textUppercase]}> { userData.email }</Text></Text>
                        </View>
                    </View>

            }
            <Tabbarbottom 
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default PersonalData

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    justifyContainer: {
        //justifyContent: 'space-between',
        //alignItems: 'flex-start',
        backgroundColor: '#e5e5e5',
        padding: 20
    },
    userInfo: {
        marginTop: 10
    },
    textCapitalize: {
        textTransform: 'capitalize'
    },
    textUppercase: {
        textTransform: 'uppercase'
    },
    textBold: {
        fontFamily: 'bold'
    },
    textNormal: {
        fontWeight: '400',
        fontFamily: 'light'
    },
    sectionTitleWrapper: {
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'mediumItalic',
        marginBottom: 40
    }
})
