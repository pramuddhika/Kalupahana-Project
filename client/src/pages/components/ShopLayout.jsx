import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Modal from '../components/Modal';
import useSettings from '../hooks/useSettings';
import axios from 'axios';

const ShopLayout = () => {
  const location = useLocation();
  const settings = useSettings();
  const [showNextDayNotification, setShowNextDayNotification] = useState(false);
  const [nextDayCount, setNextDayCount] = useState(0);

  useEffect(() => {
    const fetchNextDateCount = async () => {
      try {
        const response = await axios.get('/api/settings/getNextDateCount');
        setNextDayCount(response.data.count);
      } catch (error) {
        console.error('Error fetching next day count:', error);
      }
    };

    const checkTime = () => {
      const currentTime = new Date().toTimeString().slice(0, 5);
      if (settings && settings.nextdayTime === currentTime && location.pathname.startsWith('/shop')) {
        setShowNextDayNotification(true);
        fetchNextDateCount();
      } else {
        setShowNextDayNotification(false);
      }
    };

    if (settings) {
      const intervalId = setInterval(checkTime, 60000); // Check every minute
      checkTime(); // Initial check

      return () => clearInterval(intervalId);
    }
  }, [settings, location.pathname]);

  return (
    <div>
      <Modal open={showNextDayNotification} onClose={() => setShowNextDayNotification(false)}>
        <div onClick={(e) => e.stopPropagation()}>
          <div className='text-center pt-2'>
            <p className='mainStyle'>Get ready for tomorrow</p>
            <p className='text-7xl text-green-500 font-semibold'>{nextDayCount}</p>
            <p className='mainStyle'>Vehicles will arrive.</p>
          </div>
          <div className="flex justify-center">
            <button className="btn btn-warning mx-auto mt-2" onClick={() => setShowNextDayNotification(false)}>Ok</button>
          </div>
        </div>
      </Modal>
      <Outlet />
    </div>
  );
};

export default ShopLayout;
