import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native'
import React from 'react'
import { COLORS, DARK, FONTS, LIGHT, SIZES } from '../constants/'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import * as AuthSession from 'expo-auth-session'
const { width, height } = Dimensions.get('screen')
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'
import { ip } from '../config'

const First = () => {
  const navigation = useNavigation()
  const [isLoading, setLoading] = React.useState(false)

  async function handleGoogleSignIn() {
    try {
      const CLIENT_ID =
        '93708782443-4l2qht21u5270k9df2mcd1r9o80uqcho.apps.googleusercontent.com'
      const REDIRECT_URI = 'https://auth.expo.io/@bantucplus/medspace'
      const SCOPE = encodeURI('profile email')
      const RESPONSE_TYPE = 'token'
      setLoading(true)
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = await AuthSession.startAsync({
        authUrl
      })
      setLoading(false)

      if (type === 'success') {
        setLoading(true)
        const user = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        )
        console.log(user)
        if (user.data.verified_email === true) {
          const result = await axios.post(
            `${ip}first.php`,
            JSON.stringify({
              iduser: user.data.id,
              email: user.data.email,
              profile: user.data.picture,
              name: user.data.name
            })
          )
          console.log(result.data)
          if (result.data == true) {
            await AsyncStorage.setItem('id', user.data.id)
            await AsyncStorage.setItem('name', user.data.name)
            await AsyncStorage.setItem('profile', user.data.picture)
            await AsyncStorage.setItem('email', user.data.email)
            setLoading(false)
            navigation.navigate('Welcome', { name: user.data.name })
          } else if (result.data == 'error') {
            setLoading(false)
            Alert.alert('Erro no login', 'Tente novamente')
          } else if (result.data == false) {
            await AsyncStorage.setItem('id', user.data.id)
            await AsyncStorage.setItem('name', user.data.name)
            await AsyncStorage.setItem('profile', user.data.picture)
            await AsyncStorage.setItem('email', user.data.email)

            navigation.navigate('MyTabs')
            setLoading(false)
          }
        } else {
          Alert.alert(
            'Erro no login',
            'Email nao verificado pela google'
          )
        }
      } else if (type === 'dismiss' || type === 'cancel') {
        Alert.alert('Erro no login', 'Login cancelado pelo usuario')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ImageBackground
      source={require('../assets/back1.jpg')}
      resizeMode="cover"
      style={{ width: width, height: height }}
    >
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="light-content"
      />
      <LinearGradient
        style={{ flex: 1 }}
        colors={['rgba(0,0,0,0.7)', 'transparent', COLORS.black]}
      >
        <View
          style={{
            padding: 10,
            width: '90%',

            marginTop: getStatusBarHeight() + 20
          }}
        >
          <View style={{ width: '80%' }}>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.Labster,
                fontSize: SIZES.extraLarge
              }}
            >
              Freeshare
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.regular,
                fontSize: 10
              }}
            >
              Liberdade de expressão é você ser livre para falar o que
              quiser, e eu ser livre para não querer te ouvir. {'\n'}{' '}
              {'\n'}
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.regular,
                  fontSize: SIZES.small
                }}
              >
                (Geovani Rodrigues)
              </Text>
            </Text>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 60,
            width: '80%',
            alignSelf: 'center'
          }}
        >
          <TouchableOpacity
            onPress={handleGoogleSignIn}
            style={{
              padding: 15,
              backgroundColor: 'transparent',

              width: '100%',
              borderRadius: 30,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLORS.white
            }}
          >
            {isLoading ? (
              <ActivityIndicator
                style={{ alignSelf: 'center' }}
                color={COLORS.white}
                size="small"
              />
            ) : (
              <>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require('../assets/google.png')}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    marginLeft: 20,
                    fontFamily: FONTS.semiBold
                  }}
                >
                  Entrar usando conta google
                </Text>
              </>
            )}
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.regular,
              fontSize: 11,
              marginTop: 10
            }}
          >
            Clicando em entrar, concorda com nossos{' '}
            <Text style={{ color: 'cyan' }}>termos</Text> e{' '}
            <Text style={{ color: 'cyan' }}>condições</Text>
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  )
}

export default First
