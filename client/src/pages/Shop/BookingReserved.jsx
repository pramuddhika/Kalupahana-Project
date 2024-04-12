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
                    <th className="w-2/12 border-2">customer Name</th>
                    <th className="w-1/12 border-2">Contact Number</th>
                    <th className="w-1/12 border-2">Vehicle Category</th>
                    <th className="w-1/12 border-2">Reserved Date</th>
                    <th className="w-4/12 border-2 text-left pl-2">Message</th>
                </tr>

                {details && details.map((detail, index) => (
                <tr key={index} className="bg-gray-300 pl-1">
                   <td className="border-2 text-center">{detail.vehicleNumber}</td>
                   <td className="border-2 pl-1">{detail.customerName}</td>
                   <td className="border-2 text-center">{detail.contactNumber}</td>
                   <td className="border-2 text-center">{detail.vehicleCategory}</td>
                   <td className="border-2">{detail.date}</td>
                   <td className="border-2 pl-2">{detail.message}</td>
                </tr> ))}
            </table>
            
        </div>
    );
};

export default BookingReserved;