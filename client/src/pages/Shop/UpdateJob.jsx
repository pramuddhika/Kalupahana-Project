import { Route,Routes } from "react-router-dom";
import Menu from './Update_Menu';
import Search from './Update_Search';
import Edit from './Update_EditDetails';


const UpdateJob = () => {
  return (
    <div>
    
    <Routes>
      <Route path="" element={<Search/>}/>
      <Route path="menu" element={<Menu/>}/>
      <Route path="edit" element={<Edit/>}/>
    </Routes>
      
    </div>
  );
};

export default UpdateJob;