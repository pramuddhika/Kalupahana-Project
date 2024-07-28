import Details from "../components/Details";
import { useEffect, useState, useContext } from "react";
import Select from 'react-select';
import axios from 'axios';
import { UpdateJob_Context } from "./UpdateJob_Context";
import customStyles from '../components/SelectStyle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateJob_MechanicNote = () => {
  const { updateJobData } = useContext(UpdateJob_Context);
  const [findMechanic, setFindMechanic] = useState(true);
  const [updateNoteMecId, setUpdateNotMecId] = useState(null);
  const [mechanicData, setMechanicData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [newStatus, setNewStatus] = useState(null);
  const [initialNote, setInitialNote] = useState('');
  const [initialStatus, setInitialStatus] = useState(null);
  const [refresh,setRefresh] = useState(false);
  
  const updateJobId = updateJobData[0].jobId;

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, [refresh,updateJobId]);

  //make option array
  const options = mechanicData ? mechanicData.map(list => ({
    value: list.mecId,
    label: `${list.mecId}`
  })) : [];

  //make job status options
  const StatusOptions = [
    { value: 'in progress', label: 'In progress' },
    { value: 'waiting', label: 'Waiting' },
    { value: 'withdraw', label: 'Withdraw' },
    { value: 'complete', label: 'Complete' }
  ];

  //handle selected mechanic
  const handleUpdateMechanic = (option) => {
    const selectMechanic = (option ? option.value : null);
    setUpdateNotMecId(selectMechanic);
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  //handle status change
  const handleStatusChange = (selectedOption) => {
    setNewStatus(selectedOption);
  };

  //handle mechanic search
  const handleSearch = async () => {
    if (updateNoteMecId === null) {
      toast.warning('Please select the mechanic!');
      return;
    }

    try {
      const res = await axios.get(`/api/updatejob/checkAssign/${updateNoteMecId}/${updateJobId}`);
      if (res.data.jobStatus[0].status.length !== 0) {
 
        const note = res.data.jobStatus[0].note === 'No Note' ? '' : res.data.jobStatus[0].note;
        const status = StatusOptions.find(option => option.value === res.data.jobStatus[0].status);
        
        setNewNote(note);
        setNewStatus(status);
        setInitialNote(note);
        setInitialStatus(status);

        setFindMechanic(false);
        return;
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  //handle cancel button 
  const handleCancelUpdate = () => {
    setFindMechanic(true);
  };

  //handle submit button
  const handleSubmit = async() => {

    if (newNote === initialNote && newStatus === initialStatus) {
      toast.warning('No changes to update');
      return;
    }
    //assign status value
    let status = newStatus.value;
    let note = newNote === '' ? 'No Note' : newNote;
    try{
      const res = await axios.put('/api/updatejob/updateMechanicNote', {note,status,updateJobId,updateNoteMecId});
      setRefresh(!refresh);
      toast.success(res.data.message);
      setFindMechanic(true);
    }catch(err){
      toast.error(err.response.data.message);
    }
  };

  const findMech = (
    <div className="flex justify-center items-center mt-10 gap-6">
      <Select className="w-64"
        options={options}
        isClearable
        styles={customStyles}
        onChange={handleUpdateMechanic}
        placeholder='Search by Employee ID' />

      <button className="btn btn-normal" onClick={handleSearch}>Search</button>
    </div>
  );

  const notePart = (
    <div className="flex gap-8 justify-between">
      <div className="relative flex gap-8 my-4 ml-3 w-2/3 mainStyle">
        <p>Message: </p>
        <textarea
         rows={4} 
         placeholder="Type job update" 
         maxLength={200} 
         value={newNote} 
         onChange={handleNoteChange} 
         className="input rounded-lg w-full p-2"
        />
        <div className="absolute bottom-0.5 right-0.5 bg-white text-end rounded-lg pr-2 text-gray-500 text-sm">
          {newNote.length}/200
        </div>
      </div>

      <div className="mb-4 mr-8 gap-4 w-1/3 mainStyle">

        <div className="flex items-center justify-center my-4">
          <p className="w-20">Status :</p>
          <Select className="w-48"
            options={StatusOptions}
            isClearable
            value={newStatus}
            styles={customStyles}
            onChange={handleStatusChange}
            placeholder='Select status'
          />
        </div>

        <div className="flex justify-end gap-4">
          <button className="btn btn-warning" onClick={handleCancelUpdate}>Cancel</button>
          <button className="btn btn-normal" onClick={handleSubmit}>Submit</button>
        </div>

      </div>
    </div>
  );

  return (
    <div className="flex flex-row mt-7">

      <div className="flex flex-col justify-center items-center basis-2/3">

        <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light" />

        <div className="h-48 card mt-5 w-11/12 p-2">
          <p className="topic">Mechanic Update</p>
          {findMechanic ? findMech : notePart}
        </div>

        {/**table - start */}
        <div className="box-content h-80 card mt-5 w-11/12 p-2">
          <p className="topic">Mechanic Notes</p>
          <div className="flex justify-center overflow-auto max-h-72">
            <table className="mx-auto font-inter mt-4 w-11/12">
              <thead>
                <tr className='bg-text-primary text-white'>
                  <th className="border-2 border-black w-1/3">Employee ID</th>
                  <th className="border-2 border-black w-2/3">Message</th>
                </tr>
              </thead>
              <tbody>
                {
                  (tableData === null || tableData.length === 0) ? (
                    <tr>
                      <td colSpan="2" className='text-center border-2 border-black py-2 mainStyle'>
                        No Note Available
                      </td>
                    </tr>
                  ) : (
                    tableData && tableData.map((jobNote, index) => (
                      <tr key={index} className="text-center mainStyle">
                        <td className="border-2 border-black">{jobNote.mecId}</td>
                        <td className="border-2 border-black text-start pl-2">{jobNote.mecNote}</td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
        {/**table - end */}
      </div>

      <div className="basis-1/3">
        <Details />
      </div>
    </div>
  );
};

export default UpdateJob_MechanicNote;
