import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import { apiUrl } from "../../../components/methods/apiRequest";

const initialState = {
  favorites: [],
  status: "idle", // loading, fulfilled, failed can be used types
  error: null,
};

export const getFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    try {
      let userToken = undefined;
      await getValueFor("user", (value) => {
        userToken = value?.access_token;
      });
      const response = await axios.get(`${apiUrl}favorites`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("error asynch thunk => ", error);
      throw new Error(error.response?.data?.message || "Bir hata oluştu");
    }
  }
);

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload.mergedFavorites;
      state.status = "fulfilled";
      state.error = null;
    });

    builder.addCase(getFavorites.rejected, (state, action) => {
      state.favorites = [];
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(getFavorites.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
  },
});

export const {} = favoritesSlice.actions;

export default favoritesSlice.reducer;
