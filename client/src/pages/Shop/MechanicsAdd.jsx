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
      const res = await axios.get('http://localhost:8000/api/settings/getlist');
      setMechanicsList(res.data);
    }catch(err){
      console.log('Error of fetching data: ', err);
    }
  }

  useEffect( ()=> {
    fetchMechanicSpeacialistArea();
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

  //handle mechanic main are select value
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
    
  const { employeeName, employeeId,contactNumber } = addMechanic;
  const nameRegex = /^[a-zA-Z\s]*$/;
  const idRegex = /^[A-Z]+-\d+$/;
  const teleRegex = /^07[0-8]\d{7}$/;
  const emptyStringRegex = /^$/;

  if (!idRegex.test(employeeId)) {
    toast.warning("Invalid employee ID!");
    return;
  }
  if (!nameRegex.test(employeeName)) {
    toast.warning("Invalid employee name!");
    return;
  }
  if (emptyStringRegex.test(addMechanic.employeeName)) {
    toast.warning("Name can't be empty!");
    return;
  }
  
  if(!teleRegex.test(contactNumber)){
    toast.warning("Invalid contact number!");
    return;
  }
  if (emptyStringRegex.test(addMechanic.livingArea)) {
    toast.warning("Living area can't be empty!");
    return;
  }
  if (emptyStringRegex.test(addMechanic.joinDate)) {
    toast.warning("Join date can't be empty!");
    return;
  }
  let joinDate = new Date(addMechanic.joinDate);
let currentDate = new Date();

if(joinDate > currentDate){
  toast.warning("Join date can't be a future date!");
  return;
}
  if (emptyStringRegex.test(addMechanic.mainArea)) {
    toast.warning("Main specialist area can't be empty!");
    return;
  }
  

    try{
      const res = await axios.post('http://localhost:8000/api/mechanic/addmechanic', addMechanic);
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
            <ShopHeader pageName="Add Mechanic"/>
            <div className="h-9 bg-side-nav-bg border-b-2"/>

            <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

            
            <div className="flex mt-6 justify-center gap-16">

                <div className="flex items-center justify-center w-5/12">
                    <img src={worker} className="w-10/12"/>
                </div>
                <div className="w-5/12">
                  
                <div className="mt-16 card p-2">
                 
                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Employee Id : </p>
                   <input type="text" name="employeeId" value={addMechanic.employeeId} onChange={handleMechanicAdd} className="input rounded-lg p-2 w-56" maxLength={10} placeholder="EMP-0001" required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Employee Name : </p>
                   <input type="text" name="employeeName" value={addMechanic.employeeName} onChange={handleMechanicAdd} className="input rounded-lg p-2 w-56" maxLength={30} placeholder="Name here" required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Contact Number : </p>
                   <input type="text" name="contactNumber" value={addMechanic.contactNumber} onChange={handleMechanicAdd} className="input rounded-lg p-2 w-56" maxLength={10} placeholder="07 _ _ _ _ _ _ _ _" required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Living Area : </p>
                   <input type="text" name="livingArea" value={addMechanic.livingArea} onChange={handleMechanicAdd} className="input rounded-lg p-2 w-56" maxLength={40} placeholder="Village name" required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Join Date : </p>
                   <input type="date" name="joinDate" value={addMechanic.joinDate} onChange={handleMechanicAdd} className="input rounded-lg p-2 w-56" required/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Main specialist area : </p>
                   <Select className="w-56"
                    options={MainOptions}
                    isClearable
                    onChange={handleMechanicMainArea}
                    styles={customStyles}
                    placeholder="Enter main area"
                   />
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3">Sub specialist area : </p>
                   <Select className="w-56"
                    options={MainOptions}
                    isClearable
                    onChange={handleMechanicSubArea}
                    styles={customStyles}
                    placeholder="Enter sub area"
                   />
                 </div>

                 
                 <div className="flex justify-end my-3 mr-10 gap-8">
                   <button className="btn btn-warning" onClick={ ()=> setOpenCancelModal(true)}>Leave</button>
                   <button className="btn btn-normal px-6" onClick={handleAddMechanicSubmit}>Save</button>
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