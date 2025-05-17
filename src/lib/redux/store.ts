import { configureStore } from "@reduxjs/toolkit";
import snackbarSlice from './features/snackbarSlice';
import authenticationSlice from "./features/authenticationSlice";
import modalBoxSlice from './features/modalBoxSlice';

export const store = configureStore({
  reducer: {
    snackbar: snackbarSlice,
    authentication: authenticationSlice,
    modalBox: modalBoxSlice
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['modalBox/showConfirmationModalBox', 'modalBox/hideConfirmationModalBox'],
        ignoreState: true
      }
    });
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch