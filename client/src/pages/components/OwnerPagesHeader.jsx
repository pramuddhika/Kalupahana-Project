import {UserIcon,HomeIcon} from '@heroicons/react/24/solid'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

const OwnerPagesHeader = ({pageName}) => {
    return (
        <div className="flex justify-between w-full h-16 bg-side-nav-bg border-b-2 ">
          
          <div className='flex items-center pl-4 gap-4'>
            <Link to='/owner'>
             <HomeIcon className='h-8 w-8 text-text-primary rounded-2xl p-1 '/>
            </Link>
            <p className='text-text-primary font-inter font-bold text-3xl'>{pageName}</p>
          </div>

          <div className='flex items-center pr-5 gap-4'>
                <p className='font-inter tex text-text-primary font-medium'>The Owner</p>
                <UserIcon className='h-8 w-8 text-white bg-text-primary rounded-2xl p-1 '/>
          </div>
            
        </div>
    );
};

OwnerPagesHeader.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default OwnerPagesHeader;