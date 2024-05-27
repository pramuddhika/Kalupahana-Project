import ShopHeader from "../components/ShopHeader";
import deal from "../assets/deal.svg"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {validateVehicleNumber} from '../Validation/VehicleData.js';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OpenJobSearch = () => {

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const [jobOpenNumber,setJobOpenNumber] = useState("");

  const navigate = useNavigate();

  //handle openJob Search change
  const handleOpenJobSearch = (e) => {
    setJobOpenNumber(e.target.value);
  }

  //handle create profile for new vehices
  const handleCreateProfile = () => {
    const vehicleNumber = jobOpenNumber;
    const newOldVehicle = "notOld";
    navigate("/shop/openJob/details" , {state:{vehicleNumber,oldVehicle:newOldVehicle}});
  }

  const handleSearchClick = async (e) => {
    e.preventDefault();
    
    //validate vehicle number
    const vehicleNumberError = validateVehicleNumber(jobOpenNumber);
    if(vehicleNumberError){
      toast.warning(vehicleNumberError);
      return;
    }

    //check vehicle is online booked one or not 
    //change status when it's online booked vehicle
    try{
      const onlineBooking = await axios.put(`/api/openjob/checkbooking/`,{jobOpenNumber});
      toast.info(onlineBooking.data);
    }catch(err){
      toast.error(err.response.data);
    }

    //check vehicle is new to system
    try{
      const checkVehicle = await axios.get(`/api/openjob/checkRegisteredVehicle/${jobOpenNumber}`);
      
      if (checkVehicle.data === "NEW"){
        setIsSearchBarVisible(false);
        return;
      }else{
        const vehicleNumber = checkVehicle.data[0].vehicleNumber;
        const NICnumber = checkVehicle.data[0].NICnumber;
        const newOldVehicle = "old";
    
        setTimeout(() => {
          navigate("/shop/openJob/details" , {state: {vehicleNumber,NICnumber,oldVehicle:newOldVehicle}});
        }, 2500);
      }
    }catch(err){
      console.log(err);
    }
  };

  const searchBar = (
    <div className='flex items-center card gap-12 box-content w-2/3 h-32 mt-32'>
      <input type='text' placeholder='Enter vehicle number' className='rounded-lg p-2 ml-6 outline-none' 
      value={jobOpenNumber} onChange={handleOpenJobSearch}/>
      <button className='bg-text-primary text-white px-6 py-2 rounded-lg' onClick={handleSearchClick}>
       Search
      </button>
    </div>
  );

  const createNew = (
    <div className='p-3 font-inter card gap-12 box-content w-2/3 h-32 mt-32'>
      <p className="flex justify-center py-6">New to shop. To create new profile click below button.</p>
      <div className="flex justify-center">
         <button className='bg-text-primary text-white px-6 py-2 rounded-lg'onClick={handleCreateProfile}>
           Create Profile
         </button>
      </div>
   </div>
  );

  return (
    <div>
      <ShopHeader pageName="Job Open" />
      <div className="h-9 bg-side-nav-bg border-b-2"/>

      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

      <div className="flex mt-28">
        <div className='w-1/2'>
          <img src={deal} className='h-96 mx-auto mt-6'/>
        </div>
        <div className="w-1/2">
          {isSearchBarVisible? searchBar : createNew }
        </div>
      </div>

    </div>
  );
};


export default OpenJobSearch;