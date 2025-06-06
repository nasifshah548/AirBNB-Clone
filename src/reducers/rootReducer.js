import { combineReducers } from "redux";
import authReducer from "./authReducer";
import siteModal from "./siteModal";

// The Store

const rootReducer = combineReducers({
  auth: authReducer,
  siteModal: siteModal,
});

export default rootReducer;
