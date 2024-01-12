import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth/Auth";
import profileReducer from "./Profile/Profile";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
