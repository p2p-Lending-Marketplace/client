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

  // Functions
  const handleOnChangePhone = phoneNumber => {
    setPhoneNumber(phoneNumber)
  }
  const handleOnChangeOTP = otp => {
    setOtpCode(otp)
  }
  const [requestOTP, { loading, error, data }] = useLazyQuery(REQUEST_OTP)
  const phoneNumberChecker = () => {
    if (phoneNumber[0] === '0') {
      const newNumber = '+62' + phoneNumber.slice(1)
      return newNumber
    } else if (phoneNumber[0] === '8') {
      const newNumber = '+62' + phoneNumber
      return newNumber
    }
  }

  const handleRequestOTP = async () => {
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
      fetchPolicy: "network-only"
    })
  }

  const handleOnFinish = async () => {
    await setResendStatus(false)
  }

  useEffect(() => {
    validationRegister()
  }, [phoneNumber, otpCode])

  const validationRegister = async () => {
    if (phoneNumber.length > 9 && otpCode.length === 6)
      await setValidation(true)
    else await setValidation(false)
  }

  const handleOnSubmit = async () => {
    const phoneNumber = phoneNumberChecker()
    verifyOTP({
      variables: {
        token: otpCode,
        phone_number: phoneNumber,
      },
    })
  }

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
      navigation.navigate('PinCreateScreen')
    }
  }, [verifyData])

  const savePhoneNumber = async () => {
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
            source={require("../assets/images/logo.png")}
            style={{ width: 190, height: 65, marginBottom: 70 }}
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
              borderRadius: 20,
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
