import React from 'react'
import { MyStacks } from './routes'
import { NavigationContainer } from '@react-navigation/native'

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <MyStacks />
    </NavigationContainer>
  )
}
