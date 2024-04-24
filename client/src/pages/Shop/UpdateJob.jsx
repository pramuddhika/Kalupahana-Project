import { useState } from "react";
import ShopHeader from "../components/ShopHeader";
import Search from "./Update_Search";
import AssignMechanic from "./Update_AssignMechanic";
import CloseJob from "./Update_CloseJob";
import MechanicNote from "./Update_MechanicNote";
import SendSMS from "./Update_SendSMS";
import UsePart from "./Update_UsePart";

const UpdateJob = () => {

  const [activeTopic,setActiveTopic] = useState('Search');

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
  }

  return (
    <div>
     <ShopHeader pageName="Job Updates" />

     {activeTopic === 'Search'? 
     (<div className="h-9 bg-side-nav-bg border-b-2"/> )
     :
     (
     <div className="flex bg-side-nav-bg p-2 h-9 pl-3 gap-6 border-b-2">
       <button className={`${activeTopic === 'AssignMechanic' ? 'topic':'text-gray-500'}`}
        onClick={()=> handleTopicClick('AssignMechanic')}>Assign Mechanic</button>
      <button className={`${activeTopic === 'UsePart' ? 'topic':'text-gray-500'}`}
        onClick={()=> handleTopicClick('UsePart')}>Used Parts</button>
      <button className={`${activeTopic === 'MechanicNote' ? 'topic':'text-gray-500'}`}
        onClick={()=> handleTopicClick('MechanicNote')}>MechanicNote</button>
      <button className={`${activeTopic === 'SendSMS' ? 'topic':'text-gray-500'}`}
        onClick={()=> handleTopicClick('SendSMS')}>SMS Updates</button>
      <button className={`${activeTopic === 'CloseJob' ? 'topic':'text-gray-500'}`}
        onClick={()=> handleTopicClick('CloseJob')}>Close Job</button>
     </div>
     )}


     <div>
       {activeTopic === 'Search' && <Search setActiveTopic={setActiveTopic}/>}
       {activeTopic === 'AssignMechanic' && <AssignMechanic/>}
       {activeTopic === 'CloseJob' && <CloseJob/>}
       {activeTopic === 'MechanicNote' && <MechanicNote/>}
       {activeTopic === 'SendSMS' && <SendSMS/>}
       {activeTopic === 'UsePart' && <UsePart/>}
     </div>

    </div>
  );
};

export default UpdateJob;