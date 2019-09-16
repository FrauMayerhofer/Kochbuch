import React from 'react';
import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import {ProfilScreen, EinkaufslistenScreen, EinstellungenScreen, LogoutScreen} from './../screens/index'

import { StyleSheet,View, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {header} from '../constants/TabBarStyles'

const Einkaufsliste = createStackNavigator(
  {
    Einkaufsliste: 
    EinkaufslistenScreen}
);

const Einstellungen = createStackNavigator(
  {
    Einstellungen: EinstellungenScreen,
    Profil: ProfilScreen
  }
);

const Logout = createStackNavigator(
  {
    Logout: LogoutScreen
  }
);

const DrawerNavigator = createDrawerNavigator({
  Kategorien: {
    screen: MainTabNavigator,
    navigationOptions : {
      drawerLabel: 'Kategorien',
      drawerIcon: ({ tintColor }) => (
      <Ionicons
      name= 'ios-home'
      size = {24}
      color = {tintColor}
      />
    )}
  },
  Einkaufsliste: {
    screen: Einkaufsliste,
    navigationOptions : {
      drawerLabel: 'Einkaufsliste',
      drawerIcon: ({ tintColor }) => (
      <Ionicons
      name= {Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
      size = {24}
      color = {tintColor}
      />
    )}
  },
  Einstellungen: {
    screen: Einstellungen,
    navigationOptions : {
      drawerLabel: 'Einstellungen',
      drawerIcon: ({ tintColor }) => (
      <Ionicons
      name= {Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
      size = {24}
      color = {tintColor}
      />
    )}
  },
  Logout:{
    screen: Logout,
    navigationOptions : {
      drawerLabel: 'Logout',
      drawerIcon: ({ tintColor }) => (
      <Ionicons
      name= {Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
      size = {24}
      color = {tintColor}
      />
    )}
  }
  },{
    contentOptions:{
        activeTintColor: "rgba(154,205,50,1)" ,
    },
    contentComponent: props => 
      <View>
        <View style={[styles.header, {paddingTop: 40, paddingBottom: 15}]}>
          <Image 
            source={require("../assets/images/Logos/Logo_App_hell_schrift.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.container}>
          <DrawerItems {...props} />
        </View>
      </View>,
    drawerWidth: 220,
    drawerPosition: "left",
    drawerBackgroundColor: "white"
    })

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  text:{
    color: "white",
    textAlign: "center",
    fontSize: 20, 
    marginBottom: 20
  },
  header:{
    paddingTop: 20,
    backgroundColor: header, //"rgba(24,116,205,1)",
    justifyContent: "center",
    alignItems: "center"
  },
  image:{
    width: 150,
    height: 150,
    display: "flex"
  }
});

export default DrawerNavigator