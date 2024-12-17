import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiRequestGetWithBearer } from "../components/methods/apiRequest"
import { endpoints } from "./apiServices"
import { setUser } from "../store/user/UserSlice";

export const getCurrentUser = createAsyncThunk("user/getCurrentUser", async (_, { dispatch }) => {
    try {
      const response = await apiRequestGetWithBearer(endpoints.CURRENT_USER);
      
      if (response && response.data) {
        // Başarılı response'dan sonra veriyi dispatch et
        dispatch(setUser(response.data)); // Burada user verisini Redux'a kaydediyoruz.
      }

      return response;
      
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
});
