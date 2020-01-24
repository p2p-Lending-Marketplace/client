import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  LandingScreen
  // RegisterScreen,
  // VerifyOTPScreen,
  // PinCreateScreen,
  // HomeScreen,
  // LoginScreen
} from "../screens";
import tabNavigator from "./tab";

const rootNavigator = createSwitchNavigator({
  LandingScreen,
  // RegisterScreen,
  // VerifyOTPScreen,
  // PinCreateScreen
  // HomeScreen,
  // LoginScreen
  tabNavigator
});

export default createAppContainer(rootNavigator);
