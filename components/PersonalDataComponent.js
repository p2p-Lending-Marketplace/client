import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import {
  Item,
  Form,
  Input,
  Label,
  Spinner,
} from 'native-base'
import colors from '../assets/colors'
import { Entypo, AntDesign } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'

const PersonalDataComponent = ({data}) => {
    // Variables
    const dataUser = data.user
    const datePicker = data.datePicker
    const datepicker = data.datepicker
    const handleDataChange = data.handleDataChange
    const handleSaveButton = data.handleSaveButton
    const _pickImage = data._pickImage
    const setDate = data.setDate
    const photoLoading = data.photoLoading
    const photoData = data.photoData
    const idCardLoading = data.idCardLoading
    const idCardData = data.idCardData
    return (
         <View style={{ flex: 1 }}>
            <Form
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>No. ID</Label>
                <Input
                  value={dataUser.num_id}
                  keyboardType={'number-pad'}
                  onChangeText={num_id => {
                    handleDataChange('num_id', num_id)
                  }}
                />
              </Item>
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>Name</Label>
                <Input
                  value={dataUser.name}
                  onChangeText={name => {
                    handleDataChange('name', name)
                  }}
                />
              </Item>
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>
                  Place of Birth
                </Label>
                <Input
                  value={dataUser.place_of_birth}
                  onChangeText={place_of_birth => {
                    handleDataChange('place_of_birth', place_of_birth)
                  }}
                />
              </Item>
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>
                  Date of Birth
                </Label>
                <Input
                  onFocus={() => {
                    datepicker()
                  }}
                  value={format(datePicker.date, 'EEE, do MMMM YYY')}
                />
              </Item>
              {datePicker.show && (
                <DateTimePicker
                  value={datePicker.date}
                  mode={datePicker.mode}
                  is24Hour={true}
                  display="default"
                  onChange={setDate}
                />
              )}
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>Email</Label>
                <Input
                  value={dataUser.email}
                  onChangeText={email => {
                    handleDataChange('email', email)
                  }}
                />
              </Item>
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>
                  Phone Number
                </Label>
                <Input
                value={dataUser.phone_number}
                  onChangeText={phone_number => {
                    handleDataChange('phone_number', phone_number)
                  }}
                  keyboardType={'number-pad'}
                />
              </Item>
              <Item floatingLabel style={{ width: '80%' }} last>
                <Label style={{ color: colors.mainBackground }}>Address</Label>
                <Input
                  value={dataUser.address}
                  onChangeText={address => {
                    handleDataChange('address', address)
                  }}
                />
              </Item>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 20,
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
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {photoLoading ? (
                    <Spinner color={colors.mainBackground} />
                  ) : photoData ? (
                    <ImageBackground
                      source={{ uri: photoData.singleUpload.imageURL }}
                      style={{
                        width: 150,
                        height: 200,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          _pickImage('photo', [3, 4])
                        }}
                      >
                        <Entypo
                          name="cycle"
                          style={{ fontSize: 70, color: colors.mainBackground }}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  ) : (
                        <ImageBackground source={{uri: dataUser.photo_url}} style={{width: '100%', height: '100%', justifyContent: "center", alignItems: "center"}}>
                            <TouchableOpacity
                            onPress={() => {
                                _pickImage('photo', [3, 4])
                            }}
                            >
                            <AntDesign
                                name="plus"
                                style={{ fontSize: 70, color: colors.mainBackground }}
                            />
                            </TouchableOpacity>
                        </ImageBackground>
                  )}
                </View>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ fontSize: 20, color: colors.mainBackground }}>
                    Photo
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 20,
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
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {idCardLoading ? (
                    <Spinner color={colors.mainBackground} />
                  ) : idCardData ? (
                    <ImageBackground
                      source={{ uri: idCardData.singleUpload.imageURL }}
                      style={{
                        width: 170,
                        height: 120,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          _pickImage('idCard', [4, 2])
                        }}
                      >
                        <Entypo
                          name="cycle"
                          style={{ fontSize: 70, color: colors.mainBackground }}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  ) : (
                    <ImageBackground source={{uri: dataUser.id_url}} style={{width: '100%', height: '100%', justifyContent: "center", alignItems: "center"}}>
                        <TouchableOpacity
                        onPress={() => {
                            _pickImage('idCard', [4, 2])
                        }}
                        >
                        <AntDesign
                            name="plus"
                            style={{ fontSize: 70, color: colors.mainBackground }}
                        />
                        </TouchableOpacity>
                    </ImageBackground>
                  )}
                </View>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ fontSize: 20, color: colors.mainBackground }}>
                    ID Card
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.mainBackground,
                  borderRadius: 7,
                  marginVertical: 20
                }}
                onPress={() => {
                  handleSaveButton()
                }}
              >
                <Text
                  style={{
                    marginHorizontal: 25,
                    marginVertical: 10,
                    color: '#FFF',
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </Form>
          </View>
    )
}

export default PersonalDataComponent
