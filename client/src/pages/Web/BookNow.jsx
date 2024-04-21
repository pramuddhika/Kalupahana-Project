import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import { Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import completed from '../assets/completed.svg';
import Warning from '../assets/warning.svg';
import { useNavigate } from 'react-router-dom';

const BookNow = () => {

  const [openModel,setOpenModel] = useState(false);
  const [openErrorModel,setOpenErrorModel] = useState(false);
  const [dates,setDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [booking,setBooking] = useState({
    vehicleNumber:"",
    countactNumber:"",
    message:"",
    date:""
  });

  const handleChange = (e) => {
    setBooking( (prev) => ({...prev,[e.target.name]: e.target.value}));
  }

  const navigate = useNavigate();

  //get next 3 dayes in yyyy-mm-dd format
  useEffect(() => {
    axios.get('http://localhost:8000/api/booking/nextdates')
        .then(response => {
            setDates(response.data.dates);
        })
        .catch(error => {
            console.error('Error fetching dates', error);
        });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const vehicleNumberRegex = /^[A-Z]{2,3}-\d{4}$/;
    const contactNumberRegex = /^07[0-8]\d{7}$/;
    
    // Validate vehicle number
    if (!vehicleNumberRegex.test(booking.vehicleNumber)) {
    setErrorMessage('Invalid Vehicle number.');
    setOpenErrorModel(true);
    return;
    } 

    //VAlidate contact number
    if (!contactNumberRegex.test(booking.contactNumber)) {
      setErrorMessage('Invalid contact number.');
      setOpenErrorModel(true);
      return;
    }
    
    // handle submission
    try{
      await axios.post('http://localhost:8000/api/booking/add', booking);
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
            <div className='basis-1/4'> Vehicle Number :</div>
             <div className='basis-1/2'>
                <input type='text' name='vehicleNumber' onChange={handleChange} placeholder='AA-0001 or AAA-0001' className='input border-b-2 w-full'/>
             </div>
          </div>

          <div className='flex flex-row justify-center mt-3'>
            <div className='basis-1/4'>Contact Number :</div>
            <div className='basis-1/2'>
              <input type='text' name='contactNumber' onChange={handleChange} placeholder='07........' className='input border-b-2 w-full'/>
            </div>
          </div>

          <div className='flex flex-row justify-center mt-3'>
            <div className='basis-1/4'><p>Message :</p></div>
            <div className='basis-1/2'>
              <textarea id="message" rows="6" name='message' onChange={handleChange} className="input block p-2.5 w-full rounded-lg border" placeholder="Write your identify error here..."/>
            </div>
          </div>

          <div className='flex flex-row justify-center mt-3'>
            <div className='basis-1/4'><p>Date :</p></div>
            <div className='basis-1/2'>
             <select name='date' className='input w-full border-2 rounded-lg p-2 text-gray-400' onChange={handleChange}>
              <option>Select a Date</option>
              {dates.map((date, index) => (
                <option key={index} value={date}>{date}</option>))}
             </select>
            </div>
          </div>
             
          <div className='flex justify-center mt-5'> 
           <button className='btn btn-normal' onClick={handleSubmit}>Submit</button>
          </div>

          </form>

          <Modal open={openModel}>
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

          <Modal open={openErrorModel} onClose={ () => setOpenErrorModel(false)}>
            <div>
             <div onClick={(e) => e.stopPropagation()}>
                <p className="font-bold pb-2 text-red-600 text-2xl text-center">Warning!</p>
                <img src={Warning} className='h-44 mx-auto'/>
                <div className='text-center pt-2'>
                  <p className='text-red-700'>{errorMessage}</p>
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