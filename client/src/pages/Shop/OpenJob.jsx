import { useState } from "react";
import OpenJobSearch from "./OpenJob_Search";
import VehicleDetails from "./OpenJob_VehicleDetails";
import PreRepairAssessment from "./PreRepairAssessment";

const OpenJob = () => {

  const [activeTopic,setActiveTopic] = useState('OpenJobSearch');

  return (
    <div>
     {activeTopic === 'OpenJobSearch' && <OpenJobSearch setActiveTopic={setActiveTopic} />}
     {activeTopic === 'VehicleDetails'       && <VehicleDetails setActiveTopic={setActiveTopic} />}
     {activeTopic === 'PreRepairAssessment'  && <PreRepairAssessment/>}
    </div>
  );
};

export default OpenJob;