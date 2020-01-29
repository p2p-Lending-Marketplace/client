import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
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
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Form
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Item
            stackedLabel
            style={{ width: '90%', borderColor: 'transparent', paddingLeft: 0 }}
            last
          >
            <Label
              style={{
                color: colors.mainBackground,
                marginBottom: 10,
                fontSize: 15,
                fontWeight: '700',
              }}
            >
              No. ID
            </Label>
            <Input
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                width: '100%',
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
              value={dataUser.num_id}
              keyboardType={'number-pad'}
              onChangeText={num_id => {
                handleDataChange('num_id', num_id)
              }}
            />
          </Item>
          <Item
            stackedLabel
            style={{ width: '90%', borderColor: 'transparent', paddingLeft: 0 }}
            last
          >
            <Label
              style={{
                color: colors.mainBackground,
                marginBottom: 10,
                fontSize: 15,
                fontWeight: '700',
              }}
            >
              Name
            </Label>
            <Input
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                width: '100%',
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
              value={dataUser.name}
              onChangeText={name => {
                handleDataChange('name', name)
              }}
            />
          </Item>
          <Item
            stackedLabel
            style={{ width: '90%', borderColor: 'transparent', paddingLeft: 0 }}
            last
          >
            <Label
              style={{
                color: colors.mainBackground,
                marginBottom: 10,
                fontSize: 15,
                fontWeight: '700',
              }}
            >
              Place of Birth
            </Label>
            <Input
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                width: '100%',
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
              value={dataUser.place_of_birth}
              onChangeText={place_of_birth => {
                handleDataChange('place_of_birth', place_of_birth)
              }}
            />
          </Item>
          <Item
            stackedLabel
            style={{ width: '90%', borderColor: 'transparent', paddingLeft: 0 }}
            last
          >
            <Label
              style={{
                color: colors.mainBackground,
                marginBottom: 10,
                fontSize: 15,
                fontWeight: '700',
              }}
            >
              Date of Birth
            </Label>
            <Input
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                width: '100%',
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
              onFocus={() => {
                datepicker()
              }}
              value={format(new Date(dataUser.date_of_birth), 'do MMMM YYY')}
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
          <Item
            stackedLabel
            style={{ width: '90%', borderColor: 'transparent', paddingLeft: 0 }}
            last
          >
            <Label
              style={{
                color: colors.mainBackground,
                marginBottom: 10,
                fontSize: 15,
                fontWeight: '700',
              }}
            >
              Email
            </Label>
            <Input
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                width: '100%',
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
              value={dataUser.email}
              onChangeText={email => {
                handleDataChange('email', email)
              }}
            />
          </Item>
          <Item
            stackedLabel
            style={{ width: '90%', borderColor: 'transparent', paddingLeft: 0 }}
            last
          >
            <Label
              style={{
                color: colors.mainBackground,
                marginBottom: 10,
                fontSize: 15,
                fontWeight: '700',
              }}
            >
              Phone Number
            </Label>
            <Input
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                width: '100%',
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
              value={dataUser.phone_number}
              onChangeText={phone_number => {
                handleDataChange('phone_number', phone_number)
              }}
              keyboardType={'number-pad'}
            />
          </Item>
          <Item
            stackedLabel
            style={{ width: '90%', borderColor: 'transparent', paddingLeft: 0 }}
            last
          >
            <Label
              style={{
                color: colors.mainBackground,
                marginBottom: 10,
                fontSize: 15,
                fontWeight: '700',
              }}
            >
              Address
            </Label>
            <Input
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                width: '100%',
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
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
            <Item
              stackedLabel
              style={{
                width: '90%',
                borderColor: 'transparent',
                paddingLeft: 0,
              }}
              last
            >
              <Label
                style={{
                  color: colors.mainBackground,
                  marginBottom: 10,
                  fontSize: 15,
                  fontWeight: '700',
                }}
              >
                Photo
              </Label>
              <View
                style={{
                  borderColor: 'grey',
                  borderWidth: 1,
                  width: 150,
                  height: 200,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  marginBottom: 10,
                }}
              >
                <ImageBackground
                  source={{ uri: dataUser.photo_url }}
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {photoLoading && <Spinner color={'#1D63DB'} />}
                </ImageBackground>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#EEE',
                    marginRight: '1%',
                    width: '49%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    _pickImage('photo', [3, 4], 'file')
                  }}
                >
                  <Entypo
                    name="attachment"
                    size={25}
                    style={{ color: '#000', padding: 5 }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 10,
                      color: '#000',
                    }}
                  >
                    Browse File
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#EEE',
                    marginLeft: '1%',
                    width: '49%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    _pickImage('photo', [3, 4], 'camera')
                  }}
                >
                  <Entypo
                    name="camera"
                    size={25}
                    style={{ color: '#000', padding: 5 }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 10,
                      color: '#000',
                    }}
                  >
                    Open Camera
                  </Text>
                </TouchableOpacity>
              </View>
            </Item>
            <Item
              stackedLabel
              style={{
                width: '90%',
                borderColor: 'transparent',
                paddingLeft: 0,
              }}
              last
            >
              <Label
                style={{
                  color: colors.mainBackground,
                  marginBottom: 10,
                  fontSize: 15,
                  fontWeight: '700',
                }}
              >
                ID Card
              </Label>
              <View
                style={{
                  borderColor: 'grey',
                  borderWidth: 1,
                  width: 170,
                  height: 120,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  marginBottom: 10,
                }}
              >
                <ImageBackground
                  source={{ uri: dataUser.id_url }}
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {idCardLoading && <Spinner color={'#1D63DB'} />}
                </ImageBackground>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#EEE',
                    marginRight: '1%',
                    width: '49%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    _pickImage('idCard', [4, 2], 'file')
                  }}
                >
                  <Entypo
                    name="attachment"
                    size={25}
                    style={{ color: '#000', padding: 5 }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 10,
                      color: '#000',
                    }}
                  >
                    Browse File
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#EEE',
                    marginLeft: '1%',
                    width: '49%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    _pickImage('idCard', [4, 2], 'camera')
                  }}
                >
                  <Entypo
                    name="camera"
                    size={25}
                    style={{ color: '#000', padding: 5 }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 10,
                      color: '#000',
                    }}
                  >
                    Open Camera
                  </Text>
                </TouchableOpacity>
              </View>
            </Item>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#1D63DB',
              borderRadius: 5,
              marginVertical: 20,
              width: '90%',
            }}
            onPress={() => {
              handleSaveButton()
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                marginVertical: 10,
                color: '#FFF',
              }}
            >
              Save Data
            </Text>
          </TouchableOpacity>
        </Form>
      </View>
    )
}

export default PersonalDataComponent
