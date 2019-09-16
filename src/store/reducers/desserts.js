import {
    DESSERT
  } from "../actions/actionTypes";
  
  const initialState = {
      desserts: [],
      selectedItem: null
  }
  
  const dessertsReducer = ( state = initialState, action) => {
      switch(action.type){
            case DESSERT.ADD:
              return {
                ...state,
                desserts: state.desserts.concat({
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
            case DESSERT.DELETE:
              return {
                ...state,
                desserts: state.desserts.filter(item => {
                  return item.key !== state.selectedItem.key;
                }),
                selectedItem: null
              };
            case DESSERT.SELECT:
              selectItem = state.desserts.find(item => {
                return item.key === action.key;
              })
              selectedItem = {
                ...selectItem,
                counter: selectItem.counter + 1
              }
              return {
                selectedItem: selectedItem,
                desserts: state.desserts.map(item => {
                  if(item.key!== selectItem.key){
                    return item
                  } else{
                      return selectedItem
                    }
                  })
              };
            case DESSERT.DESELECT:
              return {
                ...state,
                selectedItem: null
              };
            case DESSERT.UPDATE:
              return{
                selectedItem: null,
                desserts: state.desserts.map(item => {
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
            case DESSERT.LOAD:
              return {
                desserts: action.objekt,
                selectedItem: null
              }
            case DESSERT.RESET:
              return {
                desserts: [],
                selectedItem: null
              }
            default:
              return state;
          }
  };
  
  export default dessertsReducer;