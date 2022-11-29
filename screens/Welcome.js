import { View, Text, Dimensions, ImageBackground } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StatusBar } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONTS, SHADOWS, SIZES } from '../constants'
import { TouchableOpacity } from 'react-native'
export const SLIDER_WIDTH = Dimensions.get('screen').width
export const ITEM_WIDTH = Dimensions.get('screen').width

const slidedata = [
  {
    image: require('../assets/back3.jpg'),
    title: 'Publicações',
    subtitle:
      'Veja o que os outros estão fazendo, diga o que você acha sem restrições, seja livre.',
    background: '#F6BC39'
  },
  {
    image: require('../assets/back1.jpg'),
    title: 'Partilha',
    subtitle:
      'Partilha com as pessoas, seus sentimentos, seus pensamentos, seus momentos, partilha tudo, veja o que elas acham do que você esta pensando.',
    background: COLORS.primary
  },

  {
    image: require('../assets/back2.jpg'),
    title: 'Comunidade',
    subtitle:
      'Conecte-se a comunidades do seu interesse, faça networking, encontre, tua malta, tua alcateia…',
    background: '#01B5F8'
  }
]

let nav = ''

function Cards({ item }) {
  return (
    <ImageBackground
      source={item.image}
      style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
      }}
    >
      <LinearGradient
        style={{ flex: 1 }}
        colors={['transparent', 'rgba(0,0,0,0.4)', COLORS.black]}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 50,
            alignItems: 'center',
            padding: 10,

            width: '100%'
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.Labster,
              fontSize: SIZES.extraLarge
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.light,
              fontSize: SIZES.small,
              textAlign: 'center'
            }}
          >
            {item.subtitle}
          </Text>

          <TouchableOpacity
            onPress={() => nav.navigate('MyTabs')}
            style={{
              width: '80%',
              padding: 20,
              backgroundColor: item.background,
              borderRadius: 10,
              alignItems: 'center',
              marginVertical: 8,
              ...SHADOWS.light
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.PoppinsBold
              }}
            >
              Começar
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  )
}

const Welcome = () => {
  const carouselRef = useRef(null)
  let animation = React.createRef()
  const navigation = useNavigation()
  const [index, setIndex] = React.useState(0)

  nav = navigation

  useEffect(() => {
    animation.current.play()
  }, [])
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <StatusBar barStyle={'dark-content'} translucent={true} />
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          marginTop: getStatusBarHeight() + 20
        }}
      >
        <LottieView
          ref={animation}
          loop={true}
          style={{
            width: 50,
            height: 50
          }}
          source={require('../assets/welcome.json')}
        />
        <Pagination
          dotsLength={slidedata.length}
          activeDotIndex={index}
          carouselRef={carouselRef}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>

      <Carousel
        autoplay={true}
        loop={true}
        ref={carouselRef}
        data={slidedata}
        renderItem={Cards}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
      />
    </View>
  )
}

export default Welcome
