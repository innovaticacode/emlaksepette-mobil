import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import NotificationsSlice from "./slices/Notifications/NotificationsSlice";
import MenuSlice from "./slices/Menu/MenuSlice";
import FavoritesSlice from "./slices/Favorites/FavoritesSlice";
import SummarySlice from "./slices/Summary/Summary";
import FilterProjectSlice from "./slices/FilterProject/FilterProjectSlice";
import BannerSlice from "./slices/Banner/BannerSlice";

export const store = configureStore({
  reducer: {
    notifications: NotificationsSlice,
    menu: MenuSlice,
    summary: SummarySlice,
    favorites: FavoritesSlice,
    mapFilters: FilterProjectSlice,
    banners: BannerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
