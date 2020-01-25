import { createStackNavigator } from "react-navigation-stack";
import { HomeScreen, UploadDataScreen, UploadData2Screen } from "../screens";

const homeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTransparent: true,
      title: ''
    }
  },
  'Upload Data': {
    screen: UploadDataScreen,
    navigationOptions: {
      headerShown: false
      // headerTransparent: true,
      // title: ''
    }
  },
  'Upload Data 2': {
    screen: UploadData2Screen,
    navigationOptions: {
      headerShown: false
      // headerTransparent: true,
      // title: ''
    }
  }
});

export default homeStack;
