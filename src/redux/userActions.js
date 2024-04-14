// userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogin, apiFetchUserData, apiLogout } from '../api/userApi';
import { setUserId } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userId = await apiLogin(email, password);
      console.log("action");
      console.log(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data.message); 
    }
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
