import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShoppingProfile: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setShoppingProfile: (state, action) => {
      state.isShoppingProfile = action.payload.isShoppingProfile;
    },
  },
});

export const { setShoppingProfile } = menuSlice.actions;

export default menuSlice.reducer;
