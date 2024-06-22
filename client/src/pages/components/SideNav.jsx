import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Cog8ToothIcon,ArrowUturnLeftIcon,BookmarkIcon,BriefcaseIcon,WrenchScrewdriverIcon,
  InboxIcon,IdentificationIcon,ChartBarIcon,FolderPlusIcon,} from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

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

  const [activeBar, setActiveBar] = useState('');
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split('/')[2];
    setActiveBar(currentPath);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
  };

  const NavItem = ({ to, icon: Icon, label, isActive, onClick, additionalClasses = '' }) => (
    <Link to={to}>
      <div 
        className={`flex pl-7 gap-1 hover:text-white hover:bg-text-primary rounded-lg p-2 cursor-pointer 
        ${isActive ? 'text-white bg-text-primary' : ''} ${additionalClasses}`} 
        onClick={onClick}
      >
        <Icon className='h-6 w-6' />
        <p className='flex items-center'>{label}</p>
      </div>
    </Link>
  );

  return (
    <div className="fixed top-0 left-0 w-[180px] border-2 border-l-gray-400 bg-side-nav-bg h-screen">
      <div className="font-inter text-text-primary p-4 mb-8">
        <p className="flex font-bold text-xl justify-center">Kalupahana</p>
        <p className="flex justify-end font-semibold mr-6">Motors</p>
      </div>

      <div className="font-inter text-text-primary">

        <NavItem 
          to='/shop/booking'
          icon={BookmarkIcon}
          label='Booking'
          isActive={activeBar === 'booking'}
          onClick={() => setActiveBar('booking')}
        />

        <div className={`flex pl-7 gap-1 rounded-lg p-2 cursor-pointer hover:text-white hover:bg-text-primary
        ${showSubset ? 'border border-gray-300 font-bold' : ''}`} 
        onClick={toggleSubset}>
          <BriefcaseIcon className='h-6 w-6 '/>
          <p>Jobs</p>
        </div>

        {showSubset && (
          <div id='subset'>
            <NavItem 
              to='/shop/openJob'
              icon={FolderPlusIcon}
              label='Open'
              isActive={activeBar === 'openJob'}
              onClick={() => setActiveBar('openJob')}
              additionalClasses='pl-11'
            />
            <NavItem 
              to='/shop/updateJob'
              icon={ChartBarIcon}
              label='Update'
              isActive={activeBar === 'updateJob'}
              onClick={() => setActiveBar('updateJob')}
              additionalClasses='pl-11'
            />
            <NavItem 
              to='/shop/records'
              icon={IdentificationIcon}
              label='Record'
              isActive={activeBar === 'records'}
              onClick={() => setActiveBar('records')}
              additionalClasses='pl-11'
            />
          </div>
        )}

        <NavItem 
          to='/shop/mechanics'
          icon={WrenchScrewdriverIcon}
          label='Mechanics'
          isActive={activeBar === 'mechanics'}
          onClick={() => setActiveBar('mechanics')}
        />
        <NavItem 
          to='/shop/stock'
          icon={InboxIcon}
          label='Stock'
          isActive={activeBar === 'stock'}
          onClick={() => setActiveBar('stock')}
        />
        <NavItem 
          to='/shop/setting'
          icon={Cog8ToothIcon}
          label='Settings'
          isActive={activeBar === 'setting'}
          onClick={() => setActiveBar('setting')}
        />

      </div>

      <div className="font-inter text-text-primary w-[180px]">
        <Link to='/'>
          <div className='fixed flex pl-7 w-[180px] gap-1 hover:text-white hover:bg-text-primary rounded-lg p-2 cursor-pointer bottom-10' 
            onClick={handleLogout}>
            <ArrowUturnLeftIcon className='h-6 w-6 '/>
            <p>Log out</p>                    
          </div>
        </Link>
      </div>
    </div>
  );
};


SideNav.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  additionalClasses: PropTypes.string,
};

export default SideNav;