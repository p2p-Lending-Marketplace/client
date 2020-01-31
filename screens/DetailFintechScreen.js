import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'
import { Spinner } from 'native-base'
import colors from '../assets/colors'
import Divider from 'react-native-divider'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_FINTECH_BY_ID, FETCH_USER_DETAIL } from '../API/graphQuery'
import { useLazyQuery } from '@apollo/react-hooks'
import { APP_NAME } from '../assets/variables'

const DetailScreen = ({ navigation }) => {
  // Variables
  const [dataUser, setDataUser] = useState(null)
  const [token, setToken] = useState(null)
  const id = navigation.getParam('id')
  const { loading, error, data } = useQuery(FETCH_FINTECH_BY_ID, {
    variables: {
      id,
    },
  })
  const [
    fetchUser,
    { loading: userLoading, data: user, error: userError },
  ] = useLazyQuery(FETCH_USER_DETAIL)
  async function getToken() {
    const tokenString = await AsyncStorage.getItem(APP_NAME + ':token')
    if (tokenString !== null) {
      const { token } = JSON.parse(tokenString)
      setToken(token)
      // fetchUser({
      //   variables: {
      //     token,
      //   },
      // })
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    if (token) {
      !user && fetchUser({ variables: { token } })
    }
  }, [token])

  useEffect(() => {
    if (user) {
      setDataUser(user.getUserById)
    }
  }, [user])

  // Functions
  const handleApplyButton = () => {
    navigation.navigate('Apply Fintech', {
      fintech_id: id,
      name: data.getFintechById.company_name,
    })
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner color={colors.mainBackground} />
        {/* <Image source={{ uri: "https://www.oriciro.com/assets/images/tech/sp/b-product_img_01.gif"}} style={{width: 100, height: 100}} /> */}
      </View>
    )
  }
  if (data) {
    const company = data.getFintechById
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.whiteBackground }}
      >
        <ScrollView style={{ flex: 1, paddingTop: 10, marginHorizontal: 20 }}>
          {/* Title */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: colors.mainBackground,
              }}
            >
              {company.company_name}
            </Text>
          </View>
          {/* Image and Button Apply */}
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Image
                source={{
                  uri: company.logoURL,
                }}
                style={{ width: 150, height: 150 }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>
                Interest: {company.min_interest} - {company.max_interest}% p.a.
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Divider borderColor={colors.mainBackground} orientation="left">
              <Text style={{ fontWeight: '700', color: colors.mainBackground }}>
                Description
              </Text>
            </Divider>
          </View>
          <View>
            <Text
              style={{ textAlign: 'justify', color: colors.mainBackground }}
            >
              {company.description}
            </Text>
          </View>
          {dataUser && dataUser.data_completed ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  width: 150,
                  backgroundColor: colors.mainBackground,
                  borderRadius: 7,
                  marginHorizontal: 5,
                  marginVertical: 30,
                }}
                onPress={() => {
                  handleApplyButton()
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 10,
                    fontSize: 15,
                    color: '#FFF',
                    fontWeight: '700',
                  }}
                >
                  Apply Now
                </Text>
              </TouchableOpacity>
            </View>
          ) : dataUser && dataUser.data_completed ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  width: 200,
                  backgroundColor: colors.mainBackground,
                  borderRadius: 7,
                  marginHorizontal: 5,
                  marginVertical: 30,
                }}
                onPress={() => {
                  navigation.navigate('Upload Data')
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 10,
                    fontSize: 15,
                    color: '#FFF',
                    fontWeight: '700',
                  }}
                >
                  Complete Data To Apply
                </Text>
              </TouchableOpacity>
            </View>
          ) : !dataUser ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  width: 200,
                  backgroundColor: colors.mainBackground,
                  borderRadius: 7,
                  marginHorizontal: 5,
                  marginVertical: 30,
                }}
                onPress={() => {
                  navigation.navigate('Home')
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 10,
                    fontSize: 15,
                    color: '#FFF',
                    fontWeight: '700',
                  }}
                >
                  Login Now
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default DetailScreen
