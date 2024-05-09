import ShopHeader from "../components/ShopHeader";
import worker from '../assets/worker.svg';

const MechanicsUpdate = () => {
    return (
        <div>
          <ShopHeader pageName="Update Mechanics"/>
          <div className="h-9 bg-side-nav-bg border-b-2"/>

          <div className="flex justify-center gap-16">
                <div className="flex items-center justify-center w-5/12">
                    <img src={worker} className="w-10/12"/>
                </div>
                <div className="w-5/12">
                  
                <div className="mt-12 card p-2">
                 
                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Employee Id : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Employee Name : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Contact Number : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Address : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Join Date : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Main specialist area : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Sub specialist area : </p>
                   <input type="text" className="input rounded-lg p-2 w-56"/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Resign Date : </p>
                   <input type="text" className="input rounded-lg p-2 w-56"/>
                 </div>

                 <div className="flex justify-end my-3 mr-10 gap-8">
                   <button className="btn btn-warning">Cancel</button>
                   <button className="btn btn-normal px-6">Update</button>
                 </div>

                </div>

                </div>
            </div>

        </div>
    );
};

export default MechanicsUpdate;