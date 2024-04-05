import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const BookNow= () => {
    return (
        <div className="flex justify-center items-center bg-text-primary h-screen">
 
 
          <div className="box-context bg-white rounded-lg w-1/2 h-4/5">
            <div className="flex p-3 ">
              <Link to='/'>
                <ChevronLeftIcon className='h-9 w-9 text-text-primary ml-0 cursor-pointer'/>
              </Link>
                <p className="font-inter text-3xl text-text-primary font-medium mx-auto">Kalupahana Motors</p>
            </div>
          </div>
            
        </div>
    );
};

export default BookNow;