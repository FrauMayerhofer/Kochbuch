import {StyleSheet, Platform} from 'react-native';
import {background} from './TabBarStyles'
import {header} from './TabBarStyles'
import {icon_focused} from './TabBarStyles'

const styles = StyleSheet.create({
    container: {
      paddingRight: 10,
      paddingLeft: 10,
      backgroundColor: background
      //backgroundColor: '#rgba(229, 242, 255,0.8)',
    },
    items:{
      width: "100%",
      marginBottom: 5,
      padding: 10,
      borderColor: "#d3d3d3",
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    image:{
      width: "100%",
      aspectRatio: 1,
      paddingLeft: 10,
      paddingRight: 10
    },
    header:{
      fontSize: 25,
      fontWeight: "700",
      marginTop: 15,
      marginBottom: 15
    },
    zutaten:{
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 20
    },
    zutatenButton:{
      paddingRight:10,
    },
    text:{
      fontSize: 15,
      fontWeight: "700",
      color: 'black',
      margin: 5,
      borderBottomColor: 'grey',
      borderBottomWidth: Platform.OS === "ios" ? 2 : 0
    },
    textInput:{
      fontSize: 15,
      color: 'black',
      margin: 5,
      borderBottomColor: 'grey',
      borderBottomWidth: 2
    },
    ListeZutaten:{
      //backgroundColor: "rgba(229, 242, 255,0.8)",
      backgroundColor: "white",
    },
    zutat:{
      //backgroundColor: "rgba(229, 242, 255,0.8)",
      width: "100%",
      padding: 10, 
      fontSize: 16, 
      borderColor: "rgba(229, 242, 255,0.8)",
      borderWidth: 0
    },
    button:{
      fontSize: 40,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
      marginBottom: 40
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
        //backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
      },
      headerStyle:{
        //position: 'absolute',
        backgroundColor: header,
        zIndex: 100
      },
      headerTitleStyle:{
        color: icon_focused,
        fontWeight: "700",
        flex:1,
        justifyContent: "center",
        textAlign: "center",
      },
    loginButton: {
      width: "100%",
      borderColor: header,
      borderWidth:1,
      backgroundColor: "rgba(154,205,50,0.7)", //"rgba(229, 242, 255,1)", //"#84c0d5"
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      height: 35,
      marginTop: 10,
      marginBottom: 10,
    },
  });

  export default styles;