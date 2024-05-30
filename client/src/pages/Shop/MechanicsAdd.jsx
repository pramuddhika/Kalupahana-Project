import ShopHeader from "../components/ShopHeader";
import worker from '../assets/worker.svg';
import Modal from '../components/Modal';
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import Select from 'react-select';
import customStyles from '../components/SelectStyle';
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { validateContactNumber,validateHumanName,validateInputField } from "../Validation/InputFeilds";

const MechanicsAdd = () => {

  const [openCancelModal,setOpenCancelModal] = useState(false);
  const [mechanicsList, setMechanicsList] = useState(null);
  const [addMechanic,setAddMechanic] = useState({
    employeeId:"",
    employeeName:"",
    contactNumber:"",
    livingArea:"",
    joinDate:"",
    mainArea:"",
    subArea:""
  })
  const navigate = useNavigate();

  //fetch mechanoc specalist are to the select list
  const fetchMechanicSpeacialistArea = async () => {
    try{
      const res = await axios.get('/api/settings/getlist');
      setMechanicsList(res.data);
    }catch(err){
      console.log('Error of fetching data: ', err);
    }
  }

  //fetch mechanic id
  const fetchEmployeeId = async () => {
    try{
      const res = await axios.get('/api/mechanic/generateEmployeeId');
      setAddMechanic(prevState => ({
        ...prevState,
        employeeId: res.data.EmployeeId
      }));
    }catch(err){
      console.log('Error fetting Employee ID:', err);
    }
  }

  useEffect( ()=> {
    fetchMechanicSpeacialistArea();
    fetchEmployeeId();
  },[]);

  //prepare main specialist area list
  const MainOptions = mechanicsList ? mechanicsList.map(list => ({
    value: list.area,
    label: `${list.area}`
  })):[];

  //handle addd mechanic data inputs
  const handleMechanicAdd = (e) => {
    setAddMechanic( (pre) => ({...pre,[e.target.name]: e.target.value}));
  }

  //handle mechanic main area select value
  const handleMechanicMainArea = (options) => {
    setAddMechanic(prevState => ( {
      ...prevState,
      mainArea: options ? options.value : ''
    }))
  }

  //handle mechanic main are select value
  const handleMechanicSubArea = (options) => {
    setAddMechanic(prevState => ( {
      ...prevState,
      subArea: options ? options.value : ''
    }))
  }

  //handle add mechanic data submit
  const handleAddMechanicSubmit = async (e) => {
    e.preventDefault();
    
    //use input validation
    const contactNumberErr = validateContactNumber(addMechanic.contactNumber);
    const nameErr = validateHumanName(addMechanic.employeeName);
    const livingErr = validateInputField(addMechanic.livingArea);
    const joinErr = validateInputField(addMechanic.joinDate);
    const mainErr = validateInputField(addMechanic.mainArea);
  
    if(nameErr || contactNumberErr || livingErr){
      toast.warning(nameErr || contactNumberErr || "Living area can't empty!");
      return;
    }
    if(joinErr){
      toast.warning("Join date can't be empty!");
      return;
    }
    let date = new Date(addMechanic.joinDate);
    let currentDate = new Date();
    if(date > currentDate){
     toast.warning("Join date can't be a future date!");
     return;
    }
    if(mainErr){
      toast.warning("Main Specialist Area can'y be empty!");
      return;
    }
    if (addMechanic.mainArea === addMechanic.subArea){
      toast.warning("Please select different specialist areas!")
      return;
    }
    // stop data base error
    if (addMechanic.subArea === "") {
      addMechanic.subArea = null;
    }

    //handle add data
    try{
      const res = await axios.post('/api/mechanic/addmechanic', addMechanic);
      toast.success(res.data);
      setTimeout(() => {
        navigate("/shop/mechanics");
      }, 2000);
    }catch(err){
      toast.error(err.response.data);
    }
  }

  return (
    <div>
      <ShopHeader pageName="Mechanic Registration"/>
      <div className="h-9 bg-side-nav-bg border-b-2"/>

      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

            
      <div className="flex mt-6 justify-center gap-16">

        <div className="flex items-center justify-center w-5/12">
          <img src={worker} className="w-10/12"/>
        </div>
                
        <div className="w-5/12">  
          <div className="mt-16 card p-2">
                 
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Employee Id : </p>
              <input type="text" name="employeeId" value={addMechanic.employeeId}
              className="input rounded-lg p-2 w-56" readOnly/>
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Employee Name : </p>
              <input type="text" name="employeeName" value={addMechanic.employeeName} onChange={handleMechanicAdd} 
              className="input rounded-lg p-2 w-56" maxLength={30} placeholder="Mechanic's Name" required/>
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Contact Number : </p>
              <input type="text" name="contactNumber" value={addMechanic.contactNumber} onChange={handleMechanicAdd} 
              className="input rounded-lg p-2 w-56" maxLength={10} placeholder="07 _ _ _ _ _ _ _ _" required/>
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Residential Area : </p>
              <input type="text" name="livingArea" value={addMechanic.livingArea} onChange={handleMechanicAdd} 
              className="input rounded-lg p-2 w-56" maxLength={40} placeholder="City Name" required/>
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Join Date : </p>
              <input type="date" name="joinDate" value={addMechanic.joinDate} onChange={handleMechanicAdd} 
              className="input rounded-lg p-2 w-56" required/>
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Main Specialist Area : </p>
              <Select className="w-56"
                options={MainOptions}
                isClearable
                onChange={handleMechanicMainArea}
                styles={customStyles}
                placeholder="Enter Main Area"
              />
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Sub Specialist Area : </p>
              <Select className="w-56"
                options={MainOptions}
                isClearable
                onChange={handleMechanicSubArea}
                styles={customStyles}
                placeholder="Enter Sub Area"
              />
            </div>

            <div className="flex justify-end my-3 mr-10 gap-8">
              <button className="btn btn-warning" onClick={ ()=> setOpenCancelModal(true)}>Leave</button>
              <button className="btn btn-normal px-6" onClick={handleAddMechanicSubmit}>Save</button>
            </div>

          </div>
        </div>
      </div>


      {/**leave modal - start */}
      <Modal open={openCancelModal}>
        <div onClick={(e) => e.stopPropagation()}>
         <p className="font-bold pb-2 text-red-600 text-2xl px-20 text-center mb-3">Leaving!</p>
         <p className="text-text-primary text-center font-semibold px-10 ">
           The process is not complete.<br/>
           Are you sure you want to leave?
         </p>

         <div className="flex justify-center gap-8 mt-8">
           <Link to="/shop/mechanics">
             <button className="btn btn-warning">Yes</button>
           </Link>
           <button className='btn btn-normal px-5' onClick={ ()=> setOpenCancelModal(false)}>No</button>
         </div>
       </div>   
      </Modal>
      {/**leave modal - end   */}
    </div>
  );
};

export default MechanicsAdd;