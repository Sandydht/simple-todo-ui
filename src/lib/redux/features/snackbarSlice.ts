import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    show: false,
    type: '',
    message: ''
  },  
  reducers: {
    showSnackbar: (state, action) => {
      state.show = true;
      state.type = action.payload.type;
      state.message = typeof action.payload.message == 'string' ? action.payload.message : 'Unexpected error occurred';
    },
    hideSnackbar: (state) => {
      state.show = false;
      state.type = '';
      state.message = '';
    }
  },
  selectors: {
    snackbarData: (state) => state
  }
})

export const {
  showSnackbar,
  hideSnackbar
} = snackbarSlice.actions;

export const {
  snackbarData
} = snackbarSlice.selectors;

export default snackbarSlice.reducer;
