import ShopHeader from '../components/ShopHeader'
import { useState } from 'react';
import DashBoardBox from '../components/DashBoardBox';


{/**dashboard - start */}
const DashBoard = () => {
    return (
      <div className='mt-6 ml-3'>
        <DashBoardBox/>
        <p>This is the content for DashBoard.</p>
      </div>
    );
  };
{/**dashboard - end */}

{/**Cancel Bokking - start */}
const CancelBooking = () => {
  return (
    <div className='mt-6 ml-3'>
      <p>This is the content for CancelBooking.</p>
    </div>
  );
};
{/**Cancel Booking - end */}

{/**Today List - start */}
const TodayList = () => {
  return (
    <div className='mt-6 ml-3'>
      <p>This is the content for TodayList.</p>
    </div>
  );
};
{/**Today List - end */}

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

        <button className={`${activeTopic === 'DashBoard' ? 'text-text-primary font-bold' : 'text-gray-500'}`}
        onClick={() => handleTopicClick('DashBoard')}>DashBoard</button>
        <button className={`${activeTopic === 'CancelBooking' ? 'text-text-primary font-bold' : 'text-gray-500'}`}
        onClick={() => handleTopicClick('CancelBooking')}>Cancel Booking</button>
        <button className={`${activeTopic === 'TodayList' ? 'text-text-primary font-bold' : 'text-gray-500'}`}
        onClick={() => handleTopicClick('TodayList')}>Today List</button>
                    
      </div>            
      {/**end sub nav bar */}
             
      <div>
        {activeTopic === 'DashBoard' && <DashBoard/>}
        {activeTopic === 'CancelBooking' && <CancelBooking/>}
        {activeTopic === 'TodayList' && <TodayList/>}
      </div>

    </div>
  );
};

export default Booking;