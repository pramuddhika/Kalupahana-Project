import ShopHeader from "../components/ShopHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TrashIcon} from '@heroicons/react/24/solid';
import { useEffect, useState } from "react";
import axios from "axios";



const ShopSetting = () => {

  const [totalSpace, setTotalSpace] = useState (0);
  const [currentTotalSpace,setCurrentTotalSpace] = useState(null);
  const [bookingSpace,setBookingSpace] = useState(0);
  const [currentBookingSpace,setCurrentBookingSpace] = useState(null);
  const [nextdayTime, setNextdayTime] = useState('00:00');
  const [recordsTime,setRecordsTime] = useState('00:00');
  const [refresh,setRefresh] = useState(false);

  //fetch setting table data
  const fetchSettingData = async() => {
    try{
      const res = await axios.get('http://localhost:8000/api/settings/getsettings');
      setTotalSpace(res.data[0].totalSpace);
      setCurrentTotalSpace(res.data[0].totalSpace);
      setBookingSpace(res.data[0].bookingSpace);
      setCurrentBookingSpace(res.data[0].bookingSpace);
      setNextdayTime(res.data[0].nextdayTime);
      setRecordsTime(res.data[0].recordsTime);
    }catch(err){
      console.log('Error fetching data :' , err);
    }
  }

  useEffect ( ()=> {
    fetchSettingData();
  },[refresh])

  //handle totalspace change
  const handleTotalSpaceChange = (e) => {
    setTotalSpace(e.target.value);
    
  }
  //handle booking space change
  const handleBookingSpaceChnage = (e) => {
    setBookingSpace(e.target.value);
  }

  const handleSpaceSubmit = async (e) => {
    e.preventDefault();
   //check user change data
   if( currentTotalSpace === totalSpace && currentBookingSpace === bookingSpace){
    toast.warning('No changes to update!');
    return;
   }
   //check Spaces for Emergency repairs > 0
   if( (totalSpace-bookingSpace) < 0 ) {
    toast.warning('Wrong data Input!');
    setRefresh(!refresh);
    return;
   }
   try{
    const res = await axios.put('http://localhost:8000/api/settings/updatespaces', {totalSpace,bookingSpace});
    setRefresh(!refresh);
    toast.success(res.data);
   }catch(err){
    toast.error(err.response.data);
   }

  }
  
  const handleNextdayTimeChange = async (e) => {
    setNextdayTime(e.target.value);
    console.log(nextdayTime);
  }
  
  
    return (
        <div>
            <ShopHeader pageName="Settings" />
            
            <div className="h-9 bg-side-nav-bg border-b-2"/>

            <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

            {/**space change settigns - start */}
            <div className="card w-11/12 mx-auto my-5 p-4">
                <p className="topic">Repairing Spaces</p>

                <div className="flex gap-24 mt-3 justify-center">

                    <div className="flex items-center gap-3">
                      <p>Total Spaces</p>  
                      <input type="number" value={totalSpace} min="0" onChange={handleTotalSpaceChange}  className="w-16 p-1 rounded-lg outline-none border-2 text-center"/>
                    </div>
                    <div className="flex items-center gap-3">
                       <p>Spaces for Online Booking</p>
                       <input type="number" min="0" value={bookingSpace} onChange={handleBookingSpaceChnage}  className="w-16 rounded-lg p-1 outline-none text-center border-2"/>
                    </div>
                    <div className="flex items-center gap-3">
                       <p>Spaces for Emergency repairs</p>
                       <input  min="0" value={Math.max(totalSpace - bookingSpace, 0)} className="w-16 bg-white rounded-lg outline-none p-1 border-2 text-center" readOnly/>
                    </div> 
                      
                </div>
                <div className="flex mt-3 mr-20 justify-end">
                 <button className='btn btn-normal px-6'
                  
                  onClick={handleSpaceSubmit}>Update</button>
                </div>
                
            </div>
            {/**space change settigns - end */}

            {/**tommorow booking notification time - satrt */}
            <div className="card w-11/12 mx-auto my-5 p-4">
                <p className="topic">Next day reservation notification time</p>

                <div className="flex gap-48 mt-3 justify-center">

                    <div className="flex gap-3 items-center">
                      <p>set new time</p>  
                      <input type="time" value={nextdayTime} onChange={handleNextdayTimeChange} className="p-2 rounded-lg outline-none border-2 pl-4"/>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                       <p>current time :</p>
                       <input  value={nextdayTime} className="bg-white p-2 rounded-lg outline-none border-2 text-center w-36" readOnly/>
                    </div>   

                    <div className="flex justify-end">
                     <button className='btn btn-normal' onClick={handleNexdayTimeSubmit}>Set Time</button>
                    </div>
                </div>
            </div>
            {/**tommorow booking notification time - end */}

            {/**Today reseved vehile past report time - satrt */}
            <div className="card w-11/12 mx-auto my-5 p-4">
                <p className="topic">Records check time</p>

                <div className="flex gap-48 mt-3 justify-center">

                    <div className="flex gap-3 items-center">
                      <p>set new time</p>  
                      <input type="time" className="p-2 rounded-lg outline-none border-2 pl-4"/>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                       <p>current time :</p>
                       <input value={recordsTime}  className="bg-white p-2 rounded-lg outline-none border-2 text-center w-36" readOnly/>
                    </div>   

                    <div className="flex justify-end">
                     <button className='btn btn-normal'>Set Time</button>
                    </div>
                </div>
            </div>
            {/**Today reseved vehile past report time - end */}


            {/**add holidays - start */}
            <div className="card mt-4 w-11/12 mx-auto p-4">
              <p className="topic w-36">Add Holidays</p>
              
              <div className="flex gap-5">

                <div className="w-1/2">
                 <div className="p-4 flex justify-center items-center">
                  
                   <button className="btn btn-normal ml-4">Add</button>
                 </div>
                 
               </div>

                <div className="flex justify-center w-1/2 p-4">
                  <div className="flex justify-center overflow-auto max-h-80">
                   <table className="mx-auto font-inter w-11/12">
                     <tr className='bg-text-primary text-white'>
                       <th className="border-2 border-black w-60">Date</th>
                       <th className="border-2 border-black w-36">Action</th>
                     </tr>

                      <tr className="text-center">
                        <td className="border-2 border-black">test data</td>
                        <td className="border-2 border-black">
                        <button className="w-24 m-1">
                          <TrashIcon className='text-red-600 h-5 mx-auto'/>
                        </button>
                        </td>
                      </tr>
                    </table>
                  </div>

                </div>

              </div>
            </div>
            {/**add holidays - end */}

            {/**mechanics specialist ares - start */}
            <div className="card mt-4 w-11/12 mx-auto p-4 mb-4">
              <p className="topic w-64">Mechanics Specialist Areas</p>
              
              <div className="flex gap-5">

                <div className="w-1/2">
                 <div className="p-4 flex justify-center items-center">
                   <input type="text" className="input rounded-lg p-2"/>
                   {/* <button className="btn btn-normal ml-4" onClick={handleHolidayeAdd}>Add</button> */}
                 </div>
                 
               </div>

                <div className="flex justify-center w-1/2 p-4">
                  <div className="flex justify-center overflow-auto max-h-80">
                   <table className="mx-auto font-inter w-11/12">
                     <tr className='bg-text-primary text-white'>
                       <th className="border-2 border-black w-60">Specialist Area</th>
                       <th className="border-2 border-black w-36">Action</th>
                     </tr>

                      <tr className="text-center">
                        <td className="border-2 border-black">test data</td>
                        <td className="border-2 border-black cursor-pointer">
                          <TrashIcon className='text-red-600 h-5 mx-auto'/>
                        </td>
                      </tr>
                      
                    </table>
                  </div>

                </div>

              </div>
            </div>
            {/**mechnicss specialist ares -end */}


        </div>
    );
};

export default ShopSetting;