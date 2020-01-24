import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const PinCreateScreen = ({ navigation }) => {
  // Variables
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinValid, setPinValid] = useState(false);

  //Function
  const handleOnChangePin = pin => {
    setPin(pin);
  };
  const handleOnChangeConfirmPin = confirmPin => {
    setConfirmPin(confirmPin);
  };
  const handleValidationPin = () => {
    if (pinValid) {
      navigation.navigate('Home');
    }
  };
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
