import axios from 'axios';

const API_URL = '/api/booking';

// get next dates for booking
export const getNextDates = async () => {
  try {
    const res = await axios.get(`${API_URL}/nextdates`);
    return res.data.dates;
  } catch (err) {
    console.error('Error fetching dates', err);
    throw err;
  }
};

// add a new booking
export const addBooking = async (booking) => {
  try {
    await axios.post(`${API_URL}/add`, booking);
  } catch (err) {
    console.error('Error adding booking', err);
    throw err;
  }
};

// Function to check booking availability
export const checkBookingAvailability = async () => {
  try {
    const res = await axios.get(`${API_URL}/allowe`);
    return res.data;
  } catch (err) {
    console.error('Error adding booking', err);
    throw err;
  }
};

// get today recervation list
export const fetchTodayBookingDetails = async () => {
  try {
    const res = await axios.get(`${API_URL}/today`);
    return res.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err;
  }
};

// get all recervatio data
export const fetchBookingDetails = async () => {
  try {
    const res = await axios.get(`${API_URL}/showbooking`);
    return res.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err;
  }
};

// checking booking vehicle
export const checkBookingDetails = async (searchNumber) => {
  try {
    const res = await axios.get(`${API_URL}/checking/${searchNumber}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching booking details:', err);
    throw err;
  }
};

// cancel booking
export const cancelBooking = async (vehicleNumber) => {
  try {
    await axios.put(`${API_URL}/cancel`, { vehicleNumber });
  } catch (err) {
    console.error('Error canceling booking:', err);
    throw err;
  }
};

// change booking date
export const changeBookingDate = async (reservedDate, vehicleNumber) => {
  try {
    const res = await axios.put(`${API_URL}/changedate`, { reservedDate, vehicleNumber });
    return res;
  } catch (err) {
    console.error('Error changing booking date:', err);
    throw err;
  }
};
  