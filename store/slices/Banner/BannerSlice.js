import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banners: [],
};

export const BannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    setBanners: (state, action) => {
      state.banners = action.payload.banners ?? state.banners;
    },
  },
});

export const { setBanners } = BannerSlice.actions;

export default BannerSlice.reducer;
