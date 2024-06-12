import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useSettings from '../hooks/useSettings';
import Notification from './Next';
import { Outlet } from 'react-router-dom';

const ShopLayout = () => {
  const location = useLocation();
  const settings = useSettings();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date().toTimeString().slice(0, 5);
      if (settings && settings.nextdayTime === currentTime && location.pathname.startsWith('/shop')) {
        setShowNotification(true);
      } else {
        setShowNotification(false);
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
      {showNotification && <Notification message="It's time for the next day's task!" />}
      <Outlet />
    </div>
  );
};

export default ShopLayout;
