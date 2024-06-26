import { useState } from "react";
import Records_Search from "./Records_Search";
import ShopHeader from "../components/ShopHeader";
import Records_Details from "./Records_Details";

const Records = () => {

  const [activeTopic, setActiveTopic] = useState('Records_Search');
  const [searchNumber, setSearchNumber] = useState(null);

  return (
    <div>
      <ShopHeader pageName="Check Records" />
      <div className="h-9 bg-side-nav-bg border-b-2"/>

     {activeTopic === 'Records_Search'  && 
       <Records_Search setActiveTopic={setActiveTopic} setSearchNumber={setSearchNumber}/>
     }
     {activeTopic === 'Records_Details' && 
        <Records_Details setActiveTopic={setActiveTopic} searchNumber={searchNumber}/>
     }

    </div>
  );
};

export default Records;