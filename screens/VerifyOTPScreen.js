import React, { useState, useEffect } from 'react'
import { 
  View,
  Text, 
  SafeAreaView, 
  KeyboardAvoidingView,
  AsyncStorage,
  StyleSheet
} from 'react-native'
import { useLazyQuery } from "@apollo/react-hooks"
import { VERIFY_OTP } from "../API/graphQuery"
import { APP_NAME } from "../assets/variables"
import { TokenFormComponent, CustomButtonBackComponent } from "../components";
import CountDown from 'react-native-countdown-component'
import colors from "../assets/colors";

const VerifyOTPScreen = ({navigation}) => {
  // Variables
  const [token, setToken] = useState('');
  const phoneNumber = navigation.getParam("phoneNumber")
  const [runQuery ,{ loading, error, data }] = useLazyQuery(VERIFY_OTP)
  
  //Function
  const handleOnPressBack = () => {
      navigation.navigate("RegisterScreen")
  }
  const handleOnChangeToken = (token) => {
    setToken(token)
  }

  useEffect(() => {
    if (data) {
      if (data.verifyOTP._id) {
        savePhoneNumber()
      } else {
        navigation.navigate("PinCreateScreen", { phoneNumber })
      }
    }
  }, [data])

  const handleLazyQuery = () => {
    runQuery({
      variables: {
        token,
        phone_number: phoneNumber
      }
    })
  }

  useEffect(() => {
    if(token.length === 6){
      handleLazyQuery()
    }
  }, [token])

  const savePhoneNumber = async () => {
    try {
      await AsyncStorage.setItem(APP_NAME + ":phoneNumber", phoneNumber)
      navigation.navigate("LoginScreen", { phoneNumber })
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  }
  
  if (error) {
    console.log(error)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
        <CustomButtonBackComponent data={{ handleOnPressBack }} />
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '600' }}>
              Verification Code
            </Text>
            <CountDown
              until={60}
              onFinish={() => alert('finished')}
              size={20}
              digitStyle={{ backgroundColor: '#FFF' }}
              digitTxtStyle={{ color: colors.mainBackground }}
              timeToShow={['M', 'S']}
              timeLabels={{ m: 'Minute', s: 'Second' }}
            />
            <Text style={{ fontSize: 18 }}>Input the 6-digit code sent to</Text>
            <Text style={{ fontSize: 18 }}>{phoneNumber}</Text>
          </View>
          <TokenFormComponent data={{ token, handleOnChangeToken }} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteBackground,
    width: '100%',
    paddingVertical: 50,
    alignItems: 'center',
    flex: 1,
  },
})

export default VerifyOTPScreen
