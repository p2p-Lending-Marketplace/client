import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { Item, Form, Input, Label,Container } from "native-base"
import colors from "../assets/colors"
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { plus } from "../assets/icons"

const UploadDataScreen = () => {
  // Variables
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    photo: "",
    idCard: "",
    salarySlip: "",
    currentJob: "",
    Salary: ""
  })
  const [imageView, setImageView] = useState({
    photoUri: "",
    idCardUri: "",
    salarySlipUri: ""
  })


  // Function
  const getPermissionAsync = async () => {
    // if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return false
      } else {
        return true
      }
    // }
  };

  const _pickImage = async (field, rasio) => {
    const status = await getPermissionAsync()
    if(!status){
      return
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: rasio,
      quality: 1,
      // base64: true
    });

    console.log(result)

    if (!result.cancelled) {
      if (field === 'photo') {
        let fd = new FormData()
        fd.append("image", result.uri)
        setDataUser({
          ...dataUser,
          photo: fd
        });
        setImageView({
          ...imageView,
          photoUri: result.uri
        });
      } else if (field === 'idCard') {
        let fd = new FormData();
        fd.append("image", result.uri);
        setDataUser({
          ...dataUser,
          idCard: fd
        });
        setImageView({
          ...imageView,
          idCardUri: result.uri
        });
      } else if(field === 'salarySlip'){
        let fd = new FormData();
        fd.append("image", result.uri);
        setDataUser({
          ...dataUser,
          salarySlip: fd
        });
        setImageView({
          ...imageView,
          salarySlipUri: result.uri
        });
      }
    } 
  };

  return (
    <SafeAreaView style={{ flex: 1}}>
      {/* <Container> */}

      <ScrollView style={{ flex: 1}}>
        <View style={{marginBottom: 60, flex: 1}}>
          <Form style={{ width: '100%', justifyContent: "center", alignItems: "center" }}>
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label>Name</Label>
              <Input />
            </Item>
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label>Phone Number</Label>
              <Input />
            </Item>
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label>Address</Label>
              <Input />
            </Item>
            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20
              }}
            >
              <View
                style={{
                  borderColor: colors.mainBackground,
                  borderWidth: 1,
                  width: 150,
                  height: 200,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <ImageBackground source={{uri: imageView.photoUri}} style={{width: '100%', height: '100%', alignItems: "center", justifyContent: "center"}}>
                  <TouchableOpacity
                    onPress={() => {
                      _pickImage('photo', [3, 4]);
                    }}
                  >
                    <Image
                      source={{ uri: plus }}
                      style={{ width: 70, height: 70 }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View
                style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginVertical: 5 }}
              >
                <Text>Photo</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20
              }}
            >
              <View
                style={{
                  borderColor: colors.mainBackground,
                  borderWidth: 1,
                  width: 170,
                  height: 120,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <ImageBackground source={{uri: imageView.idCardUri}} style={{width: '100%', height: '100%', alignItems: "center", justifyContent: "center"}}>
                  <TouchableOpacity
                    onPress={() => {
                      _pickImage('idCard', [5, 3]);
                    }}
                  >
                    <Image
                      source={{ uri: plus }}
                      style={{ width: 70, height: 70 }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View
                style={{ justifyContent: 'flex-end', alignItems: 'center', marginVertical: 5 }}
              >
                <Text>ID Card</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20
              }}
            >
              <View
                style={{
                  borderColor: colors.mainBackground,
                  borderWidth: 1,
                  width: 150,
                  height: 200,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <ImageBackground source={{uri: imageView.salarySlipUri}} style={{width: '100%', height: '100%', alignItems: "center", justifyContent: "center"}}>
                  <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                      _pickImage('salarySlip', [5, 7]);
                    }}
                  >
                    <Image
                      source={{ uri: plus }}
                      style={{ width: 70, height: 70 }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View
                style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginVertical: 5 }}
              >
                <Text>Salary Slip</Text>
              </View>
            </View>
            <Item floatingLabel>
              <Label>Current Job</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Salary</Label>
              <Input />
            </Item>
          </Form>
        </View>
      </ScrollView>
      {/* </Container> */}
    </SafeAreaView>
  );
}

export default UploadDataScreen
