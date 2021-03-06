import React, { useState, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  AsyncStorage,
  ScrollView,
  Text,
  Image,
} from 'react-native'
import { APP_NAME } from '../assets/variables'
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import colors from '../assets/colors'
import Divider from 'react-native-divider'
import Constants from 'expo-constants'
import {
  FETCH_APPLICATION_BY_UID,
  FETCH_USER_DETAIL,
  FETCH_USER_SCORE,
  SELECT_APPLICATION,
} from '../API/graphQuery'
import {
  RegisterComponent,
  ActiveApplicationComponent,
  BannerHomeComponent,
  AlertProfileComponent,
  BoardScoreComponent,
  GreetingComponent,
} from '../components'
const HomeScreen = ({ navigation }) => {
  // Variables
  const idApp = navigation.getParam('id')
  console.log(idApp)
  const [idd, setIdd] = useState(null)
  console.log(idd)
  useEffect(() => {
    if (idApp) {
      setIdd(idApp)
    }
  }, [idApp, idd])
  const [token, setToken] = useState(null)
  const [selectApp, { data, loading, error }] = useMutation(SELECT_APPLICATION)
  const [
    fetchApplications,
    { loading: appLoading, data: appData, error: appError },
  ] = useLazyQuery(FETCH_APPLICATION_BY_UID)
  const [
    fetchUser,
    { loading: userLoading, data: user, error: userError },
  ] = useLazyQuery(FETCH_USER_DETAIL)
  const [
    fetchUserScore,
    { loading: scoreLoading, data: score, error: scoreError },
  ] = useLazyQuery(FETCH_USER_SCORE)
  const handleSelect = id => {
    selectApp({
      variables: {
        token,
        id,
        status: 'selected',
      },
      refetchQueries: [
        { query: FETCH_APPLICATION_BY_UID, variables: { token } },
      ],
    })
  }

  function handleOnPressApply() {
    navigation.navigate('Upload Data')
  }

  async function getToken() {
    const tokenString = await AsyncStorage.getItem(APP_NAME + ':token')
    if (tokenString !== null) {
      const { token } = JSON.parse(tokenString)
      setToken(token)
    }
  }

  useEffect(() => {
    getToken()
  }, [navigation.state.routeName])

  useEffect(() => {
    if (token) {
      !appData && fetchApplications({ variables: { token } })
      !user && fetchUser({ variables: { token } })
    }

    if (appError || scoreError || userError) {
      console.log(appError || scoreError || userError)
    }
  }, [token, appError, userError])

  useEffect(() => {
    ;(async () => {
      const token2 = await AsyncStorage.getItem(APP_NAME + ':token')
      const tokenFix = JSON.parse(token2).token
      fetchUser({
        variables: {
          token: tokenFix,
        },
      })
      fetchApplications({
        variables: {
          token: tokenFix,
        },
      })
    })()
  }, [])

  useEffect(() => {
    navigation.addListener('didFocus', async () => {
      const token2 = await AsyncStorage.getItem(APP_NAME + ':token')
      const tokenFix = JSON.parse(token2).token
      fetchUser({
        variables: {
          token: tokenFix,
        },
      })
      // fetchApplications({ variables: { token } }
    })
  }, [])
  useEffect(() => {
    navigation.addListener('didFocus', async () => {
      const token2 = await AsyncStorage.getItem(APP_NAME + ':token')
      const tokenFix = JSON.parse(token2).token
      fetchApplications({
        variables: {
          token: tokenFix,
        },
      })
    })
  }, [])

  useEffect(() => {
    if (user && user.getUserById) {
      if (user.getUserById.data_completed)
        fetchUserScore({ variables: { token } })
    }
  }, [user])

  useEffect(() => {
    console.log(score)
  }, [score])

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
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              // alignItems: 'center',
              width: '100%',
            }}
          >
            {token && (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    backgroundColor: colors.mainBackground,
                    width: '100%',
                    height: 150,
                    marginBottom: 35,
                    paddingTop: Constants.statusBarHeight,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 30,
                      textAlign: 'left',
                      width: '90%',
                      paddingVertical: 5,
                      fontWeight: '700',
                    }}
                  >
                    {user &&
                      user.getUserById &&
                      `Hello, ${
                        user.getUserById.name
                          ? user.getUserById.name.split(' ')[0]
                          : 'Guest'
                      }!`}
                  </Text>
                  {score ? (
                    <BoardScoreComponent
                      data={{ score: score.getUserScoring.score }}
                    />
                  ) : user &&
                    user.getUserById &&
                    !user.getUserById.data_completed ? (
                    <AlertProfileComponent
                      handleOnPressApply={handleOnPressApply}
                    />
                  ) : (
                    <GreetingComponent />
                  )}
                </View>
                {!appData ||
                  (appData.getAllUserApplications.length <= 0 && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 50,
                      }}
                    >
                      <Image
                        source={require('../assets/images/search-icon.jpg')}
                        style={{ width: 175, height: 175 }}
                      />
                      <Text style={{ fontSize: 18, marginTop: 20 }}>
                        You don't have any applications
                      </Text>
                    </View>
                  ))}
                {appData && appData.getAllUserApplications.length > 0 && (
                  <View
                    style={{
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{ width: '90%' }}>
                      <Divider
                        borderColor={colors.mainBackground}
                        orientation="left"
                      >
                        <Text
                          style={{
                            fontWeight: '700',
                            color: colors.mainBackground,
                          }}
                        >
                          Active Application
                        </Text>
                      </Divider>
                    </View>
                  </View>
                )}
                <ScrollView
                  style={{ width: '100%' }}
                  showsVerticalScrollIndicator={false}
                >
                  {/* {user &&
                    (!appData ||
                      appData.getAllUserApplications.length <= 0) && (
                      <BannerHomeComponent data={{ data_completed: user }} />
                    )} */}
                  {appData && appData.getAllUserApplications.length > 0 && (
                    <ActiveApplicationComponent
                      data={{
                        applications: appData.getAllUserApplications,
                        handleSelect,
                      }}
                    />
                  )}
                </ScrollView>
              </View>
            )}
            {!token && <RegisterComponent parentNavigation={{ navigation }} />}
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default HomeScreen
