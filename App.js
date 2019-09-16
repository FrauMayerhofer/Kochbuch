import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import React from 'react';
import { StyleSheet, View,ImageBackground, ActivityIndicator,AsyncStorage } from 'react-native';

// Firebase
import ApiKeys from './src/constants/ApiKeys';
import * as firebase from 'firebase';
// Navigation
import AppNavigator from './src/navigation/AppNavigator';
// Redux
import{Provider} from 'react-redux';
import {store, persistor} from './src/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

class App extends React.Component {
  constructor(props){
    super(props);
    // Initialize firebase
    if(!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  renderLoading = () => {
    <View>
      <ActivityIndicator size="large" />
    </View>
  }

  render() {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={this.renderLoading()}>
            <View style={styles.container}>
              <AppNavigator />
            </View>
          </PersistGate>
        </Provider>
      );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

/*

  render() {
      return (
        <ImageBackground source={require("./src/assets/backgrounds/background.jpg")} style={{flex:1}}>
        <Provider store={store}>
            <View style={styles.container}>
              <AppNavigator />
            </View>
        </Provider>
        </ImageBackground>
      );
  }  
*/