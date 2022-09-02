import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import Header from '../../shared/components/header/Header';
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom';

// API
import getData from '../../shared/services/getData';
import getUserInvoices from '../../shared/services/Profile/Invoices';
import mainStore from '../../shared/Store';

const Item = ({ item }) => (
    <View style={[styles.item]}>
        <View style={[styles.invoiceTitleWrapper]} >
            <Text style={[styles.textCapitalize, { marginTop: 4 }]}>nro. de factura: <Text style={[styles.invoiceTitle, styles.textUppercase]}>{ item.nro_fact }</Text></Text>
            <Text style={[styles.textCapitalize, { marginTop: 4 }]}>razón social: <Text style={[styles.invoiceData]}>{ item.d_razsoc }</Text></Text>
            <Text style={[styles.textCapitalize, { marginTop: 4 }]}>fecha factura: <Text style={[styles.invoiceData]}>{ item.fecha }</Text></Text>
            <Text style={[styles.textCapitalize, { marginTop: 4 }]}>1º fecha vto: <Text style={[styles.invoiceData]}>{ item.f_vto_1 }</Text></Text>
            <Text style={[styles.textCapitalize, { marginTop: 4 }]}>importe 1º vto: <Text style={[styles.invoiceData]}>{ item.importe_1 }</Text></Text>
            <Text style={[styles.textCapitalize, { marginTop: 4 }]}>2º fecha vto: <Text style={[styles.invoiceData]}>{ item.f_vto_2 }</Text></Text>
            <Text style={[styles.textCapitalize, { marginTop: 4 }]}>importe 2º vto: <Text style={[styles.invoiceData]}>{ item.importe_2 }</Text></Text>
        </View>
    </View>
);

const Invoices = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState([]);
    const { setForceCloseApp } = mainStore();

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
                                getUserInvoices(userIdFounded, tokenFounded, userFounded)
                                    .then( response => {
                                        if ( response.status != 200 ) {
                                            setForceCloseApp();
                                        } else if ( response.data.data ) {
                                            setInvoices(response.data.data);
                                            setLoading(false);
                                        } else {
                                            toast({ message: 'Error en la obtención de las facturas', intent: "ERROR" })
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
                <Text style={[ styles.sectionTitle ]}>Últimas facturas pendientes de cobro</Text>

                { isLoading 
                    ? 
                        <ActivityIndicator
                            style={{ flex: 1 }}
                            color="#666"
                            size="large"
                        /> 
                    :
                        <FlatList
                            data={ invoices }
                            renderItem={ renderItem }
                            keyExtractor={ item => item.nro_fact }
                        />
                }

            </View>
            <Tabbarbottom 
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default Invoices

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    justifyContainer: {
        backgroundColor: '#e5e5e5',
        padding: 20
    },
    sectionTitle: {
        fontFamily: 'medium',
        fontSize: 16
    },
    textCapitalize: {
        textTransform: 'capitalize',
        fontFamily: 'regular'
    },
    textUppercase: {
        textTransform: 'uppercase'
    },
    invoiceTitleWrapper : {
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginTop: 10,
        padding: 10   
    },
    invoiceTitle: {
        fontFamily: 'bold',
        color: '#666'
    },
    invoiceData:{
        fontFamily: 'bold',
        color: '#666'
    },
})
