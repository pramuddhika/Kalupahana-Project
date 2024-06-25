import axios from 'axios';

const API_URL = '/api/mechanic';

// get mechanic Id
export const fetchEmployeeId = async () => {
  try {
    const res = await axios.get(`${API_URL}/generateEmployeeId`);
    return res.data.EmployeeId;
  } catch (err) {
    console.error('Error fetching employee ID:', err);
    throw err;
  }
};

// add mechanic to db
export const addMechanic = async (mechanicData) => {
  try {
    const res = await axios.post(`${API_URL}/addmechanic`, mechanicData);
    return res.data;
  } catch (err) {
    console.error('Error adding mechanic:', err);
    throw err;
  }
};
