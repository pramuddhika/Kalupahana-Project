import ShopHeader from '../components/ShopHeader'
import { useState } from 'react';
import Booking_Dashboard from './Booking_Dashboard';
import Booking_Update from './Booking_Update';
import Booking_Reserved from './Booking_Reserved';


const Booking = () => {

  const [activeTopic, setActiveTopic] = useState('DashBoard');

  const handleTopicClick = (topic) => {
  setActiveTopic(topic);
  };

  const getPageName = () => {
    switch (activeTopic) {
      case 'DashBoard':
        return 'Dashboard';
      default:
        return 'Booking';
    }
  };

  return (
    <div className=''>

      

          <ShopHeader pageName={getPageName()}/>

          {/**start sub navbar */}
          <div className='flex bg-side-nav-bg p-2 h-9 pl-3 -10 gap-6 font-inter border-b-2'>

           <button className={`${activeTopic === 'DashBoard' ? 'topic' : 'text-gray-500'}`}
           onClick={() => handleTopicClick('DashBoard')}>DashBoard</button>
           <button className={`${activeTopic === 'UpdateBooking' ? 'topic' : 'text-gray-500'}`}
           onClick={() => handleTopicClick('UpdateBooking')}>Update Booking</button>
           <button className={`${activeTopic === 'TodayList' ? 'topic' : 'text-gray-500'}`}
           onClick={() => handleTopicClick('TodayList')}>Reserved List</button>
                    
          </div>            
          {/**end sub nav bar */}
             
          <div>
            {activeTopic === 'DashBoard' && <Booking_Dashboard/>}
            {activeTopic === 'UpdateBooking' && <Booking_Update/>}
            {activeTopic === 'TodayList' && <Booking_Reserved/>}
          </div>

        
    </div>
  );
};

export default Booking;