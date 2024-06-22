import axios from 'axios';

const API_BASE_URL = '/api/summary';

export const fetchVehicleBrands = async () => {
  const response = await axios.get(`${API_BASE_URL}/vehicleBrands`);
  return response.data.vehicleBrands;
};

export const fetchVehicleFuelTypes = async () => {
  const response = await axios.get(`${API_BASE_URL}/vehiclegroups`);
  return response.data.vehicleFuleType;
};

export const fetchHolidays = async () => {
  const response = await axios.get(`${API_BASE_URL}/getHolidays`);
  return response.data.completeJobs;
};

export const fetchDates = async () => {
  const response = await axios.get(`${API_BASE_URL}/dates`);
  return response.data;
};

export const fetchMechNote = async () => {
  const response = await axios.get(`${API_BASE_URL}/mechanicsNotes`);
  return response.data.mechanicNotes;
};

export const fetchActiveDays = async () => {
  const response = await axios.get(`${API_BASE_URL}/getJobdates`);
  return response.data.jobDetails;
};

export const fetchMechanicData = async () => {
  const response = await axios.get(`${API_BASE_URL}/detailEmployee`);
  return response.data.employeeCount;
};

export const fetchCompleteJobs = async () => {
  const response = await axios.get(`${API_BASE_URL}/completeJobs`);
  return response.data.completeJobs[0];
};

export const fetchMechanicNumber = async () => {
  const response = await axios.get(`${API_BASE_URL}/employeeCount`);
  return response.data.employeeCount;
};
