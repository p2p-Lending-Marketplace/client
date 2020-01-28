import { gql } from 'apollo-boost'

export const REGISTER_PUSH_NOTIFICATION = gql`
  mutation($token: String!, $phoneNumber: String!) {
    registerPushNotification(token: $token, phone_number: $phoneNumber) {
      token
    }
  }
`

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
      _id
    }
  }
`

export const REQUEST_OTP = gql`
  query GetOTP($phone_number: String!) {
    getOTP(phone_number: $phone_number) {
      status
    }
  }
`

export const REGISTER_USER = gql`
  mutation addNewUser($phone_number: String!, $pin: String!) {
    addNewUser(phone_number: $phone_number, pin: $pin) {
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
  query($id: ID!) {
    getFintechById(id: $id) {
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
<<<<<<< HEAD
  query($phone_number: String!, $pin: String!) {
    signInUser(phone_number: $phone_number, pin: $pin) {
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
=======
  query ($phone_number: String!, $pin: String!) {
    signInUser (phone_number: $phone_number, pin: $pin) {
>>>>>>> refactore some scree
      status
      token
    }
  }
`

export const UPDATE_USER_DATA = gql`
  mutation updateUserData(
    $id: ID!
    $name: String
    $email: String
    $phone_number: String
    $pin: String
    $address: String
    $photo_url: String
    $id_url: String
    $salary_slip_url: String
    $current_job: String
    $salary: Int
    $place_of_birth: String
    $date_of_birth: String
    $num_id: String
    $token: String
  ) {
    updateUserData(
      id: $id
      name: $name
      email: $email
      phone_number: $phone_number
      pin: $pin
      address: $address
      photo_url: $photo_url
      id_url: $id_url
      salary_slip_url: $salary_slip_url
      current_job: $current_job
      salary: $salary
      date_of_birth: $date_of_birth
      place_of_birth: $place_of_birth
      num_id: $num_id
      token: $token
    ) {
      _id
    }
  }
`

export const FETCH_APPLICATION_BY_UID = gql`
  query($userID: ID!, $token: String!) {
    getAllUserApplications(userID: $userID, token: $token) {
      _id
      user_id
      fintech_id
      amount
      logoURL
      company_name
      loan_term
      objective
      decision
      createdAt
      status
    }
  }
`

export const SUBMIT_APPLICATION = gql`
  mutation addNewApplication(
    $userID: ID!
    $fintechID: ID!
    $amount: Int!
    $loan_term: Int!
    $objective: String!
    $token: String!
  ) {
    addNewApplication(
      userID: $userID
      fintechID: $fintechID
      amount: $amount
      loan_term: $loan_term
      objective: $objective
      token: $token
    ) {
      _id
    }
  }
`
<<<<<<< HEAD
=======

export const FETCH_USER_DETAIL = gql`
  query ($token: String!) {
    getUserById (token: $token){
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
      data_completed
    }
  }
`
>>>>>>> refactore some scree
