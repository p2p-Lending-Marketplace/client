import { createStackNavigator } from "react-navigation-stack";
import { HomeScreen } from "../screens";

const homeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTransparent: true,
      title: ""
    }
  }
});

export default homeStack;
