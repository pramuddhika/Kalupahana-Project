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
  const [nextdayTime, setNextdayTime] = useState(null);
  const [initialNextdayTime,setInitialNextdayTime] = useState(null);
  const [recordsTime,setRecordsTime] = useState(null);
  const [initialRecordsTime,setInitialRecordsTime] = useState(null);
  const [date,setDate] = useState(null);
  const [speciallistArea,setSpecialistArea] = useState('');
  const [list,setList] = useState(null);
  const [days,setDays] = useState(null);
  const [refresh,setRefresh] = useState(false);

  //fetch setting table data
  const fetchSettingData = async() => {
    try{
      const res = await axios.get('http://localhost:8000/api/settings/getsettings');
      setTotalSpace(res.data[0].totalSpace);
      setCurrentTotalSpace(res.data[0].totalSpace);
      setBookingSpace(res.data[0].bookingSpace);
      setCurrentBookingSpace(res.data[0].bookingSpace);
      setInitialNextdayTime(res.data[0].nextdayTime);
      setInitialRecordsTime(res.data[0].recordsTime);
    }catch(err){
      console.log('Error fetching data :' , err);
    }
  }

  //fetch specialoist Ares list to table
  const fetchSpecialistArea = async() => {
    try{
      const res = await axios.get('http://localhost:8000/api/settings/getlist');
      setList(res.data);
    }catch(err){
      console.log('Error fetching data :' , err);
    }
  }

  //fetching holidays to the table
  const fetchHolidays = async() => {
    try{
      const res = await axios.get('http://localhost:8000/api/settings/getholidays');
      setDays(res.data);
    }catch(err){
      console.log('Error fetching data :' , err)
    }
  }

  useEffect ( ()=> {
    fetchSettingData();
    fetchSpecialistArea();
    fetchHolidays();
    setNextdayTime(null);
    setRecordsTime(null);
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
   //check values are positive
   if( (totalSpace < 0 || bookingSpace< 0)){
    toast.warning('Invalid number entered!')
    setRefresh(!refresh);
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
    toast.success(res.data);
   }catch(err){
    toast.error(err.response.data);
   }finally{
    setRefresh(!refresh);
   }
  }
  
  //handle next day reservation notification time
  const handleNextdayTimeChange = async (e) => {
    setNextdayTime(e.target.value);
  }
  
  //handel next day notification time update
  const handleNexdayTimeSubmit = async (e) => {
    e.preventDefault();
    //check changes are make or not
    if(nextdayTime === null){
      toast.warning('No changes to update!');
      return;
    }
    if(nextdayTime === initialNextdayTime ){
      toast.warning('No changes to update!');
      return;
    }

    try{
      const res = await axios.put('http://localhost:8000/api/settings/updatenextdaytime', {nextdayTime});
      setNextdayTime('');
      toast.success(res.data);
    }catch(err){
      toast.error(err.response.data);
    }finally{
      setRefresh(!refresh);
    }
  }

  //handle record time change
  const handleRecordTimeChange = async (e) => {
    setRecordsTime(e.target.value);
  }

  //handle record time update
  const handleRecordTimeSubmit = async(e) => {
    e.preventDefault();
    //check changes are make or not
    if(recordsTime === null){
      toast.warning('No changes to update!');
      return;
    }
    if(recordsTime === initialRecordsTime ){
      toast.warning('No changes to update!');
      return;
    }
    try{
      const res = await axios.put('http://localhost:8000/api/settings/recordcheck', {recordsTime});
      toast.success(res.data);
    }catch(err){
      toast.error(err.response.data);
    }finally{
      setRecordsTime('');
      setRefresh(!refresh);
    }
  }
  
  //handle holiiday change
  const handleDatesChange = (e) => {
    setDate(e.target.value);
  }

  //handle holiday adding
  const HandleDateSubmit = async (e) => {
    e.preventDefault();
    //handle date input
    if(days.length === 0){
      toast.warning('No changes to update!');
      return;
    }

    try{
      const res = await axios.post('http://localhost:8000/api/settings/addholidays', {date});
      toast.success(res.data);
    }catch(err){
      toast.error(err.response.data);
    }finally{
      setRefresh(!refresh);
      setDate('');
    }
  }

  //handle specialist area 
  const handleChangeArea = (e) => {
    setSpecialistArea(e.target.value);
  }

  const handleSubmitArea = async (e) => {
    e.preventDefault();
    if(speciallistArea === ''){
      toast.warning('No changes to update!');
      return;
    }
    try{
      const res = await axios.post('http://localhost:8000/api/settings/Addspecialistarea', {speciallistArea});
      toast.success(res.data);
    }catch(err){
      toast.error(err.response.data);
    }finally{
      setSpecialistArea('');
      setRefresh(!refresh);
    }
  }

  //handel specialalist area delete
  const handleDeleteClick = async (deleteArea) => {
    try{
    const res = await axios.delete(`http://localhost:8000/api/settings/deletearea/${deleteArea}`);
      // Remove the deleted area from the state
      setList(list.filter(list => list.area !== deleteArea));
      toast.success(res.data);
    }catch(err){
      toast.error(err.response.data);
    }finally{
      setRefresh(!refresh);
    }
  }

  //handel holiday removing
    const handleHolidayDeleteClick = async (deletedate) => {
    try{
      const res = await axios.delete(`http://localhost:8000/api/settings/deleteholidays/${deletedate}`);
      // Remove the holiday area from the state
      setDays(days.filter(days => days.holidays !== deletedate));
      toast.success(res.data);
    }catch(err){
      toast.error(err.response.data);
    }finally{
      setRefresh(!refresh);
    }
  }
  
  
  return (
    <div>
      <ShopHeader pageName="Settings"/>
            
      <div className="h-9 bg-side-nav-bg border-b-2"/>

       <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

        {/**space change settigns - start */}
        <div className="card w-11/12 mx-auto my-5 p-4">
          <p className="topic">Repairing Spaces</p>

          <div className="flex gap-24 mt-3 justify-center">

            <div className="flex items-center gap-3">
             <p>Total Spaces</p>  
             <input type="number" value={totalSpace} min="0" onChange={handleTotalSpaceChange}  
              className="w-16 p-1 rounded-lg outline-none border-2 text-center"/>
            </div>
            
            <div className="flex items-center gap-3">
              <p>Spaces for Online Booking</p>
              <input type="number" min="0" value={bookingSpace} onChange={handleBookingSpaceChnage}  
              className="w-16 rounded-lg p-1 outline-none text-center border-2"/>
            </div>

            <div className="flex items-center gap-3">
              <p>Spaces for Emergency repairs</p>
              <input  min="0" value={Math.max(totalSpace - bookingSpace, 0)} 
              className="w-16 bg-white rounded-lg outline-none p-1 border-2 text-center" readOnly/>
            </div> 
                      
          </div>

          <div className="flex mt-3 mr-20 justify-end">
            <button className='btn btn-normal px-6'onClick={handleSpaceSubmit}>Update</button>
          </div>  
        </div>
        {/**space change settigns - end */}

        {/**tommorow booking notification time - satrt */}
        <div className="card w-11/12 mx-auto my-5 p-4">
          <p className="topic">Next day reservation notification time</p>

          <div className="flex gap-48 mt-3 justify-center">

           <div className="flex gap-3 items-center">
             <p>set new time</p>  
             <input type="time" value={nextdayTime} onChange={handleNextdayTimeChange} 
             className="p-2 rounded-lg outline-none border-2 pl-4"/>
           </div>
                    
           <div className="flex gap-3 items-center">
             <p>current time :</p>
             <input  value={initialNextdayTime} 
             className="bg-white p-2 rounded-lg outline-none border-2 text-center w-36" readOnly/>
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
             <input type="time" value={recordsTime} onChange={handleRecordTimeChange} 
             className="p-2 rounded-lg outline-none border-2 pl-4"/>
            </div>
                    
            <div className="flex gap-3 items-center">
             <p>current time :</p>
             <input value={initialRecordsTime} 
             className="bg-white p-2 rounded-lg outline-none border-2 text-center w-36" readOnly/>
            </div>   

            <div className="flex justify-end">
              <button className='btn btn-normal' onClick={handleRecordTimeSubmit}>Set Time</button>
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
                <input type="date" value={date} className="input  rounded-lg p-2 pl-4 w-60" onChange={handleDatesChange} />
                <button className="btn btn-normal ml-4" onClick={HandleDateSubmit}>Add</button>
              </div>   
            </div>

            <div className="flex justify-center w-1/2 p-4">
              <div className="flex justify-center overflow-auto max-h-80">
                <table className="mx-auto font-inter w-11/12">
                  <tr className='bg-text-primary text-white'>
                  <th className="border-2 border-black w-60">Date</th>
                  <th className="border-2 border-black w-36">Action</th>
                </tr>

                {days === null || days.length === 0  ? (
                <tr>
                  <td colSpan={2} className="text-center border-2 border-black py-2">No data to display</td>
                </tr>
                ) : (
                days && days.map( (days, index) => (
                <tr key={index} className="text-center">
                  <td className="border-2 border-black">{days.holidays}</td>
                  <td className="border-2 border-black cursor-pointer" onClick={() => handleHolidayDeleteClick(days.holidays)}>
                    <TrashIcon className='text-red-600 h-5 mx-auto'/>
                  </td>
                </tr>
                )))}
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
                <input type="text" className="input rounded-lg p-2" value={speciallistArea} maxLength='30'
                onChange={handleChangeArea} placeholder="Add area"/>
                <button className="btn btn-normal ml-4" onClick={handleSubmitArea} >Add</button>
              </div> 
            </div>

            <div className="flex justify-center w-1/2 p-4">
              <div className="flex justify-center overflow-auto max-h-80">
                <table className="mx-auto font-inter w-11/12">
                  <tr className='bg-text-primary text-white'>
                   <th className="border-2 border-black w-60">Specialist Area</th>
                   <th className="border-2 border-black w-36">Action</th>
                  </tr>

                  {list === null || list.length === 0  ? (
                  <tr>
                    <td colSpan={2} className="text-center border-2 border-black py-2">No data to display</td>
                  </tr>
                  ) : (
                  list && list.map( (list, index) => (
                  <tr key={index} className="text-center">
                    <td className="border-2 border-black">{list.area}</td>
                    <td className="border-2 border-black cursor-pointer" onClick={() => handleDeleteClick(list.area)}>
                      <TrashIcon className='text-red-600 h-5 mx-auto'/>
                    </td>
                  </tr>
                  )))} 
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