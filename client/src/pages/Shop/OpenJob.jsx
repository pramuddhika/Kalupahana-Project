import {Routes, Route} from 'react-router-dom'
import OpenJobSearch from "./OpenJob_Search";
import VehicleDetails from "./OpenJob_VehicleDetails";
import PreRepairAssessment from "./PreRepairAssessment";

const OpenJob = () => {
  return (
    <div>
      <Routes>
       <Route path='' element={<OpenJobSearch/>}/>
       <Route path='details' element={<VehicleDetails/>}/>
       <Route path='prerepair' element={<PreRepairAssessment/>}/>
      </Routes>
    </div>
  );
};

export default OpenJob;