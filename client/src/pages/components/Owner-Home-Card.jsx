import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

OwnerHomeCard.propTypes = {
    linkTo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
};

export default OwnerHomeCard;