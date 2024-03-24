// actions.js
import axios from 'axios';
import { SET_MANAGER_ID, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAILURE } from './actionTypes';

export const setManagerId = (managerId) => ({
  type: SET_MANAGER_ID,
  payload: managerId,
});

export const fetchUserData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/api/manager/${userId}'); 
      const userData = response.data;
      dispatch({ type: FETCH_USER_DATA_SUCCESS, payload: userData });
    } catch (error) {
      dispatch({ type: FETCH_USER_DATA_FAILURE, payload: error.message });
    }
  };
};
