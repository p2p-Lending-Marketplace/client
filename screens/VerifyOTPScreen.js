import React, { useState } from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Container, Content, Item, Input, Header, Form, Left, Body, Title } from "native-base";
import Constants from 'expo-constants';
import SmoothPinCodeInput from "react-native-smooth-pincode-input"
import { back } from "../assets/icons"

const VerifyOTPScreen = ({navigation}) => {
    // Variables
    const [token, setToken] = useState('');
    
    //Function
    const handleOnPressBack = () => {
        navigation.navigate("RegisterScreen")
    }
    const handleOnChangeToken = (token) => {
        setToken(token)
        handleOnComplete()
    }
    const handleOnComplete = () => {
        if(token.length === 4){
            // POST to Server API
        }
    }
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
                alignItems: 'center',
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
