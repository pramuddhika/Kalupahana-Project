import { Route,Routes } from "react-router-dom";
import Menu from './Update_Menu';
import Search from './Update_Search';
import MoreData from './Update_MoreData';


const UpdateJob = () => {
  return (
    <div>
    
    <Routes>
      <Route path="" element={<Search/>}/>
      <Route path="menu" element={<Menu/>}/>
      <Route path="moredata" element={<MoreData/>}/>
    </Routes>
      
    </div>
  );
};

export default UpdateJob;