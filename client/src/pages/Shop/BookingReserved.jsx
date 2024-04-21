import axios from "axios";
import { useEffect, useState } from "react";


const BookingReserved = () => {

    const [details, setDetails] = useState(null);

    useEffect( () => {
        const fetchBookingDetails = async () => {
            try{
                const res = await axios.get("http://localhost:8000/api/booking/showbooking")
                setDetails(res.data);
            }catch(err){
                console.log('Error fetching data:' ,err);
            }
        }
        fetchBookingDetails()
    },[])

    return (
        <div className='mt-6 ml-3'>
            
            <table className="w-10/12 mx-auto font-inter">
                <tr className="bg-text-primary text-white h-20">
                    <th className="w-1/12 border-2">Vehicle Number</th>
                    <th className="w-1/12 border-2">Contact Number</th>
                    <th className="w-1/12 border-2">Reserved Date</th>
                    <th className="w-4/12 border-2 text-left pl-2">Message</th>
                </tr>

                {details == null || details.length === 0 ? (
                 <tr className="bg-gray-300">
                     <td colSpan="6" className="text-center border-2 py-2">No data to display</td>
                 </tr>
               ) : (
                details && details.map((bookingDetails, index) => (
                 <tr key={index} className="bg-gray-300 pl-1">
                      <td className="border-2 text-center py-3">{bookingDetails.vehicleNumber}</td>
                      <td className="border-2 text-center py-3">{bookingDetails.contactNumber}</td>
                      <td className="border-2 text-center py-3">{bookingDetails.date}</td>
                      <td className="border-2 pl-2 py-3">{bookingDetails.message}</td>
                 </tr>
               )) )}

            </table>
            
        </div>
    );
};

export default BookingReserved;