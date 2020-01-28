import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
} from 'react-native'
import { Header } from 'native-base'
import Constants from 'expo-constants'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { back } from '../assets/icons'
import { useLazyQuery } from '@apollo/react-hooks'
import { VERIFY_OTP } from '../API/graphQuery'
import { APP_NAME } from '../assets/variables'

const TokenFormComponent = ({data}) => {
    console.log(data)
    // Variables
    const token = data.token
    const handleOnChangeToken = data.handleOnChangeToken

    // Functions
    return (
      <View style={styles.TokenInputContainer}>
        <SmoothPinCodeInput
          autoFocus
          cellStyle={{
            borderBottomWidth: 2,
            borderColor: 'gray',
          }}
          cellStyleFocused={{
            borderColor: '#016AFB',
          }}
          codeLength={6}
          textStyle={{
            color: '#016AFB',
            fontSize: 25,
          }}
          value={token}
          onTextChange={token => handleOnChangeToken(token)}
        />
      </View>
    )
}

const styles = StyleSheet.create({
  TokenInputContainer: {
    marginTop: 20,
  },
})

export default TokenFormComponent
