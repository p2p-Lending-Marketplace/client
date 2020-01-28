import React from 'react'
import {
  View,
  Image,
  Text,
} from 'react-native'
import { highScore } from '../assets/icons'

const BoardScoreComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          borderRadius: 7,
          backgroundColor: '#FFF',
          padding: 10,
          elevation: 5,
          width: '90%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={{
              uri: highScore,
            }}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: '700' }}>
            Credit Score "A"
          </Text>
        </View>
      </View>
    )
}

export default BoardScoreComponent
