import { useEffect,useState } from "react";
import axios from 'axios';

const DashBoardBox = () => {

  const [numBooks, setNumBooks] = useState(null);
  const [onGoingJobs, setInGoingJobs] = useState(null);
  const [freeBlocks,setFreeBlocks] = useState(null);

  //fetch booking number
  const fetchNumberOfBooking = async () => {
    try{
      const res = await axios.get("/api/dashboard/numbook")
      setNumBooks(res.data.count);
    }catch(err){
      console.log('Error fetching data:', err);
    }
  }

  //fetch ongoing job number
  const fetchOngoingJobNumber = async () => {
    try{
     const res = await axios.get("/api/dashboard/jobNumber")
     setInGoingJobs(res.data.jobs);
    }catch(err){
     console.log('Error fetching data:', err);
    }
  }

  //fetch number of free blocks
  const fetchNumberOfFreeBlocks = async () => {
    try{
     const res = await axios.get("/api/dashboard/freeBlocks")
     setFreeBlocks(res.data.blocks);
    }catch(err){
     console.log('Error fetching data:', err);
    }
  }

    useEffect( ()=> {
        fetchNumberOfBooking()
        fetchOngoingJobNumber()
        fetchNumberOfFreeBlocks()
    },[])

    return (
        <div className="flex gap-16 justify-center my-6 font-inter">

            <div className="box-content h-36 w-80 bg-yellow-100 rounded-3xl">
              <p className="text-4xl font-bold text-yellow-600 pl-4 pt-6 italic">Ongoing Jobs</p>
              {numBooks !== null && 
                <p className="flex justify-end pr-5 text-6xl italic font-bold text-yellow-600 pb-6 ">{onGoingJobs}</p>}
            </div>

            <div className="box-content h-36 w-80 bg-emerald-100 rounded-3xl">
              <p className="text-4xl font-bold text-emerald-900 pl-4 pt-6 italic">Reserved by</p>
                {numBooks !== null && 
                <p className="flex justify-end pr-5 text-6xl italic font-bold text-emerald-800 pb-6 ">{numBooks}</p>}
            </div>

            <div className="box-content h-36 w-80 bg-red-200 rounded-3xl">
              <p className="text-4xl font-bold text-red-600 pl-4 pt-6 italic">Free Blocks</p>
              {numBooks !== null && 
                <p className="flex justify-end pr-5 text-6xl italic font-bold text-red-600 pb-6 ">{freeBlocks}</p>}
            </div>

        </div>
    );
};

export default DashBoardBox;