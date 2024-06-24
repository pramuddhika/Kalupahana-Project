import { useEffect, useState } from 'react';
import { fetchBookingDetails } from '../api/Shop-Booking';

const BookingReserved = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const getBookingDetails = async () => {
      try {
        const data = await fetchBookingDetails();
        setDetails(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    getBookingDetails();
  }, []);

  return (
    <div className='mt-6 ml-3'>
      <table className="w-10/12 mx-auto font-inter">
        <thead>
          <tr className="bg-text-primary text-white h-20">
            <th className="w-1/12 border-2 border-black">Vehicle Number</th>
            <th className="w-1/12 border-2 border-black">Contact Number</th>
            <th className="w-1/12 border-2 border-black">Reserved Date</th>
            <th className="w-4/12 border-2 border-black text-left pl-2">Vehicle Fault</th>
          </tr>
        </thead>
        <tbody>
          {details == null || details.length === 0 ? (
            <tr className="bg-gray-300">
              <td colSpan="6" className="text-center border-2 border-black py-2 text-text-primary font-medium">
                No data to display
              </td>
            </tr>
          ) : (
            details.map((bookingDetails, index) => (
              <tr key={index} className="bg-gray-300 pl-1 text-text-primary font-medium">
                <td className="border-2 border-black text-center py-3">{bookingDetails.vehicleNumber}</td>
                <td className="border-2 border-black text-center py-3">{bookingDetails.contactNumber}</td>
                <td className="border-2 border-black text-center py-3">{bookingDetails.reservedDate}</td>
                <td className="border-2 border-black pl-2 py-3">{bookingDetails.vehicleFault}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingReserved;
