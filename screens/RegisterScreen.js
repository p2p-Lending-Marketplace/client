import React, { useState,useEffect } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Item, Input, Form } from "native-base";
import Constants from 'expo-constants';
import {phone} from "../assets/icons"
import serverAPI from "../API/serverAPI"
import colors from "../assets/colors";
import { useLazyQuery } from "@apollo/react-hooks"
import { REQUEST_OTP } from "../API/graphQuery"
import { RegisterPhoneComponent } from "../components/";

const RegisterScreen = ({navigation}) => {
  // Variables
  const [phoneNumber, setPhoneNumber] = useState("");

  // Functions
  const handleOnChangePhone = (phoneNumber) => {
    setPhoneNumber(phoneNumber)
  }
  const [requestOTP, { loading, error, data }] = useLazyQuery(REQUEST_OTP)
  const phoneNumberChecker = () => {
    if(phoneNumber[0] === '0'){
      const newNumber = "+62" + phoneNumber.slice(1)
      return newNumber;
    } else if(phoneNumber[0] === "8"){
      const newNumber = "+62" + phoneNumber
      return newNumber
    }
  }

  const handleSubmitNumber = () => {
    const phoneNumber = phoneNumberChecker()
    requestOTP({
      variables: {
        phone_number: phoneNumber
      }
    })
  }
  if (error) {
    console.log(error)
  }
  useEffect(() => {
    if (data) {
      const phoneNumber = phoneNumberChecker()
      navigation.navigate("VerifyOTPScreen", { phoneNumber })
    } 
  }, [data])
    
    return (
      <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
        <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <View style={{ flex: 7, backgroundColor: "#FFF", justifyContent: "center", width: '100%' }}>
              <View style={{ alignItems: "center",}}>
                <Image source={require("../assets/images/register.jpg")} style={{width: '70%', height: 250}} />
              </View>
            </View>
            <RegisterPhoneComponent
              data={{ phoneNumber, setPhoneNumber, handleOnChangePhone, handleSubmitNumber }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  // }
};

export default RegisterScreen;
