import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import { Link,useNavigate} from 'react-router-dom';
import { useState,useEffect } from 'react';
import Modal from '../components/Modal';
import completed from '../assets/completed.svg';
import Warning from '../assets/warning.svg';
import {validateVehicleNumber,validateVehicleFault} from '../Validation/VehicleData';
import {validateContactNumber,validateInputField} from '../Validation/InputFeilds';
import { getNextDates, addBooking } from '../api/Shop-Booking';
import { checkVehicleOngoingJob } from '../api/Shop-OpenJob';
import PropTypes from 'prop-types';
import ModalContent from '../components/template/ModalContent';

const InputField = ({label, type = "text", name, placeholder, value, onChange, maxLength}) => {
  return(
    <div className='flex flex-row justify-center mt-3'>
    <div className='basis-1/4 font-semibold'>{label} :</div>
    <div className='basis-1/2'>
      <input 
        type={type} 
        name={name} 
        onChange={onChange} 
        placeholder={placeholder} 
        value={value} 
        className='input border-b-2 w-full' 
        maxLength={maxLength} 
      />
    </div>
  </div>
  );
}

InputField.propTypes = {
label: PropTypes.string.isRequired,
type: PropTypes.string,
name: PropTypes.string.isRequired,
placeholder: PropTypes.string.isRequired,
value: PropTypes.string.isRequired,
onChange: PropTypes.func.isRequired,
maxLength: PropTypes.number.isRequired
};

const BookNow = () => {

  const [openModel,setOpenModel] = useState(false);
  const [openErrorModel,setOpenErrorModel] = useState(false);
  const [dates,setDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [booking,setBooking] = useState({vehicleNumber:"", contactNumber:"", vehicleFault:"", reservedDate:""});

  const handleChange = (event) => {
    setBooking({
      ...booking,
      [event.target.name]: event.target.value
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const dates = await getNextDates();
        setDates(dates);
      } catch (error) {
        console.error('Error fetching dates', error);
      }
    };

    fetchDates();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    //input feild validation
    const vehicleNumberError = validateVehicleNumber(booking.vehicleNumber);
    const vehicleFaultError = validateVehicleFault(booking.vehicleFault);  
    const customerContactNumberError =  validateContactNumber(booking.contactNumber);
    const reservedDateerror = validateInputField(booking.reservedDate);
    
    //check inputs are in correct way
    if (vehicleNumberError || customerContactNumberError || vehicleFaultError ) {
     setErrorMessage(vehicleNumberError || vehicleFaultError || customerContactNumberError);
     setOpenErrorModel(true);
     return;
    }
    if(reservedDateerror){
      setErrorMessage("Date can't be emapty");
      setOpenErrorModel(true);
      return;
    }
    // Check vehicle has ongoing repair job
    const jobOpenNumber = booking.vehicleNumber;
    try {
      const checkVehicle = await checkVehicleOngoingJob(jobOpenNumber);
      if (checkVehicle === "ONGOING") {
      setErrorMessage("This vehicle has an ongoing job");
      setOpenErrorModel(true);
      return;
      }
      // Handle submission
      await addBooking(booking);
      setOpenModel(true);
    } catch (err) {
      setErrorMessage(err.response?.data || 'An error occurred');
      setOpenErrorModel(true);
    }
  };
  
  return (
    <div className="flex justify-center items-center bg-text-primary h-screen">

      <div className="box-context bg-white rounded-lg w-1/2 h-fit p-5">
     
        <div className="flex p-3 mt-4">
          <Link to='/'>
           <ChevronLeftIcon className='h-9 w-9 text-text-primary ml-0 cursor-pointer'/>
          </Link>
          <p className="font-inter text-3xl text-text-primary font-medium mx-auto">Kalupahana Motors</p>
        </div>

        <form className='font-inter mt-8' onSubmit={handleSubmit}>

          <InputField 
            label="Vehicle Number" 
            name="vehicleNumber" 
            placeholder="XX - XXXX or XXX - XXXX" 
            value={booking.vehicleNumber} 
            onChange={handleChange} 
            maxLength={8} 
          />
          <InputField 
            label="Contact Number" 
            type="number" 
            name="contactNumber" 
            placeholder="07........" 
            value={booking.contactNumber} 
            onChange={handleChange} 
            maxLength={10} 
          />

          <div className='flex flex-row justify-center mt-3'>
            <div className='basis-1/4 font-semibold'><p>Vehicle Fault :</p></div>
            <div className='basis-1/2 relative bg-white rounded-lg'>
              <textarea 
                id="message" 
                rows="6" 
                name='vehicleFault' 
                onChange={handleChange} 
                maxLength={200}
                className="input block p-2.5 w-full rounded-lg border" 
                placeholder="Write your identify fault here..."
              />
              <div className="absolute bottom-0.5 right-0.5 bg-white text-end rounded-lg pr-2 text-gray-500 text-sm">
               {booking.vehicleFault.length}/200
              </div>
            </div>
          </div>

          <div className='flex flex-row justify-center mt-3'>
            <div className='basis-1/4 font-semibold'><p>Date :</p></div>
            <div className='basis-1/2'>
             <select 
              name='reservedDate' 
              className='input w-full border-2 rounded-lg p-2 text-gray-700' 
              onChange={handleChange}
              >
               <option>Select a date</option>
               {dates.map((date, index) => (
                <option className='text-black' key={index} value={date}>{date}</option>))}
              </select>
            </div>
          </div>
             
          <div className='flex justify-center mt-5'> 
           <button className='btn btn-normal' onClick={handleSubmit}>Submit</button>
          </div>

        </form>

        <Modal open={openModel}>
          <ModalContent 
            title="Completed!"
            message="If you need to cancel your reservation for any reason,please contact the shop directly." 
            image={completed} 
            buttonLabel="Ok"
            buttonStyles = "btn btn-normal mx-auto mt-2"
            onButtonClick={() => { setOpenModel(false); navigate("/"); }} 
          />
        </Modal>

        <Modal open={openErrorModel}>
          <ModalContent 
            messageStyle = "text-red-700 font-semibold"
            message={errorMessage} 
            image={Warning} 
            buttonLabel="Ok"
            buttonStyles = "btn btn-warning mx-auto mt-2"
            onButtonClick={() => setOpenErrorModel(false)} 
          />
        </Modal>

      </div>
    </div>
  );
};

export default BookNow;