import ShopHeader from "../components/ShopHeader";

const PreRepairAssessment = () => {
    return (
        <div>
        <ShopHeader pageName="Pre-repair Assessment"/>
        <div className="h-9 bg-side-nav-bg border-b-2 "/>
        
        <div className="flex flex-col items-center justify-center mt-7">
        
          <div className="flex card w-10/12 p-2 mb-7">
             <div className="w-1/2">
               <div className="flex justify-center items-center gap-4">
                  <p className="mainStyle w-48 p-2">Vehicle Number: </p>
                  <input className="input rounded-lg w-60 p-1" readOnly/>
               </div>
               <div className="flex justify-center items-center gap-4">
                  <p className="mainStyle w-48 p-2">Customer Name: </p>
                  <input className="input rounded-lg w-60 p-1" readOnly/>
               </div>
               <div className="flex justify-center items-center gap-4">
                  <p className="mainStyle w-48 p-2">Customer Email: </p>
                  <input className="input rounded-lg w-60 p-1" readOnly/>
               </div>
               <div className="flex justify-center items-center gap-4">
                  <p className="mainStyle w-48 p-2">Phone Number: </p>
                  <input className="input rounded-lg w-60 p-1" readOnly/>
               </div>
             </div>

             <div className="w-1/2">
                <div className="flex justify-center items-center gap-4">
                  <p className="mainStyle w-48 p-2">Document Number: </p>
                  <input className="input rounded-lg w-60 p-1" readOnly/>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <p className="mainStyle w-48 p-2">Repair Job Number: </p>
                  <input className="input rounded-lg w-60 p-1" readOnly/>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <p className="mainStyle w-48 p-2">Date : </p>
                  <input className="input rounded-lg w-60 p-1" readOnly/>
                </div>
             </div>
          </div>

          {/* <div className="card w-10/12 p-2">
             <p className="topic py-4">Check Llist</p>
            
              <div className="flex flex-col justify-center items-center w-1/2 "> 
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
              
              </div>

              <div className="mt-4 flex">
                <p>Other items:</p>
                <textarea className="w-10/12 ml-6 rounded-lg input mb-3"/>
              </div>

            </div> */}

            <div className="card w-10/12 p-2">
              <p className="topic mt-3 mb-1">Check List</p>

              <div className="flex justify-center">
                <div className="w-1/2">

                </div>
                <div className="w-1/2">
                 <p className="mainStyle mb-1">Other items:</p>
                 <div className="relative font-inter">
                  <textarea rows={3} className=" w-11/12 ml-8 rounded-lg input p-2" maxLength={100} placeholder="Separate each item by a comma(,)"/>
                  <div className="absolute bottom-2 right-4 bg-white text-end rounded-lg pr-2 text-gray-500 text-sm">{length}/100</div>
                 </div>
                </div>
              </div>

            </div>

            <div className="card w-10/12 p-2 mt-7">
              <p className="topic my-3">Additional Note</p>
              <div className="relative flex justify-center">
               <textarea rows={4} className="input rounded-lg w-11/12 mb-3" maxLength={200}/>
               <div className="absolute bottom-3 right-12 bg-white text-end rounded-lg pr-2 text-gray-500 text-sm">{length}/200</div>
              </div>
             
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