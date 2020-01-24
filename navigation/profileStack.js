import { createStackNavigator } from "react-navigation-stack";
import { ProfileScreen } from "../screens";

const profileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerTransparent: true,
      title: ""
    }
  }
});

export default profileStack;
