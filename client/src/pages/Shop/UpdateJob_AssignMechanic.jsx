import { useEffect, useState,useContext } from "react";
import Details from "../components/Details";
import axios from "axios";
import { UpdateJob_Context } from "./UpdateJob_Context";
import Select from 'react-select';
import customStyles from '../components/SelectStyle';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateJob_AssignMechanic = () => {

  const { updateJobData} = useContext(UpdateJob_Context);
  const [tableList,setTableList] = useState('');
  const [mechanic,setMechanic] = useState(null);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [selectId,setSelectId] = useState(null);
  const [refresh,setRefresh] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const  updateJobId= updateJobData[0].jobId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tableDataRes = await axios.get(`/api/updatejob/getAllocatedMechanics/${updateJobId}`);
        setTableList(tableDataRes.data.allocatedList);
      } catch (err) {
        console.log('Error fetching allocated mechanics:', err);
      }
      
      try {
        const mechanicRes = await axios.get('/api/updatejob/getInChargeMechanics');
        setMechanic(mechanicRes.data.mechanicsList);
      } catch (err) {
        console.log('Error fetching in charge mechanics:', err);
      }
    }
    fetchData();
  }, [refresh, updateJobId]);

  // Handle mechanic selection
  const handleMechanicChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      const selected = mechanic.find(m => `${m.mecId} - ${m.mecName}` === selectedOption.label);
      setSelectedMechanic(selected);
      setSelectId(selected.mecId);
    } else {
      setSelectedMechanic(null);
    }
  }

  //make option arry
  const option = mechanic ? mechanic.map(item => ({
    label: `${item.mecId} - ${item.mecName}`
  })):[];

  //handle mechanic assign
  const handleAssignMechanic = async() => {

    //if no selected mechanic stop the precess
    if(selectId === null){
      toast.warning("Plesae selecte a mechanic!");
      return;
    }

    try{
      const res = await axios.post('/api/updatejob/addMechanic', {selectId,updateJobId});
      setRefresh(!refresh);
      toast.success(res.data.message);
      setSelectId(null)
      setSelectedMechanic(null);
      setSelectedOption(null);
    }catch(err){
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="flex flex-row mt-7">
        
      <div className="flex flex-col justify-center items-center basis-2/3">

      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

        {/**input data form - start */}
        <div className="h-48 card w-11/12 p-2 mt-5">
 
          <p className="topic ">Assign Mechanics</p>

          <div className="flex items-center font-inter gap-2 mt-3">
            <p className="text-text-primary font-semibold w-48 pl-4">Employee Name or ID: </p>
            <Select
             className="w-96"
             options={option}
             isClearable
             styles={customStyles}
             value={selectedOption}
             onChange={handleMechanicChange}
             placeholder='Search by Name or Id'
            />
          </div>

          <div className="flex justify-center mt-4 pl-4">
            <div className="flex flex-col gap-2 w-8/12">

              <div className="flex items-center gap-3">
                <p className="mainStyle">Main Specialist Area</p>
                <input
                 className="input p-1 rounded-lg w-80 pl-4" 
                 value={selectedMechanic ? selectedMechanic.main : ''} 
                 readOnly
                />
              </div>

              <div className="flex gap-3 items-center">
                 <p className="mainStyle">Sub Sepecialist Area</p>
                 <input
                   className="input p-1 rounded-lg w-80 pl-4" 
                   value={selectedMechanic ? selectedMechanic.sub : ''} 
                   readOnly
                  />
              </div>
            </div>

            <div className="flex items-end justify-end w-2/12">
              <button className="btn btn-normal" onClick={handleAssignMechanic}>
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

          { (tableList === null || tableList.length === 0) ? (
            <tr>
              <td colSpan="3" className='text-center border-2 border-black py-2 mainStyle'>No Mechanic allocated</td>
            </tr>
          ):(
            tableList && tableList.map ( (allocatedList,index) => (
              <tr key={index} className="text-center mainStyle">
                <td className="border-2 border-black">{allocatedList.employeeId}</td>
                <td className="border-2 border-black">{allocatedList.employeeName}</td>
                <td className={`border-2 border-black 
                  ${allocatedList.jobStatus === 'complete' ? 'bg-green-400 text-black' : 
                  allocatedList.jobStatus === 'withdraw' ? 'bg-red-400 text-black' : 
                  allocatedList.jobStatus === 'waiting' ? 'bg-yellow-400 text-black' : ''}`}>
                  {allocatedList.jobStatus}
                </td>
             </tr>
            ))
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

export default UpdateJob_AssignMechanic;