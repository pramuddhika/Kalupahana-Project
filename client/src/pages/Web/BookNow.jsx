import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import { Link,useNavigate} from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import completed from '../assets/completed.svg';
import Warning from '../assets/warning.svg';
import {validateVehicleNumber,validateVehicleFault} from '../Validation/VehicleData';
import {validateContactNumber,validateInputField} from '../Validation/InputFeilds';


const BookNow = () => {

  const [openModel,setOpenModel] = useState(false);
  const [openErrorModel,setOpenErrorModel] = useState(false);
  const [dates,setDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [booking,setBooking] = useState({
    vehicleNumber:"",
    contactNumber:"",
    vehicleFault:"",
    reservedDate:""
  });

  const handleChange = (event) => {
    setBooking({
      ...booking,
      [event.target.name]: event.target.value
    });
  };

  const navigate = useNavigate();

  //get next 3 dayes in yyyy-mm-dd format
  useEffect(() => {
    axios.get('/api/booking/nextdates')
        .then(response => {
            setDates(response.data.dates);
        })
        .catch(error => {
            console.error('Error fetching dates', error);
        });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    //input feild validation
    const vehicleNumberError = validateVehicleNumber(booking.vehicleNumber);
    const vehicleFaultError = validateVehicleFault(booking.vehicleFault);  
    const CustomerContactNumberError =  validateContactNumber(booking.contactNumber);
    const vehicleFaultEmptyError = validateInputField(booking.vehicleFault);
    const dataEmptyError = validateInputField(booking.reservedDate);
    
    if (vehicleNumberError || vehicleFaultError || CustomerContactNumberError) {
     setErrorMessage(vehicleNumberError || vehicleFaultError || CustomerContactNumberError);
     setOpenErrorModel(true);
     return;
    }
    if(dataEmptyError||vehicleFaultEmptyError){
      setErrorMessage(dataEmptyError||vehicleFaultEmptyError);
      setOpenErrorModel(true);
     return;
    }
    
    // handle submission
    try{
      await axios.post('/api/booking/add', booking);
      setOpenModel(true);
    }catch(err){
      setErrorMessage(err.response.data);
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

          <div className='flex flex-row justify-center mt-2'>
            <div className='basis-1/4 font-semibold'> Vehicle Number :</div>
             <div className='basis-1/2'>
                <input type='text' name='vehicleNumber' onChange={handleChange} placeholder='XX - XXXX  or  XXX - XXXX' className='input border-b-2 w-full' maxLength={8} />
             </div>
          </div>

          <div className='flex flex-row justify-center mt-3'>
            <div className='basis-1/4 font-semibold'>Contact Number :</div>
            <div className='basis-1/2'>
              <input type='number' name='contactNumber' onChange={handleChange} placeholder='07........' className='input border-b-2 w-full' maxLength={10}/>
            </div>
          </div>

          <div className='flex flex-row justify-center mt-3'>
            <div className='basis-1/4 font-semibold'><p>Vehicle Fault :</p></div>
            <div className='basis-1/2 relative bg-white rounded-lg'>
              <textarea id="message" rows="6" name='vehicleFault' onChange={handleChange} className="input block p-2.5 w-full rounded-lg border" placeholder="Write your identify fault here..." maxLength={200} />
              <div className="absolute bottom-0.5 right-0.5 bg-white text-end rounded-lg pr-2 text-gray-500 text-sm">{booking.vehicleFault.length}/200</div>
            </div>
          </div>

          <div className='flex flex-row justify-center mt-3'>
            <div className='basis-1/4 font-semibold'><p>Date :</p></div>
            <div className='basis-1/2'>
             <select name='reservedDate' className='input w-full border-2 rounded-lg p-2 text-gray-700' onChange={handleChange}>
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

          <Modal open={openModel} >
            <div>
             <div onClick={(e) => e.stopPropagation()}>
                <p className="font-bold pb-2 text-text-primary text-2xl text-center">Completed!</p>
                <img src={completed} className='h-44 mx-auto'/>
                <div className='text-center pt-2'>
                  <p>If you need to cancel your reservation for any reason,</p>
                  <p>Please contact the shop directly</p>
                </div>
                <div className="flex justify-center">
                <button className="btn btn-normal mx-auto mt-2" onClick={() => { setOpenModel(false); navigate("/"); }}>Ok</button>
               </div>
              </div>
            </div>
          </Modal>

          <Modal open={openErrorModel}>
            <div>
             <div onClick={(e) => e.stopPropagation()}>
                <img src={Warning} className='h-44 mx-auto mb-2'/>
                <div className='text-center pt-2'>
                  <p className='text-red-700 font-semibold'>{errorMessage}</p>
                </div>
                <div className="flex justify-center">
                 <button className="btn btn-warning mx-auto mt-2" onClick={() => setOpenErrorModel(false)}>Ok</button>
               </div>
              </div>
            </div>
          </Modal>

      </div>
    </div>
  );
};

export default BookNow;