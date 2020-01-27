import React, { useState, useEffect } from 'react';
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
import { multiply } from '../assets/icons';
import colors from "../assets/colors"
import { APP_NAME } from "../assets/variables"
import { useLazyQuery } from "@apollo/react-hooks"
import { FETCH_APPLICATION_BY_UID } from "../API/graphQuery"
import Divider from 'react-native-divider'
import { format } from 'date-fns'
import rupiah from "rupiah-format"


const HomeScreen = ({ navigation }) => {
  // Variables
  const [dataUser, setDataUser] = useState({})
  useEffect(() => {
    const getCurrentUser = async () => {
      const userString = await AsyncStorage.getItem(APP_NAME + ":user")
      if (userString !== null) {
        const user = JSON.parse(userString)
        // We have data!!
        setDataUser(user);
        // console.log(user, "ini useer use effect")
        // console.log(user.token)
        runQuery({
          variables: {
            userID: user._id,
            token: user.token
          },
        })
      }
    }
    getCurrentUser();
  }, [])
  //Function
  const [runQuery, { loading, data, error }] = useLazyQuery(FETCH_APPLICATION_BY_UID)
  if(error){
    console.log(error)
  }
  const handleOnPressApply = () => {
      navigation.navigate('Upload Data')
  }
  if(data){
    // console.log(data)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: '#EEEEEE',
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
              {!dataUser.data_completed && (
                <View
                  style={{
                    justifyContent: 'center',
                    padding: 10,
                    backgroundColor: '#FFF',
                    borderRadius: 15,
                    marginVertical: 10,
                    flexDirection: 'row',
                    elevation: 5,
                    marginHorizontal: 10,
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
                      paddingVertical: 10,
                    }}
                  >
                    <Text style={{ textAlign: 'justify' }}>
                      one more step to apply for installments, let's complete
                      your profile.
                    </Text>
                    <TouchableOpacity onPress={handleOnPressApply}>
                      <Text
                        style={{
                          textAlign: 'left',
                          color: colors.mainBackground,
                          fontWeight: '700',
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
              )}
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                  backgroundColor: '#1C8C9B',
                  borderRadius: 15,
                  marginVertical: 10,
                  marginHorizontal: 10,
                  overflow: 'hidden',
                  elevation: 5,
                  marginBottom: 30,
                }}
              >
                <Image
                  source={{
                    uri:
                      'https://img.jakpost.net/c/2018/01/29/2018_01_29_39564_1517188935._large.jpg',
                  }}
                  style={{ width: 300, height: 300, padding: 20 }}
                />
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    marginVertical: 10,
                    fontSize: 15,
                  }}
                >
                  {dataUser.data_completed
                    ? "You've completed all documents !"
                    : dataUser.data_completed
                    ? 'Collect all the necessary documents and start the loan'
                    : ''}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FFF',
                    paddingHorizontal: 40,
                    paddingVertical: 10,
                    borderRadius: 7,
                    marginTop: 20,
                    borderBottomColor: '#a3dbe3',
                    borderBottomWidth: 4,
                  }}
                  // onPress={handleOnPressApply}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#1C8C9B',
                      fontWeight: '700',
                    }}
                  >
                    Apply Now
                  </Text>
                </TouchableOpacity>
              </View>
              {data && (
                <View style={{marginHorizontal: 10}}>
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
                  {data.getAllUserApplications.map((application, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        // onPress={() => {
                        //   goToDetailMember(member._id)
                        // }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            marginVertical: 10,
                            borderRadius: 7,
                            // height: 100,
                            backgroundColor: '#FFF',
                            padding: 10,
                            elevation: 5,
                          }}
                        >
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Image
                              source={{
                                uri: application.logoURL,
                              }}
                              style={{ width: 80, height: 80 }}
                            />
                          </View>
                          <View
                            style={{
                              flex: 4,
                              justifyContent: 'center',
                              // alignItems: 'center',
                              paddingHorizontal: 20
                            }}
                          >
                            <Text style={{fontWeight: 'bold'}}>Application Date: </Text>
                            <Text>
                              {format(
                                new Date(application.createdAt),
                                'do MMMM YYY'
                              )}
                            </Text>
                            <Text style={{fontWeight: 'bold'}}>Fintech Company: </Text>
                            <Text>{application.company_name}</Text>
                            <Text style={{fontWeight: 'bold'}}>Amount: </Text>
                            <Text>{rupiah.convert(application.amount)}</Text>
                            <Text style={{fontWeight: 'bold'}}>Loan Term: </Text>
                            <Text>{application.loan_term}</Text>
                          </View>
                          <View style={{alignItems: "center", flex: 2}}>
                            <Text>{application.decision}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              )}
            </ScrollView>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

export default HomeScreen;
