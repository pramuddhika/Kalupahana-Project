import ShopHeader from "../components/ShopHeader";


const Update_MoreDetails = () => {

    

    return (
        <div>
          <ShopHeader pageName="More Details"/>
          <div className="h-9 bg-side-nav-bg border-b-2"/>
          
            <div className="flex flex-col justify-center items-center mt-10">
              <div className="flex card justify-center w-10/12 p-8">
                <div className="w-1/2">

                 <p className="topic">Vehicle Details</p>

                 <div className="flex justify-center items-center p-2">
                  <div className="basis-1/4"><p className="mainStyle">Vehicle Number:</p></div>
                  <div className="basis-1/2">
                    <input type="text" className="input rounded-lg ml-4 p-2 w-60" readOnly/>
                  </div>
                 </div>

                 <div className="flex justify-center items-center p-2">
                   <div className="basis-1/4"><p className="mainStyle">Model:</p></div>
                   <div className="basis-1/2">
                     <input type="text" className="input rounded-lg ml-4 p-2 w-60" readOnly/>
                   </div>
                 </div>

                 <div className="flex justify-center items-center p-2">
                   <div className="basis-1/4"><p className="mainStyle">Fule Type:</p></div>
                   <div className="basis-1/2">
                     <input type="text" className="input rounded-lg ml-4 p-2 w-60" readOnly/>
                   </div>
                 </div>
                </div>

                <div className="w-1/2">
                 <p className="topic">Customer Details</p>

                 <div className="flex justify-center items-center p-2">
                   <div className="w-36"><p className="mainStyle">Customer Name:</p></div>
                   <div className="basis-1/2">
                     <input type="text" className="input rounded-lg ml-4 p-2 w-60" readOnly/>
                   </div>
                 </div>

                 <div className="flex justify-center items-center p-2">
                   <div className="w-36"><p className="mainStyle">Email:</p></div>
                   <div className="basis-1/2">
                     <input type="text" className="input rounded-lg ml-4 p-2 w-60" readOnly/>
                   </div>
                 </div>

                 <div className="flex justify-center items-center p-2">
                   <div className="w-36"><p className="mainStyle">Contact Number:</p></div>
                   <div className="basis-1/2">
                     <input type="text" className="input rounded-lg ml-4 p-2 w-60" readOnly/>
                   </div>
                 </div>

                </div>

              </div>

              <div className="card w-10/12 p-8 mt-2">

          
                  <p className="topic">Job Details</p>

                  <div className="flex items-center p-2">
                   <div className="ml-16 w-32"><p className="mainStyle">Job Id:</p></div>
                   <div className="basis-1/2">
                     <input type="text" className="input rounded-lg ml-5 p-2 w-60" readOnly/>
                   </div>
                  </div>

                  <div className="flex items-center p-2">
                   <div className="ml-16 w-32"><p className="mainStyle">Vehicle Fault:</p></div>
                   <div className="w-9/12">
                     <textarea rows={3} className="input rounded-lg ml-5 p-2 w-full" readOnly/>
                   </div>
                  </div>
          

            
                <div className="flex justify-end mr-14">
                  <button className="btn btn-warning" >Back</button>
                </div>
              </div>
            </div>
         </div>
    );
};

export default Update_MoreDetails;