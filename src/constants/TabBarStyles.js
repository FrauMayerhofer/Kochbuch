import {StyleSheet, Platform} from 'react-native';

export const background = "rgba(255,235,205,0.02)" //"rgba(229, 242, 255,0.8)" 
export const header = "rgba(154,205,50,1)" //"rgba(124,205,124,1)" // "rgba(24,116,205,1)";
export const icon_focused=  "white" //'#2f95dc'//"#0693E3"
export const icon_not_focused = "black" // "rgba(54,54,54,1)"

const styles = StyleSheet.create({
  container: {
    padding:10,
    backgroundColor: background
  },
  searchInput:{
    backgroundColor: background,
    borderRadius: 30,
  },
  searchContainer:{
    backgroundColor: background,
    width: "90%",
    borderWidth: 0,
    borderBottomColor: "transparent"
  },
  items:{
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  image:{
    width: 100,
    height: 100,
    marginRight: 10 
  },
  text:{
    fontSize: 20,
    fontWeight: "500",
    color: 'black',
    margin: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: Platform.OS === "ios" ? 2 : 0,
    width: 230
  },
  headerStyle:{
    //position: 'absolute',
    backgroundColor: header,
    zIndex: 100,
  },
  headerTitleStyle:{
    color: icon_focused,
    fontWeight: "700",
    flex:1,
    justifyContent: "center",
    textAlign: "center"
    //fontSize: 20
  },
  kategorien:{
    backgroundColor: background
  }
});

export default styles;