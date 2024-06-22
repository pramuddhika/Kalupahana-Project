import {ShieldCheckIcon,
        RectangleGroupIcon,
        CalendarDaysIcon,
        ChartPieIcon} from '@heroicons/react/24/solid';
import DashBoardBox from '../components/DashBoardBox';
import OwnerPagesHeader from "../components/OwnerHeader";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

 
const Home = () => {

  const OwnerHomeCard = ({ linkTo, title, description, Icon }) => {
    return (
      <div>
        <div className='ownerHomeCard'>
          <div className='flex'>
            <div className='mt-4 ml-2 w-1/4'>
              <Icon className='text-text-primary'/>
            </div>
            <div className='w-3/4 p-3 hover:text-text-primary'>
              <Link to ={linkTo}>
                <p className='text-2xl font-bold'>{title}</p>
                <p className='text-sm text-left'>{description}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='h-screen'>
      <OwnerPagesHeader pageName='Kalupahana Motors'/>

      <DashBoardBox/>

      <div className='mt-16'>
 
        <div className='flex justify-center w-10/12 mx-auto my-5 gap-10'>

          <OwnerHomeCard
            linkTo='/owner/security'
            title='Security'
            description='Protect your account and adjust important privacy settings to your preference.'
            Icon={ShieldCheckIcon}
          />

          <OwnerHomeCard
            linkTo='/owner/stock'
            title='Stock'
            description='Manage your stocks effectively by staying updated on market trends and fluctuations.'
            Icon={RectangleGroupIcon}
          />

        </div>

        <div className='flex justify-center w-10/12 mx-auto gap-10'>

          <OwnerHomeCard
            linkTo='/owner/booking'
            title='Booking'
            description='Enabling effortless tracking of upcoming bookings ensures smooth operations.'
            Icon={CalendarDaysIcon}
          />

          <OwnerHomeCard
            linkTo='/owner/summary'
            title='Summary'
            description='Access concise summaries to stay well-informed about your activities and make informed decisions.'
            Icon={ChartPieIcon}
          />

        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  linkTo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

export default Home;