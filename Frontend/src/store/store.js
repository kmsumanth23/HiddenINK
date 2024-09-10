import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import storage from "redux-persist/lib/storage";
//slices
import tokenSlice from "../slice/token_slice.js";

//saveUserOnlyFilter
const saveTokenOnlyFilter = createFilter("token", ["token"])

//persist config
const persistConfig = {
  key: "token",
  storage,
  whitelist: ["token"],
  transforms: [saveTokenOnlyFilter],
};

const rootReducer = combineReducers({
  token: tokenSlice
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
