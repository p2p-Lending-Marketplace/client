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
      timeRemaining
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
      status
    }
  }
`
