import { createStackNavigator } from "react-navigation-stack";
import { MemberScreen } from "../screens";

const memberStack = createStackNavigator({
  Member: {
    screen: MemberScreen,
    navigationOptions: {
      headerTransparent: true,
      title: ""
    }
  }
});

export default memberStack;
