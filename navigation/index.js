import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import {
  LandingScreen,
  RegisterScreen,
  VerifyOTPScreen,
  PinCreateScreen,
  LoginScreen,
  IntroScreen
} from '../screens'
import tabNavigator from './tab'

const rootNavigator = createSwitchNavigator(
  {
    LandingScreen,
    IntroScreen,
    RegisterScreen,
    VerifyOTPScreen,
    PinCreateScreen,
    LoginScreen,
    tabNavigator
  },
  { initialRouteName: 'LandingScreen' }
)



export default createAppContainer(rootNavigator)
