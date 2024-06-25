import cancel from '../assets/cancel.svg';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateVehicleNumber } from '../Validation/VehicleData';
import { checkBookingDetails, cancelBooking, changeBookingDate } from '../api/Shop-Booking';

const Booking_Update = () => {
  const [isSearchBarVisible, setSearchBarVisible] = useState(true);
  const [searchNumber, setSearchNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [vehicleFault, setVehicleFault] = useState('');
  const [reservedDate, setReservedDate] = useState('');
  const [initialReservedDate, setInitialReservedDate] = useState(null);

  const handleSearchNumber = (e) => {
    setSearchNumber(e.target.value);
  };

  const handleSearchClick = async () => {
    const vehicleNumberError = validateVehicleNumber(searchNumber);
    if (vehicleNumberError) {
      toast.warning('Invalid vehicle number');
      return;
    }

    try {
      const data = await checkBookingDetails(searchNumber);
      setSearchBarVisible(false);
      setVehicleNumber(data[0].vehicleNumber);
      setContactNumber(data[0].contactNumber);
      setVehicleFault(data[0].vehicleFault);
      setReservedDate(data[0].reservedDate);
      setInitialReservedDate(data[0].reservedDate);
    } catch (err) {
      toast.error(err.response?.data || 'Error fetching data');
    }
  };

  const handleCancelClick = async () => {
    try {
      await cancelBooking(vehicleNumber);
      toast.success('Booking cancellation is successful!');
      setSearchNumber('');
      setSearchBarVisible(true);
    } catch (err) {
      toast.error(err.response?.data || 'Error canceling booking');
    }
  };

  const handleDateChangeClick = async () => {
    if (reservedDate === initialReservedDate) {
      toast.warning('Nothing to update!');
      return;
    }

    try {
      const res = await changeBookingDate(reservedDate, vehicleNumber);
      if (res.status === 200) {
        toast.success('New date updated!');
        setSearchNumber('');
        setSearchBarVisible(true);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.warning(error.response.data);
      } else {
        console.error(error);
        toast.error('Server side Error!');
      }
    }
  };

  const searchBar = (
    <div className='flex items-center card gap-12 box-content w-2/3 h-32 mt-2'>
      <input
        type='text'
        value={searchNumber}
        onChange={handleSearchNumber}
        placeholder='Enter vehicle number'
        className='rounded-lg p-2 ml-6 outline-none'
      />
      <button onClick={handleSearchClick} className='bg-text-primary text-white px-6 py-2 rounded-lg'>
        Search
      </button>
    </div>
  );

  const dataForm = (
    <div className='box-content w-4/5 p-2 card'>
      <div className='flex m-2 items-center px-5 mt-6'>
        <p className='w-36 mainStyle'>Vehicle Number</p>
        <input type='text' value={vehicleNumber} className='rounded-lg p-2 ml-6 outline-none w-72 pl-6' readOnly />
      </div>
      <div className='flex m-2 items-center px-5'>
        <p className='w-36 mainStyle'>Contact Number</p>
        <input type='text' value={contactNumber} className='rounded-lg p-2 ml-6 outline-none w-72 pl-6' readOnly />
      </div>
      <div className='flex m-2 items-center px-5'>
        <p className='w-36 mainStyle'>Identify Error</p>
        <input type='text' value={vehicleFault} className='rounded-lg p-2 ml-6 outline-none w-72 pl-6' readOnly />
      </div>
      <div className='flex m-2 items-center px-5'>
        <p className='w-36 mainStyle'>Reserved Date</p>
        <input
          type='date'
          value={reservedDate}
          onChange={(e) => setReservedDate(e.target.value)}
          className='rounded-lg p-2 ml-6 outline-none w-72 pl-6'
        />
      </div>
      <div className='flex justify-center gap-6 mt-8 mb-6'>
        <button onClick={handleCancelClick} className='bg-red-600 text-white px-6 py-2 rounded-lg'>
          Cancel
        </button>
        <button onClick={handleDateChangeClick} className='bg-green-600 text-white px-6 py-2 rounded-lg'>
          Update
        </button>
      </div>
    </div>
  );

  return (
    <div className='my-6 mx-6'>
      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme='light' />
      <div className='flex mt-24'>
        <div className='w-1/2'>
          <img src={cancel} className='h-96 mx-auto mt-6' />
        </div>
        <div className='flex items-center w-1/2'>{isSearchBarVisible ? searchBar : dataForm}</div>
      </div>
    </div>
  );
};

export default Booking_Update;
