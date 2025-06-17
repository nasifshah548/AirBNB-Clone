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
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root", // ✅ FIXED: should be a string, not a variable
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["sitemodal"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const theStore = configureStore({
  reducer: persistedReducer, // ✅ FIXED: apply the persistedReducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(reduxPromise),
});

// ✅ Make sure this comes *after* the persist setup
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
const persistor = persistStore(theStore);

root.render(
  <Provider store={theStore}>
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
