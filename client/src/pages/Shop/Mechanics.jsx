import { Route, Routes } from "react-router-dom";
import Menu from './Mechanics_Menu';
import Add from './Mechanics_Add';
import Mechanics_Update from './Mechanics_Update';

const Mechanics = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Menu/>}/>
        <Route path="add" element={<Add/>}/>
        <Route path="update" element={<Mechanics_Update/>} />
      </Routes>
    </div>  
  );
};

export default Mechanics;