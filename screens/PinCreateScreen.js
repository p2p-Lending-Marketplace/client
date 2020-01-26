import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Constants from 'expo-constants';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { useMutation } from '@apollo/react-hooks'
import { REGISTER_USER } from "../API/graphQuery"

const PinCreateScreen = ({ navigation }) => {
    // Variables
    const phoneNumber = navigation.getParam("phoneNumber")
    console.log(phoneNumber)
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [pinValid, setPinValid] = useState(false)

    //Function
    const [addNewUser, { error, data }] = useMutation(REGISTER_USER)
    const _storeData = async () => {
      try {
        await AsyncStorage.setItem("phoneNumber", phoneNumber)
      } catch (error) {
        // Error saving data
        console.log(error)
      }
    }
    const handleOnChangePin = (pin) => {
        setPin(pin);
    };
    const handleOnChangeConfirmPin = (confirmPin) => {
        setConfirmPin(confirmPin)
    }
    useEffect(() => {
        if(pin.length === 6 && confirmPin.length === 6 && pin === confirmPin){
            setPinValid(true)
        }
    }, [pin, confirmPin])
    const handleOnPressSubmit = () => {
        _storeData()
        addNewUser({
          variables: {
            phone_number: phoneNumber,
            pin
          }
        })
        console.log("hihihihi")
    }
    if(error){
      console.log(error)
    }
    useEffect(() => {
      if(data){
        navigation.navigate("tabNavigator")
      }
    }, [data])
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
                  onPress={handleOnPressSubmit}
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
