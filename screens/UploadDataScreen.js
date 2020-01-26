import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { Item, Form, Input, Label, Spinner, Segment } from 'native-base'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
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
  const [uploadImage, { loading, error, data }] = useMutation(UPLOAD_IMAGE)

  // Function
  const nextPage = () => {
    navigation.navigate("Upload Data 2")
  }
  const getPermissionAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need file manager permissions to make this work!');
        return false
      } else {
        return true
      }
  };
  const _pickImage = async (field, ratio) => {
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
          photo: data.singleUpload.imageURL,
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
              alignItems: 'center',
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
                  overflow: "hidden"
                }}
              >
                {
                  loading 
                  ? (
                      <Spinner />
                    ) 
                  : data 
                    ? (
                        <ImageBackground
                          source={{ uri: data.singleUpload.imageURL }}
                          style={{
                            width: 150,
                            height: 200,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              _pickImage('photo', [3, 4])
                            }}
                          >
                            <Entypo
                              name="cycle"
                              style={{ fontSize: 70, color: colors.mainBackground }}
                            />
                          </TouchableOpacity>
                        </ImageBackground>
                      ) 
                    : (
                        <TouchableOpacity
                          onPress={() => {
                            _pickImage('photo', [3, 4])
                          }}
                        >
                          <AntDesign
                            name="plus"
                            style={{ fontSize: 70, color: colors.mainBackground }}
                          />
                        </TouchableOpacity>
                      )
                }
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  marginVertical: 5,
                }}
              >
                <Text style={{fontSize: 20, color: colors.mainBackground}}>Photo</Text>
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
                  borderBottomColor: colors.shadowColor,
                  borderBottomWidth: 4,
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
                    marginLeft: 7,
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
