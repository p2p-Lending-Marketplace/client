import React from 'react'
import { Text } from "react-native"
import { Segment, Button } from 'native-base'
import colors from '../assets/colors'

const SegmentUploadComponent = ({data}) => {
    // Variables
    const personal = data.personal
    const financial = data.financial

    // Functions
    const setFinancial = data.setFinancial
    const setPersonal = data.setPersonal
    return (
      <Segment style={{ backgroundColor: colors.whiteBackground }}>
        <Button
          style={{
            paddingHorizontal: 20,
            borderTopLeftRadius: 7,
            borderBottomLeftRadius: 7,
          }}
          active={personal}
          first
          onPress={() => {
            setPersonal(true)
            setFinancial(false)
          }}
        >
          <Text>Personal Data</Text>
        </Button>
        <Button
          style={{
            paddingHorizontal: 20,
            borderTopRightRadius: 7,
            borderBottomRightRadius: 7,
          }}
          active={financial}
          last
          onPress={() => {
            setFinancial(true)
            setPersonal(false)
          }}
        >
          <Text>Financial Data</Text>
        </Button>
      </Segment>
    )
}

export default SegmentUploadComponent
