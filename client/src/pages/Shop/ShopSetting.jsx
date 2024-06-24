import ShopHeader from "../components/ShopHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from "react";
import { getSettings, getSpecialistAreaList, getHolidays,addHoliday,deleteHoliday,
  updateSpaces, updateNextDayTime, updateRecordTime, addSpecialistArea, deleteSpecialistArea} from '../api/Shop-Settings';

const ShopSetting = () => {
  const [totalSpace, setTotalSpace] = useState(0);
  const [currentTotalSpace, setCurrentTotalSpace] = useState(null);
  const [bookingSpace, setBookingSpace] = useState(0);
  const [currentBookingSpace, setCurrentBookingSpace] = useState(null);
  const [nextdayTime, setNextdayTime] = useState(null);
  const [initialNextdayTime, setInitialNextdayTime] = useState(null);
  const [recordsTime, setRecordsTime] = useState(null);
  const [initialRecordsTime, setInitialRecordsTime] = useState(null);
  const [date, setDate] = useState(null);
  const [speciallistArea, setSpecialistArea] = useState('');
  const [list, setList] = useState(null);
  const [days, setDays] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Fetch setting data
  const fetchSettingData = async () => {
    try {
      const data = await getSettings();
      setTotalSpace(data[0].totalSpace);
      setCurrentTotalSpace(data[0].totalSpace);
      setBookingSpace(data[0].bookingSpace);
      setCurrentBookingSpace(data[0].bookingSpace);
      setInitialNextdayTime(data[0].nextdayTime);
      setInitialRecordsTime(data[0].recordsTime);
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  };

  // Fetch specialist area list
  const fetchSpecialistArea = async () => {
    try {
      const data = await getSpecialistAreaList();
      setList(data);
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  };

  // Fetch holidays
  const fetchHolidays = async () => {
    try {
      const data = await getHolidays();
      setDays(data);
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchSettingData();
    fetchSpecialistArea();
    fetchHolidays();
    setNextdayTime(null);
    setRecordsTime(null);
  }, [refresh]);

  // Handle total space change
  const handleTotalSpaceChange = (e) => {
    setTotalSpace(e.target.value);
  };

  // Handle booking space change
  const handleBookingSpaceChnage = (e) => {
    setBookingSpace(e.target.value);
  };

  // Handle space submit
  const handleSpaceSubmit = async (e) => {
    e.preventDefault();
    if (currentTotalSpace === totalSpace && currentBookingSpace === bookingSpace) {
      toast.warning('No changes to update!');
      return;
    }
    if (totalSpace < 0 || bookingSpace < 0) {
      toast.warning('Invalid number entered!');
      setRefresh(!refresh);
      return;
    }
    if (totalSpace - bookingSpace < 0) {
      toast.warning('Wrong data input!');
      setRefresh(!refresh);
      return;
    }
    try {
      const res = await updateSpaces(totalSpace, bookingSpace);
      toast.success(res);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setRefresh(!refresh);
    }
  };

  // Handle next day time change
  const handleNextdayTimeChange = (e) => {
    setNextdayTime(e.target.value);
  };

  // Handle next day time submit
  const handleNexdayTimeSubmit = async (e) => {
    e.preventDefault();
    if (nextdayTime === null || nextdayTime === initialNextdayTime) {
      toast.warning('No changes to update!');
      return;
    }
    try {
      const res = await updateNextDayTime(nextdayTime);
      setNextdayTime('');
      toast.success(res);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setRefresh(!refresh);
    }
  };

  // Handle record time change
  const handleRecordTimeChange = (e) => {
    setRecordsTime(e.target.value);
  };

  // Handle record time submit
  const handleRecordTimeSubmit = async (e) => {
    e.preventDefault();
    if (recordsTime === null || recordsTime === initialRecordsTime) {
      toast.warning('No changes to update!');
      return;
    }
    try {
      const res = await updateRecordTime(recordsTime);
      toast.success(res);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setRecordsTime('');
      setRefresh(!refresh);
    }
  };

  // Handle date change
  const handleDatesChange = (e) => {
    setDate(e.target.value);
  };

  // Handle holiday add
  const HandleDateSubmit = async (e) => {
    e.preventDefault();
    if (date === null) {
      toast.warning('No changes to update!');
      return;
    }
    try {
      const res = await addHoliday(date);
      toast.success(res.message);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setRefresh(!refresh);
      setDate('');
    }
  };

  // Handle specialist area change
  const handleChangeArea = (e) => {
    setSpecialistArea(e.target.value);
  };

  // Handle specialist area add
  const handleSubmitArea = async (e) => {
    e.preventDefault();
    if (speciallistArea === '') {
      toast.warning('No changes to update!');
      return;
    }
    try {
      const res = await addSpecialistArea(speciallistArea);
      toast.success(res);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setSpecialistArea('');
      setRefresh(!refresh);
    }
  };

  // Handle specialist area delete
  const handleDeleteClick = async (deleteArea) => {
    try {
      const res = await deleteSpecialistArea(deleteArea);
      // Remove the deleted area from the state
      setList(list.filter(list => list.area !== deleteArea));
      toast.success(res);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setRefresh(!refresh);
    }
  };

  // Handle holiday delete
  const handleHolidayDeleteClick = async (deletedate) => {
    try {
      const res = await deleteHoliday(deletedate);
      // Remove the deleted date from the state
      setDays(days.filter(days => days.holidays !== deletedate));
      toast.success(res);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setRefresh(!refresh);
    }
  };
  
  
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
             <p className="mainStyle">Total Spaces</p>  
             <input type="number" value={totalSpace} min="0" onChange={handleTotalSpaceChange}  
              className="w-16 p-1 rounded-lg outline-none border-2 text-center"/>
            </div>
            
            <div className="flex items-center gap-3">
              <p className="mainStyle">For Online Booking</p>
              <input type="number" min="0" value={bookingSpace} onChange={handleBookingSpaceChnage}  
              className="w-16 rounded-lg p-1 outline-none text-center border-2"/>
            </div>

            <div className="flex items-center gap-3">
              <p className="mainStyle">For Emergency Repairs</p>
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
             <p className="mainStyle">Set New Time</p>  
             <input type="time" value={nextdayTime} onChange={handleNextdayTimeChange} 
             className="p-2 rounded-lg outline-none border-2 pl-4"/>
           </div>
                    
           <div className="flex gap-3 items-center">
             <p className="mainStyle">Current Time :</p>
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
             <p className="mainStyle">Set New Time</p>  
             <input type="time" value={recordsTime} onChange={handleRecordTimeChange} 
             className="p-2 rounded-lg outline-none border-2 pl-4"/>
            </div>
                    
            <div className="flex gap-3 items-center">
             <p className="mainStyle">Current Time :</p>
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
                  <td colSpan={2} className="text-center border-2 border-black py-2 mainStyle">No data to display</td>
                </tr>
                ) : (
                days && days.map( (days, index) => (
                <tr key={index} className="text-center mainStyle">
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
                    <td colSpan={2} className="text-center border-2 border-black py-2 mainStyle">No data to display</td>
                  </tr>
                  ) : (
                  list && list.map( (list, index) => (
                  <tr key={index} className="text-center mainStyle">
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