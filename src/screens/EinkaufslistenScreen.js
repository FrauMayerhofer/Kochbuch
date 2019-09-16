import React from 'react';
import {View, StyleSheet,Alert, Share, Text,TextInput, FlatList,Platform} from 'react-native';
import {connect} from "react-redux"
import Swipeout from "react-native-swipeout";
import { CheckBox } from 'react-native-elements'
import IconButton from '../components/IconButton';

import styles from '../constants/InputStyles'

import {background} from '../constants/TabBarStyles'
import {header} from '../constants/TabBarStyles'

export class FlatListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeRowKey: null
    }
  }
  checkHandler(key){
    this.props.parentFlatList.checkHandler(key)
  }

  render(){
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId,direcetion) => {
        if(this.state.activeRowKey != null){
          this.setState({activeRowKey: null})
        }
      },
      onOpen: (secId, rowId, direcetion) => {
        this.setState({activeRowKey: this.props.item.key})
      },
      right: [{
        onPress: () => {
          const deletingRow = this.state.activeRowKey;
          Alert.alert(
            'Achtung', 'Bist du sicher, dass du dieses Item löschen möchtest?', 
            [
              {text: 'Nein', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, 
              {text: 'Ja', onPress: () => {
                this.props.parentFlatList.deleteZutat(deletingRow)
              }}
            ],
            {cancelable: true}
          )
        },
        text: "Löschen", type: 'delete'
      }],
      rowId: this.props.index,
      secId: 1
    }
    text = (this.props.item.menge === "" ? this.props.item.zutat : this.props.item.menge + " " +this.props.item.zutat)
    return (
      <Swipeout {...swipeSettings}>
         <View style={[styles.ListeZutaten,{flexDirection: "row", alignItems: "center"}]} >
            <CheckBox
                    checked={this.props.item.checked}
                    onIconPress={() => this.checkHandler(this.props.item.key)}
            /> 
            <Text style={Styles.text} > 
                {text} 
            </Text>            
        </View>
      </Swipeout>
    )
  }
  }

class EinkaufslistenScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.routeName,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.headerStyle,
      drawerIcon: () => <Ionicons name={Platform.OS === "ios" ? "ios-home" : "md-home"} size={24} />,
      headerRight: <View style={{flexDirection: "row", justifyContent: "space-between"}}>
      <IconButton style={{marginRight:30}} name={Platform.OS === "ios" ? "ios-share" : "md-share"} size={30}
                  onItemPressed={navigation.getParam("shareContent")}  
      />  
      <IconButton style={{paddingRight:10}} name = {Platform.OS === "ios" ? "ios-trash" : "md-trash"} size={30}
                                onItemPressed={navigation.getParam("deleteCart")}  />
    </View>,
      headerLeft: <IconButton style={{paddingLeft:10}} name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} size={25}
                                onItemPressed={() => navigation.openDrawer()}  />,
    }
  };

  state={
    activeRowKey: null,
    text: ""
  }

  componentDidMount() {
    this.props.navigation.setParams({ 
      deleteCart: this.deleteCart.bind(this),
      shareContent: this.shareContent.bind(this),
    });
  }

  deleteCart(){
    Alert.alert(
      'Achtung', 'Bist du sicher, dass du deine Einkaufsliste komplett löschen möchtest?', 
      [
        {text: 'Nein', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, 
        {text: 'Ja', onPress: () => {
          this.props.deleteCart()
        }}
      ],
      {cancelable: true}
    )
  }

  deleteZutat=(deletedKey)=> {
     this.props.deleteZutat(deletedKey)
  }

  checkHandler(key){
    this.props.checkZutat(key)
  }

  addCart(){
    this.props.addCart(this.state.text)
    this.setState({...this.state, text: ""})
  }

  shareContent(){
    //Alert.alert("share")
    zutatenListe = ""
    this.props.zutaten.map((item) => 
    zutatenListe = zutatenListe + (item.menge === "" ? item.zutat : item.menge + " " + item.zutat) + "\n");
    
    message = "Einkaufsliste: \n \n" +  zutatenListe
    
      Share.share({
      title: "Einkaufsliste",
      url: "www.google.de",
      message: message
    })
  }

  
  render() {
    return (
        <View style={Styles.container}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <TextInput 
                style={Styles.items}
                placeholder='Item hinzufügen'
                value={this.state.text}
                onChangeText={(text) => this.setState({...this.state, text: text})}
            />
          <IconButton 
            disabled={this.state.text === ""}
            style={{marginLeft: 5, paddingRight:10}} 
            name={Platform.OS === 'ios' ? "ios-add" : "md-add"}
            size={30} 
            color={this.state.text === "" ? "grey" : "#0693E3"} 
            onItemPressed={() => this.addCart()}  
          />
          </View>
            <FlatList 
              data={this.props.zutaten}
              renderItem={({item, index}) =>{
                console.log(item)
              return(
                  <FlatListItem item = {item} index={index} parentFlatList={this} activeRowKey = {this.state.activeRowKey}
                    onClose = {(secId, rowId,direcetion) => { if(this.state.activeRowKey!== null){this.setState({...this.state, activeRowKey: null})}}}
                    onOpen = {(secId, rowId,direcetion) => {this.setState({...this.state, activeRowKey: item.key })}}
                  />
              )}}
        />
        </View> 
    )
}
}
    const mapStateToProps = state => {
        return {
          zutaten: state.einkaufsliste.zutaten
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
          deleteZutat: (key) => dispatch({type: "DELETE_ZUTAT", key: key}),
          checkZutat: (key) => dispatch({type: "CHECK_ZUTAT", key: key}),
          deleteCart: () => dispatch({type: "DELETE_CART"}),
          addCart: (text) => dispatch({type: "ADD_CART", text: text})
        }; 
    };

    export default connect(mapStateToProps, mapDispatchToProps)(EinkaufslistenScreen);

    const Styles = StyleSheet.create({
        container: {
            padding: 10,
            flex:1,
            flexDirection: "column",
            //backgroundColor: "rgba(229, 242, 255,1)"
            backgroundColor: background
        },
        text:{
            fontSize: 17,
            fontWeight: "500",
            color: 'black'
        },
        ListeZutaten:{
          flexDirection: "row", 
          alignItems: "center",
          backgroundColor: "rgba(229, 242, 255,1)"
          //backgroundColor: background
          
        },
        items:{
          width: "95%",
          padding: 10,
          borderColor: "#d3d3d3",
          borderWidth: 1,
          flexDirection: "row",
          alignItems: "center"
        },
    });