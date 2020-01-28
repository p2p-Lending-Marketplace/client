import React from 'react'
import {
  View,
  Image,
  Text,
} from 'react-native'
import { highScore, lowScore } from '../assets/icons'

const BoardScoreComponent = ({data}) => {
    // Variables
    const score = data.score
    return (
      <View
        style={{
            flexDirection: 'row',
            position: "absolute",
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
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
            {
                score === 'A' || score === 'B'
                    ?   <Image
                            source={{
                            uri: highScore,
                            }}
                            style={{ width: 80, height: 80 }}
                        />
                    :   score === 'C' || score === 'D'
                        ?   <Image
                                source={{
                                uri: lowScore,
                                }}
                                style={{ width: 80, height: 80 }}
                            />
                        : null
            }
          
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: '700' }}>
            Credit Score "{score}"
          </Text>
        </View>
      </View>
    )
}

export default BoardScoreComponent
