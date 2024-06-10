import { Route, Routes } from "react-router-dom";
import Menu from './MechanicsMenu';
import Add from './MechanicsAdd';
import MechanicsUpdate from './MechanicsUpdate';
import SideNav from '../components/SideNav';

const Mechanics = () => {
    return (
        <div className="flex h-screen">
      <div className="w-[180px]">
        <SideNav />
      </div>
      <div className="w-calc">
      <div>
            <Routes>
                <Route path="" element={<Menu/>}/>
                <Route path="add" element={<Add/>}/>
                <Route path="update" element={<MechanicsUpdate/>} />
            </Routes>
        </div>
      </div>
    </div>
        
    );
};

export default Mechanics;