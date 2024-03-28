import { createSlice } from '@reduxjs/toolkit';
import { loginUser, fetchUserData, logoutUser } from './userActions';

const initialState = {
  userId: null,
  userData: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
      state.isAuthenticated = true;
    },
    fetchUserDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserDataSuccess(state, action) {
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
    },
    fetchUserDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.userId = null;
      state.userData = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userId = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userId = null;
        state.userData = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userId = null;
        state.error = action.payload; 
      });
  },
});

export const {
  setUserId,
  fetchUserDataStart,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
