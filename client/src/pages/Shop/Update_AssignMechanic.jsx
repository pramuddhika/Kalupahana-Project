import { useEffect, useState,useContext } from "react";
import Details from "../components/Details";
import axios from "axios";
import { UpdateJobContext } from "./UpdateJobContext";


const Update_AssignMechanic = () => {

  const { updateJobData} = useContext(UpdateJobContext);
  const [tableList,setTableList] = useState(null);

  const updateJobId = updateJobData[0].jobId;

  //fetch data for table
  const fetchTableData = async() => {
    try{
      const res = await axios.get(`/api/updatejob/getAllocatedMechanics/${updateJobId}`);
      setTableList(res.data);
    }catch(err){
      console.log('Error fetching data:',err);
    }
  }

  useEffect( ()=> {
    fetchTableData();
  },[]);

  return (
    <div className="flex flex-row mt-7">
        
      <div className="flex flex-col justify-center items-center basis-2/3">

        {/**input data form - start */}
        <div className="h-48 card w-11/12 p-2 mt-5">
 
          <p className="topic ">Assign Mechanics</p>

          <div className="flex items-center font-inter gap-2 mt-3">
            <p className="text-text-primary font-semibold w-48 pl-4">Employee Name OR Id: </p>
            <input type="text" className="input p-2 rounded-lg w-96" placeholder="Search by Name or Id"/>
          </div>

          <div className="flex justify-center mt-4 pl-4">
            <div className="flex flex-col gap-2 w-8/12">
              <div className="flex items-center gap-3">
                <p className="mainStyle">Main Specialist Area</p>
                <input className="input p-1 rounded-lg w-80" readOnly/>
              </div>
              <div className="flex gap-3 items-center">
                 <p className="mainStyle">Sub Sepecialist Area</p>
                 <input className="input p-1 rounded-lg w-80" readOnly/>
              </div>
            </div>

            <div className="flex items-end justify-end w-2/12">
              <button className="btn btn-normal">
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

          {tableList === null || tableList.length === 0 || tableList.message === "Data can't found!" ? (
            <tr>
              <td colSpan="3" className='text-center border-2 border-black py-2 mainStyle'>No Mechanic allocated!</td>
            </tr>
          ):(
            tableList && tableList.map ( (allocatedList,index) => 
              <tr key={index} className="text-center">
                <td className="border-2 border-black">{allocatedList.employeeId}</td>
                <td className="border-2 border-black">{allocatedList.employeeName}</td>
                <td className="border-2 border-black">{allocatedList.jobStatus}</td>
             </tr>
            )
          )}

          
                      
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