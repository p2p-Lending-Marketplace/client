import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
} from 'react-native'
import { Item, Form, Input, Label, Spinner } from 'native-base'
import colors from "../assets/colors"
import { SUBMIT_APPLICATION } from "../API/graphQuery"
import { useMutation } from "@apollo/react-hooks"
import { APP_NAME } from "../assets/variables"
import { useLazyQuery } from "@apollo/react-hooks"
import { FETCH_USER_DETAIL, UPLOAD_IMAGE } from "../API/graphQuery"
import { Entypo } from "@expo/vector-icons"
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

const ApplicationScreen = ({ navigation }) => {
  // Variables
  const fintech_id = navigation.getParam("fintech_id")
  const [token, setToken] = useState("")
  const [fetchUser, { loading: userLoading, data: user, error: userError }] = useLazyQuery(FETCH_USER_DETAIL)
  const [additionalData, { loading: addLoading, error: addError, data: addData }] = useMutation(UPLOAD_IMAGE)
  const [dataApplication, setDataApplication] = useState({
      amount: "",
      loan_term: "",
      objective: "",
      additional_data: ""
  })
  
  // Function

  useEffect(() => {
    const getToken = async () => {
      const tokenString = await AsyncStorage.getItem(APP_NAME + ':token')
      if (tokenString !== null) {
        const { token } = JSON.parse(tokenString)
        setToken(token)
        fetchUser({
          variables: {
            token,
          },
        })
      }
    }
    getToken()
  }, [])

  const [submitData, { data, error }] = useMutation(SUBMIT_APPLICATION)
  function handleDataChange(type, value) {
      setDataApplication({
      ...dataApplication,
      [type]: value
      })
  }

  const _pickImage = async (field, ratio, uploadOpt) => {
    const status = await getPermissionAsync()
    if (!status) {
      return
    }
    let result
    if (uploadOpt === 'file') {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: ratio,
        quality: 1,
        base64: true,
      })
    } else if (uploadOpt === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: ratio,
        quality: 1,
        base64: true,
      })
    }
    if (!result.cancelled) {
      additionalData({
        variables: {
          file: result
        }
      })
    }
  }

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      alert('Sorry, we need file manager permissions to make this work!')
      return false
    } else {
      return true
    }
  }
  if(data){
      navigation.goBack()
  }
  useEffect(() => {
    if (addData) {
      setDataApplication({
        ...dataApplication,
        additional_data: addData.singleUpload.imageURL,
      })
    }
  }, [addData])


  const handleApplyButton = async () => {
    submitData({
        variables: {
            ...dataApplication,
            amount: Number(dataApplication.amount),
            loan_term: Number(dataApplication.loan_term),
            userID: user.getUserById._id,
            fintechID: fintech_id,
            token: token
        }
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteBackground }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Form
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Item
              stackedLabel
              style={{
                width: '90%',
                borderColor: 'transparent',
                paddingLeft: 0,
              }}
              last
            >
              <Label
                style={{
                  color: colors.mainBackground,
                  marginBottom: 10,
                  fontSize: 15,
                  fontWeight: '700',
                }}
              >
                Amount (Rp.)
              </Label>
              <Input
                style={{
                  borderColor: 'grey',
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}
                value={dataApplication.amount}
                keyboardType={'number-pad'}
                onChangeText={amount => {
                  handleDataChange('amount', amount)
                }}
                placeholder="How much you need to borrow.."
                placeholderTextColor={'#E2E2E2'}
              />
            </Item>
            <Item
              stackedLabel
              style={{
                width: '90%',
                borderColor: 'transparent',
                paddingLeft: 0,
              }}
              last
            >
              <Label
                style={{
                  color: colors.mainBackground,
                  marginBottom: 10,
                  fontSize: 15,
                  fontWeight: '700',
                }}
              >
                Loan Term (months)
              </Label>
              <Input
                style={{
                  borderColor: 'grey',
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}
                value={dataApplication.loan_term}
                onChangeText={loan_term => {
                  handleDataChange('loan_term', loan_term)
                }}
                keyboardType={'number-pad'}
                placeholder="How long you're willing to pay the loan.."
                placeholderTextColor={'#E2E2E2'}
              />
            </Item>
            <Item
              stackedLabel
              style={{
                width: '90%',
                borderColor: 'transparent',
                paddingLeft: 0,
              }}
              last
            >
              <Label
                style={{
                  color: colors.mainBackground,
                  marginBottom: 10,
                  fontSize: 15,
                  fontWeight: '700',
                }}
              >
                Loan Objective
              </Label>
              <Input
                style={{
                  borderColor: 'grey',
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}
                value={dataApplication.objective}
                onChangeText={objective => {
                  handleDataChange('objective', objective)
                }}
                placeholder="What is the loan fund used for.."
                placeholderTextColor={'#E2E2E2'}
              />
            </Item>
            <Item
              stackedLabel
              style={{
                width: '90%',
                borderColor: 'transparent',
                paddingLeft: 0,
              }}
              last
            >
              <Label
                style={{
                  color: colors.mainBackground,
                  marginBottom: 10,
                  fontSize: 15,
                  fontWeight: '700',
                }}
              >
                Additional Data (Option)
              </Label>
              {dataApplication.additional_data ? (
                <View
                  style={{
                    borderColor: 'grey',
                    borderWidth: 1,
                    width: 150,
                    height: 200,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    marginBottom: 10,
                  }}
                >
                  <ImageBackground
                    source={{ uri: dataApplication.additional_data }}
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {addLoading && <Spinner color={'#1D63DB'} />}
                  </ImageBackground>
                </View>
              ) : null}
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#EEE',
                    marginRight: '1%',
                    width: '49%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    _pickImage('photo', [3, 4], 'file')
                  }}
                >
                  <Entypo
                    name="attachment"
                    size={25}
                    style={{ color: '#000', padding: 5 }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 10,
                      color: '#000',
                    }}
                  >
                    Browse File
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#EEE',
                    marginLeft: '1%',
                    width: '49%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    _pickImage('photo', [3, 4], 'camera')
                  }}
                >
                  <Entypo
                    name="camera"
                    size={25}
                    style={{ color: '#000', padding: 5 }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 10,
                      color: '#000',
                    }}
                  >
                    Open Camera
                  </Text>
                </TouchableOpacity>
              </View>
            </Item>
            <TouchableOpacity
              style={{
                backgroundColor: colors.mainBackground,
                borderRadius: 5,
                marginVertical: 20,
              }}
              onPress={() => {
                handleApplyButton()
              }}
            >
              <Text
                style={{
                  marginHorizontal: 25,
                  marginVertical: 10,
                  color: '#FFF',
                  fontWeight: '700',
                }}
              >
                Apply Now
              </Text>
            </TouchableOpacity>
          </Form>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ApplicationScreen
