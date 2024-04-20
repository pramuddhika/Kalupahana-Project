import ShopHeader from "../components/ShopHeader";
import axios from 'axios';
import { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShopSetting = () => {

    const [totalSpace,setTotalSpace] = useState(0);
    const [onlineSpaces,setOnlineSpaces] = useState(0);
    const [isSettingsChanged, setIsSettingsChanged] = useState(false);

    useEffect( ()=> {
        const spaceDataDetails = async () => {
          try{
            const res = await axios.get("http://localhost:8000/api/settings/getspace");
            setTotalSpace(res.data.totalSpace);
            setOnlineSpaces(res.data.onlineSpaces);
          }catch(err){
            toast.error(err.response.data);
          }
        };
        spaceDataDetails()
    },[]);

    const handleTotalSpacesChange = (e) => {
        setTotalSpace(e.target.value);
        setIsSettingsChanged(true);
    };

    const handleOnlineSpacesChange = (e) => {
        setOnlineSpaces(e.target.value);
        setIsSettingsChanged(true);
    };

    const handleUpdateClick = async () => {
      if (totalSpace < 0 || onlineSpaces < 0) {
        toast.error('Input values cannot be negative.');
        return;
    }
    if (onlineSpaces > totalSpace) {
        toast.error('Spaces for Online Booking cannot be greater than Total spaces.');
        return;
    }
    if (!isSettingsChanged) {
        toast.error('No changes have been made to the space settings.');
        return;
    }
      try {
        await axios.put('http://localhost:8000/api/settings/updatespaces', {totalSpace, onlineSpaces});
        setIsSettingsChanged(false);
        toast.success('Updated space settings!');
    } catch (err) {
        toast.error(err.response.data);
    }
    }

    return (
        <div>
            <ShopHeader pageName="Settings" />
            
            <div className="h-9 bg-side-nav-bg border-b-2"/>

            <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

            {/**space change settigns - start */}
            <div className="card w-11/12 mx-auto my-5 p-4">
                <p className="topic">Repairing Spaces</p>

                <div className="flex gap-8 mt-3 ml-6">

                    <div className="flex gap-3">
                      <p>Total Spaces</p>  
                      <input type="number" min="0" value={totalSpace} onChange={handleTotalSpacesChange} className="w-16 rounded-lg outline-none border-2 pl-4"/>
                    </div>
                    <div className="flex gap-3">
                       <p>Spaces for Online Booking</p>
                       <input type="number" min="0" value={onlineSpaces} onChange={handleOnlineSpacesChange} className="w-16 rounded-lg outline-none text-justify border-2 pl-4"/>
                    </div>
                    <div className="flex gap-3">
                       <p>Spaces for Emergency repairs</p>
                       <input value={totalSpace - onlineSpaces} min="0" className="w-16 bg-white rounded-lg outline-none border-2 pl-4"/>
                    </div>   
                </div>
                <div className="flex justify-end">
                 <button className={`update-button ${isSettingsChanged ? 'btn text-white bg-blue-500' : 'btn bg-gray-400'}`} onClick={handleUpdateClick}>Update</button>
                </div>
            </div>
            {/**space change settigns - end */}

            {/**add holidays - start */}
            <div className="card mt-4 w-11/12 mx-auto p-4">
              <p className="topic">Add Holidays</p>
              <div className="flex">
                <div className="w-1/2 p-4"></div>
                <div className="w-1/2 p-4">
                  <p className="font-semibold">Holidays for next 30 days</p>
                </div>
              </div>
            </div>
            {/**add holidays - end */}


        </div>
    );
};

export default ShopSetting;