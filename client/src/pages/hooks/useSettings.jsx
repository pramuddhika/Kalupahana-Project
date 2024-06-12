import { useState, useEffect } from 'react';
import axios from 'axios';

const useSettings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/settings/getsettings');
        setSettings(response.data[0]);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();

    const intervalId = setInterval(fetchSettings, 60000); // Fetch settings every minute

    return () => clearInterval(intervalId);
  }, []);

  return settings;
};

export default useSettings;
