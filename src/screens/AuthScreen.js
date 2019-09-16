import React from 'react';
import {Text,View, Image, Alert, ActivityIndicator, TouchableOpacity,KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Keyboard} from 'react-native';
import * as firebase from 'firebase';
import {connect} from "react-redux";
import styles from '../constants/InputStyles';
import {icon_focused} from '../constants/TabBarStyles';

class AuthScreen extends React.Component {

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
      email: "",
      password: "",
      loading: false,
      error: "",
      validatedEmail: false
    };
  }
  
  SignIn = async () => {
    Keyboard.dismiss()
    if(!this.state.validatedEmail || !(this.state.password.length > 5)){
      this.setState({...this.state, error: 'Anmelden fehlgeschlagen!', loading:false});
      return null
    }
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(()=> {
      this.setState({...this.state, error: "", loading:true})
      var user = firebase.auth().currentUser
     
      if(user === null || !user.emailVerified){
        this.setState({...this.state, error: 'E-Mail-Adresse ist noch nicht bestätigt!', loading:false});
        return
      }
      
      this.loadData()
      .then(() => {
        this.setState({...this.state, loading:false})
        this.props.logIn(user.uid, this.state.email, this.state.password)
        this.props.navigation.navigate('Drawer')
      })
      .catch(function(error) {
        // Handle Errors here.
        Alert.alert("Anmelden geht nicht.")
      })
  })
  .catch(function() {
    Alert.alert("Das Konto existiert nicht.")
  })
  };
    
  loadData = async () => {
    userId = await firebase.auth().currentUser.uid 
    // UserID speichern für automatisches angemeldet bleiben
    this.props.logIn(userId, this.state.email, this.state.password)

    // Daten von Datenbank laden
    ref = await firebase.database().ref('users/' + userId + '/gerichte')
    await ref.on('value', snapshot => {
      if(snapshot && snapshot.exists()){
        this.props.loadData("LOAD_GERICHTE", snapshot.val())
      }
    })

    ref = await firebase.database().ref('users/' + userId + '/backwaren')
    await ref.on('value', snapshot => {
      if(snapshot && snapshot.exists()){
        this.props.loadData("LOAD_BACKWAREN", snapshot.val())
      }
    })

    ref = await firebase.database().ref('users/' + userId + '/desserts')
    await ref.on('value', snapshot => {
      if(snapshot && snapshot.exists()){
        this.props.loadData("LOAD_DESSERTS", snapshot.val())
      }
    })

    ref = await firebase.database().ref('users/' + userId + '/vorspeisen')
    await ref.on('value', snapshot => {
      if(snapshot && snapshot.exists()){
        this.props.loadData("LOAD_VORSPEISEN", snapshot.val())
      }
    })

    ref = await firebase.database().ref('users/' + userId + '/einkaufsliste')
    await ref.on('value', snapshot => {
      if(snapshot && snapshot.exists()){
        this.props.loadData("LOAD_EINKAUFSLISTE", snapshot.val())
      }
    })
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

  resetPassword(){
    var auth = firebase.auth();
   
    if(this.state.email===""){
      this.setState({...this.state, error: "Geben Sie Ihre E-Mail-Adresse ein.", text: ""})
      return
    }
    this.setState({...this.state, error: ""})
    auth.sendPasswordResetEmail(this.state.email).then(function() {
    // Email sent.
      Alert.alert("E-Mail zum Zurücksetzen des Passworts wurde verschickt.")
  }).catch(function(error) {
    // An error happened.
    Alert.alert("Passwort kann nicht zurückgesetzt werden.")
    });
  }
 
  render() {
    if(this.props.speedLoginStatus){
      this.props.navigation.navigate("Drawer")
    }
    return (
      <KeyboardAvoidingView
        contentContainerStyle={styles.container}
        behavior="position"
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image 
            source={require("../assets/images/Logos/Logo_App_grün_schrift.png")}
            style={{marginBottom: 15, width: 250, height: 250, display: "flex"}}
          />
        <Text style={styles.text}> E-Mail-Adresse </Text>
        <TextInput 
          keyboardType={"email-address"}
          autoCapitalize="none" 
          autoCorrect={false}
          style={styles.validInput}
          placeholder='E-Mail-Adresse'
          value={this.state.email}
          onChangeText={(text) => this.validateEmail(text)}
        />
      
        <Text style={styles.text} > Passwort </Text>
        <TextInput
          underlineColor= "transparent"
          style={styles.validInput}
          placeholder='Passwort'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.setState({...this.state, password: text})}
        />
        { this.state.loading ? 
        <ActivityIndicator animating = {this.state.loading} size="large" color="#84c0d5" style={{marginTop: 15}}/>
       : <View style={styles.loginButton}>
          <TouchableOpacity onPress={() => this.SignIn()} >
            <Text> {this.state.registrierenScreen ? "Registrieren": "Anmelden"} </Text>
          </TouchableOpacity>
        </View>
        }
        <TouchableOpacity onPress={() => this.resetPassword() }  >
          <Text style={{color: "#1c86ee", marginLeft: 5}} > 
                  Passwort vergessen? 
          </Text>
        </TouchableOpacity>
         
        <Text style={{marginTop:15}}> Du hast noch keinen Account? {
          <Text style={{color: "#1c86ee", marginLeft: 5}} onPress={() => this.props.navigation.navigate("Registrieren") } > 
                  Registrieren 
          </Text> } 
        </Text>
        
        {this.state.error != "" ? <Text style={{color: "red", margin: 15}}>{this.state.error}</Text> : null }
       
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
    loadData: (type, daten) => dispatch({type: type, objekt: daten}),
    logIn: (userId, email, password) => dispatch({type: "LOGIN", userId: userId, email: email, password: password})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);