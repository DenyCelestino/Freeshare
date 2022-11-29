import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons'

import Home from '../screens/Home'
import Demo from '../screens/Demo'
import Community from '../screens/Community'

import { COLORS, LIGHT } from '../constants'

const Tab = createMaterialBottomTabNavigator()

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLORS.primary}
      barStyle={{
        backgroundColor: COLORS.white,
        padding: 5
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-variant"
              color={color}
              size={20}
            />
          )
        }}
      />

      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarLabel: 'Comunidade',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="md-people-sharp"
              size={20}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Demo}
        options={{
          tabBarLabel: 'Notificações',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="email" size={20} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Demo}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Demo}
        options={{
          tabBarLabel: 'Definições',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={20} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
