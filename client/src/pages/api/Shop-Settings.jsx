import axios from "axios";

const API_URL = '/api/settings';

// get setting data 
export const getSettings = async () => {
  try{
    const res = await axios.get(`${API_URL}/getsettings`);
    return res.data;
  }catch (err) {
    console.error('Error fetching settings', err);
    throw err;
  }
};

// gete mechanic specialistAres
export const getSpecialistAreaList = async () => {
    try{
      const res = await axios.get(`${API_URL}/getlist`);
      return res.data;
    }catch (err) {
      console.error('Error fetching ares', err);
      throw err;
    }
};

// get upcoming holidays
export const getHolidays = async () => {
    try{
      const res = await axios.get(`${API_URL}/getholidays`);
      return res.data;
    }catch (err) {
      console.error('Error fetching dates', err);
      throw err;
    }
};

// update space allocation changes
export const updateSpaces = async (totalSpace, bookingSpace) => {
    try {
      const res = await axios.put(`${API_URL}/updatespaces`, { totalSpace, bookingSpace });
      return res.data;
    } catch (err) {
      console.error('Error updating data:', err);
      throw err;
    }
};

// update nextDay comming vehicle count notification time
export const updateNextDayTime = async (nextdayTime) => {
  try {
    const res = await axios.put(`${API_URL}/updatenextdaytime`, { nextdayTime });
    return res;
  } catch (err) {
    console.error('Error updating data:', err);
    throw err;
  }
};


// update today comming past record disply notification time
export const updateRecordTime = async (recordsTime) => {
  try {
    const res = await axios.put(`${API_URL}/recordcheck`, { recordsTime });
    return res;
  } catch (err) {
    console.error('Error updating data:', err);
    throw err;
  }
};

// add holidays
export const addHoliday = async (date) => {
  try {
    const res = await axios.post(`${API_URL}/addholidays`, {date});
    return res.data;
  } catch (err) {
    console.error('Error adding holidays', err);
    throw err;
  }
};

// delete holidays from db
export const deleteHoliday = async (deletedate) => {
  try {
    const res = await axios.delete(`${API_URL}/deleteholidays/${deletedate}`);
    return res.data;
  } catch (err) {
    console.error('Error deleting holidays', err);
    throw err;
  }
};

// add new mechanic specialist area
export const addSpecialistArea = async (speciallistArea) => {
  try {
    const res = await axios.post(`${API_URL}/Addspecialistarea`, {speciallistArea});
    return res.data;
  } catch (err) {
    console.error('Error adding speci.areas', err);
    throw err;
  }
};

// delete mechanic specialist area
export const deleteSpecialistArea = async (deleteArea) => {
  try {
    const res = await axios.delete(`${API_URL}/deletearea/${deleteArea}`);
    return res.data;
  } catch (err) {
    console.error('Error deleting speci.area', err);
    throw err;
  }
};
