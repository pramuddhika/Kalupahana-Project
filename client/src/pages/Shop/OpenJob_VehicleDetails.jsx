import ShopHeader from "../components/ShopHeader";
import register from '../assets/newVehicleAdd.svg';
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { validateHumanNIC } from '../Validation/InputFeilds.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {validateContactNumber,validateHumanName,validateEmail} from '../Validation/InputFeilds.js';

const OpenJob_VehicleDetails = () => {

  const [isCustomerVisible,setIsCustomerVisible] = useState(true);
  const [isOldCustomer, setISOldCustomer] = useState(true);
  const location = useLocation();
  const [vehicleNumber] = useState(location.state?.vehicleNumber);
  const [NICnumber,setNICnumber] = useState(location.state?.NICnumber);
  const [customerName,setCustomerName] = useState("");
  const [customerEmail,setCustomerEmail] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [brand,setBrand] = useState("");
  const [model,setModel] = useState("");
  const [fuleType,setFuleType] = useState("");
  

  //handle NIC number changes
  const handleNICchange = (e) => {
    setNICnumber(e.target.value);
  }

  

  //handle NIC search
  const handleNICNumber = async (e) => {
    e.preventDefault();
    
    //validate NIC number
    const NICerror =  validateHumanNIC(NICnumber);
    if(NICerror){
      toast.error(NICerror);
      return;
    }
    
    try{
      //search customer data from database
      const resCustomer = await axios.get(`http://localhost:8000/api/openjob/getCustomer/${NICnumber}`);
      
      //if customer id new to shop
      if(resCustomer.data.message === "New customer!"){
        toast.info('New customer!')
        setTimeout( () => {
          setISOldCustomer(false);
        },2000);
        return;
      }
      if(resCustomer.data.checkCustomer.length === 0){
        toast.error("Something wrong!");
        return;
      }else{
        setCustomerName(resCustomer.data.checkCustomer[0].name);
        setCustomerEmail(resCustomer.data.checkCustomer[0].email);
        setCustomerPhoneNumber(resCustomer.data.checkCustomer[0].phoneNumber);
        //move to next step
        setISOldCustomer(false);
        return;
      }
    }catch(err){
      if(err.response){
        toast.error(err.response.data);
      } else {
        console.log(err.message);
      }
    }
  }


  const handleCustomethOtherDetails = (e) => {
    e.preventDefault();

    //validate iser inputs
    const nameError = validateHumanName(customerName);
    const emailError = validateEmail(customerEmail);
    const phoneError = validateContactNumber(customerPhoneNumber);

    if(nameError){
      toast.warning(nameError);
      return;
    }
    if(emailError){
      toast.warning(emailError);
      return;
    }
    if(phoneError){
      toast.warning(phoneError);
      return;
    }

    setIsCustomerVisible(false);
  }

  const handleCustomerDetailBack = () => {
    setISOldCustomer(true);
  }

  const handleVehicleDetails = () => {

  }

  const handleVehicleDetailsBack = () => {
    setIsCustomerVisible(true);
  }
  
  // nic number get form 
  const idSerach = (
  <div className="card gap-12 box-content w-5/6 h-88 ">
     <p className="topic ml-4 text-2xl mt-5">Customer Details</p>
     
     <div className="flex justify-center items-center mt-20">
        <div className="basis-1/4">
         <p className="mainStyle">NIC Number:</p>
        </div>
        <div className="basis-1/2">
          <input type="text" className="input rounded-lg ml-4 p-2 w-60" value={NICnumber} 
          onChange={handleNICchange} placeholder="NIC here" maxLength={12}/>
        </div>
     </div>

     <div className="flex justify-center mt-8" onClick={handleNICNumber}>
       <button className="btn btn-normal">Search</button>
     </div>    
  </div>
  );

  //get customer other detail
  const otherDetails = (
  <div className="card gap-12 box-content w-5/6 h-88 ">
    <p className="topic ml-4 text-2xl mt-5">Customer Details</p>

      <form className="p-4 mt-7">

        <div className="flex justify-center items-center p-2 mt-3">
          <div className="w-36 mainStyle"><p>Customer Name:</p></div>
          <div className="basis-1/2">
            <input type="text" className="input rounded-lg ml-4 p-2 w-60" value={customerName} onChange={ (e)=> setCustomerName(e.target.value)}
             placeholder="Name here" maxLength={20}/>
          </div>
        </div>

        <div className="flex justify-center items-center p-2">
          <div className="w-36 mainStyle"><p>Email:</p></div>
          <div className="basis-1/2">
            <input type="email" className="input rounded-lg ml-4 p-2 w-60" value={customerEmail} onChange={ (e)=> setCustomerEmail(e.target.value)}
             placeholder="Email here" maxLength={55}/>
          </div>
        </div>

        <div className="flex justify-center items-center p-2">
          <div className="w-36 mainStyle"><p>Contact Number:</p></div>
          <div className="basis-1/2">
            <input type="number" className="input rounded-lg ml-4 p-2 w-60" value={customerPhoneNumber}   onChange={ (e)=> setCustomerPhoneNumber(e.target.value)}
             placeholder="07_ _ _ _ _ _ _ _" maxLength={10}/>
          </div>
        </div>

      </form>

      <div className="flex justify-center gap-6 mt-4 mb-4">
        <button className="btn btn-warning" onClick={handleCustomerDetailBack}>Backr</button>
        <button className="btn btn-normal px-5" onClick={handleCustomethOtherDetails}>Next</button>
      </div>

  </div>
);

//controll customer data input forms
const customerDetails = (
  <>
    {isOldCustomer ? idSerach : otherDetails }
  </>
);

const vehicleDetails = (
  <div className="card gap-12 box-content w-5/6 h-88 ">
    <p className="topic ml-4 text-2xl mt-5">Vehicle Details</p>

    <form className="p-4">

      <div className="flex justify-center items-center p-2">
       <div className="w-36 mainStyle"><p>Vehicle Number:</p></div>
       <div className="basis-1/2">
          <input type="text" className="input rounded-lg ml-4 p-2 w-60" value={vehicleNumber} readOnly/>
       </div>
      </div>

      <div className="flex justify-center items-center p-2">
        <div className="w-36 mainStyle"><p>Brand:</p></div>
        <div className="basis-1/2">
          <input type="text" className="input rounded-lg ml-4 p-2 w-60" value={brand} onChange={(e)=> setBrand(e.target.value)} placeholder="Vehicle Brand here"/>
        </div>
      </div>

      <div className="flex justify-center items-center p-2">
        <div className="w-36 mainStyle"><p>Model:</p></div>
        <div className="basis-1/2">
          <input type="text" className="input rounded-lg ml-4 p-2 w-60" value={model} onChange={(e)=> setModel(e.target.value)} placeholder="Vehicle Model here"/>
        </div>
      </div>

      <div className="flex justify-center items-center p-2">
        <div className="w-36 mainStyle"><p>Fule Type:</p></div>
        <div className="basis-1/2">
          <input type="text" className="input rounded-lg ml-4 p-2 w-60" value={fuleType} onChange={(e)=> setFuleType(e.target.value)} placeholder="Vehicle Fule here"/>
        </div>
      </div>

    </form>

    <div className="flex justify-center gap-6 mt-4 mb-4">
      <button className="btn btn-warning" onClick={handleVehicleDetailsBack}>Back</button>
      <button className="btn btn-normal px-5" onClick={handleVehicleDetails}>Submit</button>
    </div>

  </div>
);


    return (
        <div>
            <ShopHeader pageName="New Vehicle Registration"/>
            <div className="h-9 bg-side-nav-bg border-b-2 "/>

            <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>


            <div className="flex justify-center mt-28 w-11/12 ">

            <div className="w-1/3 mx-auto">
              <img src={register}/>
            </div>

            <div className="flex justify-center w-1/2">
              {isCustomerVisible ? customerDetails : vehicleDetails}
            </div>

            </div>

        </div>
    );
};

export default OpenJob_VehicleDetails;