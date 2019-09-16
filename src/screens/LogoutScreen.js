import React from 'react';
import {View, ActivityIndicator,Alert} from 'react-native'
import * as firebase from 'firebase';
import {connect} from "react-redux";

import styles from '../constants/InputStyles';
import {icon_focused} from '../constants/TabBarStyles';

class LogoutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.routeName,
      headerTintColor: icon_focused,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.headerStyle,
    }
  };

  constructor(props){
    super(props);
    this.state = {
      loading: true,
    }
  }
  
  uploadData(){
    // Daten hochladen
    userId = this.props.state.user.userId
    db = firebase.database()

    ort = "/gerichte"
    db.ref('users/' + userId + ort ).set(this.props.state.gerichte.gerichte)

    ort = "/desserts"
    db.ref('users/' + userId + ort).set(this.props.state.desserts.desserts)

    ort = "/backwaren"
    db.ref('users/' + userId + ort).set(this.props.state.backwaren.backwaren)

    ort = "/vorspeisen"
    db.ref('users/' + userId + ort).set(this.props.state.vorspeisen.vorspeisen)

    ort = "/einkaufsliste"
    db.ref('users/' + userId + ort).set(this.props.state.einkaufsliste.zutaten)

    this.SignOut()
  }

  SignOut(){
    //this.uploadData()
    //db = firebase.database().ref('users/'+this.props.state.user.userId).set([])
    this.props.reset()
    firebase.auth().signOut()
    this.setState({loading: false})
  } 

  componentDidMount(){
    Alert.alert(
      'Achtung', 'Nicht gespeicherte Rezepte gehen beim Ausloggen verloren! \n \n Möchtest du deine Daten online speichern?', 
      [
        {text: 'Nein', onPress: () => this.SignOut(), style: 'cancel'}, 
        {text: 'Ja', onPress: () => {
          this.uploadData()
        }}
      ],
      {cancelable: true}
    )
  }
    render() {
      if(!this.state.loading){
        this.props.navigation.navigate("Login")
      }
      return(
        <View style={[styles.container,{justifyContent: "center", alignItems: "center"}]}>
          <ActivityIndicator animating = {this.state.loading} size="large" color="#84c0d5" style={{marginTop: 15}}/>
        </View>
      )
    }
}

const mapStateToProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProps = dispatch => {
    return {
      reset: () => dispatch({type: "RESET"}),
    }; 
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);
