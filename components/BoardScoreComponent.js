import React from 'react'
import {
  View,
  Image,
  Text,
} from 'react-native'
import { highScore, lowScore, flatScore, cry } from '../assets/icons'

const BoardScoreComponent = ({data}) => {
    // Variables
    const score = data.score

    const scoreConverter = (score) => {
      let scoreConverted
      score === 'A' ? 
        scoreConverted = "GOOD"
      : score === 'B' ? 
        scoreConverted = "FAIR"
      : score === 'C' ?
        scoreConverted = "POOR"
      : score === 'D' ?
        scoreConverted = "VERY POOR" 
      : null
      return scoreConverted
    }

    return (
      <View
        style={{
          // flexDirection: 'row',
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
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {score === 'A' ? (
              <Image
                source={{
                  uri: highScore,
                }}
                style={{ width: 40, height: 40 }}
              />
            ) : score === 'B' ? (
              <Image
                source={{
                  uri: flatScore,
                }}
                style={{ width: 40, height: 40 }}
              />
            ) : score === 'C' ? (
              <Image
                source={{
                  uri: lowScore,
                }}
                style={{ width: 40, height: 40 }}
              />
            ) : score === 'D' ? (
              <Image
                source={{
                  uri: cry,
                }}
                style={{ width: 40, height: 40 }}
              />
            ) : null}
          </View>
          <View
            style={{
              flex: 6,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 20 }}>CREDIT SCORE "{score}":</Text>
            <Text style={{ fontSize: 20, marginVertical: 5 }}>
              {scoreConverter(score)}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}></View>
          <View
            style={{
              flex: 6,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
            }}
          >
            <View
              style={{
                width: 50,
                height: 10,
                backgroundColor: 'red',
                marginHorizontal: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
              }}
            >
              <Text style={{color: "#FFF"}}>D</Text>
            </View>
            <View
              style={{
                width: 50,
                height: 10,
                backgroundColor: 'yellow',
                marginHorizontal: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
              }}
            >
              <Text>C</Text>
            </View>
            <View
              style={{
                width: 50,
                height: 10,
                backgroundColor: '#4AE54A',
                marginHorizontal: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
              }}
            >
              <Text>B</Text>
            </View>
            <View
              style={{
                width: 50,
                height: 10,
                backgroundColor: 'green',
                marginHorizontal: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
              }}
            >
              <Text style={{color: "#FFF"}}>A</Text>
            </View>
          </View>
        </View>
        {/* <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: 50, height: 10, backgroundColor: 'red', marginLeft: '10'}}></View>
            <View style={{width: 50, height: 10, backgroundColor: 'green', marginLeft: '10'}}></View>
            <View style={{width: 50, height: 10, backgroundColor: 'blue', marginLeft: '10'}}></View>
            <View style={{width: 50, height: 10, backgroundColor: 'yellow', marginLeft: '10'}}></View>
        </View> */}
      </View>
    )
}

export default BoardScoreComponent
