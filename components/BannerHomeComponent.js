import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'

const BannerHome = ({data}) => {
    // Variables
    const data_completed = data.data_completed

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          backgroundColor: '#1C8C9B',
          borderRadius: 15,
          margin: 10,
          overflow: 'hidden',
          elevation: 5,
          marginBottom: 30,
        }}
      >
        <Image
          source={{
            uri:
              'https://img.jakpost.net/c/2018/01/29/2018_01_29_39564_1517188935._large.jpg',
          }}
          style={{ width: 300, height: 300, padding: 20 }}
        />
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            marginVertical: 10,
            fontSize: 15,
          }}
        >
          {data_completed
            ? "You've completed all documents !"
            : 'Collect all the necessary documents and start the loan'}
        </Text>
        {
          data_completed
            ? <TouchableOpacity
              style={{
                backgroundColor: '#FFF',
                paddingHorizontal: 40,
                paddingVertical: 10,
                borderRadius: 7,
                marginTop: 20,
                borderBottomColor: '#a3dbe3',
                borderBottomWidth: 4,
              }}
              // onPress={handleOnPressApply}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: '#1C8C9B',
                  fontWeight: '700',
                }}
              >
                Apply Now
              </Text>
            </TouchableOpacity>
            : null
        }
      </View>
    )
}

export default BannerHome
