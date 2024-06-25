import { useState,useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Menu from './UpdateJob_Menu';
import Search from './UpdateJob_Search';
import MoreData from './UpdateJob_MoreData';
import { UpdateJob_Context } from './UpdateJob_Context';

const UpdateJob = () => {
  const [updateJobData, setUpdateJobData] = useState(
    JSON.parse(localStorage.getItem('updateJobData')) || null
  );
  
  //save data - stop application not working issue when page refresh
  useEffect(() => {
    localStorage.setItem('updateJobData', JSON.stringify(updateJobData));
  }, [updateJobData]);

  return (
    <UpdateJob_Context.Provider value={{ updateJobData, setUpdateJobData }}>
      <div>
        <Routes>
          <Route path="" element={<Search/>}/>
          <Route path="menu" element={<Menu/>}/>
          <Route path="moredata" element={<MoreData/>}/>
        </Routes>
      </div>
    </UpdateJob_Context.Provider>
  );
};

export default UpdateJob;