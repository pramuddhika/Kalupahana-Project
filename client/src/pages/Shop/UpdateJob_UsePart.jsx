import Details from "../components/Details";
import { useState, useEffect, useContext } from "react";
import { UpdateJob_Context } from "./UpdateJob_Context";
import axios from "axios";
import Select from 'react-select';
import customStyles from '../components/SelectStyle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateQuantity } from "../Validation/InputFeilds"; 

const UpdateJob_UsePart = () => {

  const { updateJobData } = useContext(UpdateJob_Context);
  const [details, setDetails] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [unit, setUnit] = useState('');
  const [partID, setPartID] = useState(null);
  const [units, setUnits] = useState('');
  const [refresh,setRefresh] = useState(false);
  const [tableData,setTableData] = useState('');

  const updateJobId = updateJobData[0].jobId;

  
  useEffect(() => {
    // Fetch part IDs and details
   const fetchIDs = async () => {
    try {
      const res = await axios.get('/api/stock/get');
      const filteredData = res.data.partDetails.filter(item => parseFloat(item.quantity) > 0);
      setDetails(filteredData);
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  };
    
    //Fetch table data
    const fetchTableData = async() => {
      try{
        const res = await axios.get(`/api/updatejob/getusePArts/${updateJobId}`);
        setTableData(res.data.useParts);
      }catch(err){
        console.log(err.response.data.message)
      }
    }
  
    fetchIDs();
    fetchTableData();
  },[refresh])

  // Make option array for part IDs
  const options = details ? details.map(item => ({
    value: item.partID,
    label: `${item.partID} - ${item.partName}`,
    unit: item.unit
  })) : [];

  // Handle selected part ID change
  const handlePartIDChange = (selectedOption) => {
    setSelectedPart(selectedOption);
    const currentPart = selectedOption ? selectedOption.value : null;
    setPartID(currentPart);
    const currentUnit = selectedOption ? selectedOption.unit : '';
    setUnit(currentUnit);
  }

  // Handle user input for quantity
  const handleQuantityChange = (e) => {
    setUnits(e.target.value);
  }

  //handle clear click
  const handleClearClick = () =>{
    setSelectedPart(null)
    setUnit('')
    setUnits('')
  }

  //handle Add button
  const handleAddClick = async(e) => {
    e.preventDefault();

    const quntityErr = validateQuantity(units);
    if(quntityErr){
      toast.warning(quntityErr);
      return;
    }

    // Step 1 & 2: Check if unit type is 'U' and units is not a whole number
    if(unit === 'U' && !Number.isInteger(Number(units))){
      // Step 3: Show warning message
      toast.warning("Units must be a whole number when unit type is 'U'");
      return;
    }
    
    try{
     const res = await axios.post('/api/updatejob/addUseParts', {partID,updateJobId,units});
     toast.success(res.data.message);
     setRefresh(!refresh);
     handleClearClick();
    }catch(err){
     toast.error(err.response.data.message)
    } 
  }
  
  return (
    <div className="flex flex-row mt-7">
        
      <div className="flex flex-col justify-center items-center basis-2/3">

        <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light" />

        {/**input data form - start */}
        <div className="h-48 card w-11/12 p-2 mt-5">
             
          <p className="topic ">Used Part</p>

          <div className="flex justify-center items-center w-10/12 font-inter gap-2 mt-1">
            <p className="text-text-primary font-semibold w-4/12">Part Name or Id: </p>
            <Select className="w-80"
             options={options}
             isClearable
             styles={customStyles}
             onChange={handlePartIDChange}
             value={selectedPart}
             placeholder='Add Part Id or Name'
            />
          </div>

          <div className="flex items-center w-10/12 font-inter gap-2 mt-4">
            <p className="text-text-primary font-semibold w-4/12 ml-14 pl-1">Quantity: </p>
            <div className="flex items-center gap-3">
              <input
               type="number" 
               className="input p-2 rounded-lg w-48 ml-1 text-center" 
               value={units} 
               onChange={handleQuantityChange} 
               placeholder="XXX.XX"
              />
              <input
               type="text" 
               id="unit" 
               className="input p-2 rounded-lg w-24" 
               value={unit} 
               readOnly
              />
            </div>
          </div>

          <div className="flex justify-end gap-5 mt-2 mr-8">
            <button className="btn btn-warning" onClick={handleClearClick}>Clear</button>
            <button className="btn btn-normal" onClick={handleAddClick}>Add</button>
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
                <th colSpan={2} className="border-2 border-black w-2/3">Quantity</th>
              </tr>

              {tableData === null || tableData.length === 0 ? (
                <tr>
                  <td colSpan="4" className='text-center border-2 border-black py-2 mainStyle'>No data to display</td>
                </tr>
              ) : (
              tableData && tableData.map( (useParts,index) => (
                <tr key={index} className="text-center">
                  <td className="border-2 border-black">{useParts.partId}</td>
                  <td className="border-2 border-black">{useParts.PartName}</td>
                  <td className="border-y-2 border-l-2 border-black text-end">{useParts.partQuntity}</td>
                  <td className="border-y-2 border-r-2 border-black w-28 text-start">{useParts.partUnit}</td>
                </tr>
              ))) }
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

export default UpdateJob_UsePart;