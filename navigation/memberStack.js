import { createStackNavigator } from "react-navigation-stack";
import { MemberScreen, DetailFintechScreen } from "../screens";

const memberStack = createStackNavigator({
  Member: {
    screen: MemberScreen,
    navigationOptions: {
      headerTransparent: true,
      title: ""
    }
  },
  "Detail Fintech": {
    screen: DetailFintechScreen,
  }
});

export default memberStack;
