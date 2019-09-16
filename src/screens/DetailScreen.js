import React from 'react';
import {connect} from 'react-redux';
import UIStepper from 'react-native-ui-stepper';
import IconButton from '../components/IconButton';
import {Text,ScrollView, View, Alert, Share, FlatList, Image, Button, Platform} from 'react-native';
import StarRating from 'react-native-star-rating';
import styles from '../constants/InputStyles';
import {icon_focused} from '../constants/TabBarStyles';

class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.routeName+"s",
      headerTintColor: icon_focused,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.headerStyle,
      headerRight:
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <IconButton style={{marginRight:30}} name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}  size={30}
                  onItemPressed={navigation.getParam("addToCart")}  
        />
        <IconButton style={{paddingRight:10}} name={Platform.OS === "ios" ? "ios-share" : "md-share"}  size={30}
                    onItemPressed={navigation.getParam("shareContent")}  
        />  
      </View> 
    }
  };

  state={
    type: this.props.navigation.getParam("type"),
    portionen: "",
    zutaten: [],
    initialisiert: false,
    selectedItem: null
  }

  componentDidMount(){
    selectedItem = null
    if(this.state.type === "GERICHT"){
      selectedItem = this.props.gericht
    }
    if(this.state.type === "BACKWARE"){
      selectedItem = this.props.backware
    }
    if(this.state.type === "DESSERT"){
      selectedItem = this.props.dessert
    }
    if(this.state.type === "VORSPEISE"){
      selectedItem = this.props.vorspeise
    }
    this.setState({
      ...this.state,
      selectedItem: selectedItem,
      portionen: parseInt(selectedItem.portionen),
      zutaten: selectedItem.zutaten,
      initialisiert: true,
    })

    this.props.navigation.setParams({ 
      shareContent: this.shareContent.bind(this),
      addToCart: this.addToCart.bind(this)
    });
  }

  addToCart(){
    this.props.addToCart(this.state.zutaten)
    Alert.alert("Die Zutaten wurden der Einkaufsliste hinzugefügt.")
  }
  
  shareContent(){
    //Alert.alert("share")
    zutatenListe = ""
    this.state.zutaten.map((item) => zutatenListe = zutatenListe + item.menge + " " + item.zutat + "\n");
    
    message = this.state.selectedItem.name + "\n \n" + "Zutaten: \n" + zutatenListe + "\n"
      + "Portionen: " + this.state.selectedItem.portionen + "\n \n"
      + "Beschreibung: \n \n" + this.state.selectedItem.beschreibung + "\n \n"
      + "Zubereitungszeit (in Minuten): " + this.state.selectedItem.zubereitungszeit
    
      Share.share({
      title: "Rezept",
      url: "www.google.de",
      message: message
    })
  }

  portionenRechner(value){
    if(value == ""){
      zutaten_neu = []
    }
    else{
      portionen = this.state.selectedItem.portionen / parseFloat(value) 
      zutaten_neu = []
      zutaten = this.state.selectedItem.zutaten
      for(i=0; i < zutaten.length; i++){
        zutat = zutaten[i]
        menge = Math.round(100.0 * (parseFloat(zutat.menge) / portionen)) / 100.0 
        zutaten_neu= zutaten_neu.concat({
          menge: menge.toString(),
          einheit: zutat.einheit,
          zutat: zutat.zutat,
          key: zutat.key
        })
      }
    }
    this.setState({...this.state, portionen: value, zutaten: zutaten_neu})
  }
  
  render() { 
    if(this.state.initialisiert){
    return (  
      <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={[styles.header,{width: "70%"}]}> {this.state.selectedItem.name} </Text>
        <View style={{justifyContent: "center"}}> 
          <Text style={styles.text}> Portionen </Text>
          <UIStepper 
            initialValue = {this.state.portionen}
            steps = {1}
            minimumValue = {1}
            displayValue = {true}
            onValueChange={(value)=> this.portionenRechner(value)}
          /> 
        </View>
        </View>
      
        <Text style={styles.text}>
          Zutaten
        </Text>
          <FlatList 
            data={this.state.zutaten}
            renderItem={({item, index}) =>{
              text = (item.menge === "" ? item.zutat : item.menge + " " + item.zutat)
              return(
                <Text style={styles.textInput}> {text} </Text>
              )}}
          />
        
        <Text style={styles.text}>
          Beschreibung
        </Text>
        <Text style={styles.textInput}> 
          {this.state.selectedItem.beschreibung}
        </Text>
        
        <Text style={styles.text}>
          Zubereitungszeit (in Minuten)
        </Text>
        <Text style={styles.textInput}> 
          {this.state.selectedItem.zubereitungszeit } 
        </Text>

        <Text style={styles.text}>
          Suchbegriffe
        </Text>
        <Text style={styles.textInput}> 
          {this.state.selectedItem.keywords}
        </Text>
        <Text style={styles.text}> Schwierigkeitsgrad </Text>
        <StarRating
          disabled={true}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          maxStars={5}
          fullStarColor={'red'}
          starStyle={{padding:10}}
          rating={this.state.selectedItem.starCount}
        />       

        {this.state.selectedItem.image !== "" ? <Image  source={{uri: this.state.selectedItem.image}} style={styles.image} resizeMode={"contain"} /> : null }        
        <View style={styles.button} >
          <Button 
            title="Bearbeiten" 
            onPress={()=> this.props.navigation.navigate('Bearbeiten',{type: this.state.type})}
          />  
        </View>
      </ScrollView>
      </View>
    )}
    else{
      return null
    };
  }
}

const mapStateToProps = state => {
  //console.log(state.gerichte.selectedItem.counter)
  return {
    gericht: state.gerichte.selectedItem,
    backware: state.backwaren.selectedItem,
    dessert: state.desserts.selectedItem,
    vorspeise: state.vorspeisen.selectedItem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deselectItem: (type) => dispatch({type: "DESELECT_"+type}),
    updateItem: (type, objekt) => dispatch({type: "UPDATE_"+type, objekt: objekt}),
    addToCart: (zutaten) => dispatch({type: "ADD_ZUTAT", zutaten: zutaten})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);