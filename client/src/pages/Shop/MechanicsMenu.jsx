import ShopHeader from "../components/ShopHeader";
import { Link } from "react-router-dom";

const MechanicsMenu = () => {
    return (
        <div>
            <ShopHeader pageName="Mechanics"/>
            <div className="h-9 bg-side-nav-bg border-b-2"/>

            <div className="flex justify-center gap-12">

              <div className="w-5/12">

                <div className="flex justify-between items-center mt-12">
                    <p className="topic text-xl">Mechanics Details</p>
                    <button className="btn btn-normal">
                      <Link to={'/shop/mechanics/add'}>Add</Link>
                    </button>
                </div>

              <div className="flex justify-center overflow-auto max-h-96 mt-10">
                <table className="mx-auto font-inter mt-4 w-11/12">
                 <tr className='bg-text-primary text-white'>
                   <th className="border-2 border-black">Employee ID</th>
                   <th className="border-2 border-black">Empolyee Name</th>
                   <th className="border-2 border-black">Specialist Area</th>
                 </tr>

                 <tr className="text-center">
                   <td className="border-2 border-black">test data</td>
                   <td className="border-2 border-black">test data</td>
                   <td className="border-2 border-black">test data</td>
                 </tr>
                
                </table>
               </div>
              </div>

              <div className="w-5/12">
                
                <div className="mt-12 card p-2">
                 
                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Employee Id : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Employee Name : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Contact Number : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Address : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Join Date : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Main specialist area : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Sub specialist area : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Resign Date : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" readOnly/>
                 </div>

                 <div className="flex justify-end my-3 mr-10">
                   <button className="btn btn-normal">
                     <Link to={'/shop/mechanics/update'}>Edit</Link>
                   </button>
                 </div>

                </div>

              </div>

            </div>

        </div>
    );
};

export default MechanicsMenu;