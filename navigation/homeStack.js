import { createStackNavigator } from "react-navigation-stack";
import { HomeScreen, UploadDataScreen } from "../screens";

const homeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTransparent: true,
      title: ""
    }
  },
  "Upload Data" : {
    screen: UploadDataScreen,
    navigationOptions: {
      headerTransparent: true,
      title: ""
    }
  }
});

export default homeStack;
