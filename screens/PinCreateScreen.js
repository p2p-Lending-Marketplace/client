import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button
} from 'react-native';
import {
  Content,
} from 'native-base';
import Constants from 'expo-constants';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const PinCreateScreen = ({ navigation }) => {
    // Variables
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [pinValid, setPinValid] = useState(false)

    //Function
    const handleOnChangePin = (pin) => {
        setPin(pin);
    };
    const handleOnChangeConfirmPin = (confirmPin) => {
        setConfirmPin(confirmPin)
    }
    const handleValidationPin = () => {
        if(pinValid){
            navigation.navigate("Home")
        }
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={{ flex: 1, marginTop: Constants.statusBarHeight }}
        >
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <View style={{ alignItems: 'center', marginVertical: 40 }}>
              <Text style={{ fontSize: 15 }}>
                CREATE PIN FOR LOGIN AUTHENTICATION
              </Text>
            </View>
            <View
              style={{ marginVertical: 10, width: '90%', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 15, fontWeight: '400' }}>PIN</Text>
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
            <View
              style={{ marginVertical: 10, width: '90%', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 15, fontWeight: '600' }}>
                CONFIRMATION PIN
              </Text>
              <SmoothPinCodeInput
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
                value={confirmPin}
                onTextChange={confirmPin =>
                  handleOnChangeConfirmPin(confirmPin)
                }
              />
            </View>
            <View style={{ marginVertical: 30 }}>
              {pinValid ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#016AFB',
                    paddingVertical: 10,
                    paddingHorizontal: 50,
                    borderRadius: 7
                  }}
                >
                  <Text style={{ fontSize: 15, color: '#FFF' }}>Finish</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: 'grey',
                    paddingVertical: 10,
                    paddingHorizontal: 50,
                    borderRadius: 7
                  }}
                  disabled
                >
                  <Text style={{ fontSize: 15, color: '#FFF' }}>Finish</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
};

export default PinCreateScreen;
