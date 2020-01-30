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
import rupiah from "rupiah-format"

const FinancialDataComponent = ({data}) => {
    const dataUser = data.user
    const handleDataChange = data.handleDataChange
    const handleSaveButton = data.handleSaveButton
    const _pickImage = data._pickImage
    const salarySlipData = data.salarySlipData
    const salarySlipLoading = data.salarySlipLoading
    return (
      <View style={{ flex: 1 }}>
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
              Current Job
            </Label>
            <Input
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                width: '100%',
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
              value={dataUser.current_job}
              onChangeText={current_job => {
                handleDataChange('current_job', current_job)
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
              Salary
            </Label>
            <Input
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                width: '100%',
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
              value={dataUser.salary}
              onChangeText={salary => {
                handleDataChange('salary', salary)
              }}
              keyboardType={'number-pad'}
            />
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
              Salary Slip
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
                source={{ uri: dataUser.salary_slip_url }}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {salarySlipLoading && <Spinner color={'#1D63DB'} />}
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
                  _pickImage('salarySlip', [3, 4], 'file')
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
                  _pickImage('salarySlip', [3, 4], 'camera')
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
          {/* <View
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
              {salarySlipLoading ? (
                <Spinner color={colors.mainBackground} />
              ) : salarySlipData ? (
                <ImageBackground
                  source={{ uri: salarySlipData.singleUpload.imageURL }}
                  style={{
                    width: 150,
                    height: 200,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      _pickImage('salarySlip', [3, 4])
                    }}
                  >
                    <Entypo
                      name="cycle"
                      style={{ fontSize: 70, color: colors.mainBackground }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              ) : (
                <ImageBackground source={{uri: dataUser.salary_slip_url}} style={{width: '100%', height: '100%', justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity
                  onPress={() => {
                    _pickImage('salarySlip', [3, 4])
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
                Salary Slip
              </Text>
            </View>
          </View> */}
          <TouchableOpacity
            style={{
              backgroundColor: '#1D63DB',
              borderRadius: 7,
              marginVertical: 20,
              width: '90%',
            }}
            onPress={() => {
              handleSaveButton()
            }}
          >
            <Text
              style={{
                // marginHorizontal: 25,
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

export default FinancialDataComponent
