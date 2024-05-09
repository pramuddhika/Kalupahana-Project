import Details from "../components/Details";

const Update_UsePart = () => {
    return (
        <div className="flex flex-row ">
        
          <div className="flex flex-col justify-center items-center basis-2/3">

            {/* <div className="card mt-5 w-11/12 p-2">
              <p className="topic">Used Parts</p>
            <div className=" justify-between">

            <div className="flex justify-center items-center gap-16">
              <div className="flex justify-center fornt-inter items-center mb-4">
               <p className="basis-1/3 text-text-primary font-semibold">Part Id:</p>
               <input type="text" required className="input basis-1/2 rounded-lg p-2 pl-4 w-48" placeholder='Add part ID'/>
              </div>

              <div className="flex justify-center fornt-inter items-center mb-4">
               <p className="basis-1/3 text-text-primary font-semibold">Part Name:</p>
               <input type="text" required className="input basis-1/2 rounded-lg p-2 pl-4" placeholder='Add part Name'/>
              </div>
            </div>

            <div className="flex justify-between items-center"></div>
                
           

            <div className="flex justify-center fornt-inter">
              <p className="basis-1/4 text-text-primary font-semibold mt-3">Quantity:</p>
              <input type="number" required className="input basis-1/2 rounded-lg p-2 pl-4" placeholder="Number of units"/>
            </div>

             <div className="flex items-end mb-4 mr-16">
               <button className="btn btn-normal">Send</button>
             </div>
            </div>
            </div> */}
            {/**input data form - start */}
            <div className="card w-11/12 p-2 mt-5">
             
              <p className="topic ">Used Part</p>

              <div className="flex my-4 justify-between">
                <div className="flex justify-center items-center font-inter gap-5">
                  <p className="text-text-primary font-semibold w-24">Part ID: </p>
                  <input type="text" className="input p-2 rounded-lg" placeholder="Search by Part ID"/>
                </div>
                <div className="flex justify-center items-center font-inter gap-5">
                  <p className="text-text-primary font-semibold">Part Name: </p>
                  <input type="text" className="input p-2 rounded-lg" placeholder="Search by Part Name"/>
                </div>
              </div>

              <div className="flex my-4 justify-between">
                <div className="flex justify-center items-center font-inter gap-5">
                  <p className="text-text-primary font-semibold w-24">Quantity : </p>
                  <input type="number" className="input p-2 rounded-lg" placeholder=""/>
                </div>
                <div className="flex justify-center items-center font-inter gap-5 mr-12">
                  <button className="btn btn-warning">Clean</button>
                  <button className="btn btn-normal">Add</button>
                </div>
              </div>


                
              
            </div>
            {/**input data form -end */}


            {/**table - start */}
            <div className="box-content h-80 card mt-5 w-11/12 p-2">
              <p className="topic">Add Parts</p>
              <div className="flex justify-center overflow-auto max-h-72">
              <table className="mx-auto font-inter mt-4 w-11/12">
                <tr className='bg-text-primary text-white'>
                  <th className="border-2 border-black w-1/3">Part ID</th>
                  <th className="border-2 border-black w-1/3">Part Name</th>
                  <th className="border-2 border-black w-2/3">Quantity</th>
                </tr>

                <tr className="text-center">
                  <td className="border-2 border-black"> test data</td>
                  <td className="border-2 border-black"> test data</td>
                  <td className="border-2 border-black"> test data</td>
                </tr>             

              </table>
              </div>
            </div>
            {/**table - end */}

          </div>

          <div className="basis-1/3">
            <Details/>
          </div>
            
        </div>
    );
};

export default Update_UsePart;