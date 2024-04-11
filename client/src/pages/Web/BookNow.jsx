import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const getNextThreeDays = () => {
  const dates = [];
  for (let i = 1; i < 4; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const formattedDate = date.toISOString().slice(0, 10);
    dates.push({ date, formattedDate });
  }
  return dates;
};

const BookNow= () => {

  const [selectedDate, setSelectedDate] = useState('');
  const nextThreeDays = getNextThreeDays();
  const Navigate = useNavigate();

  const [booking,setBooking] = useState({
    vehicleNumber:"",
    customerName :"",
    contactNumber: "",
    vehicleCategory:"",
    message: "",
    date:""
  })

  const handleChange = (e) => {
    setBooking( (prev) => ({...prev,[e.target.name]: e.target.value}));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:8000/api/booking/add", booking)
      window.alert('Your reservation is successful!');
      Navigate('/');
    }catch(err){
      window.alert(err.response.data);
    }
  }

  const handleSelectChange = (event) => {
    setSelectedDate(event.target.value);
  };

  console.log(booking);

    return (
        <div className="flex justify-center items-center bg-text-primary h-screen">
 
          <div className="box-context bg-white rounded-lg w-1/2 h-4/5">
            <div className="flex p-3 mt-4">
              <Link to='/'>
                <ChevronLeftIcon className='h-9 w-9 text-text-primary ml-0 cursor-pointer'/>
              </Link>
              <p className="font-inter text-3xl text-text-primary font-medium mx-auto">Kalupahana Motors</p>
            </div>

            
           <form className='font-inter mt-8'>
             
            <div className='flex flex-row justify-center mt-2'>
              <div className='basis-1/4'>
                  Vehicle Number :
              </div>
              <div className='basis-1/2'>
                 <input type='text' onChange={handleChange} name='vehicleNumber' placeholder='AA-0001 or AAA-0001' className='outline-none border-b-2 w-full pl-2'/>
              </div>
            </div>

            <div className='flex flex-row justify-center mt-3'>
              <div className='basis-1/4'>
                  Your Name :
              </div>
              <div className='basis-1/2'>
               <input type='text' onChange={handleChange} name='customerName' placeholder='Name' className='outline-none border-b-2 w-full pl-2'/>
              </div>
            </div>

            <div className='flex flex-row justify-center mt-3'>
              <div className='basis-1/4'>
                  Contact Number :
              </div>
              <div className='basis-1/2'>
                 <input type='text' onChange={handleChange} name='contactNumber' placeholder='07........' className='outline-none border-b-2 w-full pl-2'/>
              </div>
            </div>

            <div className='flex flex-row justify-center mt-3'>
              <div className='basis-1/4'>
                Vehicle Category :
              </div>
              <div className='basis-1/2'>
                <input type='radio' value='petral' onChange={handleChange} name='vehicleCategory' id='Petral'/>
                <label htmlFor='Petral'  className='pr-6 pl-2'>Petral</label>

                <input type='radio' value='Disel' onChange={handleChange} name='vehicleCategory' id='Disel'/>
                <label htmlFor='Disel' className='pr-6 pl-2'>Disel</label>

                <input type='radio' value='Hybrid' onChange={handleChange} name='vehicleCategory' id='Hybrid'/>
                <label htmlFor='Hybrid' className='pr-6 pl-2'>Hybrid</label>

                <input type='radio' value='Electric' onChange={handleChange} name='vehicleCategory' id='Electric'/>
                <label htmlFor='Electric' className='pr-6 pl-2'>Electric</label> 
              </div>
            </div>

            <div className='flex flex-row justify-center mt-3'>
              <div className='basis-1/4'>
                <p>Message :</p>
              </div>
              <div className='basis-1/2'>
              <textarea id="message" rows="6" onChange={handleChange} name='message' className="block p-2.5 w-full rounded-lg border outline-none" 
              placeholder="Write your identify error here..."/>
              </div>
            </div>

            <div className='flex flex-row justify-center mt-3'>
              <div className='basis-1/4'>
                <p>Select Date :</p>
              </div>
                <div className='basis-1/2'>
                  <select value={selectedDate} name='date' onChange={(event) => {handleSelectChange(event);handleChange(event);}} 
                  className='border-2 rounded-lg outline-none w-1/2 p-1'>
                    <option value="">Select a Date</option>
                    {nextThreeDays.map(({ formattedDate }) => (
                      <option key={formattedDate} value={formattedDate}>
                        {formattedDate}
                      </option>
                    ))}
                  </select>
                </div>
            </div>

            <div className='flex justify-center mt-5'> 
              <button onClick={handleSubmit} className='border-2 bg-text-primary text-white rounded-lg px-4 py-1'>
               Submit
              </button>
            </div>

           </form>

          </div>
        </div>
    );
};

export default BookNow;