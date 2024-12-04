import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import NotificationsSlice from "./slices/Notifications/NotificationsSlice";
import MenuSlice from "./slices/Menu/MenuSlice";
import FavoritesSlice from "./slices/Favorites/FavoritesSlice";
import SummarySlice from "./slices/Summary/Summary";
import FilterProjectSlice from "./slices/FilterProject/FilterProjectSlice";
import BasketSlice from "./slices/Basket/BasketSlice";

import UserSlice, { fetchUser } from "./user/UserSlice";
import { thunk } from "redux-thunk";

const userAutoFetchMiddleware = (storeAPI) => (next) => (action) => {
  console.log(storeAPI);
  const result = next(action);
  const state = storeAPI.getState();

  // Eğer user verisi boş ise fetchUserData thunk'ını çalıştır
  if (!state.user.user && state.user.status != "loading") {
    fetchUser();
  }

  return result;
};

export const store = configureStore({
  reducer: {
    notifications: NotificationsSlice,
    user: UserSlice,
    menu: MenuSlice,
    summary: SummarySlice,
    favorites: FavoritesSlice,
    mapFilters: FilterProjectSlice,
    basket: BasketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAutoFetchMiddleware, thunk),
});

store.subscribe(() => {
  const state = store.getState();

  // Eğer store'da herhangi bir değişiklik varsa, kullanıcı verilerini çekmek için dispatch yap
  if (!state.user.user && state.user.status === "idle") {
    store.dispatch(fetchUser());
  }
});
