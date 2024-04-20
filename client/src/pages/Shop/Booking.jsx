import ShopHeader from '../components/ShopHeader'
import { useState } from 'react';
import BookingDashboard from './BookingDashboard';
import BookingCancel from './BookingCancel';
import BookingReserved from './BookingReserved';

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
        return 'Boooking';
    }
  };


  return (
    <div className=''>

      <ShopHeader pageName={getPageName()}/>

      {/**start sub navbar */}
      <div className='flex bg-side-nav-bg p-2 h-9 pl-3 -10 gap-6 font-inter border-b-2'>

        <button className={`${activeTopic === 'DashBoard' ? 'topic' : 'text-gray-500'}`}
        onClick={() => handleTopicClick('DashBoard')}>DashBoard</button>
        <button className={`${activeTopic === 'CancelBooking' ? 'topic' : 'text-gray-500'}`}
        onClick={() => handleTopicClick('CancelBooking')}>Cancel Booking</button>
        <button className={`${activeTopic === 'TodayList' ? 'topic' : 'text-gray-500'}`}
        onClick={() => handleTopicClick('TodayList')}>Reserved List</button>
                    
      </div>            
      {/**end sub nav bar */}
             
      <div>
        {activeTopic === 'DashBoard' && <BookingDashboard/>}
        {activeTopic === 'CancelBooking' && <BookingCancel/>}
        {activeTopic === 'TodayList' && <BookingReserved/>}
      </div>

    </div>
  );
};

export default Booking;