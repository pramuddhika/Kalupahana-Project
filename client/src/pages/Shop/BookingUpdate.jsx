import cancel from '../assets/cancel.svg';
import {  useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const BookingUpdate = () => {

  const [isSearchBarVisible,setSearchBarVisible] = useState(true);
  const [searchNumber, setSearchNumner] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [vehicleFault, setVehicleFault] = useState('');
  const [reservedDate,SetReservedDate] = useState('');
  

  const handleSearchNumber = (e) => {
    const newSearchNumber = e.target.value;
    setSearchNumner(newSearchNumber);
  }

  //geta and set data to data form
  const handleSearchClick = async () => {
    // //validated vehicle number
    const regexVehicleNumber = /^([A-Z]{2,3}|\d{2,3})-\d{4}$/;
    if (!regexVehicleNumber.test(searchNumber)) {
      toast.warning('Invalid vehicle number');
      return;
    } 
  
    try{
      const res = await axios.get(`http://localhost:8000/api/booking/checking/${searchNumber}`);
        setSearchBarVisible(false);
        setVehicleNumber(res.data[0].vehicleNumber);
        setContactNumber(res.data[0].contactNumber);
        setVehicleFault(res.data[0].vehicleFault);
        SetReservedDate(res.data[0].reservedDate);
    } catch(err){
      toast.error(err.response.data)
    }
  }

  //cancel resevation 
  const handleCancelClick = async () => {
    try{
      await axios.put('http://localhost:8000/api/booking/cancel',{vehicleNumber});
      toast.success('Booking cancellation is successful!');
      setSearchNumner('');
      setSearchBarVisible(true);
    }catch(err){
      toast.error(err.response.data);
    }
  }
  //change resevation date
  const handleDateChangeCkick = async () => {
    try{
      await axios.put('http://localhost:8000/api/booking/changedate',{reservedDate,vehicleNumber});
      toast.success('New date updated!');
      setSearchNumner('');
      setSearchBarVisible(true);
    }catch(err){
      toast.warning(err);
    }
  }

  const serachBar = (
    <div className='flex items-center card gap-12 box-content w-2/3 h-32 mt-2'>
      <input type='text' value={searchNumber} onChange={handleSearchNumber} placeholder='Enter vehicle number' 
      className='rounded-lg p-2 ml-6 outline-none' />
      <button onClick={handleSearchClick} className='bg-text-primary text-white px-6 py-2 rounded-lg'>Search</button>
    </div>
  );

  const dataForm = (
    <div className='box-content  w-4/5 p-2 card '>
      <div className='flex m-2 items-center px-5 mt-6'>
        <p className='w-36 mainStyle'>Vehicle Number</p>
        <input type='text' value={vehicleNumber}  className='rounded-lg p-2 ml-6 outline-none w-72 pl-6' readOnly/>
      </div>   
      <div className='flex m-2 items-center px-5'>
        <p className='w-36 mainStyle'>Contact Number</p>
        <input type='text' value={contactNumber} className='rounded-lg p-2 ml-6 outline-none w-72 pl-6' readOnly/>
      </div>              
      <div className='flex m-2 items-center px-5'>
        <p className='w-36 mainStyle'>Identify Error</p>
        <input type='text' value={vehicleFault} className='rounded-lg p-2 ml-6 outline-none w-72 pl-6 ' readOnly/>
      </div>
      <div className='flex m-2 items-center px-5'>
        <p className='w-36 mainStyle'>Reserved Date</p>
        <input type='date' value={reservedDate} onChange={ (e)=> SetReservedDate(e.target.value)} className='rounded-lg p-2 ml-6 outline-none w-72 pl-6'/>
      </div>

      <div className='flex justify-center gap-6 mt-8 mb-6'>
        <button onClick={handleCancelClick} className='bg-red-600 text-white px-6 py-2 rounded-lg'>Cancel</button>
        <button onClick={handleDateChangeCkick} className='bg-green-600 text-white px-6 py-2 rounded-lg'>Update</button>
      </div>
    </div>
  );
  
  return (
    <div className='my-6 mx-6'>

     <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

      <div className='flex mt-24'>

        <div className='w-1/2'>
          <img src={cancel} className='h-96 mx-auto mt-6'/>
        </div>

        <div className='flex items-center w-1/2'>
          {isSearchBarVisible ? serachBar : dataForm}
        </div>

      </div>

    </div>
  );
};

export default BookingUpdate;