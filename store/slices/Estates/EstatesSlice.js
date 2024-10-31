import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../../components/methods/apiRequest";
import axios from "axios";
import { getValueFor } from "../../../components/methods/user";

const initialState = {
  estates: null,
  status: "idle", // loading, fulfilled, failed can be used types
  error: null,
};

export const getEstates = createAsyncThunk(
  "estates/fetchEstates",
  async ({ reset = false, page = 1 }) => {
    let userToken = undefined;
    await getValueFor("user", (value) => {
      userToken = value?.access_token;
    });
    const PAGE_SIZE = 10;

    try {
      const response = await axios.get(
        `${apiUrl}real-estates?page=${reset ? 1 : page}&limit=${PAGE_SIZE}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          timeout: 5000,
        }
      );
      const newEstates = Object.values(response.data);
      return {
        estates: newEstates,
        reset,
      };
    } catch (error) {
      console.error("error asynch thunk => ", error);
      throw new Error(error.response?.data?.message || "Bir hata oluştu");
    }
  }
);

export const estatesSlice = createSlice({
  name: "estates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEstates.fulfilled, (state, action) => {
      state.estates = action.payload.estates;
      state.status = "fulfilled";
      state.error = null;
    });

    builder.addCase(getEstates.rejected, (state, action) => {
      state.estates = null;
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(getEstates.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
  },
});

export const {} = estatesSlice.actions;

export default estatesSlice.reducer;
