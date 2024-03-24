import { configureStore } from "@reduxjs/toolkit";
import floaterNotificationReducer from "./reducers/floater-notification.reducer";
import userReducer from "./reducers/user.reducer";

export const store = configureStore({
  reducer: {
    floaterNotification: floaterNotificationReducer,
    users: userReducer
  }
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;