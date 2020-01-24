import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Container, Content, Item, Input, Header, Form, Label } from "native-base";
import Constants from 'expo-constants';
import {phone} from "../assets/icons"
import serverAPI from "../API/serverAPI"

const RegisterScreen = ({navigation}) => {
  // Variables
  const [phoneNumber, setPhoneNumber] = useState("")

  // Functions
  const handleOnChangePhone = (phoneNumber) => {
    setPhoneNumber(phoneNumber)
  }

  const phoneNumberChecker = () => {
    phoneNumber[0] === '0'
      && setPhoneNumber(phoneNumber.slice(1))  
    return true
  }

  const handleSubmitNumber = () => {
    // navigation.navigate("VerifyOTPScreen")
    navigation.navigate("VerifyOTPScreen")
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
          <View style={{ flex: 7, backgroundColor: '#EEEEEE', justifyContent: "center", width: '100%' }}>
            <View style={{ alignItems: "center",}}>
              <Image source={require("../assets/images/register.jpg")} style={{width: '70%', height: 250}} />
            </View>
          </View>
          <View
            style={{
              flex: 2,
              backgroundColor: '#FFF',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20
            }}
          >
            <Form style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: 30, marginBottom: 30}}>
              <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", marginBottom: 20 }}>
                <Image source={{ uri: phone}} style={{width: 30, height: 30}} />
                <Text style={{fontSize: 15, paddingLeft: 5}}>+62</Text>
                <Item style={{ width: '60%' }} underline={false} >
                    <Input keyboardType={"number-pad"} style={{fontSize: 15}} value={phoneNumber} placeholder="Mobile Ex: 8123..." onChangeText={(phoneNumber) => {
                      handleOnChangePhone(phoneNumber)
                    }} />
                </Item>
              </View>
              <View style={{alignItems: "center", justifyContent: "center", width: '100%'}}>
                <TouchableOpacity style={{ backgroundColor: '#016AFB',  width: '40%', padding: 10, borderRadius: 7}} onPress={handleSubmitNumber}>
                  <Text style={{color: 'white', textAlign: "center"}}>START</Text>
                </TouchableOpacity>
              </View>
            </Form>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
