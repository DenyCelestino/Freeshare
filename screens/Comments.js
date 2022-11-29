import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native'
import React, { useState } from 'react'
import { COLORS, LIGHT, SHADOWS, FONTS, SIZES } from '../constants'
import {
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { ip } from '../config'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { Alert } from 'react-native'
import { useRef } from 'react'
import { Keyboard } from 'react-native'

const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0

const Comments = ({ route }) => {
  const item = route.params.item
  const currentuser = route.params.currentuser
  const [isLoading, setLoading] = useState(false)
  const [gif, setGif] = useState([])
  const [selectedGif, setSelectedGif] = useState('')
  const [isLoading2, setLoading2] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(1)
  const [lastitem, setLastitem] = useState(0)

  const [refreshing, setRefreshing] = useState(false)
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const snapPoints = React.useMemo(() => ['90%', '90%'], [])
  const bottomSheetModalRef = React.useRef(null)
  const input = useRef()
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleUnPresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.close()
  }, [])

  const [text, setText] = useState(item.desc.slice(0, 100))

  const [readMore, setReadMore] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    getComments()
    getGif()
  }, [])
  async function uploadcomment() {
    if (content == '' && selectedGif == '') {
      Alert.alert('Alerta', 'Escreva um comentario')
    } else {
      setLoading(true)
      let res = await axios.post(
        `${ip}uploadcomment.php`,
        JSON.stringify({
          iduser: currentuser,
          content: content,
          gifid: selectedGif != '' ? selectedGif.id : '',
          postid: item.id
        })
      )
      setLoading(false)

      console.log(res.config.data)
      console.log(res.data.items)
      if (res.data.items.length > 0) {
        setContent('')
        input.current.clear()
        setSelectedGif('')

        setComments(res.data.items, ...comments)
        let Array = res.data.items[res.data.items.length - 1]
        setLastitem(Array.id)
        Keyboard.dismiss()
      } else if (res.data == 'uploaded-error') {
        Alert.alert('Error', 'Erro tente novamente')
      } else if (res.data == 'id-not-found') {
        Alert.alert('Error', 'Erro contact support')
      }
    }
  }
  async function getComments(
    pageNumber = page,
    shouldRefresh = false
  ) {
    if (total >= pageNumber) {
      if (isLoading2) return

      setLoading2(true)
      let res = await axios.post(
        `${ip}getcomments.php?page=${pageNumber}`,
        JSON.stringify({ id: item.id })
      )

      setLoading2(false)

      setTotal(Math.ceil(res.data.total / 5))
      setPage(pageNumber + 1)
      setComments(
        shouldRefresh
          ? res.data.items
          : [...comments, ...res.data.items]
      )
      console.log(res.data.items)
      let Array = res.data.items[res.data.items.length - 1]

      res.data.total != 0 ? setLastitem(Array.id) : ''
    } else {
    }
  }
  async function refreshList() {
    setRefreshing(true)

    await getComments(1, true)

    setRefreshing(false)
  }
  async function getGif() {
    setLoading(true)
    let res = await axios.get(`${ip}getgif.php`)

    setGif(res.data.items)
    setLoading(false)
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'position' : ''}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View
        style={{ width: '95%', marginTop: getStatusBarHeight() + 10 }}
      >
        <StatusBar
          animated={true}
          backgroundColor={'transparent'}
          translucent={true}
          barStyle="dark-content"
        />
        {
          <FlatList
            style={{ height: '100%' }}
            data={comments}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            ListHeaderComponent={() => (
              <>
                <View style={styles.postcontainer}>
                  <View style={styles.headerpost}>
                    <View style={styles.headerpostinfo}>
                      <Image
                        style={styles.profilephoto}
                        source={{ uri: item.profile }}
                      />
                      <View>
                        <Text style={styles.username}>
                          {item.name}
                        </Text>
                        <Text style={styles.time}>{item.time}</Text>
                      </View>
                    </View>
                    <MaterialCommunityIcons
                      name="dots-horizontal"
                      size={24}
                      color={LIGHT.secondarycolor}
                    />
                  </View>

                  {/* post body */}
                  <View style={styles.posterdescriptioncontainer}>
                    <Text style={styles.description}>
                      {text}
                      {!readMore && item.desc.length > 100
                        ? '...'
                        : ''}
                      {item.desc.length > 100 && (
                        <Text
                          style={{
                            fontSize: SIZES.small,
                            fontFamily: FONTS.semiBold,
                            color: COLORS.primary
                          }}
                          onPress={() => {
                            if (!readMore) {
                              setText(item.desc)
                              setReadMore(true)
                            } else {
                              setText(item.desc.slice(0, 100))
                              setReadMore(false)
                            }
                          }}
                        >
                          {readMore ? ' Mostrar menos' : 'Ler mais'}
                        </Text>
                      )}
                    </Text>
                  </View>

                  {item.photo != '' && (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate('Postview', {
                          item,
                          currentuser: currentuser
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
                      style={{
                        ...styles.description,
                        marginRight: 5
                      }}
                    >
                      {intToString(10000)}
                    </Text>
                    <MaterialCommunityIcons
                      name="share"
                      size={24}
                      color={COLORS.primary}
                    />
                  </View>
                </View>
                {total != 0 && (
                  <Text
                    style={{
                      fontFamily: FONTS.Labster
                    }}
                  >
                    comentarios:
                  </Text>
                )}
              </>
            )}
            onEndReached={() => getComments()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() =>
              isLoading2 && (
                <ActivityIndicator
                  style={{ top: -80 }}
                  color={COLORS.primary}
                  size="small"
                />
              )
            }
            onRefresh={refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  item.iduser == currentuser
                    ? {
                        ...styles.commentarea,
                        marginBottom: item.id == lastitem ? 95 : 0
                      }
                    : {
                        ...styles.commentareaown,
                        marginBottom: item.id == lastitem ? 95 : 0
                      }
                }
              >
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 15
                    }}
                    source={{ uri: item.profile }}
                  />
                  <View style={{ marginLeft: 20 }}>
                    <Text
                      style={{
                        ...styles.username,
                        color:
                          item.iduser == currentuser && COLORS.white
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.regular,
                        fontSize: SIZES.small,
                        color:
                          item.iduser == currentuser
                            ? COLORS.white
                            : COLORS.secondary
                      }}
                    >
                      {item.date}
                    </Text>
                  </View>
                </View>

                {item.giftrue && (
                  <Image
                    style={{
                      height: item.content == '' ? 180 : 80,
                      width: item.content == '' ? '80%' : '40%',
                      borderRadius: 10,
                      marginVertical: 10,
                      alignSelf:
                        item.content == '' ? 'center' : 'flex-start'
                    }}
                    source={{ uri: ip + item.gifimage }}
                  />
                )}
                <Text
                  style={{
                    ...styles.description,
                    marginTop: 8,
                    color: item.iduser == currentuser && COLORS.white
                  }}
                >
                  {item.content}
                </Text>
              </TouchableOpacity>
            )}
          />
        }
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            padding: 10,
            backgroundColor: COLORS.white,

            width: '100%'
          }}
        >
          {selectedGif != '' && (
            <View
              style={{ height: 100, width: 100, borderRadius: 40 }}
            >
              <TouchableOpacity
                onPress={() => setSelectedGif('')}
                style={{
                  width: 20,
                  height: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  backgroundColor: 'red',
                  position: 'absolute',
                  top: -15,
                  zIndex: 1,
                  right: -10
                }}
              >
                <Text style={{ color: COLORS.white }}>X</Text>
              </TouchableOpacity>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 40
                }}
                source={{ uri: ip + selectedGif.gifimage }}
              />
            </View>
          )}

          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row'
            }}
          >
            <TextInput
              ref={input}
              onChangeText={e => setContent(e)}
              multiline
              style={{
                borderRightWidth: 1,
                borderRightColor: COLORS.secondary,
                width: '70%'
              }}
              placeholder="fazer comentario"
            />
            <TouchableOpacity
              onPress={handlePresentModalPress}
              style={{
                padding: 10,
                backgroundColor: COLORS.primary,
                borderRadius: 8
              }}
            >
              <MaterialIcons
                name="gif"
                size={24}
                color={COLORS.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={uploadcomment}
              style={{
                padding: 10,
                backgroundColor: COLORS.primary,
                borderRadius: 8
              }}
            >
              {isLoading ? (
                <ActivityIndicator
                  color={COLORS.white}
                  size="small"
                />
              ) : (
                <MaterialCommunityIcons
                  name="send"
                  size={24}
                  color={COLORS.white}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
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
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ alignItems: 'center' }}
            >
              {gif && (
                <View style={styles.containergif}>
                  {isLoading && (
                    <ActivityIndicator
                      color={COLORS.primary}
                      size="small"
                    />
                  )}
                  {gif.map(item => (
                    <TouchableOpacity
                      onPress={() =>
                        handleUnPresentModalPress(
                          setSelectedGif(item)
                        )
                      }
                      style={styles.item}
                      key={item.id}
                    >
                      <Image
                        source={{ uri: ip + item.gifimage }}
                        style={{ height: '100%', width: '100%' }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </BottomSheetScrollView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: LIGHT.background
  },
  postcontainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    marginVertical: 15,
    marginBottom: 50,
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
    fontSize: SIZES.small
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
    textAlign: 'left'
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
  commentarea: {
    width: '70%',
    marginVertical: 10,
    ...SHADOWS.light,
    padding: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary
  },
  commentareaown: {
    width: '70%',
    marginVertical: 10,
    ...SHADOWS.light,
    padding: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white
  },
  containergif: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '50%',
    height: 200 // is 50% of container width
  }
})
export default Comments
