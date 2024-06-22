import { Route, Routes } from "react-router-dom";
import Menu from './MechanicsMenu';
import Add from './MechanicsAdd';
import MechanicsUpdate from './MechanicsUpdate';

const Mechanics = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Menu/>}/>
        <Route path="add" element={<Add/>}/>
        <Route path="update" element={<MechanicsUpdate/>} />
      </Routes>
    </div>  
  );
};

export default Mechanics;