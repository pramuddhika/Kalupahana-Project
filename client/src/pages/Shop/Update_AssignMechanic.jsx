import Details from "../components/Details";

const Update_AssignMechanic = () => {
    return (
      <div className="flex flex-row ">
        
      <div className="flex flex-col justify-center items-center basis-2/3">

      {/**input data form - start */}
      <div className="h-48 card w-11/12 p-2 mt-5">
 
      <p className="topic ">Assign Mechanics</p>

      <div className="flex my-4 justify-between">
       <div className="flex justify-center items-center font-inter gap-5">
         <p className="text-text-primary font-semibold w-28">Employee ID: </p>
         <input type="text" className="input p-2 rounded-lg" placeholder="Search by Employee ID"/>
       </div>
       <div className="flex justify-center items-center font-inter gap-5">
         <p className="text-text-primary font-semibold">Employee Name: </p>
         <input type="text" className="input p-2 rounded-lg" readOnly/>
       </div>
      </div>

      <div className="flex my-4 justify-end">
        <div className="flex justify-center items-center font-inter gap-5 mr-12">
          <button className="btn btn-warning">Clean</button>
          <button className="btn btn-normal">Asign</button>
        </div>
      </div>

      </div>
      {/**input data form -end */}


      {/**table - start */}
      <div className="box-content h-80 card mt-5 w-11/12 p-2">
       <p className="topic">Work Allocation</p>
       <div className="flex justify-center overflow-auto max-h-72">
        <table className="mx-auto font-inter mt-4 w-11/12">
          <tr className='bg-text-primary text-white'>
           <th className="border-2 border-black w-1/3">Employee ID</th>
           <th className="border-2 border-black w-1/3">Employee Name</th>
           <th className="border-2 border-black w-2/3">Status</th>
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

export default Update_AssignMechanic;