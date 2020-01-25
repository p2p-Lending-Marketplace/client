import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native'
import { Item, Form, Input, Label } from 'native-base'
import colors from '../assets/colors'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { plus } from '../assets/icons'
import { useMutation } from '@apollo/react-hooks'
import { UPLOAD_IMAGE } from '../API/graphQuery'
import colors from "../assets/colors"
import { Entypo, AntDesign } from "@expo/vector-icons"

const UploadDataScreen = ({ navigation }) => {
  // Variables
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    photo: "",
  })
  const [imageView, setImageView] = useState({
    photoUri: '',
    idCardUri: '',
    salarySlipUri: '',
  })

  const [uploadImage, { loading, error, data }] = useMutation(UPLOAD_IMAGE)
  useEffect(() => {
    console.log(data)
  }, [data])

  // Function
  const nextPage = () => {
    navigation.navigate("Upload Data 2")
  }
  const getPermissionAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return false
      } else {
        return true
      }
  };
  const _pickImage = async (field, rasio) => {
    const status = await getPermissionAsync()
    if (!status) {
      return
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: ratio,
      quality: 1,
      base64: true,
    })


    if (!result.cancelled) {
      if (field === 'photo') {
        uploadImage({ variables: { file: result } })
        setDataUser({
          ...dataUser,
          photo: fd,
        })
        setImageView({
          ...imageView,
          photoUri: result.uri,
        })
        console.log('di sini')
      } else if (field === 'idCard') {
        let fd = new FormData()
        fd.append('image', result.uri)
        setDataUser({
          ...dataUser,
          idCard: fd,
        })
        setImageView({
          ...imageView,
          idCardUri: result.uri,
        })
      } else if (field === 'salarySlip') {
        let fd = new FormData()
        fd.append('image', result.uri)
        setDataUser({
          ...dataUser,
          salarySlip: fd,
        })
        setImageView({
          ...imageView,
          salarySlipUri: result.uri,
        })
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Form
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label style={{ color: colors.mainBackground }}>Name</Label>
              <Input />
            </Item>
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label style={{ color: colors.mainBackground }}>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label style={{ color: colors.mainBackground }}>
                Phone Number
              </Label>
              <Input />
            </Item>
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label style={{ color: colors.mainBackground }}>Address</Label>
              <Input />
            </Item>
            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
              }}
            >
              <View
                style={{
                  borderColor: colors.mainBackground,
                  borderWidth: 1,
                  width: 150,
                  height: 200,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ImageBackground
                  source={{ uri: imageView.photoUri }}
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      _pickImage('photo', [3, 4])
                    }}
                  >
                    <AntDesign
                      name="plus"
                      style={{ fontSize: 70, color: '#12cad6' }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  marginVertical: 5
                }}
              >
                <Text>Photo</Text>
              </View>
            </View>
            <View style={{ flex: 1, width: '100%', alignItems: 'flex-end' }}>
              <TouchableOpacity
                style={{
                  width: 90,
                  backgroundColor: colors.mainBackground,
                  paddingVertical: 5,
                  borderRadius: 7,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: '#8ee7ed',
                  borderBottomWidth: 4
                }}
                onPress={() => {
                  nextPage()
                }}
              >
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 15,
                    fontWeight: '700',
                    marginLeft: 7
                  }}
                >
                  Next
                </Text>
                <Entypo
                  name="chevron-thin-right"
                  style={{ color: '#FFF', fontSize: 25 }}
                />
              </TouchableOpacity>
            </View>
          </Form>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UploadDataScreen
