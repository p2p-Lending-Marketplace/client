import React, { useState, useEffect } from 'react'
import { AppLoading } from 'expo'
import { APP_NAME } from '../assets/variables'
import { AsyncStorage } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'
import { CHECK_PHONE } from '../API/graphQuery'

const LandingScreen = ({ navigation }) => {
  const [checkUserPhoneNumber, { data }] = useLazyQuery(CHECK_PHONE)
  const [phoneConfirmed, setPhoneConfirmed] = useState(null)

  async function checkUserPhone() {
    const phoneNumber = await AsyncStorage.getItem(APP_NAME + ':phoneNumber')
    if (phoneNumber) {
      checkUserPhoneNumber({ variables: { phoneNumber } })
    } else {
      setPhoneConfirmed(false)
    }
  }

  useEffect(() => {
    if (data) {
      if (data.checkPhoneNumber.status) setPhoneConfirmed(true)
      else setPhoneConfirmed(false)
    }
  }, [data])

  useEffect(() => {
    if (phoneConfirmed === true) navigation.navigate('LoginScreen', {from: "landing"})
    else if (phoneConfirmed === false) navigation.navigate('tabNavigator')
  }, [phoneConfirmed])

  return (
    <AppLoading
      startAsync={checkUserPhone}
      onError={console.log}
      onFinish={() => {}}
    />
  )
}

export default LandingScreen
