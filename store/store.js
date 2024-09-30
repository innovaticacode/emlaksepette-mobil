import { configureStore } from "@reduxjs/toolkit";
import NotificationsSlice from "./slices/Notifications/NotificationsSlice";

export const store = configureStore({
  reducer: {
    notifications: NotificationsSlice,
  },
});
