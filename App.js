import React from 'react'
import {
  NavigationContainer,
  DefaultTheme
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import AppRoutes from './routes'
import { ToastProvider } from 'react-native-toast-notifications'

import Home from './screens/Home'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  }
}

const Stack = createNativeStackNavigator()

export default function App() {
  const [loaded] = useFonts({
    InterBold: require('./assets/fonts/Inter-Bold.ttf'),
    InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
    InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
    InterLight: require('./assets/fonts/Inter-Light.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    Labster: require('./assets/fonts/Lobster-Regular.ttf')
  })

  if (!loaded) return null

  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  )
}
