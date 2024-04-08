import {UserIcon,ShieldCheckIcon,InboxIcon,HandThumbUpIcon,ChartPieIcon} from '@heroicons/react/24/solid';
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
            {/**6wner header -end */}

            <DashBoardBox/>

            {/**Owner menu- start */}
            <div className='mt-16'>

                <div className='flex justify-center gap-10 my-8'>
                  
                
                    <div className='flex box-content border-2 hover:border-teal-400 h-28 w-1/3 rounded-lg cursor-pointer'>
                      <div className='mt-2 ml-4 w-1/3'>
                         <ShieldCheckIcon className='h-24 text-text-primary'/>
                      </div>
                      <div className='font-inter m-2 hover:text-text-primary'>
                      <Link to ='/owner/security'>
                        <p className='font-semibold text-2xl'>Security</p>
                        <p className='text-sm'>Protect your account and adjust important privacy settings to your preference.</p>
                        </Link>
                      </div>
                    </div>
                    

                    <div className='flex box-content border-2  hover:border-teal-400 h-28 w-1/3 rounded-lg cursor-pointer'>
                      <div className='mt-2 ml-4 w-1/3'>
                         <InboxIcon className='h-24 text-text-primary'/>
                      </div>
                      <div className='font-inter m-2 hover:text-text-primary'>
                        <Link to='/owner/stock'>
                        <p className='font-semibold text-2xl'>Stock</p>
                        <p className='text-sm'>Manage your stocks effectively by staying updated on market trends and fluctuations.</p>
                        </Link>
                      </div>
                    </div>

                </div>

                <div className='flex justify-center gap-10 my-8'>

                    <div className='flex box-content border-2  hover:border-teal-400 h-28 w-1/3 rounded-lg cursor-pointer'>
                      <div className='mt-2 ml-4 w-1/3'>
                         <HandThumbUpIcon className='h-24 text-text-primary'/>
                      </div>
                      <div className='font-inter m-2 hover:text-text-primary'>
                        <Link to='/owner/feedbacks'>
                        <p className='font-semibold text-2xl'>Feedbacks</p>
                        <p className='text-sm'>Review client feedback to refine our services and enhance your experience.</p>
                        </Link>
                      </div>
                    </div>

                    <div className='flex box-content border-2  hover:border-teal-400 h-28 w-1/3 rounded-lg cursor-pointer'>
                    <div className='mt-2 ml-4 w-1/3'>
                         <ChartPieIcon className='h-24 pr-3 text-text-primary'/>
                      </div>
                      <div className='font-inter m-2 hover:text-text-primary'>
                        <Link to = '/owner/summary'>
                        <p className='font-semibold text-2xl'>Summary</p>
                        <p className='text-sm'>Access concise summaries to stay well-informed about your activities and make informed decisions.</p>
                        </Link>
                      </div>
                    </div>

                </div>

            </div>
            {/**Owner mwnu - end */}

        </div>
    );
};

export default Home;