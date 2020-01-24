import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { HomeStack, MemberStack, ProfileStack } from "./stack";

const tabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack
  },
  Member: {
    screen: MemberStack
  },
  Me: {
    screen: ProfileStack
  }
});

export default tabNavigator;
