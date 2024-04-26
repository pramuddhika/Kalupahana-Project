import { Route,Routes } from "react-router-dom";
import Menu from './Update_Menu';
import Search from './Update_Search';


const UpdateJob = () => {
  return (
    <div>
    
    <Routes>
      <Route path="" element={<Search/>}/>
      <Route path="menu" element={<Menu/>}/>
    </Routes>
      
    </div>
  );
};

export default UpdateJob;