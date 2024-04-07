import {UserIcon,ShieldCheckIcon,InboxIcon,HandThumbUpIcon,ChartPieIcon} from '@heroicons/react/24/solid';
import DashBoardBox from '../components/DashBoardBox';
 
const Home = () => {
    return (
        <div className='h-screen'>
            {/**6wner header -start */}
            <div className="flex h-16 w-full bg-side-nav-bg border-b-2 justify-between">
             <p className="flex items-center font-inter font-bold pl-5 text-2xl text-text-primary">
                Kalupahana Motors
             </p>
             <div className='flex items-center pr-5 gap-4'>
                <UserIcon className='h-8 w-8 text-white bg-text-primary rounded-2xl p-1 '/>
                <p className='font-inter tex text-text-primary font-medium'>The Owner</p>
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
                      <div className='font-inter m-2'>
                        <p className='font-semibold text-2xl'>Security</p>
                      </div>
                    </div>

                    <div className='flex box-content border-2  hover:border-teal-400 h-28 w-1/3 rounded-lg cursor-pointer'>
                      <div className='mt-2 ml-4 w-1/3'>
                         <InboxIcon className='h-24 text-text-primary'/>
                      </div>
                      <div className='font-inter m-2'>
                        <p className='font-semibold text-2xl'>Stock</p>
                      </div>
                    </div>

                </div>

                <div className='flex justify-center gap-10 my-8'>

                    <div className='flex box-content border-2  hover:border-teal-400 h-28 w-1/3 rounded-lg cursor-pointer'>
                      <div className='mt-2 ml-4 w-1/3'>
                         <HandThumbUpIcon className='h-24 text-text-primary'/>
                      </div>
                      <div className='font-inter m-2'>
                        <p className='font-semibold text-2xl'>Feedbacks</p>
                      </div>
                    </div>

                    <div className='flex box-content border-2  hover:border-teal-400 h-28 w-1/3 rounded-lg cursor-pointer'>
                    <div className='mt-2 ml-4 w-1/3'>
                         <ChartPieIcon className='h-24 text-text-primary'/>
                      </div>
                      <div className='font-inter m-2'>
                        <p className='font-semibold text-2xl'>Summary</p>
                      </div>
                    </div>

                </div>

            </div>
            {/**Owner mwnu - end */}

        </div>
    );
};

export default Home;