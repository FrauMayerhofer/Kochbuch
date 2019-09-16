import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {header,icon_focused,icon_not_focused} from '../constants/TabBarStyles'
import TabBarIcon from '../components/TabBarIcon';

import {DessertScreen, BackwarenScreen, VorspeisenScreen, GerichteScreen, DetailScreen, ErstellenScreen,BearbeitenScreen, LogoutScreen} from '../screens/index';

const GerichteStack = createStackNavigator(
  {
    Gerichte: GerichteScreen,
    Detail: DetailScreen,
    Erstellen: ErstellenScreen,
    Bearbeiten: BearbeitenScreen
  },
);

GerichteStack.navigationOptions = {
  tabBarLabel: 'Gerichte',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
        ? 'ios-restaurant'
        : 'md-restaurant'
      }
    />
  ),
};

GerichteStack.path = '';

const DessertStack = createStackNavigator({
    Desserts: DessertScreen,
    Detail: DetailScreen,
    Erstellen: ErstellenScreen,
    Bearbeiten: BearbeitenScreen
  }
);

DessertStack.navigationOptions = {
  tabBarLabel: 'Desserts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? 'ios-ice-cream'
        : 'md-ice-cream'
      }
    />
  ),
};

DessertStack.path = '';

const BackwarenStack = createStackNavigator(
  {
    Backwaren: BackwarenScreen,
    Detail: DetailScreen,
    Erstellen: ErstellenScreen,
    Bearbeiten: BearbeitenScreen
  }
);

BackwarenStack.navigationOptions = {
  tabBarLabel: 'Backwaren',
  tabBarIcon: ({ focused }) => (
    <Image 
      source={focused ? require("../assets/images/brot_focused.png") : require("../assets/images/brot.png")} 
      style={{width: 30, height: 30}}
    />
  ),
};

BackwarenStack.path = '';

const VorspeisenStack = createStackNavigator(
  {
    Vorspeisen: VorspeisenScreen,
    Detail: DetailScreen,
    Erstellen: ErstellenScreen,
    Bearbeiten: BearbeitenScreen
  }
);

VorspeisenStack.navigationOptions = {
  tabBarLabel: 'Vorspeisen',
  tabBarIcon: ({focused}) => (
    <Image 
      source={focused ? require("../assets/images/suppe_focused.png") : require("../assets/images/suppe.png")} 
      style={{width: 26, height: 26}}
    />
  )
  /*
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
        ? 'ios-wine'
        : 'md-wine'
      }
    />
  ),
  */
};

VorspeisenStack.path = '';

const tabNavigator = createBottomTabNavigator({
  Vorspeisen: VorspeisenStack,
  Gerichte: GerichteStack,
  Backwaren: BackwarenStack,
  Desserts: DessertStack
},
{
  initialRouteName: 'Gerichte',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: icon_focused,
    inactiveTintColor: icon_not_focused,
    style: {
      backgroundColor: header
    }
  }
});

tabNavigator.path = '';

export default tabNavigator;