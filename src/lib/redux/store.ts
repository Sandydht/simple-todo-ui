import { configureStore } from "@reduxjs/toolkit";
import snackbarSlice from './features/snackbarSlice';
import authenticationSlice from "./features/authenticationSlice";

export const store = configureStore({
  reducer: {
    snackbar: snackbarSlice,
    authentication: authenticationSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch