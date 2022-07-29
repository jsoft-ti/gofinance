import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from "./src/components/Welcome"
import { Dashboard } from './src/screens/Dashboard';
import { ThemeProvider } from 'styled-components/native';
import theme
 from './src/global/styles/theme';
 import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold

 } from '@expo-google-fonts/poppins'

 import AppLoading from 'expo-app-loading';
export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
})

  if(!fontLoaded){
    return <AppLoading/>
  }
  
  return (
    <ThemeProvider theme={theme}>
       <Dashboard />
    </ThemeProvider>
 
  )

}
