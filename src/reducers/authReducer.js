const initialState = {};

const authReducer = (state = initialState, action) => {
  if (action.type === "REGISTER ACTION") {
    return action.payload;
  } else if (action.type === "LOGOUT") {
    return initialState; // This will destroy the auth token which will log out the user
  } else {
    return state;
  }
};

export default authReducer;
