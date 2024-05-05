

const Details = () => {
    return (
        <div className="mt-28 mr-4">

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

             <div className="flex justify-center items-center text-text-primary my-3">
                <p className="font-semibold w-36">Contact Number:</p>
                <input type="text" className="input rounded-lg p-2 w-48 text-center" readOnly/>
             </div>

             <div className="flex justify-center items-center text-text-primary my-3">
                <p className="font-semibold w-36">Vehicle Model:</p>
                <input type="text" className="input rounded-lg p-2 w-48 text-center" readOnly/>
             </div>

             <div className="flex justify-center mt-4">
                <button className="btn btn-normal">Eddit</button>
             </div>

          </div>
            
        </div>
    );
};

export default Details;