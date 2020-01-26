import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Header } from "native-base";
import Constants from 'expo-constants';
import SmoothPinCodeInput from "react-native-smooth-pincode-input"
import { back } from "../assets/icons"
import serverAPI from "../API/serverAPI"
import { useLazyQuery } from "@apollo/react-hooks"
import { VERIFY_OTP } from "../API/graphQuery"

const VerifyOTPScreen = ({navigation}) => {
  // Variables
  const [token, setToken] = useState('');
  const phoneNumber = navigation.getParam("phoneNumber")
  
  //Function
  const handleOnPressBack = () => {
      navigation.navigate("RegisterScreen")
  }
  const handleOnChangeToken = (token) => {
    console.log(token)
    setToken(token)
  }
  const [runQuery ,{ loading, error, data }] = useLazyQuery(VERIFY_OTP)
  if(error){
    console.log(error)
  }
  useEffect(() => {
    if (data) {
      if (data.verifyOTP.phone_number) {
        navigation.navigate("LoginScreen", { phoneNumber })
      } else {
        navigation.navigate("PinCreateScreen", { phoneNumber })
      }
    }
  }, [data])
  const handleLazyQuery = () => {
    runQuery({
      variables: {
        token,
        phone_number: phoneNumber
      }
    })
  }
  useEffect(() => {
    if(token.length === 6){
      handleLazyQuery()
    }
  }, [token])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="height"
        enabled
        style={{ flex: 1, marginTop: Constants.statusBarHeight }}
      >
        <Header
          style={{ backgroundColor: '#FFF', justifyContent: 'flex-start' }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity onPress={handleOnPressBack}>
              <Image
                source={{ uri: back }}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
            <Text>Back</Text>
          </View>
        </Header>
        <View
          style={{
            backgroundColor: '#EEEEEE',
            width: '100%',
            paddingVertical: 50,
            alignItems: 'center',
            flex: 1
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '600' }}>
              Verification Code
            </Text>
            <Text style={{ fontSize: 18 }}>60s</Text>
            <Text style={{ fontSize: 18 }}>
              Input the 4-digit code sent to
            </Text>
            <Text style={{ fontSize: 18 }}>+62 822 4248 3727</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <SmoothPinCodeInput
              autoFocus
              cellStyle={{
                borderBottomWidth: 2,
                borderColor: 'gray'
              }}
              cellStyleFocused={{
                borderColor: '#016AFB'
              }}
              codeLength={6}
              textStyle={{
                color: '#016AFB',
                fontSize: 25
              }}
              value={token}
              onTextChange={token => handleOnChangeToken(token)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default VerifyOTPScreen
