import {
    GERICHT
  } from "../actions/actionTypes";

import 'firebase/storage';

  const initialState = {
      gerichte: [],
      selectedItem: null,
  }

  const gerichteReducer = ( state = initialState, action) => {
      switch(action.type){
          // Add 
            case GERICHT.ADD:
              return {
                gerichte: state.gerichte.concat({
                  name: action.objekt.name,
                  key: action.objekt.key,
                  beschreibung: action.objekt.beschreibung,
                  portionen: action.objekt.portionen,
                  zutaten: action.objekt.zutaten,
                  keywords: action.objekt.keywords,
                  zubereitungszeit: action.objekt.zubereitungszeit,
                  image: action.objekt.image,
                  starCount: action.objekt.starCount,
                  counter: 0
                })
              };

          // Delete 
            case GERICHT.DELETE:
              return {
                ...state,
                gerichte: state.gerichte.filter(item => {
                  return item.key !== state.selectedItem.key;
                }), 
                selectedItem: null
              };

            // Select 
            case GERICHT.SELECT:
              selectItem = state.gerichte.find(item => {
                return item.key === action.key;
              })
              selectedItem = {
                ...selectItem,
                counter: selectItem.counter + 1
              }
              return {
                selectedItem: selectedItem,
                gerichte: state.gerichte.map(item => {
                  if(item.key!== selectItem.key){
                    return item
                  } else{
                      return selectedItem
                    }
                  })
              };

          // Deselect 
            case GERICHT.DESELECT:
              return {
                ...state,
                selectedItem: null
              };

          // Update
            case GERICHT.UPDATE:
              return{
                selectedItem: null,
                gerichte: state.gerichte.map(item => {
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
            case GERICHT.LOAD:
              return {
                gerichte: action.objekt
              }
            case GERICHT.RESET:
              return {
                gerichte: [],
                selectedItem: null
              }
            default:
              return state;
          }
  };

  export default gerichteReducer;