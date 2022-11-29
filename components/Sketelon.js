import { View, Text, Dimensions, Animated } from 'react-native'
import React, { useEffect } from 'react'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native'

const Sketelon = () => {
  const AnimatedValue = new Animated.Value(0)

  useEffect(() => {
    circleAnimated()

    return () => circleAnimated()
  }, [])

  const translateX = AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 100]
  })
  const translateX2 = AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 300]
  })
  const translateX3 = AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 400]
  })

  const circleAnimated = () => {
    AnimatedValue.setValue(0)
    Animated.timing(AnimatedValue, {
      toValue: 1,
      duration: 350,
      useNativeDriver: false
    }).start(() => {
      setTimeout(() => {
        circleAnimated()
      }, 1000)
    })
  }
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View
          style={{
            width: '90%',
            marginTop: getStatusBarHeight() + 20
          }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: COLORS.secondary,
                overflow: 'hidden'
              }}
            >
              <Animated.View
                style={{
                  width: '80%',
                  height: '100%',
                  opacity: 0.5,
                  backgroundColor: COLORS.white,
                  transform: [{ translateX: translateX }]
                }}
              ></Animated.View>
            </View>

            <View style={{ width: '100%' }}>
              <View
                style={{
                  width: '70%',
                  height: 10,
                  borderRadius: 24,
                  backgroundColor: COLORS.secondary,
                  overflow: 'hidden'
                }}
              >
                <Animated.View
                  style={{
                    width: '80%',
                    height: '100%',
                    opacity: 0.5,
                    backgroundColor: COLORS.white,
                    transform: [{ translateX: translateX2 }]
                  }}
                ></Animated.View>
              </View>
              <View
                style={{
                  width: '30%',
                  height: 10,
                  borderRadius: 24,
                  backgroundColor: COLORS.secondary,
                  marginTop: 10,
                  overflow: 'hidden'
                }}
              >
                <Animated.View
                  style={{
                    width: '80%',
                    height: '100%',
                    opacity: 0.5,
                    backgroundColor: COLORS.white,
                    transform: [{ translateX: translateX2 }]
                  }}
                ></Animated.View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 10,
              borderRadius: 24,
              backgroundColor: COLORS.secondary,
              marginTop: 10,
              overflow: 'hidden'
            }}
          >
            <Animated.View
              style={{
                width: '100%',
                height: '100%',
                opacity: 0.5,
                backgroundColor: COLORS.white,
                transform: [{ translateX: translateX3 }]
              }}
            ></Animated.View>
          </View>
          <View
            style={{
              width: '80%',
              height: 10,
              borderRadius: 24,
              backgroundColor: COLORS.secondary,
              marginTop: 10,
              overflow: 'hidden'
            }}
          >
            <Animated.View
              style={{
                width: '10%',
                height: '100%',
                opacity: 0.5,
                backgroundColor: COLORS.white,
                transform: [{ translateX: translateX3 }]
              }}
            ></Animated.View>
          </View>
          <View
            style={{
              width: '70%',
              height: 10,
              borderRadius: 24,
              backgroundColor: COLORS.secondary,
              marginTop: 10,
              overflow: 'hidden'
            }}
          >
            <Animated.View
              style={{
                width: '10%',
                height: '100%',
                opacity: 0.5,
                backgroundColor: COLORS.white,
                transform: [{ translateX: translateX3 }]
              }}
            ></Animated.View>
          </View>
        </View>
      </View>

      {/* other 2 */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: getStatusBarHeight()
        }}
      >
        <View
          style={{
            width: '90%'
          }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: COLORS.secondary,
                overflow: 'hidden'
              }}
            >
              <Animated.View
                style={{
                  width: '80%',
                  height: '100%',
                  opacity: 0.5,
                  backgroundColor: COLORS.white,
                  transform: [{ translateX: translateX }]
                }}
              ></Animated.View>
            </View>

            <View style={{ width: '100%' }}>
              <View
                style={{
                  width: '70%',
                  height: 10,
                  borderRadius: 24,
                  backgroundColor: COLORS.secondary,
                  overflow: 'hidden'
                }}
              >
                <Animated.View
                  style={{
                    width: '80%',
                    height: '100%',
                    opacity: 0.5,
                    backgroundColor: COLORS.white,
                    transform: [{ translateX: translateX2 }]
                  }}
                ></Animated.View>
              </View>
              <View
                style={{
                  width: '30%',
                  height: 10,
                  borderRadius: 24,
                  backgroundColor: COLORS.secondary,
                  marginTop: 10,
                  overflow: 'hidden'
                }}
              >
                <Animated.View
                  style={{
                    width: '80%',
                    height: '100%',
                    opacity: 0.5,
                    backgroundColor: COLORS.white,
                    transform: [{ translateX: translateX2 }]
                  }}
                ></Animated.View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 10,
              borderRadius: 24,
              backgroundColor: COLORS.secondary,
              marginTop: 10,
              overflow: 'hidden'
            }}
          >
            <Animated.View
              style={{
                width: '100%',
                height: '100%',
                opacity: 0.5,
                backgroundColor: COLORS.white,
                transform: [{ translateX: translateX3 }]
              }}
            ></Animated.View>
          </View>
          <View
            style={{
              width: '80%',
              height: 10,
              borderRadius: 24,
              backgroundColor: COLORS.secondary,
              marginTop: 10,
              overflow: 'hidden'
            }}
          >
            <Animated.View
              style={{
                width: '10%',
                height: '100%',
                opacity: 0.5,
                backgroundColor: COLORS.white,
                transform: [{ translateX: translateX3 }]
              }}
            ></Animated.View>
          </View>
          <View
            style={{
              width: '100%',
              height: 200,
              borderRadius: 24,
              backgroundColor: COLORS.secondary,
              marginTop: 10,
              overflow: 'hidden'
            }}
          >
            <Animated.View
              style={{
                width: '10%',
                height: '100%',
                opacity: 0.5,
                backgroundColor: COLORS.white,
                transform: [{ translateX: translateX3 }]
              }}
            ></Animated.View>
          </View>
        </View>
      </View>

      {/* other 3 */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: getStatusBarHeight()
        }}
      >
        <View
          style={{
            width: '90%'
          }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: COLORS.secondary,
                overflow: 'hidden'
              }}
            >
              <Animated.View
                style={{
                  width: '80%',
                  height: '100%',
                  opacity: 0.5,
                  backgroundColor: COLORS.white,
                  transform: [{ translateX: translateX }]
                }}
              ></Animated.View>
            </View>

            <View style={{ width: '100%' }}>
              <View
                style={{
                  width: '70%',
                  height: 10,
                  borderRadius: 24,
                  backgroundColor: COLORS.secondary,
                  overflow: 'hidden'
                }}
              >
                <Animated.View
                  style={{
                    width: '80%',
                    height: '100%',
                    opacity: 0.5,
                    backgroundColor: COLORS.white,
                    transform: [{ translateX: translateX2 }]
                  }}
                ></Animated.View>
              </View>
              <View
                style={{
                  width: '30%',
                  height: 10,
                  borderRadius: 24,
                  backgroundColor: COLORS.secondary,
                  marginTop: 10,
                  overflow: 'hidden'
                }}
              >
                <Animated.View
                  style={{
                    width: '80%',
                    height: '100%',
                    opacity: 0.5,
                    backgroundColor: COLORS.white,
                    transform: [{ translateX: translateX2 }]
                  }}
                ></Animated.View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 10,
              borderRadius: 24,
              backgroundColor: COLORS.secondary,
              marginTop: 10,
              overflow: 'hidden'
            }}
          >
            <Animated.View
              style={{
                width: '100%',
                height: '100%',
                opacity: 0.5,
                backgroundColor: COLORS.white,
                transform: [{ translateX: translateX3 }]
              }}
            ></Animated.View>
          </View>
          <View
            style={{
              width: '80%',
              height: 10,
              borderRadius: 24,
              backgroundColor: COLORS.secondary,
              marginTop: 10,
              overflow: 'hidden'
            }}
          >
            <Animated.View
              style={{
                width: '10%',
                height: '100%',
                opacity: 0.5,
                backgroundColor: COLORS.white,
                transform: [{ translateX: translateX3 }]
              }}
            ></Animated.View>
          </View>
          <View
            style={{
              width: '70%',
              height: 10,
              borderRadius: 24,
              backgroundColor: COLORS.secondary,
              marginTop: 10,
              overflow: 'hidden'
            }}
          >
            <Animated.View
              style={{
                width: '10%',
                height: '100%',
                opacity: 0.5,
                backgroundColor: COLORS.white,
                transform: [{ translateX: translateX3 }]
              }}
            ></Animated.View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Sketelon
