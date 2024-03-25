// userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogin, apiFetchUserData, apiLogout } from '../api/userApi';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const { userId } = await apiLogin(email, password);
    return userId;
  }
);

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId) => {
    return await apiFetchUserData(userId);
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await apiLogout();
});
