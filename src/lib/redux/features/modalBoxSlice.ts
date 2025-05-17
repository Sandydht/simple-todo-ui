import { createSlice } from "@reduxjs/toolkit";

const modalBoxSlice = createSlice({
  name: 'modalBox',
  initialState: {
    confirmationModalBox: {
      show: false,
      title: '',
      description: '',
      onCancel: null,
      onConfirm: null,
      isLoading: false
    }
  },
  reducers: {
    showConfirmationModalBox: (state, actions) => {
      state.confirmationModalBox.show = true;
      state.confirmationModalBox.title = actions.payload.title;
      state.confirmationModalBox.description = actions.payload.description;

      if (typeof actions.payload.onCancel == 'function') {
        state.confirmationModalBox.onCancel = actions.payload.onCancel;
      }

      if (typeof actions.payload.onConfirm == 'function') {
        state.confirmationModalBox.onConfirm = actions.payload.onConfirm;
      }
    },
    hideConfirmationModalBox: (state) => {
      state.confirmationModalBox.show = false;
      state.confirmationModalBox.title = '';
      state.confirmationModalBox.description = '';
      state.confirmationModalBox.onCancel = null;
      state.confirmationModalBox.onConfirm = null;
    },
    setConfirmationModalBoxLoading: (state, actions) => {
      state.confirmationModalBox.isLoading = actions.payload;
    }
  },
  selectors: {
    selectConfirmationModalBox: (state) => state.confirmationModalBox
  }
})

export const {
  showConfirmationModalBox,
  hideConfirmationModalBox,
  setConfirmationModalBoxLoading
} = modalBoxSlice.actions;

export const {
  selectConfirmationModalBox
} = modalBoxSlice.selectors;

export default modalBoxSlice.reducer;
