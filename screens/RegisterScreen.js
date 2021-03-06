import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'
import { Item, Input } from 'native-base'
import { useLazyQuery } from '@apollo/react-hooks'
import { REQUEST_OTP, VERIFY_OTP } from '../API/graphQuery'
import { RegisterPhoneComponent } from '../components/'
import { SimpleLineIcons } from '@expo/vector-icons'
import CountDown from 'react-native-countdown-component'
import { APP_NAME } from '../assets/variables'

const RegisterScreen = ({ parentNavigation }) => {
  // Variables
  const navigation = parentNavigation.navigation
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [resendStatus, setResendStatus] = useState(false)
  const [validation, setValidation] = useState(false)
  const [
    verifyOTP,
    { loading: verifyLoading, error: verifyError, data: verifyData },
  ] = useLazyQuery(VERIFY_OTP)
  const [requestOTP, { loading, error, data }] = useLazyQuery(REQUEST_OTP)

  // Functions
  function handleOnChangePhone(phoneNumber) {
    setPhoneNumber(phoneNumber)
  }
  function handleOnChangeOTP(otp) {
    setOtpCode(otp)
  }
  function phoneNumberChecker() {
    if (phoneNumber[0] === '0') {
      const newNumber = '+62' + phoneNumber.slice(1)
      return newNumber
    } else if (phoneNumber[0] === '8') {
      const newNumber = '+62' + phoneNumber
      return newNumber
    }
  }

  async function handleRequestOTP() {
    if (phoneNumber.length === 0) {
      alert('Please fill the phone number')
      return
    }
    await setResendStatus(true)
    const fixedPhoneNumber = phoneNumberChecker()
    requestOTP({
      variables: {
        phone_number: fixedPhoneNumber,
      },
    })
  }

  async function handleOnFinish() {
    await setResendStatus(false)
  }

  async function savePhoneNumber() {
    try {
      await AsyncStorage.setItem(
        APP_NAME + ':phoneNumber',
        phoneNumberChecker()
      )
      navigation.navigate('LoginScreen', { phoneNumber })
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  }

  async function handleOnSubmit() {
    const phoneNumber = phoneNumberChecker()
    verifyOTP({
      variables: {
        token: otpCode,
        phone_number: phoneNumber,
      },
    })
  }

  async function validationRegister() {
    if (phoneNumber.length > 9 && otpCode.length === 6)
      await setValidation(true)
    else await setValidation(false)
  }

  useEffect(() => {
    validationRegister()
  }, [phoneNumber, otpCode])

  useEffect(() => {
    if (error || verifyError) {
      alert('Your OTP code is invalid')
      console.log(error || verifyError)
    }

    if (verifyData && verifyData.verifyOTP._id) {
      savePhoneNumber()
    } else if (
      otpCode.length === 6 &&
      phoneNumber.length >= 9 &&
      verifyData &&
      !verifyData.verifyOTP._id
    ) {
      const navigateToPinCreate = async () => {
        const phoneNumber = await phoneNumberChecker()
        console.log(phoneNumber)
        navigation.navigate('PinCreateScreen', {phoneNumber})
      }
      navigateToPinCreate()
    }
  }, [verifyData, error, verifyError])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: 0,
          }}
        >
          <Image
            source={{
              uri:
                'https://www.fintechnews.org/wp-content/uploads/2019/01/f122-1.png',
            }}
            style={{ width: '60%', height: 101, margin: 20 }}
          />
        </View>
        <Item style={{ width: '90%' }}>
          <SimpleLineIcons name="screen-smartphone" size={25} />
          <Text
            style={{ padding: 5, backgroundColor: '#EEE', borderRadius: 3 }}
          >
            +62
          </Text>
          <Input
            value={phoneNumber}
            placeholder="Phone Number"
            keyboardType={'number-pad'}
            onChangeText={phoneNumber => {
              handleOnChangePhone(phoneNumber)
            }}
          />
        </Item>
        <Item style={{ width: '90%' }}>
          <SimpleLineIcons name="key" size={25} />
          <Input
            value={otpCode}
            placeholder="OTP Code"
            keyboardType={'number-pad'}
            onChangeText={otp => {
              handleOnChangeOTP(otp)
            }}
          />
          {resendStatus ? (
            <CountDown
              until={60}
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 3,
                padding: 2,
              }}
              onFinish={() => handleOnFinish()}
              size={10}
              digitStyle={{ backgroundColor: '#FFF' }}
              digitTxtStyle={{ color: 'grey' }}
              timeLabels={{ s: '' }}
              timeToShow={['S']}
            />
          ) : (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: 'black',
                padding: 5,
                borderRadius: 3,
              }}
              onPress={() => {
                handleRequestOTP()
              }}
            >
              <Text>Request OTP</Text>
            </TouchableOpacity>
          )}
        </Item>
        {validation ? (
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              width: '90%',
              // paddingHorizontal: 30,
              backgroundColor: '#1D63DB',
              marginTop: 50,
              borderRadius: 20,
            }}
            onPress={() => {
              handleOnSubmit()
            }}
          >
            <Text style={{ fontSize: 15, color: '#FFF', textAlign: 'center' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              width: '90%',
              backgroundColor: 'grey',
              marginTop: 50,
              borderRadius: 5,
            }}
            disabled
          >
            <Text style={{ fontSize: 15, color: '#FFF', textAlign: 'center' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen
