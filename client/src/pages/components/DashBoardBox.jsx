import { useEffect,useState } from "react";
import axios from 'axios';

const DashBoardBox = () => {

    const [numBooks, setNumBooks] = useState(null);

    useEffect( ()=> {
        const fetchNumberOfBooking = async () => {
           try{
            const res = await axios.get("http://localhost:8000/api/dashboard/numbook")
            setNumBooks(res.data.count);
           }catch(err){
            console.log('Error fetching data:', err);
           }
        }
        fetchNumberOfBooking()
    },[])

    return (
        <div className="flex gap-16 justify-center my-6 font-inter">

            <div className="box-content h-36 w-80 bg-yellow-100 rounded-3xl">
              <p className="text-4xl font-bold text-yellow-600 pl-4 pt-6 italic">Ongoing Jobs</p>
            </div>

            <div className="box-content h-36 w-80 bg-emerald-100 rounded-3xl">
              <p className="text-4xl font-bold text-emerald-900 pl-4 pt-6 italic">Reserved by</p>
                {numBooks !== null && 
                <p className="flex justify-end pr-5 text-6xl italic font-bold text-emerald-800 pb-6 ">{numBooks}</p>}
            </div>

            <div className="box-content h-36 w-80 bg-red-200 rounded-3xl">
              <p className="text-4xl font-bold text-red-600 pl-4 pt-6 italic">Free Blocks</p>
            </div>

        </div>
    );
};

export default DashBoardBox;