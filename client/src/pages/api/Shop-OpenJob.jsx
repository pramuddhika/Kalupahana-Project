import axios from 'axios';

const API_URL = '/api/openjob';

// check if a vehicle has an ongoing job
export const checkVehicleOngoingJob = async (vehicleNumber) => {
    try {
      const response = await axios.get(`${API_URL}/checkVehicleReopeningJob/${vehicleNumber}`);
      return response.data.message;
    } catch (err) {
      console.error('Error checking vehicle ongoing job', err);
      throw err;
    }
};