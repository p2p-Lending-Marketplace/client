import React, { useState, useEffect } from 'react'
import { AppLoading, Notifications } from 'expo'
import { APP_NAME } from '../assets/variables'
import { AsyncStorage } from 'react-native'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { CHECK_PHONE, REGISTER_PUSH_NOTIFICATION } from '../API/graphQuery'
import * as Permissions from 'expo-permissions'

const LandingScreen = ({ navigation }) => {
  const [checkUserPhoneNumber, { data }] = useLazyQuery(CHECK_PHONE)
  const [registerPush] = useMutation(REGISTER_PUSH_NOTIFICATION)

  const [phoneConfirmed, setPhoneConfirmed] = useState(null)
  const [tokenConfirmed, setTokenConfirmed] = useState(null)

  const [pushToken, setPushToken] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)

  async function checkUserPhone() {
    const phoneNumber = await AsyncStorage.getItem(APP_NAME + ':phoneNumber')
    if (phoneNumber) {
      checkUserPhoneNumber({ variables: { phoneNumber } })
    } else navigation.navigate('IntroScreen')
  }

  async function registerForPushNotificationsAsync() {
    if (pushToken || phoneNumber) return

    const pushToken = await AsyncStorage.getItem(APP_NAME + ':pushToken')
    const phoneNumber = await AsyncStorage.getItem(APP_NAME + ':phoneNumber')

    if (pushToken) setPushToken(pushToken)
    if (phoneNumber) setPhoneNumber(phoneNumber)

    if (!pushToken) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      if (status !== 'granted') {
        return
      }

      const token = await Notifications.getExpoPushTokenAsync()
      setPushToken(token)
    }
  }

  useEffect(() => {
    if (data) {
      if (data.checkPhoneNumber.status) setPhoneConfirmed(true)
      else navigation.navigate('IntroScreen')
    }
  }, [data])

  useEffect(() => {
    if (tokenConfirmed && phoneConfirmed === true) {
      navigation.navigate('LoginScreen')
    }
  }, [phoneConfirmed, tokenConfirmed])

  useEffect(() => {
    registerForPushNotificationsAsync()
    if (pushToken && phoneConfirmed)
      registerPush({
        variables: { token: pushToken, phoneNumber },
      }).then(async ({ data }) => {
        await AsyncStorage.setItem(
          APP_NAME + ':pushToken',
          data.registerPushNotification.token
        )
        setTokenConfirmed(true)
      })
  }, [pushToken, phoneConfirmed])

  useEffect(() => {
    Notifications.addListener(({ data }) => {
      navigation.navigate('Home', { id: data._id })
    })
  }, [])

  return (
    <AppLoading
      startAsync={checkUserPhone}
      onError={console.log}
      onFinish={() => {}}
    />
  )
}

export default LandingScreen
