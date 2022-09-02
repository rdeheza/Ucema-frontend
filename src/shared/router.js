import React from 'react';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Auth from '../views/auth/Auth';
import Home from '../views/home/Home';
import Notification from '../views/notifications/Notifications';
import Contacts from '../views/contact/Contacts';
import Career from '../views/career/Career';
import Profile from '../views/profile/Profile';
import Virtual from '../views/career/Virtual'

import PersonalData from '../views/profile/PersonalData'
import UserPass from '../views/profile/UserPass'
import OtherData from '../views/profile/OtherData'
import Invoices from '../views/profile/Invoices'

import Calendar from '../views/calendar/Calendar'
import Email from '../views/email/Email'

import Courses from '../views/career/Courses'
import Exams from '../views/career/Exams'
import Notes from '../views/career/Notes'
import Classroom from '../views/career/Classroom'
import Canceled from '../views/career/Canceled'
import WebviewContainer from '../shared/views/Webview'
import Programmed from '../views/career/Programmed'

import DrawerMenu from '../shared/components/drawer/DrawerMenu'

// Auth Login Stack
const AuthStack = createStackNavigator();
export const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen 
      name="Auth" 
      component={Auth}
      options={{ headerShown: false, gestureEnabled: false }} 
    />
    <AuthStack.Screen 
      name="Logged" 
      component={ AppDrawerScreen }
      options={{ headerShown: false, gestureEnabled: false }}  
    />
  </AuthStack.Navigator>
);

// Home Stack
const HomeStack = createStackNavigator();
export const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="initial"
      component={ Home }
      options={{ headerShown: false, gestureEnabled: false }}  
    />
    <HomeStack.Screen
      name="notifications"
      component={ Notification }
      options={{ headerShown: false, gestureEnabled: false, ...TransitionPresets.ModalPresentationIOS, ...TransitionPresets.FadeFromBottomAndroid }}  
    />
    <HomeStack.Screen
      name="email"
      component={ Email }
      options={{ headerShown: false, gestureEnabled: false, ...TransitionPresets.ModalPresentationIOS, ...TransitionPresets.FadeFromBottomAndroid }}  
    />
    <HomeStack.Screen
      name="contacts"
      component={ Contacts }
      options={{ headerShown: false, gestureEnabled: false, ...TransitionPresets.ModalPresentationIOS, ...TransitionPresets.FadeFromBottomAndroid }}  
    />
    
  </HomeStack.Navigator>
);

// ToDo: Perfil Stack
const ProfileStack = createStackNavigator();
export const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    initialRouteName = "profileHome"  
  >
    <ProfileStack.Screen
      name="profileHome"
      component={ Profile }
      options={{ headerShown: false, gestureEnabled: false }}   
    />
    <ProfileStack.Screen
      name="personaldata"
      component={ PersonalData }
      options={{ headerShown: false, gestureEnabled: false }}   
    />
    <ProfileStack.Screen
      name="userpass"
      component={ UserPass }
      options={{ headerShown: false, gestureEnabled: false }}  
    />
    <ProfileStack.Screen
     name="otherData"
     component={ OtherData }
     options={{ headerShown: false, gestureEnabled: false, }}  
    />
    <ProfileStack.Screen
     name="invoices"
     component={ Invoices }
     options={{ headerShown: false, gestureEnabled: false }}  
    />
  </ProfileStack.Navigator>
);

// ToDo: Mi Carrera Stack
const CareerStack = createStackNavigator();
export const CareerStackScreen = () => (
  <CareerStack.Navigator
  >
    <CareerStack.Screen
      name="mycareer"
      component={ Career }
      options={{ headerShown: false, gestureEnabled: false }}  
    />
    <CareerStack.Screen
      name="courses"
      component={ Courses } 
      options={{ headerShown: false, gestureEnabled: false }}  
    />
    <CareerStack.Screen
      name="exams"
      component={ Exams } 
      options={{ headerShown: false, gestureEnabled: false }}  
    />
    <CareerStack.Screen
      name="notes"
      component={ Notes }
      options={{ headerShown: false, gestureEnabled: false }}  
    />
    <CareerStack.Screen
     name="virtual"
     component={ VirtualStackScreen }
     options={{ headerShown: false, gestureEnabled: false }}  
    />
  </CareerStack.Navigator>
);

const VirtualStack = createStackNavigator();
export const VirtualStackScreen = () => (
  <VirtualStack.Navigator
    initialRouteName="virtualHome"  
  >
    <VirtualStack.Screen
      name="programmed"
      component={ Programmed }
      options={{ headerShown: false, gestureEnabled: false }}  
    />
    <VirtualStack.Screen
      name="virtualHome"
      component={ Virtual }
      options={{ headerShown: false, gestureEnabled: false }}  
    />
    <VirtualStack.Screen
      name="classroom"
      component={ Classroom }
      options={{ headerShown: false, gestureEnabled: false }}  
    />
    <VirtualStack.Screen
      name="canceled"
      component={ Canceled } 
      options={{ headerShown: false, gestureEnabled: false }}  
    />
    <VirtualStack.Screen
      name="comunity"
      initialParams={{ url: "https://ucema.edu.ar/comunidad" }}
      component={ WebviewContainer }
      options={{ headerShown: false, gestureEnabled: false }}  
    />
  </VirtualStack.Navigator>
)

// Bottom navigation
const AppTabs = createBottomTabNavigator();
export const AppTabsScreen = () => (
  <AppTabs.Navigator
    mode="modal"
  >
    <AppTabs.Screen
      name="notifications"
      component={ Notification }
    />
    <AppTabs.Screen
      name="email"
      component={ Home }
    />
    <AppTabs.Screen
      name="chat"
      component={ Contacts }
    />
  </AppTabs.Navigator>
);

// Drawer navigation
const AppDrawer = createDrawerNavigator();
export const AppDrawerScreen = () => (
  <AppDrawer.Navigator 
    drawerPosition="left"
    initialRouteName="home"
    drawerContent={ props => <DrawerMenu {...props} /> } 
  >
    <AppDrawer.Screen
      name="home"
      options={{
        headerShown: false,
        title: 'Inicio',
        drawerIcon: ({focused, size}) => (
          <Feather name="home" size={30} color="black" />
        ),
      }}
      component={ HomeStackScreen }
    />
    <AppDrawer.Screen
      name="profile"
      options={{
        headerShown: false,
        title: 'Mi Perfil',
        drawerIcon: ({focused, size}) => (
          <Image
            source={require('../assets/home/profile_icon.png')}
            style={{ height: 30, width: 30, resizeMode: 'contain' }}
          />
        ),
      }}
      component={ ProfileStackScreen }
    />
    <AppDrawer.Screen
      name="career"
      options={{
        headerShown: false,
        title: 'Mi Carrera / Mis Materias',
        drawerIcon: ({focused, size}) => (
          <Image
            source={require('../assets/home/career_icon.png')}
            style={{ height: 30, width: 30, resizeMode: 'contain' }}
          />
        ),
      }}
      component={ CareerStackScreen } 
    />
    <AppDrawer.Screen
      name="calendar"
      options={{
        headerShown: false,
        title: 'Mis clases virtuales',
        drawerIcon: ({focused, size}) => (
          <Image
            source={require('../assets/home/calendar_icon.png')}
            style={{ height: 30, width: 30, resizeMode: 'contain' }}
          />
        ),
      }}
      component={ Calendar } 
    />
    <AppDrawer.Screen
      name="ucema"
      initialParams={{ url: "https://ucema.edu.ar" }}
      options={{
        headerShown: false,
        title: 'Ucema',
        drawerIcon: ({focused, size}) => (
          <Image
            source={require('../assets/home/pin_icon.png')}
            style={{ height: 30, width: 30, resizeMode: 'contain' }}
          />
        ),
      }}
      component={ WebviewContainer } 
    />

  </AppDrawer.Navigator>
);
