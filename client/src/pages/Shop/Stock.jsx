import ShopHeader from "../components/ShopHeader";
import { useState } from "react";
import AddPurchases from "./Stock_AddPurchases";
import AddPart from "./Stock_AddPart";
import LiveStock from "./Stock_Live";

const Stock = () => {

  const [activeTopic, setActiveTopic] = useState('AddPurchases')

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
  };

  return (
    <div>
      <ShopHeader pageName="Stock" />
            
      {/**start sub navbar */}
      <div className="flex bg-side-nav-bg p-2 h-9 pl-3 gap-6 border-b-2">
        <button className={`${activeTopic === 'AddPurchases' ? 'topic' : 'text-gray-500'}`}
          onClick={() => handleTopicClick('AddPurchases')}>Add Purchases</button>
        <button className={`${activeTopic === 'AddPart' ? 'topic' : 'text-gray-500'}`}
          onClick={() => handleTopicClick('AddPart')}>Add Part</button>
        <button className={`${activeTopic === 'LiveStock' ? 'topic' : 'text-gray-500'}`}
          onClick={() => handleTopicClick('LiveStock')}>Live Stock</button>
      </div>
      {/**end s4b navbar */}

      <div>
        {activeTopic === 'AddPart' && <AddPart/>}
        {activeTopic === 'AddPurchases' && <AddPurchases/>}
        {activeTopic === 'LiveStock' && <LiveStock/>}
      </div>
    </div>  
  );
};

export default Stock;