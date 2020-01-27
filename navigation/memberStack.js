import { createStackNavigator } from "react-navigation-stack";
import { MemberScreen, DetailFintechScreen, ApplicationScreen } from "../screens";
import colors from "../assets/colors"

const memberStack = createStackNavigator({
  Member: {
    screen: MemberScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.mainBackground,
      },
      headerTintColor: '#FFF',
      title: "Fintech Members",
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: '700'
      }
    }
  },
  'Detail Fintech': {
    screen: DetailFintechScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.mainBackground,
      },
      headerTintColor: '#FFF',
    },
  },
  "Apply Fintech": {
    screen: ApplicationScreen
  }
})

export default memberStack;
