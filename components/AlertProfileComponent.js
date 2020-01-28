import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { multiply } from '../assets/icons'
import colors from '../assets/colors'

const AlertProfileComponent = ({data}) => {
    // Variables
    const handleOnPressApply = data.handleOnPressApply
    return (
      <View
        style={{
          justifyContent: 'center',
          padding: 10,
          backgroundColor: '#FFF',
          borderRadius: 15,
          marginVertical: 10,
          flexDirection: 'row',
          elevation: 5,
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../assets/icons/cry.png')}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View
          style={{
            flex: 4,
            margin: 5,
            justifyContent: 'center',
            paddingVertical: 10,
          }}
        >
          <Text style={{ textAlign: 'justify' }}>
            one more step to apply for installments, let's complete your
            profile.
          </Text>
          <TouchableOpacity onPress={handleOnPressApply}>
            <Text
              style={{
                textAlign: 'left',
                color: colors.mainBackground,
                fontWeight: '700',
              }}
            >
              Go To Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.3 }}>
          <TouchableOpacity>
            <Image
              source={{ uri: multiply }}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
}

export default AlertProfileComponent
