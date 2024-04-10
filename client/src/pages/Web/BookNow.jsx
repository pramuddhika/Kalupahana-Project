import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const BookNow= () => {

  const [selectedDate, setSelectedDate] = useState('');

  // Generate an array of next three days
  const getNextThreeDays = () => {
    const dates = [];
    for (let i = 1; i < 4; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().slice(0, 10)); // Convert date to YYYY-MM-DD format
    }
    return dates;
  };

  // Handler function to update the selected date
  const handleDateButtonClick = (date) => {
    setSelectedDate(date);
  };

    return (
        <div className="flex justify-center items-center bg-text-primary h-screen">
 
 
          <div className="box-context bg-white rounded-lg w-1/2 h-4/5">
            <div className="flex p-3 ">
              <Link to='/'>
                <ChevronLeftIcon className='h-9 w-9 text-text-primary ml-0 cursor-pointer'/>
              </Link>
                <p className="font-inter text-3xl text-text-primary font-medium mx-auto">Kalupahana Motors</p>
            </div>

            <form className='font-inter'>

              <label htmlFor='vehicleNumber'>Vehicle Number : </label>
              <input type='text' placeholder='AAA-0001 OR AA-0001' className='outline-none border-b-2' id='vehicleNumber'/>   <br/>

              <label htmlFor='name'>Your Name : </label>
              <input type='text' placeholder='Your Name' className='outline-none border-b-2' id='name'/>   <br/>

              <label htmlFor='contactNumber'>Contact Number : </label>
              <input type='text' placeholder='07........' className='outline-none border-b-2' id='contactNumber'/>   <br/>

              <label>Vehicle Category : </label>

              <input type='radio' value='petral' id='Petral'/>
              <label htmlFor='Petral'>petral</label>

              <input type='radio' value='Disel' id='Disel'/>
              <label htmlFor='Disel'>Disel</label>

              <input type='radio' value='Hybrid' id='Hybrid'/>
              <label htmlFor='Hybrid'>Hybrid</label>

              <input type='radio' value='Electric' id='Electric'/>
              <label htmlFor='Electric'>Electric</label>                        <br/>

              <label htmlFor='message'>Message</label>
              <input type='text' placeholder='please mention identify error' id='message' className='outline-none border-b-2 w-10/12' />

              <div>
      {getNextThreeDays().map((date, index) => (
        <button 
          key={index} 
          onClick={() => handleDateButtonClick(date)}
          style={{ marginRight: '10px' }}
        >
          {date}
        </button>
      ))}
      <p>Selected date: {selectedDate}</p>
    </div>

            </form>
          </div>
        </div>
    );
};

export default BookNow;