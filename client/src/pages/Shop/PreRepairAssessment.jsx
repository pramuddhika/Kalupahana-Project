import ShopHeader from "../components/ShopHeader";

const PreRepairAssessment = () => {
    return (
        <div>
        <ShopHeader pageName="Pre-repair Assessment"/>
        <div className="h-9 bg-side-nav-bg border-b-2 "/>
        
        <div className="flex flex-col items-center justify-center mt-7">

          <div className="card w-10/12 p-2">
             <p className="topic py-4">Check Llist</p>
            
              <div className="flex"> 
                <div className="w-1/4">
                 <label className="flex items-center cursor-pointer">
                 <input type="checkbox" className="w-4 h-4 mr-2"/>
                 <p>Tool box</p>
                 </label>
                </div>
                <div className="w-1/4">
                 <label className="flex items-center cursor-pointer">
                 <input type="checkbox" className="w-4 h-4 mr-2"/>
                 <p>Spare Tire</p>
                 </label>
                </div>
                <div className="w-1/4">
                 <label className="flex items-center cursor-pointer ">
                 <input type="checkbox" className="w-4 h-4 mr-2"/>
                 <p>Tire Jack</p>
                 </label>
                </div>
                <div className="w-1/4">
                 <label className="flex items-center cursor-pointer ">
                 <input type="checkbox" className="w-4 h-4 mr-2"/>
                 <p>Lug Wrench</p>
                 </label>
                </div>
              </div>

              <div className="flex">
              <div className="w-1/4">
                <label className="flex items-center cursor-pointer ">
                <input type="checkbox" className="w-4 h-4 mr-2"/>
                <p>Jumper Cable</p>
                </label>
              </div>
              <div className="w-1/4">
                <label className="flex items-center cursor-pointer ">
                <input type="checkbox" className="w-4 h-4 mr-2"/>
                <p>Portable air compressor</p>
                </label>
              </div>
              </div>

              <div className="mt-4 flex">
                <p>Other items:</p>
                <textarea className="w-10/12 ml-6 rounded-lg input mb-3"/>
              </div>

            </div>

            <div className="card w-10/12 p-2 mt-7">
              <p className="topic my-3">Additional Note</p>
              <textarea rows={5} className="input rounded-lg w-11/12 ml-9 mb-3"/>
            </div>

            <div className="card w-10/12 p-2 mt-7">
              <p className="topic my-3">Scratch marks in body</p>
              <div className="flex">
               <input type="file" className="input rounded-lg w-11/12 ml-9 mb-3"/>
               <button className="btn btn-normal">Add</button>
              </div>
              
            </div>

            <div className="card w-10/12 p-2 mt-7">
              <p className="topic my-3">Customer Identify Error/s</p>
              <textarea rows={6} className="input rounded-lg w-11/12 ml-9 mb-3"/>
            </div>

            <div className="flex gap-4 mt-5 mb-10">
              <button className="btn btn-warning">Clear</button>
              <button className="btn btn-normal">Submit</button>
            </div>

          </div>
        </div>
    );
};

export default PreRepairAssessment;