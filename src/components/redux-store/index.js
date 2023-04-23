import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";


const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;


