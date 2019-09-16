import React from 'react';
import {Text,View, StyleSheet, ActivityIndicator, TouchableOpacity,KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Keyboard} from 'react-native';
import * as firebase from 'firebase';
import {connect} from "react-redux";
import styles from '../constants/InputStyles';
import {icon_focused} from '../constants/TabBarStyles';

class SignUpScreen extends React.Component {
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
      nachname: "",
      vorname: "",
      email: "",
      password: "",
      password2: "",
      loading: false,
      errorEmail:"",
      errorPassword:"",
      error: null,
      validatedEmail: true,
      validatedPassword: true,
    };
  }
  
  SignUp = () => {
    Keyboard.dismiss()
    if(!this.state.validatedEmail || !this.state.validatedPassword || this.state.email === "" || this.state.password === ""
        || this.state.nachname === "" || this.state.vorname === ""){
      this.setState({...this.state, error: 'Registrieren fehlgeschlagen!', text: "", loading:false});
      return null
    }
    this.setState({...this.state, loading:true})
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(async ()=> {
      var user = firebase.auth().currentUser;
      await user.updateProfile({
        displayName: this.state.vorname + " "+ this.state.nachname
      })
      await user.sendEmailVerification().then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
      this.setState({...this.state, error: "", text: 'Es wurde eine Bestätigungsemail verschickt!', loading:false})
    })  
    .catch (() => {
      this.setState({...this.state, error: 'Registrieren fehlgeschlagen!', text: "", loading:false});
    })
  };

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

  render() {
    return (
      <KeyboardAvoidingView
        contentContainerStyle={styles.container}
        behavior="position"
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.text}> Nachname* </Text>
        <TextInput 
          autoCapitalize="none" 
          autoCorrect={false}
          style={styles.validInput}
          placeholder='Name'
          value={this.state.nachname}
          onChangeText={(text) => this.setState({...this.state, nachname: text})}
        />
        <Text style={styles.text}> Vorname* </Text>
        <TextInput 
          autoCapitalize="none" 
          autoCorrect={false}
          style={styles.validInput}
          placeholder='Name'
          value={this.state.vorname}
          onChangeText={(text) => this.setState({...this.state, vorname: text})}
        />

        <Text style={styles.text}> E-Mail-Adresse* </Text>
        <TextInput 
          keyboardType={"email-address"}
          autoCapitalize="none" 
          autoCorrect={false}
          style={this.state.validatedEmail ? styles.validInput : styles.errorInput }
          placeholder='E-Mail-Adresse'
          value={this.state.email}
          onChangeText={(text) => this.validateEmail(text)}
        />
        {this.state.validatedEmail ? null : <Text style={{marginBottom: 5, color: "red"}}> Die E-Mail-Adresse ist ungültig! </Text> }
      
        <Text style={styles.text} > Passwort* </Text>
        <TextInput
          underlineColor= "transparent"
          style={this.state.validatedPassword ? styles.validInput : styles.errorInput}
          placeholder='Passwort'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.validatePassword(text, "password")}
        />
        <Text style={styles.text} > Passwort wiederholen* </Text>
        <TextInput
          underlineColor= "transparent"
          style={this.state.validatedPassword ? styles.validInput : styles.errorInput}
          placeholder='Passwort'
          secureTextEntry={true}
          value={this.state.password2}
          onChangeText={(text) => this.validatePassword(text)}
        />
        {this.state.validatedPassword ? null : <Text style={{marginBottom: 5, color: "red"}}> Das Passwort stimmt nicht überein und muss mindestens 6 Zeichen lang sein! </Text>}
        { this.state.loading ? 
        <ActivityIndicator animating = {this.state.loading} size="large" color="#84c0d5" style={{marginTop: 15}}/>
       : <View style={styles.loginButton}>
          <TouchableOpacity onPress={() => this.SignUp()} >
            <Text> Registrieren </Text>
          </TouchableOpacity>
        </View>
        }
        {this.state.error != "" ? <Text style={{color: "red", textAlign: "center"}}>{this.state.error}</Text> : null }
        {this.state.text != ""  ? <Text style={{color: "green", textAlign: "center"}}>{this.state.text}</Text> : null }
        
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
  }
}
const mapStateToProps = state => {
  return {
    speedLoginStatus: state.user.speedLogin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadData: (type, daten, image = null) => dispatch({type: type, objekt: daten, image: image}),
    logIn: (userId, email, password) => dispatch({type: "LOGIN", userId: userId, email: email, password: password})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

const Styles = StyleSheet.create({
  container:{
    padding: 10,
    paddingTop: 30
  },
  image:{
    marginBottom: 40, 
    width: 150, 
    height: 150, 
    display: "flex"
  },
  header:{
    fontSize: 25,
    fontWeight: "700",
    margin: 20,
    //textAlign: 'center'
  }, 
  text:{
    fontSize: 15,
    fontWeight: "500",
    color: 'black',
    marginBottom: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginTop: 10
  },
  SignUpButton: {
    width: "100%",
    borderColor: "rgba(52,75,84,0.4)",
    borderWidth:1,
    backgroundColor: "rgba(229, 242, 255,1)", //"#84c0d5"
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    marginTop: 10,
    marginBottom: 10,
  },
  validInput: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  errorInput: {
    width: "100%",
    borderColor: "#FF0000",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  }
});