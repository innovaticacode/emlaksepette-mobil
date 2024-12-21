import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  realEstatesTypes: {},
};

export const realEstatesTypesSlice = createSlice({
  name: "realEstatesTypes",
  initialState,
  reducers: {
    setTypes: (state, action) => {
      state.realEstatesTypes = action.payload.realEstatesTypes;
    },
  },
});

export const { setTypes } = realEstatesTypesSlice.actions;

export default realEstatesTypesSlice.reducer;
