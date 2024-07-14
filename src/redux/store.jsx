import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import {combineReducers} from "redux"; 
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


import userReducer from "./Reducer/userReducer";
import cartReducer from "./Reducer/cartReducer";
import favoriteReducer from "./Reducer/favoriteReducer";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const reducers = combineReducers({
    user : userReducer,
    cart : cartReducer,  
    favoriteProducts : favoriteReducer       
});

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export default store;
