import axios from 'axios';

export const apiLogin = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3001/api/manager/login', { email, password });
    console.log("login");
    console.log(response.data.userId);
    return response.data.userId;
  } catch (error) {
    throw error;
  }
};

export const apiFetchUserData= async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/manager/${userId}`);

    console.log("fetch");
    console.log(response.data);
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
