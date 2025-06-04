import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Spinner from "./utility/Spinner/Spinner";

// Redux Setup
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
import reduxPromise from "redux-promise";

// Redux Persist Setup
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for Web
import { PersistGate } from "redux-persist/integration/react";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: root,
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["sitemodal"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const theStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxPromise),
})(persistedReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(theStore);

root.render(
  <Provider store={theStore}>
    <PersistGate loading={Spinner} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
