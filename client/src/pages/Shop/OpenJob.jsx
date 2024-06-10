import {Routes, Route} from 'react-router-dom'
import OpenJobSearch from "./OpenJob_Search";
import VehicleDetails from "./OpenJob_VehicleDetails";
import PreRepairAssessment from "./PreRepairAssessment";
import SideNav from '../components/SideNav';

const OpenJob = () => {

 
  return (
    <div className="flex h-screen">
      <div className="w-[180px]">
        <SideNav />
      </div>
      <div className="w-calc">
      <div>
     <Routes>
       <Route path='' element={<OpenJobSearch/>}/>
       <Route path='details' element={<VehicleDetails/>}/>
       <Route path='prerepair' element={<PreRepairAssessment/>}/>
     </Routes>
    </div>
      </div>
    </div>
    
  );
};

export default OpenJob;