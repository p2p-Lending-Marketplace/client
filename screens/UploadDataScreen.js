import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, ScrollView, AsyncStorage } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import {
  UPLOAD_IMAGE,
  UPDATE_USER_DATA,
  FETCH_USER_DETAIL,
  SELECT_APPLICATION,
} from '../API/graphQuery'
import colors from '../assets/colors'
import { APP_NAME } from '../assets/variables'
import {
  PersonalDataComponent,
  FinancialDataComponent,
  SegmentUploadComponent,
} from '../components'

const UploadDataScreen = ({ navigation }) => {
  // Variables
  const [dataUser, setDataUser] = useState({})
  const [token, setToken] = useState('')
  const [fetchUser, { loading, data, error }] = useLazyQuery(FETCH_USER_DETAIL)
  if (error) {
    console.log(error)
  }
  const [
    updateUserData,
    { data: updateData, error: updateError, loading: updateLoding },
  ] = useMutation(UPDATE_USER_DATA, {
    refetchQueries: [{ query: FETCH_USER_DETAIL, variables: { token } }],
  })
  const [datePicker, setDatePicker] = useState({
    date: new Date(),
    mode: 'date',
    show: false,
  })
  const [personal, setPersonal] = useState(true)
  const [financial, setFinancial] = useState(false)
  const [
    uploadPhoto,
    { loading: photoLoading, error: photoError, data: photoData },
  ] = useMutation(UPLOAD_IMAGE)
  const [
    uploadIdCard,
    { loading: idCardLoading, error: idCardError, data: idCardData },
  ] = useMutation(UPLOAD_IMAGE)
  const [
    uploadSalarySlip,
    {
      loading: salarySlipLoading,
      error: salarySlipError,
      data: salarySlipData,
    },
  ] = useMutation(UPLOAD_IMAGE)

  // Function
  useEffect(() => {
    const getCurrentUser = async () => {
      const tokenString = await AsyncStorage.getItem(APP_NAME + ':token')
      if (tokenString !== null) {
        const { token } = JSON.parse(tokenString)
        await setToken(token)
        fetchUser({
          variables: {
            token,
          },
        })
      }
    }
    getCurrentUser()
  }, [])

  useEffect(() => {
    if (data) {
      setDataUser(data.getUserById)
      setDatePicker({
        ...datePicker,
        date: new Date(data.getUserById.date_of_birth),
      })
    }
  }, [data])

  const show = mode => {
    setDatePicker({
      ...datePicker,
      show: true,
      mode,
    })
  }
  const datepicker = () => {
    show('date')
  }
  const setDate = async (event, date) => {
    console.log(date)
    date = date || datePicker.date
    await setDatePicker({
      show: !datePicker.show,
      date,
    })
    await setDataUser({
      ...dataUser,
      date_of_birth: date,
    })
  }
  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      alert('Sorry, we need file manager permissions to make this work!')
      return false
    } else {
      return true
    }
  }
  const _pickImage = async (field, ratio, uploadOpt) => {
    const status = await getPermissionAsync()
    if (!status) {
      return
    }
    let result
    if (uploadOpt === 'file') {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: ratio,
        quality: 1,
        base64: true,
      })
    } else if (uploadOpt === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: ratio,
        quality: 1,
        base64: true,
      })
    }
    if (!result.cancelled) {
      if (field === 'photo') {
        uploadPhoto({ variables: { file: result } })
      } else if (field === 'idCard') {
        uploadIdCard({ variables: { file: result } })
      } else if (field === 'salarySlip') {
        uploadSalarySlip({ variables: { file: result } })
      }
    }
  }
  useEffect(() => {
    if (photoData) {
      setDataUser({
        ...dataUser,
        photo_url: photoData.singleUpload.imageURL,
      })
    }
    if (idCardData) {
      setDataUser({
        ...dataUser,
        id_url: idCardData.singleUpload.imageURL,
      })
    }
    if (salarySlipData) {
      setDataUser({
        ...dataUser,
        salary_slip_url: salarySlipData.singleUpload.imageURL,
      })
    }
  }, [photoData, idCardData, salarySlipData])

  const handleDataChange = (type, value) => {
    setDataUser({
      ...dataUser,
      [type]: value,
    })
  }

  const handleSaveButton = async () => {
    const variables = {
      num_id: dataUser.num_id,
      name: dataUser.name,
      email: dataUser.email,
      phone_number: dataUser.phone_number,
      address: dataUser.address,
      photo_url: dataUser.photo_url,
      id_url: dataUser.id_url,
      salary_slip_url: dataUser.salary_slip_url,
      current_job: dataUser.current_job,
      salary: Number(dataUser.salary),
      id: dataUser._id,
      date_of_birth: dataUser.date_of_birth,
      place_of_birth: dataUser.place_of_birth,
      existing_loan_installment: Number(dataUser.existing_loan_installment),
      token,
    }
    updateUserData({
      variables,
    })
  }

  const updateAsyncStorage = async () => {
    navigation.push('Profile')
  }

  if (updateData) {
    alert('Success Save Data')
    updateAsyncStorage()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <SegmentUploadComponent
        data={{ setPersonal, setFinancial, personal, financial }}
      />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {personal && dataUser._id ? (
          <PersonalDataComponent
            data={{
              user: dataUser,
              handleSaveButton,
              handleDataChange,
              datePicker,
              datepicker,
              _pickImage,
              setDate,
              photoData,
              photoLoading,
              idCardData,
              idCardLoading,
            }}
          />
        ) : financial && dataUser._id ? (
          <FinancialDataComponent
            data={{
              user: dataUser,
              handleSaveButton,
              handleDataChange,
              _pickImage,
              salarySlipData,
              salarySlipLoading,
            }}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  )
}

export default UploadDataScreen
