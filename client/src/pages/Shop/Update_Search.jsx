import { useState,useContext } from 'react';
import repair from '../assets/repair.svg'
import ShopHeader from '../components/ShopHeader';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { UpdateJobContext } from './UpdateJobContext';
import { validateVehicleNumber } from '../Validation/VehicleData';

const Update_Search = () => {
  
  const { setUpdateJobData } = useContext(UpdateJobContext);

  const [updateNumber,setUpdateNumber] = useState(null);
  const navigate = useNavigate();
 
  const handleNumberSearch = async(e) => {
    e.preventDefault();

    //validate user inputs
    const vehicleErr = validateVehicleNumber(updateNumber);
    if(vehicleErr){
      toast.warning(vehicleErr);
      return;
    }
    
    try{
      const res = await axios.get(`/api/updatejob/checkJobs/${updateNumber}`);
      console.log(res.data.message);
      if(res.data.message === "No ongoing job!"){
        toast.warn(res.data.message);
        return;
      }else{
        setUpdateJobData(res.data.UpdateJobData);
        navigate("/shop/updateJob/menu");
      }
    }catch(err){
      console.log("Error geting update data:",err);
    }
  }

  return (
    <div>
      <ShopHeader pageName='Job Update'/>
      <div className="h-9 bg-side-nav-bg border-b-2"/>

      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

      <div className="flex mt-28">
        <div className='w-1/2'>
          <img src={repair} className='h-96 mx-auto mt-6'/>
        </div>
        <div className="w-1/2">
          <div className='flex items-center card gap-12 box-content w-2/3 h-32 mt-32'>
           <input type='text' value={updateNumber} placeholder='Enter vehicle number' 
           onChange={ (e)=> setUpdateNumber(e.target.value)}  className='rounded-lg p-2 ml-6 outline-none' />
           <button onClick={handleNumberSearch} className='bg-text-primary text-white px-6 py-2 rounded-lg'>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update_Search;