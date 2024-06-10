import ShopHeader from '../components/ShopHeader'
import { useState } from 'react';
import BookingDashboard from './BookingDashboard';
import BookingUpdate from './BookingUpdate';
import BookingReserved from './BookingReserved';
import SideNav from '../components/SideNav';

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

      <div className="flex h-screen">
        <div className="w-[180px]">
           <SideNav />
        </div>
        <div className="w-calc">

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
            {activeTopic === 'DashBoard' && <BookingDashboard/>}
            {activeTopic === 'UpdateBooking' && <BookingUpdate/>}
            {activeTopic === 'TodayList' && <BookingReserved/>}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Booking;