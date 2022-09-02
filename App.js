import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

import { ThemeProvider } from 'styled-components'
import { ToastProvider } from 'react-native-styled-toast'

import { NavigationContainer } from '@react-navigation/native';
import { AuthStackScreen } from './src/shared/router';

import { StatusBar } from 'expo-status-bar';

// Custom font
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const [ fontLoading , setFontLoading] = React.useState(false);
  
  const theme = {
    space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
    colors: {
      text: '#0A0A0A',
      background: '#FFF',
      border: '#E2E8F0',
      muted: '#F0F1F3',
      success: '#7DBE31',
      error: '#FC0021',
      info: '#00FFFF'
    } 
  }

  const loadFonts = async () => {
    await Font.loadAsync({
      light: require('./src/assets/fonts/Montserrat-Light.ttf'),
      lightItalic: require('./src/assets/fonts/Montserrat-Italic.ttf'),
      regular: require('./src/assets/fonts/Montserrat-Regular.ttf'),
      medium: require('./src/assets/fonts/Montserrat-Medium.ttf'),
      mediumItalic: require('./src/assets/fonts/Montserrat-MediumItalic.ttf'),
      bold: require('./src/assets/fonts/Montserrat-Bold.ttf'),
      boldItalic: require('./src/assets/fonts/Montserrat-BoldItalic.ttf')
    })
    setFontLoading(true);
  }

  useEffect(() => {
    loadFonts()
    return () => { }
  }, [])
 
  if ( !fontLoading ) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} color="#666"></ActivityIndicator> 
  } else {
    return (
      <>
        <StatusBar style="dark" />
        <SafeAreaView style={[ styles.container ]}>
          <ThemeProvider theme={theme}>
              <ToastProvider>
                <NavigationContainer>
                  <AuthStackScreen />
                </NavigationContainer>
              </ToastProvider>
          </ThemeProvider>
        </SafeAreaView>
      </>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
