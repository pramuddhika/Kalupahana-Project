import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import axios from 'axios';
import records from "../assets/records.svg";

const Records_Search = ({ setActiveTopic, setSearchNumber }) => {
  const [searchNumberInput, setSearchNumberInput] = useState("");

  const handleSearchNumberChange = (e) => {
    setSearchNumberInput(e.target.value);
  };

  const handleSearchNumberClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/records/checkVehicle/${searchNumberInput}`);
      
      if (res.data.message === 'record exist') {
        setSearchNumber(searchNumberInput);
        setActiveTopic('Records_Details');
      }
    } catch (err) {
      toast.warning(err.response.data.message);
    }
  };

  return (
    <div> 
      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light" />
      <div className="flex mt-28">
        <div className='w-1/2'>
          <img src={records} className='h-96 mx-auto mt-6' />
        </div>
        <div className="w-1/2">
          <div className='flex items-center card gap-12 box-content w-2/3 h-32 mt-32'>
            <input type='text' placeholder='Enter vehicle number' value={searchNumberInput} 
            onChange={handleSearchNumberChange} className='rounded-lg p-2 ml-6 outline-none' />
            <button className='bg-text-primary text-white px-6 py-2 rounded-lg' 
            onClick={handleSearchNumberClick}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Records_Search.propTypes = {
  setActiveTopic: PropTypes.func.isRequired,
  setSearchNumber: PropTypes.func.isRequired,
};

export default Records_Search;
