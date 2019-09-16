const addZutat = (zutaten) => {
    return {
        type: "ADD_ZUTAT",
        zutaten: zutaten
    };
  };

const addCart = (text) => {
  return {
      type: "ADD_CART",
      text: text
  };
  };
const deleteCart = (text) => {
    return {
        type: "DELETE_CART",
        text: text
    };
};
const deleteZutat = (key) => {
    return {
        type: "DELETE_ZUTAT",
        key: key
    };
  };

const checkZutat = (key) => {
    return{
      type: "CHECK_ZUTAT",
      key: key
    }
  }
 const loadEinkaufsliste = (objekt) => {
    return {
        type: "LOAD_EINKAUFSLISTE",
        objekt: objekt
    };
};

export const reset = () => {
    return {
        type: "RESET"
    };
};
 const initialState = {
      zutaten : []
  }
  
  const einkaufslistenReducer = ( state = initialState, action) => {
      switch(action.type){
            case "ADD_ZUTAT":
                zutaten = state.zutaten
                action.zutaten.map((item) => {
                    zutaten = zutaten.concat({
                        menge: item.menge,
                        zutat: item.zutat,
                        key: Math.random(),
                        checked: false
                      })
                })
              return {
                zutaten: zutaten
              };
            case "ADD_CART":
                return {
                  zutaten: state.zutaten.concat({
                    zutat: action.text,
                    menge: "",
                    key: Math.random(),
                    checked: false
                  })
                };
            case "DELETE_ZUTAT":
              return {
                zutaten: state.zutaten.filter(item => {
                    return item.key !== action.key;
                  }), 
              };
            case "CHECK_ZUTAT":
              return{
                zutaten: state.zutaten.map(item => {
                  if(item.key!== action.key){
                    return item
                  } else{
                      return {
                        menge: item.menge,
                        einheit: item.einheit,
                        zutat: item.zutat,
                        key: item.key,
                        checked: !item.checked
                      }
                    }
                  })
              }
            case "DELETE_CART":
              return{
                zutaten: []
              }
            case "LOAD_EINKAUFSLISTE":
              return{
                zutaten: action.objekt
              }
            case "RESET":
              return{
                zutaten: []
              }
            default:
              return state;
          }
  };
  
  export default einkaufslistenReducer;