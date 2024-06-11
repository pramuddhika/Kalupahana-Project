import {ShieldCheckIcon,
  RectangleGroupIcon,
  CalendarDaysIcon,
  HandThumbUpIcon,
  ChartPieIcon} from '@heroicons/react/24/solid';
import DashBoardBox from '../components/DashBoardBox';
import {Link} from 'react-router-dom';
import OwnerPagesHeader from "../components/OwnerPagesHeader";

 
const Home = () => {

    return (
        <div className='h-screen'>
            <OwnerPagesHeader pageName='Kalupahana Motors'/>

            <DashBoardBox/>

            {/**Owner menu - start */}
            <div className='mt-16'>
 
              <div className='flex w-10/12 mx-auto my-5 gap-10'>

                <div className='ownerHomeCard'>
                 <div className='flex'>
                   <div className='mt-4 ml-2 w-1/4'>
                      <ShieldCheckIcon className='text-text-primary'/>
                   </div>
                   <div className='w-3/4 p-3 hover:text-text-primary'>
                      <Link to ='/owner/security'>
                       <p className='text-2xl font-bold'>Security</p>
                       <p className='text-sm text-left'>Protect your account and adjust important privacy settings to your preference.</p>
                      </Link>
                   </div>
                 </div>
                </div>


                <div className='ownerHomeCard'>
                 <div className='flex'>
                   <div className='mt-4 ml-2 w-1/4'>
                      <RectangleGroupIcon className='text-text-primary'/>
                   </div>
                   <div className='w-3/4 p-3 hover:text-text-primary'>
                      <Link to ='/owner/stock'>
                       <p className='text-2xl font-bold'>Stock</p>
                       <p className='text-sm text-left'>Manage your stocks effectively by staying updated on market trends and fluctuations.</p>
                      </Link>
                   </div>
                 </div>
                </div>


                <div className='ownerHomeCard'>
                 <div className='flex'>
                   <div className='mt-4 ml-2 w-1/4'>
                      <CalendarDaysIcon className='text-text-primary'/>
                   </div>
                   <div className='w-3/4 p-3 hover:text-text-primary'>
                      <Link to ='/owner/booking'>
                       <p className='text-2xl font-bold'>Booking</p>
                       <p className='text-sm text-left'>Enabling effortless tracking of upcoming bookings ensures smooth operations.</p>
                      </Link>
                   </div>
                 </div>
                </div>

              </div>


              <div className='flex w-10/12 mx-auto gap-10'>

                <div className='ownerHomeCard'>
                 <div className='flex'>
                   <div className='mt-4 ml-2 w-1/4'>
                      <HandThumbUpIcon className='text-text-primary'/>
                   </div>
                   <div className='w-3/4 p-3 hover:text-text-primary'>
                      <Link to ='/owner/feedbacks'>
                       <p className='text-2xl font-bold'>Feedbacks</p>
                       <p className='text-sm text-left'>Review client feedback to refine our services and enhance your experience.</p>
                      </Link>
                   </div>
                 </div>
                </div>


                <div className='ownerHomeCard'>
                 <div className='flex'>
                   <div className='mt-4 ml-2 w-1/4'>
                      <ChartPieIcon className='text-text-primary'/>
                   </div>
                   <div className='w-3/4 p-3 hover:text-text-primary'>
                      <Link to ='/owner/summary'>
                       <p className='text-2xl font-bold'>Summary</p>
                       <p className='text-sm text-left'>Access concise summaries to stay well-informed about your activities and make informed decisions.</p>
                      </Link>
                   </div>
                 </div>
                </div>

              </div>

            </div>
            {/**Owner menu - end */}

        </div>
    );
};

export default Home;