import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import mailSlice from "./mailSlice";


const rootReducer = combineReducers({
  auth: authSlice.reducer,
  mail: mailSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;


