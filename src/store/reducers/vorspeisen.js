import {
    VORSPEISE,
  } from "../actions/actionTypes";
  
  const initialState = {
      vorspeisen: [],
      selectedItem: null
  }
  
  const vorspeisenReducer = ( state = initialState, action) => {
      switch(action.type){
            case VORSPEISE.ADD:
              return {
                ...state,
                vorspeisen: state.vorspeisen.concat({
                  key: action.objekt.key,
                  name: action.objekt.name,
                  beschreibung: action.objekt.beschreibung,
                  portionen: action.objekt.portionen,
                  zutaten: action.objekt.zutaten,
                  image: action.objekt.image,
                  keywords: action.objekt.keywords,
                  starCount: action.objekt.starCount,
                  zubereitungszeit: action.objekt.zubereitungszeit,
                  counter: 0
                })
              };
            case VORSPEISE.DELETE:
              return {
                ...state,
                vorspeisen: state.vorspeisen.filter(item => {
                  return item.key !== state.selectedItem.key;
                }),
                selectedItem: null
              };
            case VORSPEISE.SELECT:
              selectItem = state.vorspeisen.find(item => {
                return item.key === action.key;
              })
              selectedItem = {
                ...selectItem,
                counter: selectItem.counter + 1
              }
              return {
                selectedItem: selectedItem,
                vorspeisen: state.vorspeisen.map(item => {
                  if(item.key!== selectItem.key){
                    return item
                  } else{
                      return selectedItem
                    }
                  })
              };
            case VORSPEISE.DESELECT:
              return {
                ...state,
                selectedItem: null
              };
            case VORSPEISE.UPDATE:
              return{
                selectedItem: null,
                vorspeisen: state.vorspeisen.map(item => {
                  if(item.key!== state.selectedItem.key){
                    return item
                  } else{
                      return {
                        key: action.objekt.key,
                        name: action.objekt.name,
                        beschreibung: action.objekt.beschreibung,
                        portionen: action.objekt.portionen,
                        zutaten: action.objekt.zutaten,
                        image: action.objekt.image,
                        keywords: action.objekt.keywords,
                        zubereitungszeit: action.objekt.zubereitungszeit,
                        starCount: action.objekt.starCount,
                        counter: action.objekt.counter
                      }
                    }
                  })
              }
           // Load Data from Database
           case VORSPEISE.LOAD:
            return {
              vorspeisen: action.objekt,
              selectedItem: null
            }
          case VORSPEISE.RESET:
            //console.log("reset vorspeisen")
              return {
                vorspeisen: [],
                selectedItem: null
              }
            default:
              return state;
          }
  };
  
  export default vorspeisenReducer;