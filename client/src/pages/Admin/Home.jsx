import {UserIcon,ShieldCheckIcon,RectangleGroupIcon,CalendarDaysIcon,HandThumbUpIcon,ChartPieIcon} from '@heroicons/react/24/solid';
import DashBoardBox from '../components/DashBoardBox';
import {Link} from 'react-router-dom';
 
const Home = () => {
    return (
        <div className='h-screen'>
            {/**6wner header -start */}
            <div className="flex h-16 w-full bg-side-nav-bg border-b-2 justify-between">
             <p className="flex items-center font-inter font-bold pl-5 text-2xl text-text-primary">
                Kalupahana Motors
             </p>
             <div className='flex items-center pr-5 gap-4'>
                <p className='font-inter tex text-text-primary font-medium'>The Owner</p>
                <UserIcon className='h-8 w-8 text-white bg-text-primary rounded-2xl p-1 '/>
             </div>
            </div>
            {/**owner header -end */}

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