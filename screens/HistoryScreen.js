import React, { useState, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
} from 'react-native'
import colors from '../assets/colors'
import { APP_NAME } from '../assets/variables'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { FETCH_APPLICATION_BY_UID, FETCH_USER_DETAIL } from '../API/graphQuery'

import { HistoryComponent } from "../components"

const HistoryScreen = () => {
    // Variables
  const [token, setToken] = useState("")
  const [fetchApplications, { loading: appLoading, data: appData, error: appError }] = useLazyQuery(FETCH_APPLICATION_BY_UID)
  const [fetchUser, { loading: userLoading, data: user, error: userError }] = useLazyQuery(FETCH_USER_DETAIL)

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
      <View
        style={{
          backgroundColor: colors.whiteBackground,
          width: '100%',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <ScrollView
          style={{ marginHorizontal: 10, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          { appData && (
            <View style={{}}>
              <HistoryComponent data={{  applications: appData.getAllUserApplications  }} />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
