import { useState, useEffect } from "react";
import { useLocation, Link,useNavigate } from 'react-router-dom';
import ShopHeader from "../components/ShopHeader";
import worker from '../assets/worker.svg';
import Modal from '../components/Modal';
import Select from 'react-select';
import customStyles from '../components/SelectStyle';
import axios from 'axios';
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { validateContactNumber,validateHumanName,validateInputField } from "../Validation/InputFeilds";


const MechanicsUpdate = () => {

  const location = useLocation();
  const { selectedRow } = location.state || {};
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [mechanicsList, setMechanicsList] = useState(null);
  const [mainAreaOption, setMainAreaOption] = useState(null);
  const [subAreaOption, setSubAreaOption] = useState(null);
  const navigate = useNavigate();
  const [newDetails, setNewDetails] = useState({
    employeeId: selectedRow?.employeeId || '',
    employeeName: selectedRow?.employeeName || '',
    contactNumber: selectedRow?.contactNumber || '',
    livingArea: selectedRow?.livingArea || '',
    joinDate: selectedRow?.joinDate || '',
    mainArea: selectedRow?.mainArea || '',
    subArea: selectedRow?.subArea || '',
    resignDate: null,
  });
  
  // Fetch mechanic specialist area to the select list
  useEffect(() => {
    const fetchMechanicSpecialistArea = async () => {
      try {
        const res = await axios.get('/api/settings/getlist');
        setMechanicsList(res.data);
        //main area create as editabke
        if (selectedRow?.mainArea) {
          const initialMainArea = res.data.find(list => list.area === selectedRow.mainArea);
          if (initialMainArea) {
            setMainAreaOption({ value: initialMainArea.area, label: initialMainArea.area });
          }
        }
        //sub area create as editable
        if (selectedRow?.subArea) {
          const initialSubArea = res.data.find(list => list.area === selectedRow.subArea);
          if (initialSubArea) {
            setSubAreaOption({ value: initialSubArea.area, label: initialSubArea.area });
          }
        }
      }catch (err) {
        console.log('Error of fetching data: ', err);
      }
    }
    fetchMechanicSpecialistArea();
  }, [selectedRow.mainArea, selectedRow.subArea]);

  // Handle mechanic data update
  const handleMechanicDataUpdate = (e) => {
    setNewDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Create options for the Select component
  const MainOptions = mechanicsList ? mechanicsList.map(list => ({
    value: list.area,
    label: `${list.area}`
  })) : [];

  // Handle mechanic main area select value
  const handleMechanicMainArea = (option) => {
    setMainAreaOption(option);
    setNewDetails(prevState => ({
      ...prevState,
      mainArea: option ? option.value : ''
    }));
  }

  // Handle mechanic sub area select value
  const handleMechanicSubArea = (option) => {
    setSubAreaOption(option);
    setNewDetails(prevState => ({
      ...prevState,
      subArea: option ? option.value : ''
    }));
  }

  const handleUpdateData = async (e) => {
    e.preventDefault();

    //use input validation
    const contactNumberErr = validateContactNumber(newDetails.contactNumber);
    const nameErr = validateHumanName(newDetails.employeeName);
    const livingErr = validateInputField(newDetails.livingArea);
    const mainErr = validateInputField(newDetails.mainArea);
  
    if(nameErr || contactNumberErr || livingErr){
      toast.warning(nameErr || contactNumberErr || "Living area can't empty!");
      return;
    }
    if(mainErr){
      toast.warning("Main Specialist Area can'y be empty!");
      return;
    }
    if (newDetails.mainArea === newDetails.subArea){
      toast.warning("Please select different specialist areas!")
      return;
    }
    if(newDetails.joinDate > newDetails.resignDate){
      toast.warning("Invalied termination date!");
      return;
    }
    if (newDetails.resignDate) {
      let resignDate = new Date(newDetails.resignDate);
      let currentDate = new Date();
      if(resignDate > currentDate){
        toast.warning("Termination date can't be a future date!");
        return;
      }
    }
    // stop data base error
    if (newDetails.subArea === "") {
      newDetails.subArea = null;
    }
    
    //handle data  update 
    try{
      const res = await axios.put('/api/mechanic/updatemechanic', newDetails);
      toast.success(res.data);
      setTimeout(() => {
        navigate("/shop/mechanics");
      }, 3000);
    }catch(err){
      toast.error(err.response.data);
    }
  }

  return (
    <div>
      <ShopHeader pageName="Update Mechanics Details" />
      <div className="h-9 bg-side-nav-bg border-b-2" />

      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

      <div className="flex justify-center gap-16">

        <div className="flex items-center justify-center w-5/12">
          <img src={worker} className="w-10/12" alt="Worker" />
        </div>
        
        {/**edit data form - start */}
        <div className="w-5/12">
          <div className="mt-12 card p-2">
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Employee Id :</p>
              <input type="text" value={newDetails.employeeId} className="input rounded-lg p-2 w-56 text-gray-600" readOnly />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Employee Name :</p>
              <input type="text" name="employeeName" value={newDetails.employeeName} className="input rounded-lg p-2 w-56" onChange={handleMechanicDataUpdate} required />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Contact Number :</p>
              <input type="text" name="contactNumber" value={newDetails.contactNumber} className="input rounded-lg p-2 w-56" onChange={handleMechanicDataUpdate} required />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Residential Area :</p>
              <input type="text" name="livingArea" value={newDetails.livingArea} className="input rounded-lg p-2 w-56" onChange={handleMechanicDataUpdate} required />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Join Date :</p>
              <input type="date" value={newDetails.joinDate} className="input rounded-lg p-2 w-56 text-gray-600" readOnly />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Main Specialist Area :</p>
              <Select className="w-56"
                options={MainOptions}
                value={mainAreaOption}
                isClearable
                onChange={handleMechanicMainArea}
                styles={customStyles}
              />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Sub Specialist Area :</p>
              <Select className="w-56"
                options={MainOptions}
                value={subAreaOption}
                isClearable
                onChange={handleMechanicSubArea}
                styles={customStyles}
              />
            </div>
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Termination date :</p>
              <input type="date" name="resignDate" value={newDetails.resignDate} className="input rounded-lg p-2 w-56" onChange={handleMechanicDataUpdate} />
            </div>
            <div className="flex justify-end my-3 mr-10 gap-8">
              <button className="btn btn-warning" onClick={() => setOpenCancelModal(true)}>Leave</button>
              <button className="btn btn-normal px-6" onClick={handleUpdateData}>Update</button>
            </div>
          </div>
        </div>
        {/** edit data form - end */}
      </div>
      
      {/**leaving modal - start */}
      <Modal open={openCancelModal}>
        <div onClick={(e) => e.stopPropagation()}>
          <p className="font-bold pb-2 text-red-600 text-2xl px-20 text-center mb-3">Leaving!</p>
          <p className="text-text-primary text-center font-semibold px-10">
           The process is not complete.<br/>
           Are you sure you want to leave?
          </p>
          <div className="flex justify-center gap-8 mt-8">
            <Link to="/shop/mechanics">
              <button className="btn btn-warning">Yes</button>
            </Link>
            <button className='btn btn-normal px-5' onClick={() => setOpenCancelModal(false)}>No</button>
          </div>
        </div>
      </Modal>
      {/**leaving modal - end */}
    </div>
  );
};

export default MechanicsUpdate;

