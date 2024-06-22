import axios from 'axios';

const API_URL = '/api/booking';

// get next dates for booking
export const getNextDates = async () => {
    try {
      const response = await axios.get(`${API_URL}/nextdates`);
      return response.data.dates;
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
  