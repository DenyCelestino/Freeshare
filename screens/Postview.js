import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ip } from '../config'
import { COLORS, FONTS, SIZES, LIGHT } from '../constants'

const Postview = ({ route }) => {
  const navigation = useNavigation()
  const item = route.params.item

  const idcurrentuser = route.params.currentuser
  console.log(idcurrentuser)
  function intToString(num) {
    num = num.toString().replace(/[^0-9.]/g, '')
    if (num < 1000) {
      return num
    }
    let si = [
      { v: 1e3, s: 'K' },
      { v: 1e6, s: 'M' },
      { v: 1e9, s: 'B' },
      { v: 1e12, s: 'T' },
      { v: 1e15, s: 'P' },
      { v: 1e18, s: 'E' }
    ]
    let index
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break
      }
    }
    return (
      (num / si[index].v)
        .toFixed(2)
        .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s
    )
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <StatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={{ width: '100%', height: '75%' }}>
        <Image
          resizeMode="cover"
          source={{ uri: ip + item.photo }}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </View>
      <View style={styles.buttonsarea}>
        <Text style={{ ...styles.description, marginRight: 5 }}>
          {intToString(item.comments)}
        </Text>
        <TouchableOpacity
          style={{ marginRight: 40 }}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('Comments', {
              item,
              currentuser: idcurrentuser
            })
          }
        >
          <Ionicons name="chatbox" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={{ ...styles.description, marginRight: 5 }}>
          {intToString(2000)}
        </Text>
        <MaterialCommunityIcons
          name="share"
          size={24}
          color={COLORS.primary}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsarea: {
    width: '100%',
    alignSelf: 'center',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

    position: 'absolute',
    bottom: 8
  },

  icons: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    borderRadius: 8
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.white,
    textAlign: 'justify'
  }
})

export default Postview
