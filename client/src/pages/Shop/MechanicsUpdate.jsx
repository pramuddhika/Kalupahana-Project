



import { useState } from "react";
import { useLocation, Link } from 'react-router-dom';

import ShopHeader from "../components/ShopHeader";
import worker from '../assets/worker.svg';
import Modal from '../components/Modal';

const MechanicsUpdate = () => {
  const location = useLocation();
  const { selectedRow } = location.state || {};

  const [openCancelModal, setOpenCancelModal] = useState(false);

  return (
    <div>
      <ShopHeader pageName="Update Mechanics" />
      <div className="h-9 bg-side-nav-bg border-b-2" />
      <div className="flex justify-center gap-16">
        <div className="flex items-center justify-center w-5/12">
          <img src={worker} className="w-10/12" alt="Worker" />
        </div>
        <div className="w-5/12">
          <div className="mt-12 card p-2">
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3">Employee Id :</p>
              <input type="text" value={selectedRow?.employeeId || ''} className="input rounded-lg p-2 w-56" readOnly />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3">Employee Name :</p>
              <input type="text" value={selectedRow?.employeeName || ''} className="input rounded-lg p-2 w-56" required />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3">Contact Number :</p>
              <input type="text" value={selectedRow?.contactNumber || ''} className="input rounded-lg p-2 w-56" required />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3">Address :</p>
              <input type="text" value={selectedRow?.livingArea || ''} className="input rounded-lg p-2 w-56" required />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3">Join Date :</p>
              <input type="text" value={selectedRow?.joinDate || ''} className="input rounded-lg p-2 w-56" required />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3">Main specialist area :</p>
              <input type="text" value={selectedRow?.mainArea || ''} className="input rounded-lg p-2 w-56" required />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3">Sub specialist area :</p>
              <input type="text" value={selectedRow?.subArea || ''} className="input rounded-lg p-2 w-56" />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3">Resign Date :</p>
              <input type="text" value={selectedRow?.resignDate || ''} className="input rounded-lg p-2 w-56" />
            </div>
            <div className="flex justify-end my-3 mr-10 gap-8">
              <button className="btn btn-warning" onClick={() => setOpenCancelModal(true)}>Leave</button>
              <button className="btn btn-normal px-6">Update</button>
            </div>
          </div>
        </div>
      </div>
      <Modal open={openCancelModal}>
        <div onClick={(e) => e.stopPropagation()}>
          <p className="font-bold pb-2 text-red-600 text-2xl px-20 text-center mb-3">Warning!</p>
          <p className="text-text-primary text-center font-semibold px-10">Are you sure you want to leave?</p>
          <div className="flex justify-center gap-8 mt-8">
            <Link to="/shop/mechanics">
              <button className="btn btn-warning">Yes</button>
            </Link>
            <button className='btn btn-normal px-5' onClick={() => setOpenCancelModal(false)}>No</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MechanicsUpdate;
