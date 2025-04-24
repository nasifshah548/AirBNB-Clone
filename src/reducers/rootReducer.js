import { combineReducers } from "redux";
import authReducer from "./authReducer";

// The Store

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
