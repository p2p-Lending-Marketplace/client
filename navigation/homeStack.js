import { createStackNavigator } from "react-navigation-stack";
import { HomeScreen } from "../screens";

const homeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default homeStack;
