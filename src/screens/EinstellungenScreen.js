import React from 'react';
import {View, Text, Alert, Switch,Button, Platform} from 'react-native';
import * as firebase from 'firebase';
import {connect} from "react-redux"

import styles from '../constants/InputStyles';
import {icon_focused} from '../constants/TabBarStyles';

import IconButton from '../components/IconButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

class EinstellungenScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.routeName,
      headerTintColor: icon_focused,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.headerStyle,
      headerLeft: <IconButton style={{paddingLeft:10}} name="ios-menu" size={25}
                                onItemPressed={() => navigation.openDrawer()}  />,
    }
  };

    state = {
      speedLogin: this.props.speedLoginStatus
    }  

    switch(){
      tmp = !this.state.speedLogin
      this.setState({
        speedLogin: tmp
      })
      this.props.speedLogin("ONLINE", tmp)
    }

    deleteUser(){
      Alert.alert(
        'Achtung', 'Bist du sicher, dass du dein Konto löschen möchtest?', 
        [
          {text: 'Nein', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, 
          {text: 'Ja', onPress: () => {
            //this.deleteInformation()
            firebase.storage().ref().child('/images/VEmIFVmfAPQ5SxFnb9aqb8bxtEr1').delete()
            .then(function() {
              console.log("Bild gelöscht.")
            }).catch(function(error) {
              console.log("Es ist ein Fehler aufgetreten.")
              });
          }}
        ],
        {cancelable: true}
      )
    }

    deleteInformation(){  
      user = this.props.state.user.userId
      firebase.database().ref('users/' + user ).remove()
      firebase.storage().ref().child('images/' + user ).delete()
      this.props.reset()
      firebase.auth().currentUser.delete()
      this.props.navigation.navigate("Auth")
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

      Alert.alert("Die Daten wurden gespeichert.")
    }

    render() {
        return (
            <View style={[styles.container,{flex:1,flexDirection: "column"}]}>
                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <Switch 
                  value={this.state.speedLogin} 
                  onChange={()=> this.switch()}
                />
                <Text style={styles.text}> Einloggen überspringen? </Text>
               </View>

               <TouchableOpacity onPress={() => this.uploadData()}>
               <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 30}}>
                  <IconButton name={Platform.OS === "ios" ? "ios-save" : "md-save"} size={30} color={"rgba(154,205,50,1)"} 
                  />
                  <Text style={styles.text} > Daten speichern</Text>
               </View>
               </TouchableOpacity>
               
               <Button title={"Daten ändern"} onPress={() => this.props.navigation.navigate("Profil")}/>   
               <Button title={"Konto löschen"} onPress={() => this.deleteUser()} />  
          </View> 
        )
    }
}
const mapStateToProps = state => {
  return {
    state: state,
    speedLoginStatus: state.user.speedLogin
  }
}

const mapDispatchToProps = dispatch => {
    return {
      speedLogin: (type, status) => dispatch({type: type, speedLogin: status}),
      reset: () => dispatch({type: "RESET"}),
    }; 
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(EinstellungenScreen);

  /*
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      
      backgroundColor: "rgba(229, 242, 255,0.5)"
    },
    text:{
      fontSize: 15,
      fontWeight: "700",
      color: 'black',
      margin: 5,
      borderBottomColor: 'grey',
      borderBottomWidth: 2
    },
  });

<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <IconButton style={{paddingRight:10}} name="ios-log-out" size={30} color={"#0693E3"} 
                                onItemPressed={()=> this.SignOut()}  />
                <Text style={styles.text}> Logout </Text>
               </View> 
  */