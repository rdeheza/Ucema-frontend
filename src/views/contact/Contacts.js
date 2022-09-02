import React from 'react'
import { StyleSheet, Text, View, SectionList, FlatList, SafeAreaView, TouchableOpacity, Platform } from 'react-native'
import Header from '../../shared/components/header/Header'
import Tabbarbottom from '../../shared/components/tabbarbottom/Tabbarbottom'
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

// Contacts
import { 
    AdmisionesUcema, 
    AlumnosUcema, 
    ComunicacionesUcema, 
    DesarrolloProfesionalUcema, 
    FinanzasUcema, 
    IntendenciaUcema, 
    ProgramasEjecutivosUcema, 
    RelacionesInternacionalesUcema, 
    FundrisingUcema,
    AlumnosGrado,
    AlumnosPosgrados,
    DDPExtension,
    Internacional,
    Biblioteca,
    Finanzas,
    Alumni
} from '../../models/Contacts'

const Contacts = ({ navigation }) => {

    const callContact = ( contact ) => {

        let url = `whatsapp://send?text=Necesito contactar contigo&phone=${contact.phone}`

        Linking.openURL(url).then( supported => {
            if (supported) { Linking.openURL(url) }
        }).catch( () => {
            if (Platform.OS === 'android') {
                Linking.openURL("market://details?id=com.whatsapp");
            } else {
                Linking.openURL("https://apps.apple.com/ar/app/whatsapp-messenger/id310633997");
            }
        })
    }


    return (
        <SafeAreaView style={ styles.container }>
            <Header 
                navigation = {navigation}
                isVisible = 'true'                
            />
            <View style={ styles.containerList }>
                {/* <SectionList
                    sections={[
                        // { title: 'Departamento de Admisiones UCEMA', data: AdmisionesUcema },
                        // { title: 'Departamento de Alumnos UCEMA', data: AlumnosUcema },
                        // { title: 'Departamento de Comunicaciones UCEMA', data: ComunicacionesUcema },
                        // { title: 'Departamento de Desarrollo Profesional UCEMA', data: DesarrolloProfesionalUcema },
                        // { title: 'Departamento de Finanzas UCEMA', data: FinanzasUcema },
                        // { title: 'Departamento de Intendencia UCEMA', data: IntendenciaUcema },
                        // { title: 'Departamento de Programas Ejecutivos UCEMA', data: ProgramasEjecutivosUcema },
                        // { title: 'Departamento de Relaciones internacionales UCEMA ', data: RelacionesInternacionalesUcema },
                        // { title: 'Departamento Fundrising ', data: FundrisingUcema },
                        { data: AlumnosGrado },
                        { title: 'Alumnos Posgrado ', data: AlumnosPosgrados },
                        { title: 'DDP - Extensión ', data: DDPExtension },
                        { title: 'Internacional ', data: Internacional },
                        { title: 'Biblioteca ', data: Biblioteca },
                        { title: 'Finanzas ', data: Finanzas },
                        { title: 'Alumni ', data: Alumni }
                    ]}
                    renderItem={({ item }) => ( 
                        <TouchableHighlight
                            key={item.phone}
                            onPress={() => { Linking.openURL('whatsapp://send?text=Necesito contactar contigo&phone='+item.phone)} }
                        >
                            <View style={ styles.itemRowContainer }>
                                <Text  style={styles.item}>{item.name}</Text>
                                <Ionicons name="logo-whatsapp" size={24} color="black" />
                            </View>
                        </TouchableHighlight> 
                    )}
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                    )}
                    keyExtractor={(item, index) => index}
                /> */}

                    <FlatList
                        data={[...AlumnosGrado, ...AlumnosPosgrados, ...DDPExtension, ...Internacional, ...Biblioteca, ...Finanzas, ...Alumni]}
                        renderItem={({ item }) => ( 
                            <TouchableOpacity
                                key={item.phone}
                                onPress={() => { callContact(item) } }
                            >
                                <View style={ styles.itemRowContainer }>
                                    <Text  style={styles.item}>{item.name}</Text>
                                    <Ionicons name="logo-whatsapp" size={24} color="black" />
                                </View>
                            </TouchableOpacity> 
                        )}
                        keyExtractor={ item => item.phone }
                    />

            </View>
            <Tabbarbottom
                navigation = {navigation}
            />
        </SafeAreaView>
    )
}

export default Contacts

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerList: {
        flex: 1,
        padding: 20,

    },
    sectionHeader: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    itemRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 25,
        marginTop: 5,
    },
    item: {
        flex: 1,
        padding: 10,
        fontSize: 18,
        height: 44,
        fontFamily: 'regular'
    }
})
