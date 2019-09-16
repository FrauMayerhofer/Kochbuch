import React from 'react';
import {TextInput,Text, Image,ScrollView, View, FlatList,KeyboardAvoidingView, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import {connect} from "react-redux"
import IconButton from '../components/IconButton';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Zutaten from '../components/Zutaten';
import FlatListItem from '../components/FlatListItem';
import StarRating from 'react-native-star-rating';
import styles from '../constants/InputStyles';

import * as firebase from 'firebase';
import 'firebase/storage';

class ErstellenScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.routeName,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.headerStyle
    }
  };

  state={
    type: this.props.navigation.getParam("type"),
    name: "",
    beschreibung: "",
    zutaten:[],
    portionen: "",
    aktuelle_menge: "",
    //aktuelle_einheit: "Einheit",
    aktuelle_zutat: "",
    key : Math.random(),
    image: "",
    zubereitungszeit: "",
    keywords:"",
    checkMenge: true,
    checkPortionen: true,
    checkZeit: true,
    isPickerVisible: false,
    activeRowKey: null,
    starCount: 0
  }

  componentDidMount(){
    Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      this.uploadImage(result.uri)
      .catch((error) => {
        Alert.alert("Bild konnte nicht ausgewählt werden.")
      })
    }
  };

  chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    //console.log(result)
    if (!result.cancelled) {
      this.uploadImage(result.uri)
      .catch((error) => {
        Alert.alert("Bild konnte nicht ausgewählt werden.")
      })
    }
  };

  uploadImage = async (uri) =>{
    const response = await fetch(uri)
    const blob = await response.blob()

    // Upload Image 
    var ref = firebase.storage().ref().child("images/"+this.props.state.user.userId+"/"+this.state.type+"/"+this.state.key)

    await ref.put(blob)
    // Download Image Url
    await ref.getDownloadURL().then((url) => {
      this.setState({ ...this.state, image: url});
      //Alert.alert("Bild erfolgreich ausgewählt.")
    })
    .catch((error) => {
      Alert.alert("oh")
    })
    return 
  }

  deleteImage = async () => {
    ref = await firebase.storage().ref().child("images/"+this.props.state.user.userId+"/"+this.state.type+"/"+this.state.key)
    ref.delete().then(function() {
      console.log("Bild gelöscht.")
    }).catch(function(error) {
        Alert.alert("Es ist ein Fehler aufgetreten.")
      });
  }

  handleChange = selectedOption => {
    this.setState({ ...this.state, aktuelle_einheit: selectedOption , isPickerVisible: false});
  };
  
  openPicker(){
    this.setState({...this.state, isPickerVisible: true})
  }

  deleteZutat=(deletedKey)=> {
    if(this.state.zutaten.length===1){
      alert("Die letzte Zutat kann nicht gelöscht werden!")
    }
    else{
      this.setState({
        ...this.state,
        zutaten: this.state.zutaten.filter(item => {
          return item.key !== deletedKey
        })
      })
    }
  }

  addItem = async () => {
    Daten = {
      name: this.state.name,
      key : this.state.key,
      beschreibung: this.state.beschreibung,
      portionen: this.state.portionen,
      zutaten: this.state.zutaten,
      image: this.state.image,
      keywords: this.state.keywords,
      zubereitungszeit: this.state.zubereitungszeit,
      starCount: this.state.starCount
    }
    this.props.addItem(this.state.type, Daten)
    ///this.addToDatabase(Daten)
    this.props.navigation.goBack()
  }

  addToDatabase(Daten){
    tmp = null; ort = ""
    if(this.state.type === "GERICHT"){
      tmp = this.props.state.gerichte.gerichte
      ort = '/gerichte'
    }
    if(this.state.type === "DESSERT"){
      tmp = this.props.state.desserts.desserts
      ort = '/desserts'
    }
    if(this.state.type === "BACKWARE"){
      tmp = this.props.state.backwaren.backwaren
      ort = '/backwaren'
    }

    if(this.state.type === "VORSPEISE"){
      tmp = this.props.state.vorspeisen.vorspeisen
      ort = '/vorspeisen'
    }
    
    tmp = tmp.concat(Daten)
    ref = firebase.database().ref('users/' + this.props.state.user.userId + ort)
    ref.set(tmp)
  }
 
  checkInt(value){
    if(value === ""){
      return true
    }
    regex = /^-{0,1}\d+$/
    if(regex.test(value)){
      return true
    }
    return false
  }

  onStarRatingPress(rating) {
    this.setState({
      ...this.state,
      starCount: rating
    });
  }

  addZutat(){
    aktuelle_menge=this.state.aktuelle_menge
    aktuelle_zutat=this.state.aktuelle_zutat
    this.setState({
      ...this.state,
      aktuelle_menge: "",
      aktuelle_zutat: "",
      zutaten: this.state.zutaten.concat({
        menge: aktuelle_menge, 
        zutat: aktuelle_zutat, 
        key: Math.random()})})
  }

  render() {
    return (
      <KeyboardAvoidingView
        contentContainerStyle={styles.container}
        behavior="padding"
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={styles.container} >
      
        <Text style={styles.text}> Name* </Text>
        <TextInput 
          style={styles.items} 
          placeholder="Name des Gerichts eingeben z.B. Lasagne" value={this.state.name} 
          onChangeText={(text)=> this.setState({...this.state, name: text })}
        />
        
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={styles.text}> Zutaten* </Text>
          {this.state.aktuelle_zutat=="" ? 
          <IconButton disabled={true} style={styles.zutatenButton} name={Platform.OS === "ios" ? "ios-add" : "md-add"}  size={30} color={"#eee"} /> :
          <IconButton  style={styles.zutatenButton} name={Platform.OS === "ios" ? "ios-add" : "md-add"}  size={30} color={"#0693E3"} 
          onItemPressed={()=> this.addZutat()} /> 
          }
        </View>
        
        <View style={{flexDirection: "row", height: 35}}>
          <TextInput 
            placeholder={"50"}
            keyboardType={'numeric'}
            style={[styles.items, {width: "20%", height: 35,marginRight: 5}]} 
            value={this.state.aktuelle_menge} 
            onChangeText={(text)=> {if(this.checkInt(text)){
              this.setState({...this.state, aktuelle_menge: text, checkMenge: true})}  else{this.setState({...this.state, checkMenge: false})}}}/>
          <TextInput 
            style={[styles.items, {width: "79%", height: 35}]} 
            placeholder="z.B. g Mehl" value={this.state.aktuelle_zutat} 
            onChangeText={(text)=> this.setState({...this.state,aktuelle_zutat: text })}
          />
        </View>
          
        {this.state.checkMenge ? null : <Text style={{marginBottom: 5, color: "red"}}> Es dürfen nur positive Zahlen eingegeben werden! </Text>}
        
        <FlatList 
            data={this.state.zutaten}
            renderItem={({item, index}) =>{
              return(
                <FlatListItem item = {item} index={index} parentFlatList={this} activeRowKey = {this.state.activeRowKey}
                  onClose = {(secId, rowId,direcetion) => { if(this.state.activeRowKey!== null){this.setState({...this.state, activeRowKey: null})}}}
                  onOpen = {(secId, rowId,direcetion) => {this.setState({...this.state, activeRowKey: item.key })}}
                />
              )}}
        />

        <Text style={styles.text}> Anzahl der Portionen* </Text>
        <TextInput 
          style={styles.items} 
          keyboardType={'numeric'}
          placeholder="z.B. 1 Portion" value={this.state.portionen} 
          onChangeText={(text)=> {if(this.checkInt(text)){
            this.setState({ ...this.state, portionen: text, checkPortionen: true })}  else{this.setState({...this.state, checkPortionen: false})}}} />

        {this.state.checkPortionen ? null : <Text style={{marginBottom: 5, color: "red"}}> Es dürfen nur positive Zahlen eingegeben werden! </Text>}
        
        <Text style={styles.text}> Beschreibung </Text>
        <TextInput 
          style={styles.items} 
          multiline={true}
          placeholder="Vorgehen beschreiben" value={this.state.beschreibung} 
          onChangeText={(text)=> this.setState({...this.state, beschreibung: text })}
        />

        <Text style={styles.text}> Zubereitungszeit (in Minuten) </Text>
          <TextInput 
            style={styles.items} 
            keyboardType={'numeric'}
            placeholder="z.B. 30 min" value={this.state.zubereitungszeit} 
            onChangeText={(text)=> {if(this.checkInt(text)){
              this.setState({...this.state, zubereitungszeit: text, checkZeit: true }) }else{this.setState({...this.state, checkZeit: false})}}}
          />
         {this.state.checkZeit ? null : <Text style={{marginBottom: 5, color: "red"}}> Es dürfen nur positive Zahlen eingegeben werden! </Text>}

        <Text style={styles.text}> Zusätzliche Suchbegriffe </Text>
        <TextInput 
          style={styles.items} 
          placeholder="z.B. Vegan, Auflauf, ... " value={this.state.keywords} 
          onChangeText={(text)=> this.setState({...this.state, keywords: text })}
        />
        <Text style={styles.text}> Schwierigkeitsgrad </Text>
        <StarRating
            emptyStar={Platform.OS === "ios" ? 'ios-star-outline' : 'md-star-outline'}
            fullStar={Platform.OS === "ios" ? 'ios-star' : 'md-star'}
            halfStar={Platform.OS === "ios" ? 'ios-star-half': 'md-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            fullStarColor={'red'}
            rating={this.state.starCount}
            starSize={30}
            starStyle={{padding:10}}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
        />

        <Text style={styles.text}> Bild </Text>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
          <IconButton style={{marginRight: 20}} name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}  size={30} color={"#0693E3"} onItemPressed={this.pickImage} />
          <IconButton  name={Platform.OS === "ios" ? "ios-albums" : "md-albums"}  size={25} color={"#0693E3"} onItemPressed={this.chooseImage}  />
        </View>
          
        {this.state.image !== "" ? <Image  source={{uri:this.state.image}} style={styles.image} resizeMode={"contain"}  /> : null }

        <View style={styles.button}>
          <TouchableOpacity 
          disabled = {this.state.name==="" ||  this.state.zutaten===[] || this.state.portionen==="" ? true : false}
          onPress={()=> this.addItem()}>
          <Text style={{fontSize: 20, color: this.state.name==="" ||  this.state.zutaten.length === 0 || this.state.portionen==="" ? "#eee" : "#1e90ff"}}> 
            Hinzufügen 
          </Text>
        </TouchableOpacity>
      </View>

      </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: (type, objekt) => dispatch({type: "ADD_"+type, objekt: objekt})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErstellenScreen);

/*
          <TouchableOpacity onPress={() => this.openPicker()}>
                <Text style={[styles.items, {width: 100, height: 35}]}> {this.state.aktuelle_einheit} </Text>
          </TouchableOpacity>
          <Zutaten
              selectedValue = {this.state.aktuelle_einheit}
              isPickerVisible = {this.state.isPickerVisible}
              onSelectOption={(value) => this.handleChange(value)}
          />
          */