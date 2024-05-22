import ShopHeader from "../components/ShopHeader";
import register from '../assets/newVehicleAdd.svg';
import { useState } from "react";

const OpenJob_VehicleDetails = () => {

  const [isCustomerVisible,setIsCustomerVisible] = useState(true);
  const [isOldCustomer, setISOldCustomer] = useState(true);

  const handleNICNumber = () => {
     setISOldCustomer(false);
  }

  const handleCustomethOtherDetails = () => {
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
          <input type="text" className="input rounded-lg ml-4 p-2 w-60" placeholder="NIC here"/>
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
            <input type="text" className="input rounded-lg ml-4 p-2 w-60" placeholder="Name here"/>
          </div>
        </div>

        <div className="flex justify-center items-center p-2">
          <div className="w-36 mainStyle"><p>Email:</p></div>
          <div className="basis-1/2">
            <input type="email" className="input rounded-lg ml-4 p-2 w-60" placeholder="Email here"/>
          </div>
        </div>

        <div className="flex justify-center items-center p-2">
          <div className="w-36 mainStyle"><p>Contact Number:</p></div>
          <div className="basis-1/2">
            <input type="number" className="input rounded-lg ml-4 p-2 w-60" placeholder="07_ _ _ _ _ _ _ _"/>
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
          <input type="text" className="input rounded-lg ml-4 p-2 w-60" placeholder="AAA-0001 or AA-0001"/>
       </div>
      </div>

      <div className="flex justify-center items-center p-2">
        <div className="w-36 mainStyle"><p>Brand:</p></div>
        <div className="basis-1/2">
          <input type="text" className="input rounded-lg ml-4 p-2 w-60" placeholder="Vehicle Brand here"/>
        </div>
      </div>

      <div className="flex justify-center items-center p-2">
        <div className="w-36 mainStyle"><p>Model:</p></div>
        <div className="basis-1/2">
          <input type="text" className="input rounded-lg ml-4 p-2 w-60" placeholder="Vehicle Model here"/>
        </div>
      </div>

      <div className="flex justify-center items-center p-2">
        <div className="w-36 mainStyle"><p>Fule Type:</p></div>
        <div className="basis-1/2">
          <input type="text" className="input rounded-lg ml-4 p-2 w-60" placeholder="Vehicle Fule here"/>
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