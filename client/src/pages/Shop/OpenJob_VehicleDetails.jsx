import ShopHeader from "../components/ShopHeader";

const OpenJob_VehicleDetails = () => {
    return (
        <div>
            <ShopHeader pageName="Vehicle Details"/>
            <div className="h-9 bg-side-nav-bg border-b-2 "/>

            <div className="flex justify-center mt-24">
            <div className="flex card justify-center w-10/12">

              <div className="w-1/2">

               <form className="p-4">

                 <p className="topic">Vehicle Details</p>

                 <div className="flex justify-center items-center p-2">
                    <div className="basis-1/4"><p>Vehicle Number:</p></div>
                    <div className="basis-1/2">
                      <input type="text" className="input rounded-lg ml-4 p-2 w-60" placeholder="AAA-0001 or AA-0001"/>
                    </div>
                 </div>

                 <div className="flex justify-center items-center p-2">
                    <div className="basis-1/4"><p>Model:</p></div>
                    <div className="basis-1/2">
                      <input type="text" className="input rounded-lg ml-4 p-2 w-60" placeholder="Vehicle Model here"/>
                    </div>
                 </div>

                 <div className="flex justify-center items-center p-2">
                    <div className="basis-1/4"><p>Category:</p></div>
                    <div className="basis-1/2">
                      <input type="text" className="input rounded-lg ml-4 p-2 w-60" placeholder="Vehicle Category here"/>
                    </div>
                 </div>

                 <div className="flex justify-center p-2">
                    <div className="basis-1/4"><p className="mt-3">Note:</p></div>
                    <div className="basis-1/2">
                      <textarea rows="5" className="input rounded-lg ml-4 p-2 w-60" placeholder="Additional details"/>
                    </div>
                 </div>

               </form>
              </div>

              <div className="w-1/2">
               <form className="p-4">
                 <p className="topic">Customer Details</p>

                 <div className="border-2 border-text-primary rounded-3xl p-2 mt-3">
                  <div className="flex justify-center items-center ">
                    <div className="basis-1/4"><p>NIC Number:</p></div>
                    <div className="basis-1/2">
                      <input type="text" className="input rounded-lg ml-4 p-2 w-60" placeholder="NIC here"/>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                   <button className="btn btn-normal mx-auto">Serach</button>
                  </div>
                 </div>

                 <div className="flex justify-center items-center p-2 mt-3">
                    <div className="basis-1/4"><p>Customer Name:</p></div>
                    <div className="basis-1/2">
                      <input type="text" className="input rounded-lg ml-4 p-2 w-60" placeholder="Name here"/>
                    </div>
                 </div>

                 <div className="flex justify-center items-center p-2">
                    <div className="basis-1/4"><p>Email:</p></div>
                    <div className="basis-1/2">
                      <input type="email" className="input rounded-lg ml-4 p-2 w-60" placeholder="email here"/>
                    </div>
                 </div>

                 <div className="flex justify-center items-center p-2">
                    <div className="basis-1/4"><p>contact Number:</p></div>
                    <div className="basis-1/2">
                      <input type="text" className="input rounded-lg ml-4 p-2 w-60" placeholder="07_ _ _ _ _ _ _ _"/>
                    </div>
                 </div>

                 

               </form>
               
               <div className="flex justify-center gap-6 mt-4 mb-4">
                <button className="btn btn-warning"> Clear</button>
                <button className="btn btn-normal"> Submit</button>
               </div>

              </div>
            </div>
            </div>

        </div>
    );
};

export default OpenJob_VehicleDetails;