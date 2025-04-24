import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { configureStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import reduxPromise from "redux-promise";

const theStore = applyMiddleware(reduxPromise)(configureStore)(rootReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={theStore}>
    <App />
  </Provider>
);
