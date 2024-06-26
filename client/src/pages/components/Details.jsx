import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { UpdateJob_Context } from '../Shop/UpdateJob_Context';



const Details = () => {

   const { updateJobData} = useContext(UpdateJob_Context)

    return (
        <div className="mt-20 mr-4">

          <div className="card p-6  font-inter">
             
             <div className="flex justify-center items-center text-text-primary my-3">
                <p className="font-semibold w-36">Vehicle Number:</p>
                <input type="text" className="input rounded-lg p-2 w-48 pl-4" value={updateJobData[0].vehicleNumber} readOnly/>
             </div>

             <div className="flex justify-center items-center text-text-primary my-3">
                <p className="font-semibold w-36">Job Id:</p>
                <input type="text" className="input rounded-lg p-2 w-48 pl-4" value={updateJobData[0].jobId} readOnly/>
             </div>

             <div className="flex justify-center items-center text-text-primary my-3">
                <p className="font-semibold w-36">Customer Name:</p>
                <input type="text" className="input rounded-lg p-2 w-48 pl-4" value={updateJobData[0].customer} readOnly/>
             </div>

             <div className="text-text-primary my-3">
                <p className="font-semibold w-36 pl-6 p-2">Vehicle Fault:</p>
                <textarea rows={5} className="input rounded-lg p-2 w-80 text-sm ml-10" value={updateJobData[0].fault} readOnly/>
             </div>

             <div className="flex justify-center mt-4">
                <button className="btn btn-normal">
                  <Link to={'/shop/updateJob/moredata'}>See more</Link>
                </button>
             </div>

          </div>
            
        </div>
    );
    
};

export default Details;