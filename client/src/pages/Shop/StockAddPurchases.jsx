import {TrashIcon} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Select from 'react-select';
import customStyles from '../components/SelectStyle';
import Modal from '../components/Modal';

const StockAddPurchases = () => {

  const [tableList,setTableList] = useState(null);
  const [partID,setPartID] = useState(null);
  const [details,setDetails] = useState(null);
  const [dates,setDates] = useState(null);
  const [units,setUnits] = useState(null);
  const [refresh,setRefresh] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [openDeleteModal,setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState('');

  //get today purchases data to table
  const fetchTableData = async () => {
    try{
      const res = await axios.get("http://localhost:8000/api/stock/todaypurchases")
      setTableList(res.data);
    }catch(err){
      console.log('Error fetching data:',err);
    }
  }

  //fect Id to select
  const fetchIDs = async () => {
    try{
      const res = await axios.get('http://localhost:8000/api/stock/get');
      setDetails(res.data);
    }catch(err){
      console.log('Error fetching data:',err);
    }
  }

  useEffect( () => {
    fetchTableData();
    fetchIDs();
  },[refresh])

  //make option arry for partIDs
  const options = details ? details.map(item => ({
    value: item.partID,
    label: `${item.partID} - ${item.partName}`
    })) : [];

  //handle selected partID change
  const handlePartIDChange = (selectedOption) => {
    
    setSelectedPart(selectedOption);
    const currentpart = (selectedOption ? selectedOption.value : null);
    setPartID(currentpart);
    console.log(partID)
   
  }
  
  //handle user input for quantity
  const handlequantityChange = (e) => {
    setUnits(e.target.value);
  }

  const handleDatesChange = (e) => {
    setDates(e.target.value);
  }

  //handle clear button
  const handleClear =() => {
    setUnits('');
    setSelectedPart(null);
    setDates('');
  }

  //handle add part
  const handleAddPart = async (e) => {
    e.preventDefault();
    //chack part id is not empty
    if (!partID) {
      toast.warning('Part name cannot be empty!');
      return;
    }
    //check date is not emapty
    if(!dates){
      toast.warning('Date cannot be empty!')
      return;
    }
    //check quantity is not empty
    if(!units){
      toast.warning('Quantity can not be empty!');
      return;
    }
    if(units <= 0){
      toast.warning('Invalid quantity entered!');
      return;
    }

    try{
      const res = await axios.post('http://localhost:8000/api/stock/purchases', {partID,units,dates});
      setRefresh(!refresh);
      handleClear();
      setPartID(null);
      toast.success(res.data);
     
    }catch(err){
      toast.error(err.response.data);
    }
  }

  //handel delete click in table
  const handleDeleteClick = (data) => {
    setSelectedRow(data);
    setOpenDeleteModal(true);
  };
  
  //handel delete request
  const handleDelete = async (partid,date,quantity) => {
    try{
      const res = await axios.delete(`http://localhost:8000/api/stock/delete/${partid}/${date}/${quantity}`);
      setRefresh(!refresh);
      handleClear();
      setOpenDeleteModal(false)
      toast.success(res.data);
    }catch(err){
      toast.error(err.response.data);
    }
  }

  
    return (
        <div className="flex justify-center gap-8">

         <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

          {/**purchases input part-start*/}
          <div className="card w-5/12 p-6 mt-28 h-84">
            <p className="topic text-xl mb-4">Purchases Details</p>

            <div className="flex justify-center fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Part :</p>
              
              <Select className="w-64"
              options={options}
              isClearable
              styles={customStyles}
              onChange={handlePartIDChange}
              value={selectedPart}
              placeholder='Add Part Id or Name'/>

          </div>

            

            <div className="flex justify-center fornt-inter items-center mb-4">
             <p className="basis-1/4 text-text-primary font-semibold">Date:</p>
             <input type="date" value={dates} required className="input basis-1/2 rounded-lg p-2 pl-4" 
             onChange={handleDatesChange}/>
             </div>

            <div className="flex justify-center fornt-inter">
              <p className="basis-1/4 text-text-primary font-semibold mt-3">Quantity:</p>
              <input type="number" required className="input basis-1/2 rounded-lg p-2 pl-4" placeholder="Number of units" value={units}
              onChange={handlequantityChange} min={1}/>
            </div>

            <div className="flex justify-center mt-6 gap-4">
              <button className="btn btn-warning" onClick={handleClear}>Clear</button>
              <button className="btn btn-normal" onClick={handleAddPart}>Submit</button>
            </div>

          </div>
          {/**purchases input part - end */}

          <div className="card w-5/12 mt-28 p-6 h-84">
            <p className="topic text-xl mb-4">This Month Purchases</p>
            {/**table part - start */}
            <div className="flex justify-center overflow-auto max-h-80">
             <table className="mx-auto font-inter mt-4 w-11/12">
                <tr className='bg-text-primary text-white'>
                  <th className="border-2 border-black">Part ID</th>
                  <th className='border-2 border-black w-32'>Date</th>
                  <th className="border-2 border-black">Quantity</th>
                  <th className="border-2 border-black">Action</th>
                </tr>

                {tableList == null || tableList.length == 0 ? (
                  <tr>
                   <td colSpan="4" className='text-center border-2 border-black py-2'>No data to display</td>
                  </tr>
                ):(
                  tableList && tableList.map ( (purchases,index) => (
                    <tr key={index} className="text-center">
                     <td className="border-2 border-black">{purchases.partID}</td>
                     <td className='border-2 border-black'>{purchases.date}</td>
                     <td className="border-2 border-black">{purchases.quantity}</td>
                     <td className="border-2 border-black cursor-pointer" onClick={() => handleDeleteClick(purchases)}>
                       <TrashIcon className='text-red-600 h-5 mx-auto'/>
                     </td>
                   </tr>
                  )))}
             </table>
            </div>
            {/**tab3e part - end */}
          </div>

          {/**delete modal - start */}
    <Modal open={openDeleteModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <p className="font-bold pb-2 text-red-600 text-2xl text-center mb-3">Delete purchase Details</p>

        <div className="flex fornt-inter items-center mb-4">
          <p className="w-24 text-text-primary font-semibold">Part Id:</p>
          <input type="text" value={selectedRow.partID} readOnly className="input w-40 border-2 rounded-lg py-2 pl-4"/>
        </div>

        <div className="flex fornt-inter items-center mb-4">
          <p className="w-24 text-text-primary font-semibold">Date:</p>
            <input type="text" value={selectedRow.date} readOnly className="input w-40 border-2 rounded-lg py-2 pl-4"/>
        </div>

        <div className="flex fornt-inter">
          <p className="w-24 text-text-primary font-semibold mt-3">Quntity:</p>                  
          <input type='text' value={selectedRow.quantity}  readOnly className="input w-40 border-2 rounded-lg py-2 pl-4"/>              
        </div>

        <div className="flex justify-center gap-8 mt-4">
          <button className='btn btn-normal'onClick={ () => { setOpenDeleteModal(false)}}>Cancel</button>
          <button className="btn btn-warning" 
          onClick={ () => {handleDelete(selectedRow.partID,selectedRow.date,selectedRow.quantity)}}>Delete</button>
        </div>
      </div>   
    </Modal>
    {/**delete modal - end   */}

          

        </div>
    );
};

export default StockAddPurchases;
