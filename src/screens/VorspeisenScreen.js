import React from 'react';
import {FlatList,ScrollView, View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import IconButton from '../components/IconButton';
import {connect} from "react-redux"
import{SearchBar, Divider} from 'react-native-elements';
import Filter from '../components/Filter';
import styles from '../constants/TabBarStyles'

class VorspeisenScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.routeName,
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerRight: <IconButton style={{paddingRight:10}} name={Platform.OS === "ios" ? "ios-add" : "md-add"} size={30}
            onItemPressed={navigation.getParam("openErstellenScreen")}  />,
      headerLeft: <IconButton style={{paddingLeft:10}} name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} size={25} 
            onItemPressed={() => navigation.openDrawer()}  />,
      }
  };

  state = {
    search: "",
    gesuchteItems: null,
    isSearching: false,
    filter: false,
    isPickerVisible: false,
    filterData: null
  };

  componentDidMount() {
    this.props.navigation.setParams({ 
      openErstellenScreen: this.openErstellenScreen.bind(this)
    });
  }

  openErstellenScreen(){
    this.setState({...this.state,filter: false})
    this.props.navigation.navigate('Erstellen', {type: "VORSPEISE"})
  }

  openDrawer(){

  }

  searchItems(text){
    if(text===""){
      this.setState({
        search: "",
        gesuchteItems: this.state.filter ? this.filterData : this.props.items,
        isSearching: false
      })
    }
    else{
      this.setState({
        isSearching: true,
        search: text,
        gesuchteItems: this.props.items.filter(item => {
          
          /* 
          Suchstring und Keywords trennen und Leerzeichen entfernen.
          Beim Vergleichen Groß- und Kleinschreibung ignorieren. 
          */
          Begriffe = text.split(",")
          for(i=0; i<Begriffe.length; i++){
            Match = item.name.trim().toLowerCase().match(Begriffe[i].trim().toLowerCase()) 
                if(Match !== null && Begriffe[i].trim() !== ""){
                  return item
                }
            if(item.keywords !== undefined){
              Keywords = item.keywords.split(",")
              for(j=0; j<Keywords.length; j++){
                  Match = Keywords[j].trim().toLowerCase().match(Begriffe[i].trim().toLowerCase());
                  if(Match !== null && Begriffe[i].trim() !== ""){
                    return item
                  }
              }
            }
          }
         })
      })
    }
  }

  handleChange = selectedOption => {
    this.sort(selectedOption)
  };
  
    
  sort(selectedOption){
    if(selectedOption === "zeit asc"){
      const myData = [].concat(this.props.items)
      .sort(function(a, b){
        var zeitA=a.zubereitungszeit, zeitB=b.zubereitungszeit
        if (zeitA < zeitB) //sort string ascending
          return -1;
        if (zeitA > zeitB)
          return 1;
        return 0; //default return value (no sorting)
        })
      this.setState({...this.state, filter: true, filterData: myData, isPickerVisible: false})
    }

    if(selectedOption === "zeit desc"){
      const myData = [].concat(this.props.items)
      .sort(function(a, b){
        var zeitA=a.zubereitungszeit, zeitB=b.zubereitungszeit
        if (zeitA > zeitB)
          return -1;
        if (zeitA < zeitB)
          return 1;
        return 0; //default return value (no sorting)
        })
      this.setState({...this.state, filter: true, filterData: myData, isPickerVisible: false})
    }
    if(selectedOption === "asc"){
      const myData = [].concat(this.props.items)
      .sort(function(a, b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
        })
      this.setState({...this.state, filter: true, filterData: myData, isPickerVisible: false})
    }
    if(selectedOption === "desc"){
      const myData = [].concat(this.props.items)
      .sort(function(a, b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if (nameA > nameB) //sort string ascending
          return -1;
        if (nameA < nameB)
          return 1;
        return 0; //default return value (no sorting)
        })
      this.setState({...this.state, filter: true, filterData: myData, isPickerVisible: false})
    }
    if(selectedOption === "counter asc"){
      const myData = [].concat(this.props.items)
      .sort(function(a, b){
        var counterA=a.counter, counterB=b.counter
        if (counterA < counterB) //sort string ascending
          return -1;
        if (counterA > counterB)
          return 1;
        return 0; //default return value (no sorting)
        })
      this.setState({...this.state, filter: true, filterData: myData, isPickerVisible: false})
    }

    if(selectedOption === "counter desc"){
      const myData = [].concat(this.props.items)
      .sort(function(a, b){
        var counterA=a.counter, counterB=b.counter
        if (counterA > counterB)
          return -1;
        if (counterA < counterB)
          return 1;
        return 0; //default return value (no sorting)
        })
      this.setState({...this.state, filter: true, filterData: myData, isPickerVisible: false})
    }
    if(selectedOption === "schwierigkeit asc"){
      const myData = [].concat(this.props.items)
      .sort(function(a, b){
        var A=a.starCount, B=b.starCount
        if (A < B) //sort string ascending
          return -1;
        if (A > B)
          return 1;
        return 0; //default return value (no sorting)
        })
      this.setState({...this.state, filter: true, filterData: myData, isPickerVisible: false})
    }

    if(selectedOption === "schwierigkeit desc"){
      const myData = [].concat(this.props.items)
      .sort(function(a, b){
        var A=a.starCount, B=b.starCount
        if (A > B)
          return -1;
        if (A < B)
          return 1;
        return 0; //default return value (no sorting)
        })
      this.setState({...this.state, filter: true, filterData: myData, isPickerVisible: false})
    }
    
  }

  openPicker(){
    this.setState({...this.state, isPickerVisible: true})
  }


  render() {
    return (
      <View style={[styles.kategorien,{flex:1}]}>
          <View style={{ flexDirection: "row", alignItems: "center"}}>
            <SearchBar
              containerStyle={styles.searchContainer}
              inputContainerStyle = {styles.searchInput}
              lightTheme={true}
              onChangeText={(text)=> this.searchItems(text)}
              icon={{ type: 'font-awesome', name: 'search' }}
              placeholder='Nach Rezept suchen'
              value= {this.state.search}
            />
            <IconButton style={{paddingRight:10}} name={Platform.OS === "ios" ? "ios-list" : "md-list"} size={25} color={"#0693E3"} 
                                  onItemPressed={()=> this.openPicker()}  
            />
          </View>
          <Filter
              selectedValue = {this.state.filterArt}
              isPickerVisible = {this.state.isPickerVisible}
              onSelectOption={(value) => this.handleChange(value)}
          />
          <Divider />
     <ScrollView style={styles.container}> 
     <FlatList
       data={this.state.isSearching ? this.state.gesuchteItems : this.props.items}
       renderItem={({item}) => 
       <TouchableOpacity style={styles.items} onPress={() =>{ 
         this.props.selectItem("SELECT_VORSPEISE", item.key)
         this.props.navigation.navigate('Detail',{type: "VORSPEISE"})} }>
         {item.image !== "" ? <Image style={styles.image} source={{uri: item.image}} /> : null}
         <View style={{justifyContent: "center"}}>
           <Text style={styles.text}> {item.name}</Text>
         </View>
       </TouchableOpacity>}
     />
   </ScrollView>
   </View>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state.vorspeisen.vorspeisen)
  return {
    items: state.vorspeisen.vorspeisen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectItem: (type, key) => dispatch({type: type, key: key})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VorspeisenScreen);