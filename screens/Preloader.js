import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import First from '../screens/First'
import MyTabs from '../screens/MyTabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LIGHT } from '../constants'

const Preloader = () => {
  const [isLoading, setLoading] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState('')

  useEffect(() => {
    async function getUser() {
      setLoading(true)
      setProfile(await AsyncStorage.getItem('profile'))
      setId(await AsyncStorage.getItem('id'))
      setName(await AsyncStorage.getItem('name'))
      setEmail(await AsyncStorage.getItem('email'))
      setLoading(false)
    }
    getUser()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {profile ? <MyTabs /> : <First />}
    </View>
  )
}

export default Preloader
