import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    userProfileData: {
      id: null,
      username: null,
      image_url: null
    }
  },
  reducers: {
    setUserProfileData: (state, actions) => {
      state.userProfileData.id = actions.payload.id;
      state.userProfileData.username = actions.payload.username;
      state.userProfileData.image_url = actions.payload.image_url;
    },
    resetUserProfileData: (state) => {
      state.userProfileData.id = null;
      state.userProfileData.username = null;
      state.userProfileData.image_url = null;
    }
  },
  selectors: {
    userProfileData: (state) => state.userProfileData
  }
})

export const {
  setUserProfileData,
  resetUserProfileData
} = authenticationSlice.actions;

export const {
  userProfileData
} = authenticationSlice.selectors;

export default authenticationSlice.reducer
