import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basketItem: null,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasketItem: (state, action) => {
      state.basketItem = action.payload.basketItem;
    },
  },
});

export const { setBasketItem } = basketSlice.actions;

export default basketSlice.reducer;
