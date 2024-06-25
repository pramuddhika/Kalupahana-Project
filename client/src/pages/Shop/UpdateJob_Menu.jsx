import AssignMechanic from './UpdateJob_AssignMechanic';
import CloseJob from './UpdateJob_CloseJob';
import MechanicNote from './UpdateJob_MechanicNote';
import SendSMS from './UpdateJob_SendEmail';
import UsePart from './UpdateJob_UsePart';
import { useState } from 'react';
import ShopHeader from "../components/ShopHeader";

const UpdateJob_Menu = () => {
    const [activeTopic,setActiveTopic] = useState('AssignMechanic');

    const handleTopicClick = (topic) => {
        setActiveTopic(topic);
    }
    return (
        <div>

          <ShopHeader pageName="Job Updates" />

          <div className="flex bg-side-nav-bg p-2 h-9 pl-3 gap-6 border-b-2">
             <button className={`${activeTopic === 'AssignMechanic' ? 'topic':'text-gray-500'}`}
              onClick={()=> handleTopicClick('AssignMechanic')}>Assign Mechanic</button>
             <button className={`${activeTopic === 'UsePart' ? 'topic':'text-gray-500'}`}
              onClick={()=> handleTopicClick('UsePart')}>Used Parts</button>
             <button className={`${activeTopic === 'MechanicNote' ? 'topic':'text-gray-500'}`}
              onClick={()=> handleTopicClick('MechanicNote')}>MechanicNote</button>
             <button className={`${activeTopic === 'SendSMS' ? 'topic':'text-gray-500'}`}
              onClick={()=> handleTopicClick('SendSMS')}>Job Updates</button>
             <button className={`${activeTopic === 'CloseJob' ? 'topic':'text-gray-500'}`}
              onClick={()=> handleTopicClick('CloseJob')}>Close Job</button>
           </div>



          <div>
              {activeTopic === 'AssignMechanic' && <AssignMechanic/>}
              {activeTopic === 'CloseJob' && <CloseJob/>}
              {activeTopic === 'MechanicNote' && <MechanicNote/>}
              {activeTopic === 'SendSMS' && <SendSMS/>}
              {activeTopic === 'UsePart' && <UsePart/>}
          </div>

        </div>
    );
};

export default UpdateJob_Menu;