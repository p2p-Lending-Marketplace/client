import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  AsyncStorage,
  Image,
} from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { LOGIN_USER } from '../API/graphQuery'
import { useLazyQuery } from '@apollo/react-hooks'
import { APP_NAME } from '../assets/variables'
import colors from '../assets/colors'
import { SimpleLineIcons } from '@expo/vector-icons'

const PinCreateScreen = ({ navigation }) => {
  // Variables
  const [pin, setPin] = useState('')
  const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN_USER)

  //Function
  async function getPhoneNumber() {
    const phoneNumber = await AsyncStorage.getItem(APP_NAME + ':phoneNumber')
    if (phoneNumber) {
      return phoneNumber
    } else {
      return false
    }
  }

  async function handleLazyQuery() {
    const phone_number = await getPhoneNumber()
    loginUser({
      variables: {
        phone_number,
        pin,
      },
    })
  }

  async function saveToken(token) {
    try {
      await AsyncStorage.setItem(APP_NAME + ':token', token)
      navigation.navigate('Member')
    } catch (error) {
      console.log(error)
    }
  }
  function handleOnChangePin(pin) {
    setPin(pin)
  }

  useEffect(() => {
    if (data) {
      if (data.signInUser) {
        const token = data.signInUser
        saveToken(JSON.stringify(token))
      }
    }

    if (error) {
      console.log(error)
    }
  }, [data, error])

  useEffect(() => {
    if (pin.length === 6) {
      handleLazyQuery()
    }
  }, [pin])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          // paddingTop: 50,
          flex: 1,
        }}
      >
        <View
          style={{ marginVertical: 10, width: '90%', alignItems: 'center' }}
        >
          <SimpleLineIcons
            name="lock"
            size={70}
            style={{ marginVertical: 30 }}
          />
          <Text style={{ fontSize: 20, fontWeight: '400', marginBottom: 50 }}>
            Enter Security PIN bellow :
          </Text>
          <SmoothPinCodeInput
            autoFocus
            placeholder={
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 25,
                  opacity: 0.3,
                  backgroundColor: '#016AFB',
                }}
              ></View>
            }
            mask={
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 25,
                  backgroundColor: colors.mainBackground,
                }}
              ></View>
            }
            codeLength={6}
            maskDelay={1000}
            password={true}
            cellStyle={null}
            cellStyleFocused={null}
            value={pin}
            onTextChange={pin => handleOnChangePin(pin)}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default PinCreateScreen
