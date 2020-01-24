import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { 
  LandingScreen, 
  RegisterScreen, 
  VerifyOTPScreen, 
  PinCreateScreen, 
  HomeScreen,
  LoginScreen
} from "../screens";

const rootNavigator = createSwitchNavigator({
  // LandingScreen,
  // RegisterScreen,
  // VerifyOTPScreen, 
  // PinCreateScreen,
  // HomeScreen,
  LoginScreen
});

export default createAppContainer(rootNavigator);
