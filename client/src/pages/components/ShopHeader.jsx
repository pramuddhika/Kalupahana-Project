import {BuildingStorefrontIcon} from '@heroicons/react/24/solid'
import PropTypes from 'prop-types';

const ShopHeader = ({ pageName }) => {
        return (
            <div className="bg-side-nav-bg h-12 flex justify-between">
      <p className="text-text-primary font-inter font-bold text-3xl p-3">{pageName}</p>
      <div className='flex items-center gap-2 p-3'>
        <p className='text-text-primary font-inter text-lg font-medium'>The Shop</p>
        <BuildingStorefrontIcon className='w-8 h-8 bg-text-primary rounded-2xl text-white p-2 mr-3'/>
      </div>
    </div>
        );
};

ShopHeader.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default ShopHeader;