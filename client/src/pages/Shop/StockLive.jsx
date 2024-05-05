

const StockLive = () => {
    return (

      <div>
        <div className="flex justify-center">
           
            <div className="flex justify-center items-center gap-10 card mt-10 p-8 w-11/12">

             <div className="flex gap-4 border-2 border-text-primary p-4 rounded-lg">
                <input type="text" className="input p-2 rounded-lg w-44" placeholder="Add Part ID or Name"/>
                <button className="btn btn-normal">Add Filter</button>
              </div>

              <div className="flex gap-4 border-2 border-text-primary p-4 rounded-lg">
                <input type="text" className="input p-2 rounded-lg w-44" placeholder="Add Part ID or Name"/>
                <button className="btn btn-normal">Search</button>
              </div>
               
               <div className="flex items-center gap-4 border-text-primary border-2 p-4 rounded-lg">
                 <input type="text" value="Get Report" className="input p-2 rounded-lg w-32 text-gray-400" readOnly/>
                 <button className="btn btn-normal">Download</button>
               </div>
              
            </div>

         

        </div>

        <div className="mt-10">
              
          <table className="w-10/12 mx-auto font-inter">
            <tr className="bg-text-primary text-white h-12">
              <th className="w-1/4 border-2">Part ID</th>
              <th className="w-1/2 border-2">Part Name</th>
              <th className="w-1/4 border-2">Quantity</th>
            </tr>
  
                  
            <tr className="bg-gray-300 p-2">
              <td className="border-2 text-center py-3"></td>
              <td className="border-2 text-start py-3"></td>
              <td className="border-2 text-center py-3"></td>
            </tr>
                
  
              </table>
  
              </div>
      </div>
    );
};

export default StockLive;