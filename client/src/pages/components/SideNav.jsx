import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Cog8ToothIcon,
  ArrowUturnLeftIcon,
  HandThumbUpIcon,
  BookmarkIcon,
  BriefcaseIcon,
  WrenchScrewdriverIcon,
  InboxIcon,
  IdentificationIcon,
  ChartBarIcon,
  FolderPlusIcon,
} from '@heroicons/react/24/solid';

const SideNav = () => {
  const [showSubset, setShowSubset] = useState(() => {
    // Retrieve the initial value from localStorage
    const savedState = localStorage.getItem('showSubset');
    return savedState === 'true';
  });

  const toggleSubset = () => {
    setShowSubset((prev) => {
      const newState = !prev;
      // Save the new state to localStorage
      localStorage.setItem('showSubset', newState); 
      return newState;
    });
  };

  const [activeBar, setActiveBar] = useState('booking');
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split('/')[2];
    setActiveBar(currentPath);
  }, [location]);

  return (
    <div>

      <div className="fixed top-0 left-0 w-[180px] border-2 border-l-gray-400 bg-side-nav-bg h-screen">

        <div className="font-inter text-text-primary p-4 mb-8">
          <p className="flex font-bold text-xl justify-center">Kalupahana</p>
          <p className="flex justify-end font-semibold mr-6">Motors</p>
        </div>

        <div className="font-inter text-text-primary">

          <Link to='/shop/booking'>
            <div className={`flex pl-7 gap-1 hover:text-white hover:bg-text-primary rounded-lg p-2 cursor-pointer 
            ${activeBar === 'booking' ? 'text-white bg-text-primary':''}`} 
            onClick={() => setActiveBar('booking')}>
              <BookmarkIcon className='h-6 w-6'/>
              <p className='flex items-center'>Booking</p>
            </div>
          </Link>

          <div className='flex pl-7 gap-1 rounded-lg p-2 cursor-pointer hover:text-white hover:bg-text-primary' 
          onClick={toggleSubset}>
            <BriefcaseIcon className='h-6 w-6 '/>
            <p>Jobs</p>
          </div>

          {showSubset && (
          <div id='subset'>

            <Link to='/shop/openJob'>
              <div className={`flex pl-11 gap-1 hover:text-white hover:bg-text-primary rounded-lg p-2 cursor-pointer 
              ${activeBar === 'openJob' ? 'text-white bg-text-primary':''}`} 
              onClick={() => setActiveBar('openJob')}>
                <FolderPlusIcon className='h-6 w-6'/>
                <p>Open</p>
              </div>
            </Link>

            <Link to='/shop/updateJob'>
              <div className={`flex pl-11 gap-1 hover:text-white hover:bg-text-primary rounded-lg p-2 cursor-pointer 
              ${activeBar === 'updateJob' ? 'text-white bg-text-primary':''}`} 
              onClick={() => setActiveBar('updateJob')}>
                 <ChartBarIcon className='h-6 w-6'/>
                 <p>Update</p>
              </div>
            </Link>

            <Link to='/shop/records'>
              <div className={`flex pl-11 gap-1 hover:text-white hover:bg-text-primary rounded-lg p-2 cursor-pointer 
              ${activeBar === 'records' ? 'text-white bg-text-primary':''}`} 
              onClick={() => setActiveBar('records')}>
                 <IdentificationIcon className='h-6 w-6'/>
                 <p>Record</p>
              </div>
            </Link>

          </div>)}

          <Link to='/shop/feedbacks'>
            <div className={`flex pl-7 gap-1 hover:text-white hover:bg-text-primary rounded-lg p-2 cursor-pointer 
            ${activeBar === 'feedbacks' ? 'text-white bg-text-primary':''}`} 
            onClick={() => setActiveBar('feedbacks')}>
              <HandThumbUpIcon className='h-6 w-6 '/>
              <p>Feedbacks</p>
            </div>
          </Link>

          <Link to='/shop/mechanics'>
            <div className={`flex pl-7 gap-1 hover:text-white hover:bg-text-primary rounded-lg p-2 cursor-pointer 
            ${activeBar === 'mechanics' ? 'text-white bg-text-primary':''}`} 
            onClick={() => setActiveBar('mechanics')}>
              <WrenchScrewdriverIcon className='h-6 w-6 '/>
              <p>Mechanics</p>
            </div>
          </Link>

          <Link to='/shop/stock'>
            <div className={`flex pl-7 gap-1 hover:text-white hover:bg-text-primary rounded-lg p-2 cursor-pointer 
            ${activeBar === 'stock' ? 'text-white bg-text-primary':''}`} 
            onClick={() => setActiveBar('stock')}>
              <InboxIcon className='h-6 w-6 '/>
              <p>Stock</p>
            </div>
          </Link>

          <Link to='/shop/setting'>
            <div className={`flex pl-7 gap-1 hover:text-white hover:bg-text-primary rounded-lg p-2 cursor-pointer 
            ${activeBar === 'setting' ? 'text-white bg-text-primary':''}`} 
            onClick={() => setActiveBar('setting')}>
              <Cog8ToothIcon className='h-6 w-6'/>
              <p className='flex items-center'>Settings</p>
            </div>
          </Link>

        </div>

        <div className="font-inter text-text-primary w-[180px]">

          <Link to='/'>
            <div className='fixed flex pl-7 w-[180px] gap-1 hover:text-white hover:bg-text-primary rounded-lg p-2 cursor-pointer bottom-10'>
              <ArrowUturnLeftIcon className='h-6 w-6 '/>
              <p>Log out</p>                    
            </div>
          </Link>

        </div>

      </div>
      
    </div>
  );
};

export default SideNav;
