import { useState,useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Menu from './Update_Menu';
import Search from './Update_Search';
import MoreData from './Update_MoreData';
import { UpdateJobContext } from './UpdateJobContext';

const UpdateJob = () => {
  const [updateJobData, setUpdateJobData] = useState(
    JSON.parse(localStorage.getItem('updateJobData')) || null
  );
  
  //save data - stop application not working issue when page refresh
  useEffect(() => {
    localStorage.setItem('updateJobData', JSON.stringify(updateJobData));
  }, [updateJobData]);

  return (
    <UpdateJobContext.Provider value={{ updateJobData, setUpdateJobData }}>
      <div>
        <Routes>
          <Route path="" element={<Search/>}/>
          <Route path="menu" element={<Menu/>}/>
          <Route path="moredata" element={<MoreData/>}/>
        </Routes>
      </div>
    </UpdateJobContext.Provider>
  );
};

export default UpdateJob;