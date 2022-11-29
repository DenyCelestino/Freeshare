import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MyTabs from '../screens/MyTabs'
import Preloader from '../screens/Preloader'
import Comments from '../screens/Comments'
import Welcome from '../screens/Welcome'
import Postview from '../screens/Postview'

import First from '../screens/First'

import React from 'react'

const Stack = createNativeStackNavigator()

export function MyStacks() {
  return (
    <Stack.Navigator initialRouteName="Preloader">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Preloader"
        component={Preloader}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyTabs"
        component={MyTabs}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="First"
        component={First}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Postview"
        component={Postview}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={Welcome}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Comments"
        component={Comments}
      />
    </Stack.Navigator>
  )
}
