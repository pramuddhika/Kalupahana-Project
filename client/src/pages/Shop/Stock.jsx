import ShopHeader from "../components/ShopHeader";
import { useState } from "react";
import StockAdd from "./StockAdd";
import StockAvailable from "./StockAvailable";
import StockNeededList from "./StockNeededList";


const Stock = () => {

    const [activeTopic, setActiveTopic] = useState('AddStock')

    const handleTopicClick = (topic) => {
        setActiveTopic(topic);
    };

    return (
        <div>
            <ShopHeader pageName="Stock" />
            
            {/**start sub navbar */}
            <div className="flex bg-side-nav-bg p-2 h-9 pl-3 gap-6 border-b-2">
             <button className={`${activeTopic === 'AddStock' ? 'topic' : 'text-gray-500'}`}
               onClick={() => handleTopicClick('AddStock')}>Add Stock</button>
              <button className={`${activeTopic === 'AvailableStock' ? 'topic' : 'text-gray-500'}`}
               onClick={() => handleTopicClick('AvailableStock')}>Available Stock</button>
              <button className={`${activeTopic === 'NeededList' ? 'topic' : 'text-gray-500'}`}
               onClick={() => handleTopicClick('NeededList')}>Needed List</button>
            </div>
            {/**end s4b navbar */}

            <div>
                {activeTopic === 'AvailableStock' && <StockAvailable/>}
                {activeTopic === 'AddStock' && <StockAdd/>}
                {activeTopic === 'NeededList' && <StockNeededList/>}
            </div>
        </div>
    );
};

export default Stock;