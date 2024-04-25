import ShopHeader from "../components/ShopHeader";

const PreRepairAssessment = () => {
    return (
        <div>
        <ShopHeader pageName="Pre-repair Assessment"/>
        <div className="h-9 bg-side-nav-bg border-b-2 "/>
        
        <div className="flex justify-center mt-7">
          <div className="card w-10/12 p-2">

           <div className="border-2">
            <p>Check Llist</p>
            <div className="flex">
              <div className="flex items-center"> 
                <label className="flex items-center cursor-pointer ">
                 <input type="checkbox" className="w-4 h-4 mr-2"/>
                 <p>Tool box</p>
                </label>
                
              </div>
            </div>
           </div>
            
         
             
          </div>
        </div>
            
        </div>
    );
};

export default PreRepairAssessment;