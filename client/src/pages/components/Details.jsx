import {Link} from 'react-router-dom';

const Details = () => {
    return (
        <div className="mt-20 mr-4">

          <div className="card p-6  font-inter">
             
             <div className="flex justify-center items-center text-text-primary my-3">
                <p className="font-semibold w-36">Vehicle Number:</p>
                <input type="text" className="input rounded-lg p-2 w-48 text-center" readOnly/>
             </div>

             <div className="flex justify-center items-center text-text-primary my-3">
                <p className="font-semibold w-36">Job Id:</p>
                <input type="text" className="input rounded-lg p-2 w-48 text-center" readOnly/>
             </div>

             <div className="flex justify-center items-center text-text-primary my-3">
                <p className="font-semibold w-36">Customer Name:</p>
                <input type="text" className="input rounded-lg p-2 w-48 text-center" readOnly/>
             </div>

             <div className="text-text-primary my-3">
                <p className="font-semibold w-36 pl-6 p-2">Vehicle Fault:</p>
                <textarea rows={5} className="input rounded-lg p-2 w-80 text-center text-sm ml-10" readOnly/>
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