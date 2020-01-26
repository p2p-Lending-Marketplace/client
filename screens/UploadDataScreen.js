import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from 'react-native'
import { Item, Form, Input, Label, Spinner, Segment, Header, Button } from 'native-base'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { useMutation } from '@apollo/react-hooks'
import { UPLOAD_IMAGE, UPDATE_USER_DATA } from '../API/graphQuery'
import colors from "../assets/colors"
import { Entypo, AntDesign } from "@expo/vector-icons"
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import { APP_NAME } from '../assets/variables'

const UploadDataScreen = ({ navigation }) => {
  // Variables
  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem(APP_NAME + ":user")
      console.log(JSON.parse(user))
      if (user !== null) {
        // We have data!!
        return JSON.parse(user)
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }
  const [datePicker, setDatePicker] = useState({
    date: new Date(),
    mode: "date",
    show: false
  })
  const show = mode => {
    setDatePicker({
      ...datePicker,
      show: true,
      mode
    })
  }
  const datepicker = () => {
    show('date')
  }
  const setDate = (_, date) => {
    date = date || datePicker.date

    setDatePicker({
      // show: Platform.OS === 'ios' ? true : false,
      show: !datePicker.show,
      date,
    })
    setDataUser({
      ...dataUser,
      dateOfBirth: date
    })
  }
  const [personal, setPersonal] = useState(true)
  const [financial, setFinancial] = useState(false)
  const [dataUser, setDataUser] = useState({
    numId: "",
    name: "",
    placeOfBirth: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    address: "",
    photo: "",
    idCard: "",
    currentJob: "",
    salary: "",
    salarySlip: ""
  })
  const [uploadPhoto, { loading: photoLoading, error: photoError, data: photoData }] = useMutation(UPLOAD_IMAGE)
  const [uploadIdCard, { loading: idCardLoading, error: idCardError, data: idCardData }] = useMutation(UPLOAD_IMAGE)
  const [uploadSalarySlip, { loading: salarySlipLoading, error: salarySlipError, data: salarySlipData }] = useMutation(UPLOAD_IMAGE)

  // Function
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
        uploadPhoto({ variables: { file: result } })
      } else if(field === 'idCard'){
        uploadIdCard({ variables: { file: result } })
      } else if(field === 'salarySlip'){
        uploadSalarySlip({ variables: { file: result } })
      }
    }
  }

  useEffect(() => {
    if(photoData){
      setDataUser({
        ...dataUser,
        photo: photoData.singleUpload.imageURL,
      })
    }
    if(idCardData){
      setDataUser({
        ...dataUser,
        idCard: idCardData.singleUpload.imageURL,
      })
    }
    if(salarySlipData){
      setDataUser({
        ...dataUser,
        salarySlip: salarySlipData.singleUpload.imageURL
      })
    }
  }, [photoData, idCardData, salarySlipData])

  function handleDataChange(type, value) {
    setDataUser({
      ...dataUser,
      [type]: value
    })
  }
  const [updateUserData, { data, error, loading }] = useMutation(UPDATE_USER_DATA)
  
  const handleSaveButton = () => {
    const user = getUser()
    console.log(user)
    // updateUserData({
    //   variables: {
    //     ...dataUser,
    //     // id: user._id
    //   }
    // })
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteBackground }}>
      <Segment style={{ backgroundColor: colors.whiteBackground }}>
        <Button
          style={{
            paddingHorizontal: 20,
            borderTopLeftRadius: 7,
            borderBottomLeftRadius: 7,
          }}
          active={personal}
          first
          onPress={() => {
            setPersonal(true)
            setFinancial(false)
          }}
        >
          <Text>Personal Data</Text>
        </Button>
        <Button
          style={{
            paddingHorizontal: 20,
            borderTopRightRadius: 7,
            borderBottomRightRadius: 7,
          }}
          active={financial}
          last
          onPress={() => {
            setFinancial(true)
            setPersonal(false)
          }}
        >
          <Text>Financial Data</Text>
        </Button>
      </Segment>
      <ScrollView style={{ flex: 1 }}>
        {personal ? (
          <View style={{ flex: 1 }}>
            <Form
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>No. ID</Label>
                <Input
                  value={dataUser.numId}
                  keyboardType={'number-pad'}
                  onChangeText={numId => {
                    handleDataChange('numId', numId)
                  }}
                />
              </Item>
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>Name</Label>
                <Input
                  value={dataUser.name}
                  onChangeText={name => {
                    handleDataChange('name', name)
                  }}
                />
              </Item>
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>
                  Place of Birth
                </Label>
                <Input
                  value={dataUser.placeOfBirth}
                  onChangeText={placeOfBirth => {
                    handleDataChange('placeOfBirth', placeOfBirth)
                  }}
                />
              </Item>
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>
                  Date of Birth
                </Label>
                <Input
                  onFocus={() => {
                    datepicker()
                  }}
                  value={format(datePicker.date, 'EEE, do MMMM YYY')}
                />
              </Item>
              {datePicker.show && (
                <DateTimePicker
                  value={datePicker.date}
                  mode={datePicker.mode}
                  is24Hour={true}
                  display="default"
                  onChange={setDate}
                />
              )}
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>Email</Label>
                <Input
                  value={dataUser.email}
                  onChangeText={email => {
                    handleDataChange('email', email)
                  }}
                />
              </Item>
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>
                  Phone Number
                </Label>
                <Input
                  onChangeText={phoneNumber => {
                    handleDataChange('phoneNumber', phoneNumber)
                  }}
                  keyboardType={'number-pad'}
                />
              </Item>
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>Address</Label>
                <Input
                  value={dataUser.address}
                  onChangeText={address => {
                    handleDataChange('address', address)
                  }}
                />
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
                    overflow: 'hidden',
                  }}
                >
                  {photoLoading ? (
                    <Spinner color={colors.mainBackground} />
                  ) : photoData ? (
                    <ImageBackground
                      source={{ uri: photoData.singleUpload.imageURL }}
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
                  ) : (
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
                  )}
                </View>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ fontSize: 20, color: colors.mainBackground }}>
                    Photo
                  </Text>
                </View>
              </View>
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
                    width: 170,
                    height: 120,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {idCardLoading ? (
                    <Spinner color={colors.mainBackground} />
                  ) : idCardData ? (
                    <ImageBackground
                      source={{ uri: idCardData.singleUpload.imageURL }}
                      style={{
                        width: 170,
                        height: 120,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          _pickImage('idCard', [4, 2])
                        }}
                      >
                        <Entypo
                          name="cycle"
                          style={{ fontSize: 70, color: colors.mainBackground }}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        _pickImage('idCard', [4, 2])
                      }}
                    >
                      <AntDesign
                        name="plus"
                        style={{ fontSize: 70, color: colors.mainBackground }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ fontSize: 20, color: colors.mainBackground }}>
                    ID Card
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.mainBackground,
                  borderRadius: 7,
                  marginVertical: 20
                }}
                onPress={() => {
                  handleSaveButton()
                }}
              >
                <Text
                  style={{
                    marginHorizontal: 25,
                    marginVertical: 10,
                    color: '#FFF',
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </Form>
          </View>
        ) : financial ? (
          <View style={{ flex: 1 }}>
            <Form
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>
                  Current Job
                </Label>
                <Input
                  value={dataUser.currentJob}
                  onChangeText={currentJob => {
                    handleDataChange('currentJob', currentJob)
                  }}
                />
              </Item>
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>Salary</Label>
                <Input
                  value={dataUser.salary}
                  onChangeText={salary => {
                    handleDataChange('salary', salary)
                  }}
                  keyboardType={'number-pad'}
                />
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
                    overflow: 'hidden',
                  }}
                >
                  {salarySlipLoading ? (
                    <Spinner color={colors.mainBackground} />
                  ) : salarySlipData ? (
                    <ImageBackground
                      source={{ uri: salarySlipData.singleUpload.imageURL }}
                      style={{
                        width: 150,
                        height: 200,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          _pickImage('salarySlip', [3, 4])
                        }}
                      >
                        <Entypo
                          name="cycle"
                          style={{ fontSize: 70, color: colors.mainBackground }}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        _pickImage('salarySlip', [3, 4])
                      }}
                    >
                      <AntDesign
                        name="plus"
                        style={{ fontSize: 70, color: colors.mainBackground }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ fontSize: 20, color: colors.mainBackground }}>
                    Salary Slip
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.mainBackground,
                  borderRadius: 7,
                  marginVertical: 20
                }}
                onPress={() => {
                  handleSaveButton()
                }}
              >
                <Text
                  style={{
                    marginHorizontal: 25,
                    marginVertical: 10,
                    color: '#FFF',
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </Form>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  )
}

export default UploadDataScreen
