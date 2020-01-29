import React from 'react'
import { View, Image, Text } from 'react-native'
import { highScore } from '../assets/icons'

const BoardScoreComponent = ({ data }) => {
  // Variables

  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        top: 80,
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
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10
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
            alignContent: "center",
            paddingHorizontal: 20,
            }}
        >
            <Text style={{ fontSize: 23, fontWeight: '700' }}>
                Let's apply loan now!
            </Text>
        </View>
    </View>
  )
}

export default BoardScoreComponent
