import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity, 
  ScrollView, 
  AsyncStorage
} from 'react-native';
import {
  Header,
} from 'native-base';
import Constants from 'expo-constants';
import { multiply } from '../assets/icons';
import colors from "../assets/colors"

const HomeScreen = ({ navigation }) => {
  // Variables

  //Function
  const _retrieveData = async () => {
    try {
      // const keys = await AsyncStorage
      const value = await AsyncStorage.getItem("phoneNumber")
      if (value !== null) {
        // We have data!!
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  _retrieveData()
  const handleOnPressBack = () => {
    navigation.navigate('RegisterScreen');
  };
  const handleOnPressApply = () => {
      navigation.navigate('Upload Data')
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="height"
        enabled
        style={{ flex: 1, marginTop: Constants.statusBarHeight }}
      >
        <View
          style={{
            backgroundColor: '#EEEEEE',
            width: '100%',
            alignItems: 'center',
            flex: 1
          }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 10, paddingTop: 10 }} showsVerticalScrollIndicator={false}>
              <View
                style={{
                  justifyContent: 'center',
                  padding: 10,
                  backgroundColor: '#FFF',
                  borderRadius: 15,
                  marginVertical: 10,
                  flexDirection: 'row',
                  elevation: 5,
                  marginHorizontal: 10

                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={require('../assets/icons/cry.png')}
                    style={{ width: 50, height: 50 }}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    margin: 5,
                    justifyContent: 'center',
                    paddingVertical: 10
                  }}
                >
                  <Text style={{ textAlign: 'justify' }}>
                    one more step to apply for installments, let's complete your
                    profile.
                  </Text>
                  <TouchableOpacity onPress={
                    handleOnPressApply
                  }>
                    <Text
                      style={{
                        textAlign: 'left',
                        color: colors.mainBackground,
                        fontWeight: '700'
                      }}
                    >
                      Go To Profile
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.3 }}>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: multiply }}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                  backgroundColor: '#1C8C9B',
                  borderRadius: 15,
                  marginVertical: 10,
                  marginHorizontal: 10,
                  overflow: "hidden",
                  elevation: 5,
                  marginBottom: 30
                }}
              >
                <Image
                  source={{
                    uri:
                      'https://img.jakpost.net/c/2018/01/29/2018_01_29_39564_1517188935._large.jpg'
                  }}
                  style={{ width: 300, height: 300, padding: 20 }}
                />
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    marginVertical: 10,
                    fontSize: 15
                  }}
                >
                  Collect all the necessary documents and start the loan
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FFF',
                    paddingHorizontal: 40,
                    paddingVertical: 10,
                    borderRadius: 7,
                    marginTop: 20,
                    borderBottomColor: '#a3dbe3',
                    borderBottomWidth: 4
                  }}
                  // onPress={handleOnPressApply}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#1C8C9B',
                      fontWeight: '700'
                    }}
                  >
                    Apply Now
                  </Text>
                </TouchableOpacity>
              </View>
              <View></View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
