import axios from 'axios';

// Fetch number of bookings
export const fetchNumberOfBooking = async () => {
  try {
    const res = await axios.get("/api/dashboard/numbook");
    return res.data.count;
  } catch (err) {
    console.error('Error fetching number of bookings:', err);
    throw err;
  }
};

// Fetch ongoing job number
export const fetchOngoingJobNumber = async () => {
  try {
    const res = await axios.get("/api/dashboard/jobNumber");
    return res.data.jobs;
  } catch (err) {
    console.error('Error fetching ongoing job number:', err);
    throw err;
  }
};

// Fetch number of free blocks
export const fetchNumberOfFreeBlocks = async () => {
  try {
    const res = await axios.get("/api/dashboard/freeBlocks");
    return res.data.blocks;
  } catch (err) {
    console.error('Error fetching number of free blocks:', err);
    throw err;
  }
};
