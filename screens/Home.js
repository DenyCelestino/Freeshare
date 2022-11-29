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
  ScrollView,
  Linking
} from 'react-native'
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  Entypo
} from '@expo/vector-icons'
import {
  useNavigation,
  useFocusEffect
} from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { FlatGrid } from 'react-native-super-grid'
import 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LottieView from 'lottie-react-native'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import Carousel from 'react-native-snap-carousel'
import {
  COLORS,
  LIGHT,
  DARK,
  FONTS,
  SHADOWS,
  SIZES
} from '../constants'
import axios from 'axios'
import { ip } from '../config'
import * as ImagePicker from 'expo-image-picker'
import { Overlay } from 'react-native-elements'
import Sketelon from '../components/Sketelon'

const Home = () => {
  const navigation = useNavigation()
  const bottomSheetModalRef = React.useRef(null)
  const [image, setImage] = React.useState(null)
  const [vector, setVector] = React.useState(null)
  const [visible, setVisible] = useState(false)
  const [profile, setProfile] = useState('')
  const [lastitem, setLastitem] = useState(0)
  const [email, setEmail] = useState('')
  const [desc, setDesc] = useState('')
  const [links, setLinks] = useState('')

  const [id, setId] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isLoading2, setLoading2] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const [pub, setPub] = useState([])
  const snapPoints = React.useMemo(() => ['90%', '90%'], [])

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleUnPresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.close()
  }, [])
  useEffect(() => {
    getPosts()
    getUser()
  }, [])
  async function logout() {
    navigation.navigate('First')
  }
  async function getPosts(pageNumber = page, shouldRefresh = false) {
    if (total >= pageNumber) {
      if (isLoading2) return

      setLoading2(true)
      let res = await axios.post(
        `${ip}getposts.php?page=${pageNumber}`
      )

      setLoading2(false)

      setTotal(Math.ceil(res.data.total / 5))
      setPage(pageNumber + 1)
      setPub(
        shouldRefresh ? res.data.items : [...pub, ...res.data.items]
      )
      console.log(res.data.items)
      let Array = res.data.items[res.data.items.length - 1]
      res.data.total != 0 ? setLastitem(Array.id) : ''
    } else {
    }
  }
  async function getPosts2() {
    setLoading2(true)
    let res = await axios.post(`${ip}getposts.php`)

    setLoading2(false)

    setPub(res.data.items)
    console.log(res.data.items)
    let Array = res.data.items[res.data.items.length - 1]

    res.data.total != 0 ? setLastitem(Array.id) : ''
  }
  async function refreshList() {
    setRefreshing(true)

    await getPosts(1, true)

    setRefreshing(false)
  }
  async function getUser() {
    setLoading(true)
    setProfile(await AsyncStorage.getItem('profile'))
    setEmail(await AsyncStorage.getItem('email'))
    setId(await AsyncStorage.getItem('id'))
    setLoading(false)
    console.log(id)
  }

  async function uploadpost() {
    if (desc == '' && image == null) {
      Alert.alert('Alerta', 'Campos  vazios')
    } else {
      setLoading(true)
      let fileName = Math.floor(Math.random() * 100000)
      let body = JSON.stringify({
        image: vector,
        name: fileName,
        format: 'jpg',
        desc: desc,
        links: links,
        iduser: id,
        email: email
      })
      let response = await axios.post(`${ip}uploadpost.php`, body)
      console.log(response.data.items)
      if (response.data.items.length > 0) {
        setPub(response.data.items, ...pub)
        let Array =
          response.data.items[response.data.items.length - 1]
        setLastitem(Array.id)
        setImage(null)
        setVector(null)
        setLoading(false)
        setDesc('')
        setLinks('')
        handleUnPresentModalPress()
      } else if (response.data == 'error') {
        setLoading(false)
        Alert.alert('Erro', 'alguma coisa deu errado tente novamente')
      } else if (response.data == 'not moved') {
        setLoading(false)
        Alert.alert('Erro', 'Erro com a imagem')
      } else if (response.data == 'id-not-found') {
        setLoading(false)
        Alert.alert('Erro', 'ID Not Found')
      }
    }
  }
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
    }
  }
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
  const toggleOverlay = () => {
    setVisible(!visible)
  }
  if (isLoading) return <Sketelon />
  return (
    <View
      style={{
        backgroundColor: LIGHT.background,
        alignItems: 'center',
        flex: 1
      }}
    >
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="dark-content"
      />
      <View
        style={{ width: '90%', marginTop: getStatusBarHeight() + 10 }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10
          }}
        >
          <Text style={{ fontFamily: FONTS.Labster }}>FreeShare</Text>
          {profile != '' && (
            <TouchableOpacity
              onPress={logout}
              style={{
                ...SHADOWS.light,
                height: 30,
                width: 30,
                borderRadius: 25,
                backgroundColor: COLORS.secondary
              }}
            >
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 25
                }}
                source={{ uri: profile }}
              />
            </TouchableOpacity>
          )}
        </View>
        <Overlay
          overlayStyle={{
            width: '90%',
            padding: 10,
            alignItems: 'center',
            borderRadius: 10
          }}
          isVisible={visible}
          onBackdropPress={toggleOverlay}
        >
          <TouchableOpacity
            style={{
              ...styles.button,
              width: '90%',
              marginVertical: 10
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                color: COLORS.white
              }}
            >
              Apagar conteudo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.button,
              width: '90%',
              marginVertical: 10
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                color: COLORS.white
              }}
            >
              Apagar conteudo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.button,
              width: '90%',
              marginVertical: 10
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                color: COLORS.white
              }}
            >
              Apagar conteudo
            </Text>
          </TouchableOpacity>
        </Overlay>
        <FlatList
          data={pub}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          onEndReached={() => getPosts()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            isLoading2 && (
              <ActivityIndicator
                style={{ top: -70 }}
                color={COLORS.primary}
                size="small"
              />
            )
          }
          onRefresh={refreshList}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.postcontainer,
                marginBottom: item.id == lastitem ? 80 : 0
              }}
            >
              <View style={styles.headerpost}>
                <View style={styles.headerpostinfo}>
                  <Image
                    style={styles.profilephoto}
                    source={{ uri: item.profile }}
                  />
                  <View>
                    <Text
                      style={{
                        ...styles.username,
                        fontSize: SIZES.small
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>

                {item.google_id == id && (
                  <TouchableOpacity onPress={toggleOverlay}>
                    <MaterialCommunityIcons
                      name="dots-horizontal"
                      size={24}
                      color={LIGHT.secondarycolor}
                    />
                  </TouchableOpacity>
                )}
              </View>

              {/* post body */}
              <View style={styles.posterdescriptioncontainer}>
                <Text style={styles.description}>
                  {item.photo
                    ? item.desc.substring(0, 100)
                    : item.desc.substring(0, 200)}
                  {item.photo != '' && item.desc.length > 100
                    ? '... '
                    : ''}
                  {item.photo == '' && item.desc.length > 200
                    ? '... '
                    : ''}
                  {item.photo != '' && item.desc.length > 100 ? (
                    <Text
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate('Comments', { item })
                      }
                      style={{
                        fontFamily: FONTS.regular,
                        fontSize: SIZES.small,
                        color: COLORS.primary,
                        textAlign: 'justify'
                      }}
                    >
                      ver mais
                    </Text>
                  ) : (
                    ''
                  )}
                  {item.photo == '' && item.desc.length > 200 ? (
                    <Text
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate('Comments', { item })
                      }
                      style={{
                        fontFamily: FONTS.regular,
                        fontSize: SIZES.small,
                        color: COLORS.primary,
                        textAlign: 'justify'
                      }}
                    >
                      ver mais
                    </Text>
                  ) : (
                    ''
                  )}
                </Text>
              </View>

              {item.photo != '' && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('Postview', {
                      item,
                      currentuser: id
                    })
                  }
                  style={styles.postercontainer}
                >
                  <Image
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10
                    }}
                    source={{ uri: ip + item.photo }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}

              <View style={styles.buttonsarea}>
                <Text
                  style={{ ...styles.description, marginRight: 5 }}
                >
                  {intToString(item.comments)}
                </Text>
                <TouchableOpacity
                  style={{ marginRight: 40 }}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('Comments', {
                      item,
                      currentuser: id
                    })
                  }
                >
                  <Ionicons
                    name="chatbox"
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
                <Text
                  style={{ ...styles.description, marginRight: 5 }}
                >
                  {intToString(2000)}
                </Text>
                <MaterialCommunityIcons
                  name="share"
                  size={24}
                  color={COLORS.primary}
                />
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={styles.floatbutton}
      >
        <FontAwesome name="send" size={24} color={COLORS.white} />
      </TouchableOpacity>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          enablePanDownToClose
          backgroundStyle={{
            backgroundColor: COLORS.white
          }}
        >
          <BottomSheetScrollView
            contentContainerStyle={{ alignItems: 'center' }}
          >
            <View
              style={{
                width: '90%'
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.PoppinsBold
                }}
              >
                Publicar
              </Text>
              {image && (
                <View
                  style={{ flexDirection: 'row', marginVertical: 10 }}
                >
                  <Image
                    resizeMode="cover"
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 10
                    }}
                    source={{ uri: image }}
                  />
                  <View style={{ marginLeft: 20 }}>
                    <Text
                      style={{
                        ...styles.description,
                        color: COLORS.primary
                      }}
                      onPress={pickImage}
                    >
                      Trocar foto
                    </Text>
                    <Text
                      onPress={() =>
                        setImage(null) && setVector(null)
                      }
                      style={{
                        ...styles.description,
                        color: COLORS.primary,
                        marginTop: 10
                      }}
                    >
                      Remover foto
                    </Text>
                  </View>
                </View>
              )}
              <TextInput
                onChangeText={e => setDesc(e)}
                multiline
                placeholder="escreve o que está pensando"
                placeholderTextColor={COLORS.secondary}
                textAlignVertical="top"
                style={{
                  padding: 20,
                  width: '100%',
                  height: 100,
                  borderWidth: 0.5,
                  borderColor: COLORS.secondary,
                  color: COLORS.black,
                  marginVertical: 10
                }}
              />
              <Text style={styles.description}>
                Você pode adicionar links{' '}
                <Entypo
                  name="link"
                  size={18}
                  color={COLORS.secondary}
                />
              </Text>
              <TextInput
                onChangeText={e => setLinks(e)}
                placeholder="use ',' para separar multiplos links"
                placeholderTextColor={COLORS.secondary}
                textAlignVertical="top"
                style={{
                  padding: 10,
                  width: '100%',
                  height: 50,
                  borderWidth: 0.5,
                  borderColor: COLORS.secondary,
                  color: COLORS.black,
                  marginVertical: 10
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginVertical: 20
                }}
              >
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.icons}
                >
                  <MaterialIcons
                    name="insert-photo"
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.icons}>
                  <FontAwesome
                    name="paint-brush"
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity> */}
              </View>

              <TouchableOpacity
                onPress={uploadpost}
                style={styles.button}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator
                    color={COLORS.white}
                    size="small"
                  />
                ) : (
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONTS.PoppinsSemiBold
                    }}
                  >
                    Partilhar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  postcontainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    marginVertical: 15,

    borderRadius: 10,
    ...SHADOWS.light
  },
  headerpost: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between'
  },
  headerpostinfo: {
    flexDirection: 'row'
  },
  profilephoto: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 20
  },
  username: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: 8
  },
  time: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.secondary,
    marginTop: 5
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: LIGHT.secondarycolor,
    textAlign: 'justify'
  },
  postercontainer: {
    height: 350,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10
  },
  posterdescriptioncontainer: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: 7
  },
  buttonsarea: {
    width: '95%',
    alignSelf: 'center',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  floatbutton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icons: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    borderRadius: 8
  },
  button: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginTop: 10
  }
})
export default Home
