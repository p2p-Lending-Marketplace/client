import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Item, Form, Input, Label, Container } from 'native-base';
import colors from '../assets/colors';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Entypo } from "@expo/vector-icons"
import { UPLOAD_IMAGE } from '../API/graphQuery'
import { useMutation } from '@apollo/react-hooks'
import DateTimePicker from '@react-native-community/datetimepicker'

const UploadDataSecondScreen = ({ navigation }) => {
  // Variables
  const [dataUser, setDataUser] = useState({
    idCardNumber: '',
    idCard: '',
  });
  const [uploadImage, { loading, error, data }] = useMutation(UPLOAD_IMAGE)
  const [datePicker, setDatePicker] = useState({
    date: new Date(),
    mode: 'date',
    show: false,
  })
  // Function
  const previousPage = () => {
    navigation.navigate("Upload Data")
  }
  const uploadData = () => {
      // Upload to Server
  }
  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need file manager permissions to make this work!');
      return false;
    } else {
      return true;
    }
  };
  const _pickImage = async (field, rasio) => {
    const status = await getPermissionAsync();
    if (!status) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: rasio,
      quality: 1
    });

    if (!result.cancelled) {
      if (field === 'idCard') {
        let fd = new FormData();
        fd.append('image', result.uri);
        setDataUser({
          ...dataUser,
          idCard: fd
        });
      } else if (field === 'salarySlip') {
        let fd = new FormData();
        fd.append('image', result.uri);
        setDataUser({
          ...dataUser,
          salarySlip: fd
        });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginBottom: 60, flex: 1 }}>
          <Form
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label style={{ color: colors.mainBackground }}>
                ID Number
              </Label>
              <Input />
            </Item>
            <Item floatingLabel style={{ width: '80%' }} last>
              <Label style={{ color: colors.mainBackground }}>Born City</Label>
              <Input />
            </Item>
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
                <ImageBackground
                  source={{ uri: "" }}
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      _pickImage('idCard', [5, 3]);
                    }}
                  >
                    <AntDesign
                      name="plus"
                      style={{ fontSize: 70, color: colors.mainBackground }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginVertical: 5
                }}
              >
                <Text>ID Card</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{ flex: 1, width: '100%', alignItems: 'flex-start' }}
              >
                <TouchableOpacity
                  style={{
                    width: 90,
                    backgroundColor: colors.mainBackground,
                    paddingVertical: 5,
                    borderRadius: 7,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomColor: colors.shadowColor,
                    borderBottomWidth: 4
                  }}
                  onPress={() => {
                    previousPage();
                  }}
                >
                  <Entypo
                    name="chevron-thin-left"
                    style={{ color: '#FFF', fontSize: 25 }}
                  />
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 15,
                      fontWeight: '700',
                      marginLeft: 7
                    }}
                  >
                    Back
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, width: '100%', alignItems: 'flex-end' }}>
                <TouchableOpacity
                  style={{
                    width: 90,
                    backgroundColor: colors.mainBackground,
                    paddingVertical: 5,
                    borderRadius: 7,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomColor: colors.shadowColor,
                    borderBottomWidth: 4
                  }}
                  onPress={() => {
                    uploadData();
                  }}
                >
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 15,
                      fontWeight: '700',
                      marginLeft: 7
                    }}
                  >
                    Next
                  </Text>
                  <Entypo
                    name="chevron-thin-right"
                    style={{ color: '#FFF', fontSize: 25 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Form>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadDataSecondScreen;
