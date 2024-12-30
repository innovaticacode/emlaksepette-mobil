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
    clearBasketItem: (state) => {
      state.basketItem = null;
    },
  },
});

export const { setBasketItem, clearBasketItem } = basketSlice.actions;

export default basketSlice.reducer;
