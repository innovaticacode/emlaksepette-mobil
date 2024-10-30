import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataSummary: [],
    
    
};

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    setdataSummary: (state, action) => {
        state.dataSummary =
          action.payload.dataSummary ?? state.dataSummary;
      },
  },

});

export const {setdataSummary} = summarySlice.actions;

export default summarySlice.reducer;
