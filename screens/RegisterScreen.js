import React, { useState,useEffect } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Item, Input, Form } from "native-base";
import Constants from 'expo-constants';
import {phone} from "../assets/icons"
import serverAPI from "../API/serverAPI"
import colors from "../assets/colors";
import { useLazyQuery } from "@apollo/react-hooks"
import { REQUEST_OTP } from "../API/graphQuery"

const RegisterScreen = ({navigation}) => {
  // Variables
  const [phoneNumber, setPhoneNumber] = useState("");

  // Functions
  const handleOnChangePhone = (phoneNumber) => {
    setPhoneNumber(phoneNumber)
  }
  const [runQuery, { loading, error, data }] = useLazyQuery(REQUEST_OTP)
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
    console.log("hello")
    runQuery({
      variables: {
        phone_number: phoneNumber
      }
    })
    // serverAPI({
    //   url: "/user/otp",
    //   method: "POST",
    //   data: {
    //     phoneNumber
    //   }
    // }).then(() => {
    // }).catch((err) => {
    //   console.log(err)
    // })
  }
  if (error) {
    console.log(error)
  }
  useEffect(() => {
    if (data) {
      console.log('masuk')
      console.log(data)
      navigation.navigate("VerifyOTPScreen", { phoneNumber })
      // return null
    } 
  }, [data])
  // else {
    
    return (
      <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
        <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <View style={{ flex: 7, backgroundColor: "#FFF", justifyContent: "center", width: '100%' }}>
              <View style={{ alignItems: "center",}}>
                <Image source={require("../assets/images/register.jpg")} style={{width: '70%', height: 250}} />
              </View>
            </View>
            <View
              style={{
                flex: 2,
                backgroundColor: colors.secondBackground,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                elevation: 10
              }}
            >
              <Form style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: 30, marginBottom: 30}}>
                <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", marginBottom: 20 }}>
                  <Image source={{ uri: phone}} style={{width: 30, height: 30}} />
                  <Text style={{fontSize: 15, paddingLeft: 5, fontWeight: '700', color: "#FFF"}}>+62</Text>
                  <Item style={{ width: '60%' }} underline={false} >
                      <Input keyboardType={"number-pad"} style={{fontSize: 15, color: "#FFF"}} value={phoneNumber} placeholder="8123..." placeholderTextColor="#FFF"  onChangeText={(phoneNumber) => {
                        handleOnChangePhone(phoneNumber)
                      }} />
                  </Item>
                </View>
                <View style={{alignItems: "center", justifyContent: "center", width: '100%'}}>
                  <TouchableOpacity style={{ backgroundColor: '#FFF',  width: '40%', padding: 10, borderRadius: 7}} onPress={handleSubmitNumber}>
                    <Text style={{color: colors.secondBackground, textAlign: "center", fontWeight: '700' }}>START</Text>
                  </TouchableOpacity>
                </View>
              </Form>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  // }
};

export default RegisterScreen;
