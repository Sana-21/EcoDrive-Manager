import axios from 'axios';

export const apiLogin = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3001/api/manager/login', { email, password });
    if (response.status === 200) {
      return response.data.userId;
    }
    throw new Error('Login failed');
  } catch (error) {
    throw error;
  }
};

export const apiFetchUserData= async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/manager/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiLogout = async () => {
  try {
    // Perform logout actions (e.g., clear local storage, invalidate session)
    // Optionally, make an API call to the server to logout
  } catch (error) {
    throw error;
  }
};
