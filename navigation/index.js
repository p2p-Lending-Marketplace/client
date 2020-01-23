import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { LandingScreen, RegisterScreen } from "../screens";

const rootNavigator = createSwitchNavigator({
  LandingScreen,
  RegisterScreen
});

export default createAppContainer(rootNavigator);
