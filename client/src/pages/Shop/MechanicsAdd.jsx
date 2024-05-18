import ShopHeader from "../components/ShopHeader";
import worker from '../assets/worker.svg';
import Modal from '../components/Modal';
import { useState } from "react";
import { Link } from "react-router-dom";

const MechanicsAdd = () => {

  const [openCancelModal,setOpenCancelModal] = useState(false);
  const [mechanicsList, setMechanicsList] = useState(null);

    return (
        <div>
            <ShopHeader pageName="Add Mechanic"/>
            <div className="h-9 bg-side-nav-bg border-b-2"/>
            
            <div className="flex mt-6 justify-center gap-16">

                <div className="flex items-center justify-center w-5/12">
                    <img src={worker} className="w-10/12"/>
                </div>
                <div className="w-5/12">
                  
                <div className="mt-16 card p-2">
                 
                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Employee Id : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" maxLength={10} required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Employee Name : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" maxLength={30} required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Contact Number : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" maxLength={10} required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Living Area : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" maxLength={40} required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Join Date : </p>
                   <input type="date" className="input rounded-lg p-2 w-56" required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Main specialist area : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" maxLength={30} required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Sub specialist area : </p>
                   <input type="text" className="input rounded-lg p-2 w-56" maxLength={30}/>
                 </div>

                 
                 <div className="flex justify-end my-3 mr-10 gap-8">
                   <button className="btn btn-warning" onClick={ ()=> setOpenCancelModal(true)}>Leave</button>
                   <button className="btn btn-normal px-6">Save</button>
                 </div>

                </div>

                </div>
            </div>


          {/**delete modal - start */}
          <Modal open={openCancelModal}>
          <div onClick={(e) => e.stopPropagation()}>
         <p className="font-bold pb-2 text-red-600 text-2xl px-20 text-center mb-3">Warning!</p>
         <p className="text-text-primary text-center font-semibold px-10 ">Are you sure you want to leave?</p>




          <div className="flex justify-center gap-8 mt-8">
           <Link to="/shop/mechanics">
           <button className="btn btn-warning">Yes</button>
           </Link>
           <button className='btn btn-normal px-5' onClick={ ()=> setOpenCancelModal(false)}>No</button>
         </div>
       </div>   
     </Modal>
     {/**delete modal - end   */}


        </div>
    );
};

export default MechanicsAdd;