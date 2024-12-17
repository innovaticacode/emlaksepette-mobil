// userSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { apiRequestGetWithBearer } from '../../components/methods/apiRequest';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;

// Thunk function for fetching user
export const fetchUser = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await apiRequestGetWithBearer('current_user');
    dispatch(setUser(response.data));  // User verisini reduxa kaydediyoruz
  } catch (error) {
    dispatch(setError(error.toString()));
  }
};

export default userSlice.reducer;
