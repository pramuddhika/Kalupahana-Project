import records from "../assets/records.svg";
import PropTypes from 'prop-types';

const Records_Search = ({setActiveTopic}) => {
    return (
        <div>
            
            <div className="flex mt-28">
               <div className='w-1/2'>
                  <img src={records} className='h-96 mx-auto mt-6'/>
               </div>
               <div className="w-1/2">
                 <div className='flex items-center card gap-12 box-content w-2/3 h-32 mt-32'>
                   <input type='text' placeholder='Enter vehicle number' className='rounded-lg p-2 ml-6 outline-none' />
                   <button className='bg-text-primary text-white px-6 py-2 rounded-lg'
                   onClick={ ()=> setActiveTopic('Records_Details')}>Search</button>
                 </div>
              </div>
            </div>

        </div>
    );
};

Records_Search.propTypes = {
    setActiveTopic: PropTypes.func.isRequired,
  };

export default Records_Search;