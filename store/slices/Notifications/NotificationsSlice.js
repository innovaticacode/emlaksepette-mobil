import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationsCount: 0,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotificationsRedux: (state, action) => {
      state.notificationsCount =
        action.payload.notificationsCount ?? state.notificationsCount;
    },
  },
});

export const { setNotificationsRedux } = notificationsSlice.actions;

export default notificationsSlice.reducer;
