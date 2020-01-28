import React, { useState, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { APP_NAME } from '../assets/variables'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { FETCH_APPLICATION_BY_UID, FETCH_USER_DETAIL } from "../API/graphQuery"
import { ActiveApplicationComponent, BannerHomeComponent, AlertProfileComponent } from "../components";


const HomeScreen = ({ navigation }) => {
  // Variables
  const [token, setToken] = useState("")
  const [fetchApplications, { loading: appLoading, data: appData, error: appError }] = useLazyQuery(FETCH_APPLICATION_BY_UID)
  const [fetchUser, { loading: userLoading, data: user, error: userError }] = useLazyQuery(FETCH_USER_DETAIL)

  const [registerPush] = useMutation(REGISTER_PUSH_NOTIFICATION)

  const registerForPushNotificationsAsync = async () => {
    const pushToken = await AsyncStorage.getItem(APP_NAME + ':pushToken')
    if (!pushToken) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      if (status !== 'granted') {
        return
      }

      const token = await Notifications.getExpoPushTokenAsync()
      const phoneNumber = await AsyncStorage.getItem(APP_NAME + ':phoneNumber')

      registerPush({ variables: { token, phoneNumber } }).then(
        async ({ data }) =>
          await AsyncStorage.setItem(
            APP_NAME + ':pushToken',
            data.registerPushNotification.token
          )
      )
    }
    // Notifications.addListener(({ data }) => {
    //   navigation.navigate('ApplicationDetail', { id: data.application_id })
    // })
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [])
  //Function
  useEffect(() => {
    const getToken = async () => {
      const tokenString = await AsyncStorage.getItem(APP_NAME + ":token")
      if (tokenString !== null) {
        const { token } = JSON.parse(tokenString)
        setToken(token)
        fetchUser({
          variables: {
            token
          }
        })
  
      }
    }
    getToken();
  }, [])
  const handleOnPressApply = () => {
    navigation.navigate('Upload Data')
  }

  useEffect(() => {
    if(user){
      fetchApplications({
        variables: {
          userID: user.getUserById._id,
          token,
        },
      })
    }
  }, [user])
  if(appError || userError){
    console.log(appError || userError)
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: colors.whiteBackground,
            width: '100%',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
              style={{ marginHorizontal: 10, paddingTop: 10 }}
              showsVerticalScrollIndicator={false}
            >
              {(user && !user.getUserById.data_completed) && (
                <AlertProfileComponent data={{handleOnPressApply}} />
              )}
              {(user && appData && appData.getAllUserApplications.length <= 0) && (
                <BannerHomeComponent data={{ data_completed: user.getUserById.data_completed }} />
              )}
              {appData && (  
                <ActiveApplicationComponent data={{ applications: appData.getAllUserApplications }} />
              )}
            </ScrollView>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default HomeScreen
