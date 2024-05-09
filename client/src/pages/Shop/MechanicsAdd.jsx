import ShopHeader from "../components/ShopHeader";
import worker from '../assets/worker.svg';

const MechanicsAdd = () => {
    return (
        <div>
            <ShopHeader pageName="Add Mechanic"/>
            <div className="h-9 bg-side-nav-bg border-b-2"/>
            
            <div className="flex">
                <div className="flex mt-28 justify-center w-1/2">
                    <img src={worker} className="w-10/12"/>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default MechanicsAdd;