import { createStackNavigator } from "react-navigation-stack";
import { ProfileScreen } from "../screens";

const profileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen
  }
});

export default profileStack;
