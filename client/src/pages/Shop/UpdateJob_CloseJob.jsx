import { useContext, useState, useEffect } from 'react';
import { UpdateJob_Context } from "./UpdateJob_Context";
import axios from 'axios';
import Select from 'react-select';
import customStyles from '../components/SelectStyle';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';
import PostRepairDocument from '../components/PostRepairDocument';

const UpdateJob_CloseJob = () => {

  const { updateJobData } = useContext(UpdateJob_Context);
  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [instructions, setInstructions] = useState('');
  const [shopOwnerNote, setShopOwnerNote] = useState('');
  const [postDocId, setPostDocId] = useState(null);
  const [batteryHealth, setBatteryHealth] = useState(null);
  const [enginePerformance, setEnginePerformance] = useState(null);
  const [tireCondition, setTireCondition] = useState(null);
  const [fluidLevels, setFluidLevels] = useState(null);
  const [jobCloseModal,setJobCloseModal] = useState(false);

  const updateJobId = updateJobData[0].jobId;
  const vehicleNumber = updateJobData[0].vehicleNumber;
  const customerName = updateJobData[0].customer;
  const customerEmail = updateJobData[0].email;
  const customerPhoneNumber = updateJobData[0].phoneNumber;

  useEffect(() => {
    const fetchPostRepairDocId = async () => {
      try {
        const { data } = await axios.get('/api/updatejob/generateJobCloseId');
        setPostDocId(data.PostRepairDocumentId);
      } catch (err) {
        console.error('Error fetching post-repair document ID:', err);
      }
    };
    fetchPostRepairDocId();
  }, []);

  // check list option
  const options = [
    { value: 'Good', label: 'Good' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' }
  ];

  const handleClear = () => {
    setInstructions('');
    setShopOwnerNote('');
    setBatteryHealth(null);
    setEnginePerformance(null);
    setTireCondition(null);
    setFluidLevels(null);
  };

  const handleSubmit = async() => {
    
    try{
      const checkMechanics = await axios.get(`/api/updatejob/chekMechanic/${updateJobId}`);
      if(checkMechanics.data.message === "Yes"){
        toast.warning('Mechanics are still working oni this job!');
        return;
      }
      if(checkMechanics.data.message === "No"){
       
        let newBatteryHealth = batteryHealth ? batteryHealth.value : null;
        let newEnginePerformance = enginePerformance ? enginePerformance.value : null;
        let newFluidLevels = fluidLevels ? fluidLevels.value : null;
        let newTireCondition = tireCondition ? tireCondition.value : null;
    
        //close job
        try{
        await axios.post('/api/updatejob/addCloseJobData',{postDocId,newBatteryHealth,newEnginePerformance,
          newTireCondition,newFluidLevels,instructions,shopOwnerNote,dateString,updateJobId})
          setJobCloseModal(true);
        }catch(err){
          toast.error(err.response.data.message)
        }
      }
    }catch(err){
      console.log(err.response.data.message)
    } 
  };

  return (
    <div className="flex flex-col items-center justify-center mt-7">

      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

      <div className="flex card w-10/12 p-2">
        <div className="w-1/2">

          <div className="flex justify-center items-center gap-4">
            <p className="mainStyle w-48 p-2">Vehicle Number:</p>
            <input
             className="input rounded-lg w-60 p-1 pl-3" 
             value={vehicleNumber} 
             readOnly 
            />
          </div>

          <div className="flex justify-center items-center gap-4">
            <p className="mainStyle w-48 p-2">Customer Name:</p>
            <input
              className="input rounded-lg w-60 p-1 pl-3" 
              value={customerName} 
              readOnly 
            />
          </div>

          <div className="flex justify-center items-center gap-4">
            <p className="mainStyle w-48 p-2">Customer Email:</p>
            <input
             className="input rounded-lg w-60 p-1 pl-3" 
             value={customerEmail} 
             readOnly 
            />
          </div>

          <div className="flex justify-center items-center gap-4">
            <p className="mainStyle w-48 p-2">Phone Number:</p>
            <input
             className="input rounded-lg w-60 p-1 pl-3" 
             value={customerPhoneNumber} 
             readOnly 
            />
          </div>

        </div>

        <div className="w-1/2">

          <div className="flex justify-center items-center gap-4">
            <p className="mainStyle w-48 p-2">Document Number:</p>
            <input
             className="input rounded-lg w-60 p-1 text-center" 
             value={postDocId} 
             readOnly 
            />
          </div>

          <div className="flex justify-center items-center gap-4">
            <p className="mainStyle w-48 p-2">Repair Job Number:</p>
            <input 
             className="input rounded-lg w-60 p-1 text-center" 
             value={updateJobId} 
             readOnly 
            />
          </div>

          <div className="flex justify-center items-center gap-4">
            <p className="mainStyle w-48 p-2">Date:</p>
            <input 
              className="input rounded-lg w-60 p-1 text-center" 
              value={dateString} 
              readOnly 
            />
          </div>

        </div>
      </div>

      <div className="card w-10/12 p-2 mt-7 mainStyle">
        <div className='flex w-full'>
          <div className='my-4 w-1/2'>

            <div className='flex items-center justify-center my-3'>
              <p className='w-64'>Battery health</p>
              <Select className='w-48'
                isClearable
                options={options}
                styles={customStyles}
                value={batteryHealth}
                onChange={setBatteryHealth}
              />
            </div>

            <div className='flex items-center justify-center'>
              <p className='w-64'>Engine performance</p>
              <Select className='w-48'
                isClearable
                options={options}
                styles={customStyles}
                value={enginePerformance}
                onChange={setEnginePerformance}
              />
            </div>

          </div>

          <div className='w-1/2 my-4'>

            <div className='flex items-center justify-center my-3'>
              <p className='w-64'>Tire Condition</p>
              <Select className='w-48'
                isClearable
                options={options}
                styles={customStyles}
                value={tireCondition}
                onChange={setTireCondition}
              />
            </div>

            <div className='flex items-center justify-center'>
              <p className='w-64'>Fluid levels</p>
              <Select className='w-48'
                isClearable
                options={options}
                styles={customStyles}
                value={fluidLevels}
                onChange={setFluidLevels}
              />
            </div>

          </div>
        </div>
      </div>

      <div className="card w-10/12 p-2 mt-7">
        <p className="topic my-3">Mechanic{'\''}s Instructions</p>

        <div className="relative flex justify-center">
          <textarea
            rows={3}
            className="input rounded-lg w-11/12 mb-3 p-2"
            maxLength={200}
            placeholder="Maintains instructions here"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <div className="absolute bottom-3 right-12 bg-white text-end rounded-lg pr-2 text-gray-500 text-sm">
            {instructions.length}/200
          </div>
        </div>

      </div>

      <div className="card w-10/12 p-2 mt-7">
        <p className="topic my-3">Shop Owner Note</p>

        <div className="relative flex justify-center">
          <textarea
            rows={5}
            className="input rounded-lg w-11/12 mb-3 p-2"
            maxLength={200}
            value={shopOwnerNote}
            onChange={(e) => setShopOwnerNote(e.target.value)}
            placeholder="Special note from shop owner"
          />
          <div className="absolute bottom-3 right-12 bg-white text-end rounded-lg pr-2 text-gray-500 text-sm">
            {shopOwnerNote.length}/200
          </div>
        </div>
        
      </div>

      <div className="flex gap-4 mt-5 mb-10">
        <button className="btn btn-warning" onClick={handleClear}>Clear</button>
        <button className="btn btn-normal" onClick={handleSubmit}>Submit</button>
      </div>

      <Modal open={jobCloseModal} >
        <div>
          <div onClick={(e) => e.stopPropagation()}>
            <p className="font-bold pb-2 text-text-primary text-2xl text-center">Job Close successfully</p>
                
            <div className='text-center pt-2'>
              <p className='mainStyle'>Please select an option,</p>
            </div>
                
            <div className="flex justify-center">
            <PostRepairDocument
                vehicleNumber={vehicleNumber}
                customerName={customerName}
                customerEmail={customerEmail}
                customerPhoneNumber={customerPhoneNumber}
                postDocId={postDocId}
                updateJobId={updateJobId}
                dateString={dateString}
                batteryHealth={batteryHealth}
                enginePerformance={enginePerformance}
                tireCondition={tireCondition}
                fluidLevels={fluidLevels}
                instructions={instructions}
                shopOwnerNote={shopOwnerNote}
              /> 
            </div>

            <div className="flex justify-center">
              <Link to = {'/shop/updateJob'}>
                <button className="btn btn-normal w-40 mx-auto mt-2">Back</button>
              </Link>
            </div>

          </div>
        </div>
      </Modal>

    </div>
  );
};

export default UpdateJob_CloseJob;
