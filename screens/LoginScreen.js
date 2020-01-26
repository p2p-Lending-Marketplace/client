import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import Constants from 'expo-constants';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { LOGIN_USER } from "../API/graphQuery"
import { useLazyQuery } from "@apollo/react-hooks"

const PinCreateScreen = ({ navigation }) => {
  // Variables
  const [pin, setPin] = useState('');
  const phoneNumber = navigation.getParam("phoneNumber")
  const [runQuery, { loading, error, data }] = useLazyQuery(LOGIN_USER)
  if(error){
    console.log(error)
  }

  const handleLazyQuery = () => {
    runQuery({
      variables: {
        phone_number: phoneNumber,
        pin
      }
    })
  }

  useEffect(() => {
    if(data){
      if(data.signInUser.status){
        navigation.navigate("tabNavigator")
      }
    }
  }, [data])

  //Function
  const handleOnChangePin = pin => {
    setPin(pin);
  };
  useEffect(() => {
    if(pin.length === 6){
      handleLazyQuery()
    }
  }, [pin])

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
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
                    backgroundColor: '#016AFB'
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
