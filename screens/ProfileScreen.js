import React, { useState, useEffect } from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
} from 'react-native'
import { View, Text, Item } from 'native-base'
import colors from '../assets/colors'
import { AntDesign } from '@expo/vector-icons'
import { APP_NAME } from '../assets/variables'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import {
  FETCH_APPLICATION_BY_UID,
  FETCH_USER_DETAIL,
  FETCH_USER_SCORE,
} from '../API/graphQuery'
import { from } from 'zen-observable'

const ProfileScreen = ({ navigation }) => {
  const handleSignOut = async () => {
    await AsyncStorage.removeItem(APP_NAME + ':phoneNumber')
    await AsyncStorage.removeItem(APP_NAME + ':token')
    await setToken(null)
    navigation.push('Home')
  }
  const [token, setToken] = useState('')
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

  //Function
  useEffect(() => {
    const getToken = async () => {
      const tokenString = await AsyncStorage.getItem(APP_NAME + ':token')
      if (tokenString !== null) {
        const { token } = JSON.parse(tokenString)
        setToken(token)
      }
    }
    getToken()
  }, [])
  useEffect(() => {
    if (token) {
      console.log('GOTCHA!!!!')
      console.log(token)
      fetchUserScore({
        variables: {
          token,
        },
      })
      fetchUser({
        variables: {
          token,
        },
      })
    }
  }, [token])
  const handleOnPressApply = () => {
    navigation.navigate('Upload Data')
  }

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
  const hideNumber = phoneNumber => {
    const count = Math.floor(phoneNumber.length / 3)
    const star =
      phoneNumber.length -
      (phoneNumber.slice(0, count).length +
        phoneNumber.slice(phoneNumber.length - count).length)
    const newFormatNumber =
      phoneNumber.slice(0, count) +
      '*'.repeat(star) +
      phoneNumber.slice(phoneNumber.length - count)
    return newFormatNumber
  }
  if (appError || userError) {
    console.log(appError || userError)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ImageBackground
          source={{
            uri:
              'https://i.pinimg.com/originals/c0/d3/c0/c0d3c04f52dbebb886cbf8e34b229df4.jpg',
          }}
          style={{
            width: '100%',
            height: 300,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 80,
          }}
        >
          <View style={{ width: '90%' }}>
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>
              {user ? user.getUserById.name : 'User name'}
            </Text>
            <Text style={{ color: 'white', fontSize: 20 }}>
              {user
                ? hideNumber(user.getUserById.phone_number)
                : 'User phone number'}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 90,
              width: '90%',
              alignItems: 'flex-end',
            }}
          >
            <TouchableOpacity>
              <AntDesign name="bells" size={20} style={{ color: '#FFF' }} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View
          style={{
            backgroundColor: '#FFF',
            position: 'absolute',
            height: 100,
            top: '100%',
            width: '90%',
            borderRadius: 5,
            flexDirection: 'row',
            zIndex: 100,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              token
                ? navigation.navigate('Upload Data')
                : navigation.push('Home')
            }}
          >
            <Image
              source={{
                uri: 'https://img.icons8.com/color/96/000000/data-arrived.png',
              }}
              style={{ width: 50, height: 50 }}
            />
            <Text>Data User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              token ? navigation.navigate('History') : navigation.push('Home')
            }}
          >
            <Image
              source={{
                uri:
                  'https://img.icons8.com/color/48/000000/activity-history.png',
              }}
              style={{ width: 50, height: 50 }}
            />
            <Text>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              source={require('../assets/images/helpcenter.png')}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 120, alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: '#FFF',
            height: '70%',
            width: '90%',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Item
            style={{ width: '90%', alignItems: 'center', paddingVertical: 8 }}
            last
          >
            <TouchableOpacity
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{ marginVertical: 10, width: '90%' }}>
                Invite friend
              </Text>
              <AntDesign name="right" size={20} />
            </TouchableOpacity>
          </Item>
          <Item
            style={{ width: '90%', alignItems: 'center', paddingVertical: 8 }}
            last
          >
            <TouchableOpacity
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{ marginVertical: 10, width: '90%' }}>FAQ</Text>
              <AntDesign name="right" size={20} />
            </TouchableOpacity>
          </Item>
          <Item
            style={{ width: '90%', alignItems: 'center', paddingVertical: 8 }}
            last
          >
            <TouchableOpacity
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{ marginVertical: 10, width: '90%' }}>
                Layanan pelanggan resmi
              </Text>
              <AntDesign name="right" size={20} />
            </TouchableOpacity>
          </Item>
          <Item
            style={{ width: '90%', alignItems: 'center', paddingVertical: 8 }}
            last
          >
            <TouchableOpacity
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{ marginVertical: 10, width: '90%' }}>Feedback</Text>
              <AntDesign name="right" size={20} />
            </TouchableOpacity>
          </Item>
          <Item
            style={{
              width: '90%',
              alignItems: 'center',
              paddingVertical: 8,
              borderColor: 'transparent',
            }}
            last
          >
            <TouchableOpacity
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('Upload Data')
              }}
            >
              <Text style={{ marginVertical: 10, width: '90%' }}>About Us</Text>
              <AntDesign name="right" size={20} />
            </TouchableOpacity>
          </Item>
        </View>
        <View
          style={{
            width: '90%',
            backgroundColor: '#FFF',
            position: 'absolute',
            top: '75%',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Item
            style={{
              width: '90%',
              alignItems: 'center',
              paddingVertical: 8,
              borderColor: 'transparent',
            }}
            last
          >
            <TouchableOpacity
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                handleSignOut()
              }}
            >
              <Text style={{ marginVertical: 10, width: '90%' }}>Sign Out</Text>
              <AntDesign name="right" size={20} />
            </TouchableOpacity>
          </Item>
        </View>
      </View>
      {/* <View style={{marginTop: 300, alignItems: "center"}}>
        <View style={{backgroundColor: "#FFF", height: '100%', width: '90%', borderRadius: 5}}>
          <Text>Hello</Text>
        </View>
      </View> */}
      {/* <Container> */}
      {/* <Header style={styles.container}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate("Setting")}
          >
            <Image
              source={{
                uri:
                  "https://cdn3.iconfinder.com/data/icons/ui-essentials-v2/1250/settings-tools-setting-phone-android-app-tool-512.png"
              }}
              style={{ width: "60%", height: "60%" }}
            />
          </TouchableOpacity>
        </Header> */}
      {/* <View style={styles.underHeader}>
          <View style={{ width: "30%", alignItems: "center" }}>
            <Image
              source={require("../assets/images/man.png")}
              style={styles.imageUnderHeader}
            ></Image>
          </View>
          <View style={{ width: "60%", paddingTop: "2%" }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Fintech Friend
            </Text>
            <Text style={{ color: "white", fontSize: 12 }}>+628*****3207</Text>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.contentTop}>
            <TouchableOpacity
              onPress={() => navigation.navigate("History")}
              style={styles.cardWrapper}
            >
              <Image
                source={require("../assets/images/history.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text
                style={{ fontSize: 15, marginTop: "10%", color: "#758184" }}
              >
                History
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Help Center")}
              style={styles.cardWrapper}
            >
              <Image
                source={require("../assets/images/helpcenter.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text
                style={{ fontSize: 15, marginTop: "10%", color: "#758184" }}
              >
                Help Center
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Upload Data")}
              style={styles.cardWrapper}
            >
              <Image
                source={require("../assets/images/information.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text
                style={{ fontSize: 15, marginTop: "10%", color: "#758184" }}
              >
                Information
              </Text>
            </TouchableOpacity>
          </View>
          </View> */}
      {/* </Container> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBackground,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  header: {
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  underHeader: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageUnderHeader: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  contentWrapper: {
    flex: 4,
    backgroundColor: colors.whiteBackground,
    alignItems: 'center',
  },
  contentTop: {
    elevation: 5,
    width: '90%',
    height: '30%',
    position: 'absolute',
    top: '-6%',
    borderRadius: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentMid: {
    width: '90%',
    height: '20%',
    position: 'absolute',
    top: '30%',
    borderRadius: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 5,
  },
  cardWrapperMid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default ProfileScreen
