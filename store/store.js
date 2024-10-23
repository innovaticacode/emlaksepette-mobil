import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import NotificationsSlice from "./slices/Notifications/NotificationsSlice";
import MenuSlice from "./slices/Menu/MenuSlice";
import SummarySlice from "./slices/Summary/Summary";



export const store = configureStore({
  reducer: {
    notifications: NotificationsSlice,
    menu: MenuSlice,
    summary: SummarySlice,
  },
});
