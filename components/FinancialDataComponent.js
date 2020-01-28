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
          <Item floatingLabel style={{ width: '80%' }} last>
            <Label style={{ color: colors.mainBackground }}>Current Job</Label>
            <Input
              value={dataUser.current_job}
              onChangeText={current_job => {
                handleDataChange('current_job', current_job)
              }}
            />
          </Item>
          <Item floatingLabel style={{ width: '80%' }} last>
            <Label style={{ color: colors.mainBackground }}>Salary</Label>
            <Input
              value={String(dataUser.salary)}
              onChangeText={salary => {
                handleDataChange('salary', salary)
              }}
              keyboardType={'number-pad'}
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
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.mainBackground,
              borderRadius: 7,
              marginVertical: 20,
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

export default FinancialDataComponent
