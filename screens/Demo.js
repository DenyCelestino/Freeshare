import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  StatusBar,
  Alert,
  ScrollView
} from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import {
  useNavigation,
  useFocusEffect
} from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

import 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LottieView from 'lottie-react-native'

import { LIGHT, DARK, FONTS, SHADOWS, SIZES } from '../constants'

const Demo = () => {
  let animation = React.createRef()

  React.useEffect(() => {
    animation.current.play()
  }, [])

  // capturar imagem da galeria
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,

      quality: 0.5
    })

    if (!result.cancelled) {
      setImage(result.uri)
      console.log(result.uri)
      setVector(result.base64)
      console.log(result.base64)
      setCameraOn(false)
    }
  }
  return (
    <View
      style={{
        backgroundColor: LIGHT.background,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }}
    >
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="dark-content"
      />
    </View>
  )
}

export default Demo
