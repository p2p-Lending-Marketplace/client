import { createStackNavigator } from 'react-navigation-stack'
import { HomeScreen, UploadDataScreen, LoginScreen } from '../screens'
import colors from '../assets/colors'

const homeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
      // headerStyle: {
      //   backgroundColor: colors.mainBackground,
      // },
      // headerTintColor: '#FFF',
      // title: 'Fintech Members',
      // headerTitleAlign: 'center',
      // headerTitleStyle: {
      //   fontWeight: '700',
      // },
    },
  },
  'Upload Data': {
    screen: UploadDataScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.mainBackground,
      },
      headerTintColor: '#FFF',
      title: 'Upload Data',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: '700',
      },
      // headerLeft: null,
    },
  },
  LoginScreen,
})

export default homeStack
