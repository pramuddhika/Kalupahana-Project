import cancel from '../assets/cancel.svg';
import { useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const BookingUpdate = () => {

  const [isSearchBarVisible,setSearchBarVisible] = useState(true);
  const [serachNumber, setSearchNumber] = useState('');
  const [details,setDetails] = useState({
    vehicleNumber:"",
    contactNumber:"",
    message:"",
    date:""
  });

  const handleSeracgChange = (e) => {
    setSearchNumber(e.target.value);
  }

  const handleSearch = async () => {
    
    try{
     const res = await axios.get(`http://localhost:8000/api/booking/checking/${serachNumber}`);
     console.log(res.data);
    }catch(err){
      if (err.response && err.response.data && err.response.data.message) {
        // Display a toast error message with the error message from the server
        toast.error(err.response.data.message);
      } else {
        // If the server didn't send a detailed error message, display a generic error message
        toast.error('An error occurred');
      }
    }
    //setSearchBarVisible(false);
    
  }

  const serachBar = (
    <div className='flex items-center card gap-12 box-content w-2/3 h-32 mt-2'>
      <input type='text' onChange={handleSeracgChange} value={serachNumber} placeholder='Enter vehicle number' className='rounded-lg p-2 ml-6 outline-none' />
      <button className='bg-text-primary text-white px-6 py-2 rounded-lg'onClick={handleSearch}>Search</button>
    </div>
  );

  const dataForm = (
    <div className='box-content  w-4/5 p-2 card'>
      <div className='flex m-2 items-center px-5'>
        <p className='w-36'>Vehicle Number</p>
        <input type='text' className='rounded-lg p-2 ml-6 outline-none w-72' />
      </div>   
      <div className='flex m-2 items-center px-5'>
        <p className='w-36'>Contact Number</p>
        <input type='text' className='rounded-lg p-2 ml-6 outline-none w-72' />
      </div>              
      <div className='flex m-2 items-center px-5'>
        <p className='w-36'>Identify Error</p>
        <input type='text' className='rounded-lg p-2 ml-6 outline-none w-72' />
      </div>
      <div className='flex m-2 items-center px-5'>
        <p className='w-36'>Date</p>
        <input type='text' className='rounded-lg p-2 ml-6 outline-none w-72' />
      </div>

      <div className='flex justify-center gap-6 mt-4'>
        <button className='bg-red-600 text-white px-6 py-2 rounded-lg'>Cancel</button>
        <button className='bg-green-600 text-white px-6 py-2 rounded-lg'>Update</button>
      </div>
    </div>
  );
  
  return (
    <div className='my-6 mx-6'>

     <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

      <div className='flex mt-20'>

        <div className='w-1/2'>
          <img src={cancel} className='h-96 ml-10 mt-6'/>
        </div>

        <div className='flex items-center w-1/2'>
          {isSearchBarVisible ? serachBar : dataForm}
        </div>

      </div>

    </div>
  );
};

export default BookingUpdate;