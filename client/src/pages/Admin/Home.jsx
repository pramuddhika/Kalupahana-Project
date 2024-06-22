import {ShieldCheckIcon,
        RectangleGroupIcon,
        CalendarDaysIcon,
        ChartPieIcon} from '@heroicons/react/24/solid';
import DashBoardBox from '../components/DashBoardBox';
import OwnerPagesHeader from "../components/Owner-Pages-Header";
import OwnerHomeCard from '../components/Owner-Home-Card';

 
const Home = () => {
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

export default Home;