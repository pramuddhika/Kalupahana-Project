import Details from "../components/Details";

const Update_AssignMechanic = () => {
  return (
    <div className="flex flex-row mt-7">
        
      <div className="flex flex-col justify-center items-center basis-2/3">

        {/**input data form - start */}
        <div className="h-48 card w-11/12 p-2 mt-5">
 
          <p className="topic ">Assign Mechanics</p>

          <div className="flex items-center font-inter gap-2 mt-3">
            <p className="text-text-primary font-semibold w-48 pl-4">Employee ID & Name: </p>
            <input type="text" className="input p-2 rounded-lg w-96" placeholder="Search by Employee ID or Employee Name"/>
          </div>

          <div className="flex mt-2 pl-4">
            <div className="flex flex-col w-1/2 gap-2">
               <input className="input p-1 rounded-lg"/>
               <input className="input p-1 rounded-lg"/>
            </div>

            <div className="ju">
              <button >
                Assign
              </button>
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