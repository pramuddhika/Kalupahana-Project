import ShopHeader from "../components/ShopHeader";
import { useState } from "react";

{/**Availabale stock - start */}
const AvailableStock = () => {
    return(
        <div>
            <p>this is content for availble stock</p>
        </div>
    );
};
{/**Availble stock - end */}

{/**Add stock - start */}
const AddStock = () => {
    return(
        <p>this is content for adds stock</p>
    );
};
{/**Add st6c2 - end */}

{/**Needed List -start */}
const NeededList = () => {
    return(
        <div>
            <p>this is content for neededlist</p>
        </div>
    );
};
{/**Needed List - end */}

const Stock = () => {

    const [activeTopic, setActiveTopic] = useState('AvailableStock')

    const handleTopicClick = (topic) => {
        setActiveTopic(topic);
    };

    return (
        <div>
            <ShopHeader pageName="Stock" />
            
            {/**start sub navbar */}
            <div className="flex bg-side-nav-bg p-2 h-9 pl-3 gap-6 border-b-2">
              <button className={`${activeTopic === 'AvailableStock' ? 'text-text-primary font-bold' : 'text-gray-500'}`}
               onClick={() => handleTopicClick('AvailableStock')}>Available Stock</button>
              <button className={`${activeTopic === 'AddStock' ? 'text-text-primary font-bold' : 'text-gray-500'}`}
               onClick={() => handleTopicClick('AddStock')}>Add Stock</button>
              <button className={`${activeTopic === 'NeededList' ? 'text-text-primary font-bold' : 'text-gray-500'}`}
               onClick={() => handleTopicClick('NeededList')}>Needed List</button>
            </div>
            {/**end s4b navbar */}

            <div>
                {activeTopic === 'AvailableStock' && <AvailableStock/>}
                {activeTopic === 'AddStock' && <AddStock/>}
                {activeTopic === 'NeededList' && <NeededList/>}
            </div>
        </div>
    );
};

export default Stock;