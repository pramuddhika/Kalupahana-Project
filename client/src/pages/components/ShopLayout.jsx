import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import useSettings from '../hooks/useSettings';
import axios from 'axios';
import SideNav from './SideNav';

const ShopLayout = () => {
  const location = useLocation();
  const settings = useSettings();
  const [showNextDayNotification, setShowNextDayNotification] = useState(false);
  const [nextDayCount, setNextDayCount] = useState([]);
  const [showRecordsNotification, setShowRecordsNotification] = useState(false);
  const [nextDayNotificationShown, setNextDayNotificationShown] = useState(false);
  const [recordsNotificationShown, setRecordsNotificationShown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNextDateCount = async () => {
      try {
        const res = await axios.get('/api/settings/getNextDateCount');
        setNextDayCount(res.data.count);
      } catch (err) {
        console.error('Error fetching next day count:', err);
      }
    };

    const fetchNextDateNumbers = async () => {
      try {
        const res = await axios.get('/api/settings/getNextDateNumbers');
        if (res.data.numbers.length > 0) {
          setShowRecordsNotification(true);
        }
      } catch (err) {
        console.error('Error fetching next date numbers:', err);
      }
    };

    const checkTime = () => {
      const currentTime = new Date().toTimeString().slice(0, 5);
      if (settings) {
        if (settings.nextdayTime === currentTime && location.pathname.startsWith('/shop') && !nextDayNotificationShown) {
          setShowNextDayNotification(true);
          fetchNextDateCount();
          setNextDayNotificationShown(true);
        }
        if (settings.recordsTime === currentTime && location.pathname.startsWith('/shop') && !recordsNotificationShown) {
          fetchNextDateNumbers();
          setRecordsNotificationShown(true);
        }
      }
    };

    if (settings) {
      const intervalId = setInterval(() => {
        checkTime();
        const currentMinute = new Date().getMinutes();
        // Reset notification shown states at the start of a new minute
        if (currentMinute !== new Date().getMinutes()) {
          setNextDayNotificationShown(false);
          setRecordsNotificationShown(false);
        }
      }, 60000); // Check every minute
      checkTime(); // Initial check

      return () => clearInterval(intervalId);
    }
  }, [settings, location.pathname, nextDayNotificationShown, recordsNotificationShown]);

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

      <Modal open={showRecordsNotification} onClose={() => setShowRecordsNotification(false)}>
        <div onClick={(e) => e.stopPropagation()}>
          <div className='text-center pt-2'>
            <p className='mainStyle'>Click here to see</p>
            <p className='mainStyle'>the details of</p>
            <p className='mainStyle'>vehicles arriving today</p>
          </div>
          <div className="flex justify-center">
          <button className="btn btn-warning mx-auto mt-2" onClick={() => {setShowRecordsNotification(false);
          navigate('/shop/today');}}>Ok</button>
          </div>
        </div>
      </Modal>

      <div className='flex h-screen'>
        <div className="w-[180px]">
          <SideNav/>
        </div>
        <div className="w-calc">
         <Outlet />
        </div>
      </div>
      
    </div>
  );
};

export default ShopLayout;
