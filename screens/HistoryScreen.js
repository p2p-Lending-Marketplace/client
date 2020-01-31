import React, { useState, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'
import colors from '../assets/colors'
import { APP_NAME } from '../assets/variables'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { FETCH_APPLICATION_BY_UID, FETCH_USER_DETAIL } from '../API/graphQuery'

import { HistoryComponent, ActiveApplicationComponent } from '../components'

const HistoryScreen = ({ navigation }) => {
  // Variables
  const [token, setToken] = useState('')
  const [
    fetchApplications,
    { loading: appLoading, data: appData, error: appError },
  ] = useLazyQuery(FETCH_APPLICATION_BY_UID)
  const [
    fetchUser,
    { loading: userLoading, data: user, error: userError },
  ] = useLazyQuery(FETCH_USER_DETAIL)

  //Function
  useEffect(() => {
    const getToken = async () => {
      const tokenString = await AsyncStorage.getItem(APP_NAME + ':token')
      if (tokenString !== null) {
        const { token } = JSON.parse(tokenString)
        setToken(token)
        fetchUser({
          variables: {
            token,
          },
        })
      }
    }
    getToken()
  }, [])
  useEffect(() => {
    if (user) {
      fetchApplications({
        variables: {
          userID: user.getUserById._id,
          token,
        },
      })
    }
  }, [user])
  if (appError || userError) {
    console.log(appError || userError)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.whiteBackground,
          width: '100%',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <ScrollView
          style={{ marginHorizontal: 10, paddingTop: 10, width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          {appData && (
            // <ActiveApplicationComponent data={{ applications: appData.getAllUserApplications}} />
            <HistoryComponent
              data={{ applications: appData.getAllUserApplications }}
            />
          )}
          {!appData && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 130,
              }}
            >
              <Image
                source={require('../assets/images/search-icon.jpg')}
                style={{ width: 200, height: 200 }}
              />
              <Text style={{ fontSize: 20 }}>
                You don't have any applications
              </Text>
              <TouchableOpacity
                style={{
                  marginVertical: 30,
                  backgroundColor: colors.mainBackground,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  navigation.navigate('Member')
                }}
              >
                <Text style={{ color: '#FFF', fontSize: 15 }}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HistoryScreen
