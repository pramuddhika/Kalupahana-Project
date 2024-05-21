import DashBoardBox from "../components/DashBoardBox";
import axios from "axios";
import { useEffect, useState } from "react";


const BookingDashboard = () => {

    const [details, setDetails] = useState(null);

    useEffect( () => {
        const fetchBookingDetails = async () => {
            try{
                const res = await axios.get("/api/booking/today")
                setDetails(res.data);
            }catch(err){
                console.log('Error fetching data:' ,err);
            }
        }
        fetchBookingDetails()
    },[])

    return (
        <div className="mt-6 ml-3">

         <DashBoardBox/>

         <p className="font-inter">Here is today&apos;s reserved list,</p>


         <table className="w-10/12 mx-auto font-inter mt-4">
                <tr className="bg-text-primary text-white h-16">
                    <th className="w-1/12 border-2 border-black">Vehicle Number</th>
                    <th className="w-1/12 border-2 border-black">Contact Number</th>
                    <th className="w-1/12 border-2 border-black">Reserved Date</th>
                    <th className="w-4/12 border-2 border-black text-left pl-2">vehicle Fault</th>
                </tr>

                {details == null || details.length === 0 ? (
                 <tr className="bg-gray-300">
                     <td colSpan="6" className="text-center border-2 border-black py-2 text-text-primary font-medium">
                        No data to display
                     </td>
                 </tr>
               ) : (
                details && details.map((bookingDetails, index) => (
                 <tr key={index} className="bg-gray-300 pl-1 text-center mainStyle">
                      <td className="border-2 border-black py-3">{bookingDetails.vehicleNumber}</td>
                      <td className="border-2 border-black py-3">{bookingDetails.contactNumber}</td>
                      <td className="border-2 border-black py-3">{bookingDetails.reservedDate}</td>
                      <td className="border-2 border-black text-start pl-2 py-3">{bookingDetails.vehicleFault}</td>
                 </tr>
               )) )}

            </table>
      </div>
    );
};

export default BookingDashboard;