import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import Constants from 'expo-constants';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { LOGIN_USER } from "../API/graphQuery"
import { useLazyQuery } from "@apollo/react-hooks"
import { APP_NAME } from "../assets/variables"
import colors from "../assets/colors";

const PinCreateScreen = ({ navigation }) => {
  // Variables
  const [pin, setPin] = useState('');
  const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN_USER)
  
  //Function
  const getPhoneNumber = async () => {
    const phoneNumber = await AsyncStorage.getItem(APP_NAME + ':phoneNumber')
    if (phoneNumber) {
      return phoneNumber
    } else {
      return false
    }
  }
  const handleLazyQuery = async () => {
    const phone_number = await getPhoneNumber()
    loginUser({
      variables: {
        phone_number,
        pin
      }
    })
  }
  useEffect(() => {
    if(data){
      if(data.signInUser){
        const token = data.signInUser
        saveToken(JSON.stringify(token))
        navigation.navigate("tabNavigator")
      }
    }
  }, [data])
  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem(APP_NAME + ':token', token)
    } catch (error) {
      console.log(error)
    }
  }
  const handleOnChangePin = pin => {
    setPin(pin);
  };
  useEffect(() => {
    if(pin.length === 6){
      handleLazyQuery()
    }
  }, [pin])
  
  if(error){
    console.log(error)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteBackground }}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{ flex: 1}}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
          }}
        >
          <View
            style={{ marginVertical: 10, width: '90%', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 15, fontWeight: '400', marginBottom: 30 }}>Enter PIN bellow :</Text>
            <SmoothPinCodeInput
              autoFocus
              placeholder={
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 25,
                    opacity: 0.3,
                    backgroundColor: '#016AFB'
                  }}
                ></View>
              }
              mask={
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 25,
                    backgroundColor: colors.mainBackground
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PinCreateScreen;
