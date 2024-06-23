import axios from 'axios';

const API_URL = '/api/auth';

// send log in data to server
export const login = async (userName, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { userName, password });
    return response.data;
  } catch (err) {
    console.error('Error adding booking', err);
    throw err;
  }
};