import { gql } from 'apollo-boost'

export const UPLOAD_IMAGE = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      # filename
      imageURL
    }
  }
`
