import React from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native'
import Swipeout from "react-native-swipeout";
import styles from '../constants/InputStyles'
import { CheckBox } from 'react-native-elements'

export default class FlatListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeRowKey: null
    }
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
         <View style={styles.ListeZutaten}>
            <Text style={styles.zutat}> 
                {text}
            </Text>
        </View>
      </Swipeout>
    )
  }
  }