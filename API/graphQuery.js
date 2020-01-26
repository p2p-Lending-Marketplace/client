import { gql } from 'apollo-boost'

export const UPLOAD_IMAGE = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      # filename
      imageURL
    }
  }
`

export const CHECK_PHONE = gql`
  query($phoneNumber: String!) {
    checkPhoneNumber(phone_number: $phoneNumber) {
      status
    }
  }
`
export const VERIFY_OTP = gql`
  query VerifyOTP($token: String!, $phone_number: String!) {
    verifyOTP(token: $token, phone_number: $phone_number) {
      phone_number
    }
  }
`

export const REQUEST_OTP = gql`
  query GetOTP($phone_number: String!) {
    getOTP(phone_number: $phone_number){
      status
    }
  }
`

export const REGISTER_USER = gql`
  mutation addNewUser ($phone_number: String!, $pin: String!) {
    addNewUser (phone_number: $phone_number, pin: $pin) {
      phone_number
    }
  }
`

export const FETCH_FINTECH_MEMBER = gql`
  query {
    getAllFinteches {
      _id
      company_name
      min_interest
      max_interest
      logoURL
    }
  }
`

export const FETCH_FINTECH_BY_ID = gql`
  query ($id: ID!) {
    getFintechById (id: $id) {
      _id
      company_name
      description
      min_interest
      max_interest
      logoURL
    }
  }
`

export const LOGIN_USER = gql`
  query ($phone_number: String!, $pin: String!) {
    signInUser (phone_number: $phone_number, pin: $pin) {
      _id
      name
      num_id
      place_of_birth
      date_of_birth
      email
      phone_number
      address
      photo_url
      id_url
      current_job
      salary
      salary_slip_url
      status
      # data_completed
    }
  }
`

export const UPDATE_USER_DATA = gql`
  mutation updateUserData ($id: ID!, $name: String, $email: String, $phone_number: String, $pin: String, $address: String, $photo_url: String, $id_url: String, $salary_slip_url: String, $current_job: String, $salary: String){
    updateUserData (id: $id, name: $name, email: $email, phone_number: $phone_number, pin: $pin, address: $address,photo_url: $photo_url, id_url: $id_url, salary_slip_url: $salary_slip_url,current_job: $current_job, salary: $salary) {
      _id
    }
  }
`