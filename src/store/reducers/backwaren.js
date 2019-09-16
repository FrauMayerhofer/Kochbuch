import {
    BACKWARE,
  } from "../actions/actionTypes";

  const initialState = {
      backwaren: [],
      selectedItem: null
  }
  
  const backwarenReducer = ( state = initialState, action) => {
      switch(action.type){
            case BACKWARE.ADD:
              return {
                ...state,
                backwaren: state.backwaren.concat({
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
            case BACKWARE.DELETE:
              return {
                ...state,
                backwaren: state.backwaren.filter(item => {
                  return item.key !== state.selectedItem.key;
                }),
                selectedItem: null
              };
            case BACKWARE.SELECT:
              selectItem = state.backwaren.find(item => {
                return item.key === action.key;
              })
              selectedItem = {
                ...selectItem,
                counter: selectItem.counter + 1
              }
              return {
                selectedItem: selectedItem,
                backwaren: state.backwaren.map(item => {
                  if(item.key!== selectItem.key){
                    return item
                  } else{
                      return selectedItem
                    }
                  })
              };
            case BACKWARE.DESELECT:
              return {
                ...state,
                selectedItem: null
              };
            case BACKWARE.UPDATE:
                return{
                  selectedItem: null,
                  backwaren: state.backwaren.map(item => {
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
           case BACKWARE.LOAD:
            return {
              backwaren: action.objekt,
              selectedItem: null
            }
           case BACKWARE.RESET:
              return {
                backwaren: [],
                selectedItem: null
              }
            default:
              return state;
          }
  };
  
  export default backwarenReducer;