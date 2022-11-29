import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  StatusBar
} from 'react-native'
import React from 'react'
import {
  Ionicons,
  Fontisto,
  Entypo,
  MaterialIcons
} from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import * as ImagePicker from 'expo-image-picker'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { COLORS, FONTS, LIGHT, SIZES } from '../constants'

const communities = [
  {
    id: 1,
    profile: require('../assets/fortnite.jpg'),
    name: 'Fortnite moz club',
    desc: 'Fortnite é um jogo eletrônico multijogador online revelado originalmente em 2011, desenvolvido pela Epic Games e lançado como diferentes modos de jogo que compartilham a mesma jogabilidade e motor gráfico de jogo. Fortnite é um jogo eletrônico multijogador online revelado originalmente em 2011, desenvolvido pela Epic Games e lançado como diferentes modos de jogo que compartilham a mesma jogabilidade e motor gráfico de jogo. Fortnite é um jogo eletrônico multijogador online revelado originalmente em 2011, desenvolvido pela Epic Games e lançado como diferentes modos de jogo que compartilham a mesma jogabilidade e motor gráfico de jogo. Fortnite é um jogo eletrônico multijogador online revelado originalmente em 2011, desenvolvido pela Epic Games e lançado como diferentes modos de jogo que compartilham a mesma jogabilidade e motor gráfico de jogo. Fortnite é um jogo eletrônico multijogador online revelado originalmente em 2011, desenvolvido pela Epic Games e lançado como diferentes modos de jogo que compartilham a mesma jogabilidade e motor gráfico de jogo. Fortnite é um jogo eletrônico multijogador online revelado originalmente em 2011, desenvolvido pela Epic Games e lançado como diferentes modos de jogo que compartilham a mesma jogabilidade e motor gráfico de jogo. Fortnite é um jogo eletrônico multijogador online revelado originalmente em 2011, desenvolvido pela Epic Games e lançado como diferentes modos de jogo que compartilham a mesma jogabilidade e motor gráfico de jogo.',
    members: 50000,
    privacy: true
  },
  {
    id: 2,
    profile: require('../assets/lgbt.jpg'),
    name: '+LGBT',
    desc: 'LGBT é uma sigla que significa Lésbicas, Gays, Bissexuais e Transgênero. Em uso desde a década de 1990, o termo é uma adaptação da sigla LGB, que começou a substituir o termo gay em referência',
    members: 5000,
    privacy: false
  },
  {
    id: 3,
    profile: require('../assets/gdrive.jpg'),
    name: 'Filmes  no Gdrive',
    desc: 'Google Drive é um serviço de armazenamento e sincronização de arquivos que foi apresentado pela Google em 24 de abril de 2012. Google Drive abriga agora o Google Docs, um leque de aplicações de produtividade, que oferece a edição de documentos, folhas de cálculo, apresentações, e muito mais.',
    members: 10000,
    privacy: false
  }
]

let lastitem = communities[communities.length - 1]
const Community = () => {
  const bottomSheetModalRef = React.useRef(null)
  const bottomSheetModalInfo = React.useRef(null)
  const [image, setImage] = React.useState(null)
  const [vector, setVector] = React.useState(null)
  const [readMore, setReadMore] = React.useState(true)
  const [selected, setSelected] = React.useState('')
  const snapPoints = React.useMemo(() => ['95%', '95%'], [])

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const bottomSheetModalInfoPress = React.useCallback(() => {
    bottomSheetModalInfo.current?.present()
  }, [])
  const handleUnPresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.close()
    bottomSheetModalInfo.current?.close()
  }, [])

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
  return (
    <View style={styles.container}>
      <View
        style={{ width: '90%', marginTop: getStatusBarHeight() + 10 }}
      >
        <View style={styles.header}>
          <Text style={{ fontFamily: FONTS.Labster }}>
            Communidade
          </Text>
          <TouchableOpacity onPress={handlePresentModalPress}>
            <Ionicons
              name="add-circle-sharp"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={communities}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                bottomSheetModalInfoPress(setSelected(item))
              }
              style={{
                ...styles.communitycontainer,
                marginBottom: item.id == lastitem.id ? 80 : 0
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{ height: 48, width: 48, borderRadius: 24 }}
                  source={item.profile}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text style={styles.username}>{item.name}</Text>
                  <Text style={styles.members}>
                    Membros: {intToString(item.members)}
                  </Text>
                </View>
              </View>

              {item.privacy ? (
                <Fontisto name="locked" size={10} color="red" />
              ) : (
                <Fontisto name="unlocked" size={10} color="green" />
              )}
            </TouchableOpacity>
          )}
        />
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
                Criar comunidade
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
                placeholder="Nome da comunidade"
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
              <Text style={styles.description}>
                Você pode adicionar a descrição da comunidade
              </Text>
              <TextInput
                multiline
                placeholder="Escreva a descrição"
                placeholderTextColor={COLORS.secondary}
                textAlignVertical="top"
                style={{
                  padding: 10,
                  width: '100%',
                  height: 100,
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

              <TouchableOpacity style={styles.button}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.PoppinsSemiBold
                  }}
                >
                  Criar comunidade
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      {/* detalhes da comunidade */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalInfo}
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
              <Image
                style={{
                  height: 350,
                  width: '100%',
                  borderRadius: 10
                }}
                source={selected.profile}
              />

              <Text
                style={{
                  fontFamily: FONTS.PoppinsSemiBold,
                  marginVertical: 20
                }}
              >
                {selected.name}
              </Text>
              <Text style={styles.description}>{selected.desc}</Text>

              <View style={{ marginVertical: 10 }}>
                {selected.privacy && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <TextInput
                      maxLength={6}
                      keyboardType="numeric"
                      placeholder="Digite o pin"
                      style={{
                        padding: 10,
                        borderWidth: 0.5,
                        borderColor: COLORS.secondary,
                        width: '50%',
                        marginRight: 10
                      }}
                    />
                    <Fontisto name="locked" size={30} color="red" />
                  </View>
                )}
                <TouchableOpacity style={styles.button}>
                  <Text
                    style={{
                      fontFamily: FONTS.PoppinsBold,
                      color: COLORS.white
                    }}
                  >
                    Entrar na comunidade
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  communitycontainer: {
    marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.secondary
  },
  username: {
    fontFamily: FONTS.PoppinsSemiBold
  },
  members: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: LIGHT.secondarycolor,
    marginTop: 5
  },
  button: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginTop: 10
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: LIGHT.secondarycolor,
    textAlign: 'left'
  }
})
export default Community
