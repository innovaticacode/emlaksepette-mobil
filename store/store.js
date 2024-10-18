import { configureStore } from "@reduxjs/toolkit";
import NotificationsSlice from "./slices/Notifications/NotificationsSlice";
import MenuSlice from "./slices/Menu/MenuSlice";

export const store = configureStore({
  reducer: {
    notifications: NotificationsSlice,
    menu: MenuSlice,
  },
});
