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
      title: 'Fintech Members',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: '700',
      },
    },
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
  'Apply Fintech': {
    screen: ApplicationScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Apply for ${navigation.getParam('name', 'Fintech')}`,
      headerStyle: {
        elevation: 0,
      },
    }),
  },
})

export default memberStack;
