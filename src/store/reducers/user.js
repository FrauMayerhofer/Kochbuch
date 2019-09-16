const logIn = (userId, email, password) => {
  return {
      type: "LOGIN",
      userId: userId,
      email: email,
      password: password
  };
};

const update = (email, password) => {
  return {
      type: "UPDATE",
      email: email,
      password: password
  };
};

export const reset = () => {
  return {
      type: "RESET"
  };
};

const speedLogin = (status) => {
  return {
      type: "ONLINE",
      speedLogin: status
  };
};

const initialState = {
    userId: null,
    speedLogin: true,
    email: "",
    password: ""
}

const reducer = ( state = initialState, action) => {
    switch(action.type){
          case "LOGIN":
            return {
              ...state,
              userId: action.userId,
              email: action.email,
              password: action.password
            };
          case "UPDATE":
            return {
              ...state,
              email: action.email,
              passwort: action.passwort
            };
          case "RESET":
            return {
              userId: null,
              speedLogin: false,
              email: "",
              password: ""
            };
          case "ONLINE":
            return {
              ...state,
              speedLogin: action.speedLogin
            };
          default:
            return state;
        }
};

export default reducer;