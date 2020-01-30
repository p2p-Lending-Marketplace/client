import { createStackNavigator } from 'react-navigation-stack'
import {
  ProfileScreen,
  HistoryScreen,
  HelpCenterScreen,
  UploadDataScreen,
  SettingScreen,
} from '../screens'
import { AnswerComponent } from '../components'

const profileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerTransparent: true,
      title: '',
    },
  },
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
    },
  },
  'Help Center': {
    screen: HelpCenterScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
    },
  },
  Setting: {
    screen: SettingScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
    },
  },
  Answer: {
    screen: AnswerComponent,
    navigationOptions: {
      title: '',
    },
  },
  'Upload Data': {
    screen: UploadDataScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
    },
  },
  // rootNavigator
})

export default profileStack
