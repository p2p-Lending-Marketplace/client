import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from 'react-native'
import { Item, Form, Input, Label } from 'native-base'
import colors from "../assets/colors"
import { SUBMIT_APPLICATION } from "../API/graphQuery"
import { useMutation } from "@apollo/react-hooks"
import { APP_NAME } from "../assets/variables"

const ApplicationScreen = ({ navigation }) => {
  // Variables
    const fintech_id = navigation.getParam("fintech_id")
    const [dataUser, setDataUser] = useState({})
    useEffect(() => {
        const getCurrentUser = async () => {
            const userString = await AsyncStorage.getItem(APP_NAME + ":user")
            if (userString !== null) {
                const user = JSON.parse(userString)
                // We have data!!
                setDataUser(user)
            }
        }
        getCurrentUser()
    }, [])
    const [dataApplication, setDataApplication] = useState({
        amount: "",
        loan_term: "",
        objective: "",
        additional_data: ""
    })
  // Function
    const [submitData, { data, error }] = useMutation(SUBMIT_APPLICATION)
    function handleDataChange(type, value) {
        setDataApplication({
        ...dataApplication,
        [type]: value
        })
    }
  if(data){
      navigation.goBack()
  }
  const handleApplyButton = async () => {
      // console.log(dataUser.token)
    submitData({
        variables: {
            ...dataApplication,
            amount: Number(dataApplication.amount),
            loan_term: Number(dataApplication.loan_term),
            userID: dataUser._id,
            fintechID: fintech_id,
            token: dataUser.token
        }
    })
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteBackground }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Form
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label style={{ color: colors.mainBackground }}>Amount</Label>
              <Input
                keyboardType={'number-pad'}
                onChangeText={amount => {
                  handleDataChange('amount', amount)
                }}
              />
            </Item>
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label style={{ color: colors.mainBackground }}>Loan Term</Label>
              <Input
                onChangeText={loan_term => {
                  handleDataChange('loan_term', loan_term)
                }}
                keyboardType={'number-pad'}
              />
            </Item>
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label style={{ color: colors.mainBackground }}>Objective</Label>
              <Input
                onChangeText={objective => {
                  handleDataChange('objective', objective)
                }}
              />
            </Item>
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label style={{ color: colors.mainBackground }}>
                Additional Data
              </Label>
              <Input
                onChangeText={objective => {
                  handleDataChange('objective', objective)
                }}
              />
            </Item>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                borderRadius: 7,
                marginVertical: 20,
              }}
              onPress={() => {
                handleApplyButton()
              }}
            >
              <Text
                style={{
                  marginHorizontal: 25,
                  marginVertical: 10,
                  color: '#FFF',
                }}
              >
                Apply Now
              </Text>
            </TouchableOpacity>
          </Form>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ApplicationScreen