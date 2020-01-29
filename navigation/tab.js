import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { HomeStack, MemberStack, ProfileStack } from './stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../assets/colors'

const tabNavigator = createBottomTabNavigator(
  {
    Member: {
      screen: MemberStack,
    },
    Home: {
      screen: HomeStack,
    },
    Me: {
      screen: ProfileStack,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor, focused }) => {
        const { routeName } = navigation.state
        let IconComponent = MaterialCommunityIcons
        let iconName
        if (routeName === 'Home') {
          iconName = focused ? 'home-currency-usd' : 'home'
        } else if (routeName === 'Member') {
          iconName = focused ? 'wunderlist' : 'view-list'
        } else if (routeName === 'Me') {
          iconName = focused ? 'emoticon-cool' : 'emoticon-excited'
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />
      },
    }),
    resetOnBlur: true,
    tabBarOptions: {
      activeTintColor: colors.mainBackground,
      inactiveTintColor: 'gray',
    },
  }
)

export default tabNavigator
