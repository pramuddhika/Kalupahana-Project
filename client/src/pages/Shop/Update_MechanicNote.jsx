import Details from "../components/Details";
import { useEffect, useState,useContext } from "react";
import Select from 'react-select';
import axios from 'axios';
import { UpdateJobContext } from "./UpdateJobContext";
import customStyles from '../components/SelectStyle';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update_MechanicNote = () => {

  const { updateJobData} = useContext(UpdateJobContext);
  const [findMechanic,setFindMechanic] = useState(true);
  const [updateNoteMecId,setUpdateNotMecId] = useState(null);
  const [mechanicData,setMechanicData] = useState(null);
  const [tableData,setTableData] = useState(null);

  const updateJobId = updateJobData[0].jobId;
  
  useEffect( ()=> {
    const fetchData = async() => {
      try {
        const [mechanicRes, noteRes] = await Promise.all([
          axios.get('/api/updatejob/getInChargeMechanics'),
          axios.get(`/api/updateJob/mechanicNotes/${updateJobId}`)
        ]);
      
        setMechanicData(mechanicRes.data.mechanicsList);
        setTableData(noteRes.data.jobNote);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    }
    fetchData();
  },[updateJobId]);

  //make opion arry
  const option = mechanicData ? mechanicData.map(list => ({
    value: list.mecId,
    label:`${list.mecId}`
  })):[];

  //make job status options
  const StatusOptions = [
    {value:'in progress', label: 'In progress'},
    {value:'waiting', label:'Waiting'},
    {value:'whithdraw', label:'Withdraw'},
    {value:'complete', label:'complete'}
  ]

  //handle selecte mechanic
  const handelUpdateMechanic = (option) => {
    const selectMechanic = (option ? option.value : null);
    setUpdateNotMecId(selectMechanic);
  }

  //handle mechanic search
  const handleSearch = async() => {
    
    if(updateNoteMecId === null){
      toast.warning('Plesae selecte the mechanic!');
      return;
    }

    try{
      const res = await axios.get(`/api/updatejob/checkAssign/${updateNoteMecId}/${updateJobId}`);
      if(res.data.jobStatus[0].status === "in progress" || res.data.jobStatus[0].status === "waiting"){
        setFindMechanic(false);
        return;
      }
        
    }catch(err){
      toast.error(err.response.data.message);
    }
  };

  //handel cancel button 
  const handleCancelUpdate = () => {
    setFindMechanic(true);
  }

  const findMech = (
    <div className="flex justify-center items-center mt-10 gap-6">
      <Select className="w-64"
      options={option}
      isClearable
      styles={customStyles}
      onChange={handelUpdateMechanic}
      placeholder='Seach by Employee ID'/>

      <button className="btn btn-normal" onClick={handleSearch}>Search</button>
    </div>
    );

  const notePart = (
    <div className="flex gap-8 justify-between">
      <div className="flex gap-10 my-4 ml-8 w-1/2 mainStyle">
        <p>Message: </p>
        <textarea rows={4} placeholder="Type job update" className="input rounded-lg w-72 p-2" />
      </div>

      <div className="mb-4 mr-8 gap-4 w-1/2 mainStyle">

        <div className="flex  items-center justify-center my-4">
          <p className="w-20">Ststus :</p>
          <Select className="w-48"
            options={StatusOptions}
            isClearable
            styles={customStyles}
            placeholder='select status'
          />
        </div>

        <div className="flex justify-end gap-4">
          <button className="btn btn-warning" onClick={handleCancelUpdate}>Cancel</button>
          <button className="btn btn-normal">Submit</button>
        </div>

       </div>
    </div>
  );

    return (
        <div className="flex flex-row mt-7">
        
          <div className="flex flex-col justify-center items-center basis-2/3">

           <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

            <div className="h-48 card mt-5 w-11/12 p-2">
              <p className="topic">Mechanic Update</p>
              {findMechanic ? findMech : notePart}
            </div>

            {/**table - start */}
            <div className="box-content h-80 card mt-5 w-11/12 p-2">
              <p className="topic">Mechanic Notes</p>
              <div className="flex justify-center overflow-auto max-h-72">
              <table className="mx-auto font-inter mt-4 w-11/12">
                <tr className='bg-text-primary text-white'>
                  <th className="border-2 border-black w-1/3">Employee ID</th>
                  <th className="border-2 border-black w-2/3">Message</th>
                </tr>

                {
                  (tableData === null || tableData.length === 0) ? (
                    <tr>
                     <td colSpan="2" className='text-center border-2 border-black py-2 mainStyle'>No Note Available</td>
                    </tr>
                  ):(
                    tableData && tableData.map(  (jobNote,index) => (
                     <tr key={index} className="text-center mainStyle">
                       <td className="border-2 border-black">{jobNote.mecId}</td>
                       <td className="border-2 border-black text-start pl-2">{jobNote.mecNote}</td>
                     </tr>
                    ))
                  )
                }

                             

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

export default Update_MechanicNote;