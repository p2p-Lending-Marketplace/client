import React from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Item, Form, Input, Image, Label } from "native-base"
import Constants from 'expo-constants';

const UploadDataScreen = () => {
    return (
      <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
        <ScrollView style={{ flex: 1, paddingTop: 10 }}>
          <View>
            <Form>
              <Item inlineLabel>
                <Label>Name</Label>
                <Input placeholder=".." />
              </Item>
              <Item inlineLabel>
                <Label>Email</Label>
                <Input placeholder=".." />
              </Item>
              <Item inlineLabel>
                <Label>Phone Number</Label>
                <Input placeholder=".." />
              </Item>
              <Item inlineLabel>
                <Label>Address</Label>
                <Input placeholder=".." />
              </Item>
            </Form>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}

// name
// email
// pin
// phone_number
// address
// photo_url
// id_url
// salary_slip_url 
// current_job,
// salary,

export default UploadDataScreen
