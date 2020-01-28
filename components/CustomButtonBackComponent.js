import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Header } from 'native-base'
import Constants from 'expo-constants'
import { back } from '../assets/icons'
import colors from "../assets/colors";

const CustomButtonBackComponent = ({ data }) => {
    // Variables
    
    // Functions
    const handleOnPressBack = data.handleOnPressBack

    return (
      <View style={ styles.container }>
        <Header style={ styles.headerContainier }>
          <View style={styles.buttonBack}>
            <TouchableOpacity onPress={handleOnPressBack}>
              <Image source={{ uri: back }} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
            <Text>Back</Text>
          </View>
        </Header>
      </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        paddingTop: Constants.statusBarHeight,
        backgroundColor: colors.mainBackground
        },
    headerContainier: {
        backgroundColor: colors.mainBackground, 
        justifyContent: 'flex-start' 
    },
    buttonBack: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default CustomButtonBackComponent
