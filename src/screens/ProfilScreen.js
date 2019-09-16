import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import * as firebase from 'firebase';
import {connect} from "react-redux"
import styles from '../constants/InputStyles';
import {icon_focused} from '../constants/TabBarStyles';

import IconButton from '../components/IconButton';

class ProfilScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.routeName,
      headerTintColor: icon_focused,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.headerStyle,
    }
  };
  state = {
    email: this.props.user.email,
    email_neu: this.props.user.email,
    password_alt: "",  
    password: "",
    password2: "",
    errorEmail:"",
    errorPassword:"",
    error: "",
    validatedEmail: true,
    validatedPassword: true,
    }  

  validateEmail = (text) => {
    if(text === ""){
      this.setState({...this.state, email: text, validatedEmail: true})
      return false;
    } 

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false){
      this.setState({...this.state, email: text, validatedEmail: false})
      return false;
    }
    else {
      this.setState({...this.state, email: text, validatedEmail: true})
      }
  }

  validatePassword= (text, typ = "") => {
      if(typ === "password"){
        if(text === "" || this.state.password2 === ""){
            this.setState({...this.state, password: text, validatedPassword: true})
            return 
          } 
          if(text.length > 5 && text === this.state.password2 ){
            this.setState({...this.state, password: text, validatedPassword: true})
          } else {
            this.setState({...this.state, password: text, validatedPassword: false})
            }
      } else{
        if(text === "" || this.state.password === ""){
            this.setState({...this.state, password2: text, validatedPassword: true})
            return
          } 
          if(text.length > 5 && text === this.state.password){
            this.setState({...this.state, password2: text, validatedPassword: true})
          } else {
            this.setState({...this.state, password2: text, validatedPassword: false})
            }
          }
  }
     
  saveData = () => {
    if(!this.checkPassword()){
      this.setState({...this.state, error: 'Das alte Passwort stimmt nicht.'});
      return
    }
    if(this.state.validatedEmail && this.state.validatedPassword 
      && this.state.email_neu !== this.state.email && this.state.password_alt !== this.state.password){
        
      var user = firebase.auth().currentUser;

      user.updateEmail(this.state.email_neu).then(function() {
      // Update successful.
      console.log("email angepasst")
      }).catch(function(error) {
          // An error happened.
      });
      user.updatePassword(this.state.password).then(function() {
        // Update successful.
        console.log("passwort angepasst")
      }).catch(function(error) {
        // An error happened.
      });
      this.props.update(this.state.email, this.state.password)
      this.props.navigation.goBack()
    }
    else{
      this.setState({...this.state, error: 'Speichern fehlgeschlagen!'});
    }
  }

  checkPassword = () => {
    return this.props.user.password === this.state.password_alt
  }
  
  render() {
        return (
        <View style={[{flex:1},styles.container]}>

        <Text style={styles.text}> E-Mail-Adresse </Text>
        <TextInput 
            autoCapitalize="none" 
            autoCorrect={false}
            style={this.state.validatedEmail || !this.state.registrierenScreen? styles.validInput : styles.errorInput }
            placeholder='E-Mail-Adresse'
            value={this.state.email}
            onChangeText={(text) => this.validateEmail(text)}
        />
        {this.state.validatedEmail ? null : <Text style={{marginBottom: 5, color: "red"}}> Die E-Mail-Adresse ist ungültig! </Text> }
        <Text style={styles.text} > Altes Passwort </Text>
        <TextInput
          underlineColor= "transparent"
          style={styles.validInput}
          placeholder='altes Passwort'
          secureTextEntry={true}
          value={this.state.password_alt}
          onChangeText={(text) => this.setState({...this.state, password_alt: text})}
        />   
        <Text style={styles.text} > Neues Passwort </Text>
        <TextInput
          underlineColor= "transparent"
          style={this.state.validatedPassword  ? styles.validInput : styles.errorInput}
          placeholder='neues Passwort'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.validatePassword(text,"password")}
        />
        <TextInput
          underlineColor= "transparent"
          style={this.state.validatedPassword ? styles.validInput : styles.errorInput}
          placeholder='neues Passwort wiederholen'
          secureTextEntry={true}
          value={this.state.password2}
          onChangeText={(text) => this.validatePassword(text)}
        /> 
        {this.state.validatedPassword  ? null : <Text style={{marginBottom: 5, color: "red"}}> Das Passwort stimmt nicht überein und muss mindestens 6 Zeichen lang sein! </Text>}
       
        <Button title={"Speichern"} onPress={() => this.saveData()}/>
        {this.state.error != "" ? <Text style={{color: "red", textAlign: "center"}}>{this.state.error}</Text> : null }
        </View> 
        )
  }
}
const mapStateToProps = state => {
    //console.log(state.user)
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
    return {
      update: (email, password) => dispatch({type: "UPDATE", email: email, password: password})
    }; 
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProfilScreen);