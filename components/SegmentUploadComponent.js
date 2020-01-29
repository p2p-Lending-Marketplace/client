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
      <Segment style={{ backgroundColor: '#FFF', height: 50 }}>
        {personal ? (
          <Button
            style={{
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              height: '60%',
              width: '30%',
              borderColor: '#1D63DB',
              backgroundColor: '#1D63DB',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            active={personal}
            first
          >
            <Text style={{ color: '#FFF' }}>Personal Data</Text>
          </Button>
        ) : (
          <Button
            style={{
              // paddingHorizontal: 20,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              height: '60%',
              width: '30%',
              borderColor: '#1D63DB',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            active={personal}
            first
            onPress={() => {
              setPersonal(true)
              setFinancial(false)
            }}
          >
            <Text style={{ color: '#1D63DB' }}>Personal Data</Text>
          </Button>
        )}
        {financial ? (
          <Button
            style={{
              borderTopRightRadius: 5,
              backgroundColor: '#1D63DB',
              borderColor: '#1D63DB',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              height: '60%',
              width: '30%',
              borderBottomRightRadius: 5,
            }}
            active={financial}
            last
          >
            <Text style={{ color: '#FFF' }}>Financial Data</Text>
          </Button>
        ) : (
          <Button
            style={{
              borderTopRightRadius: 5,
              borderColor: '#1D63DB',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              height: '60%',
              width: '30%',
              borderBottomRightRadius: 5,
            }}
            active={financial}
            last
            onPress={() => {
              setFinancial(true)
              setPersonal(false)
            }}
          >
            <Text style={{ color: '#1D63DB' }}>Financial Data</Text>
          </Button>
        )}
      </Segment>
    )
}

export default SegmentUploadComponent
