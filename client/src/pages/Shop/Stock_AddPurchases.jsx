import { TrashIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Select from 'react-select';
import customStyles from '../components/SelectStyle';
import Modal from '../components/Modal';

const Stock_AddPurchases = () => {
  const [tableList, setTableList] = useState(null);
  const [partID, setPartID] = useState(null);
  const [details, setDetails] = useState(null);
  const [dates, setDates] = useState(null);
  const [units, setUnits] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [unit, setUnit] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState('');

  // Get this month's purchases data for the table
  const fetchTableData = async () => {
    try {
      const res = await axios.get("/api/stock/todaypurchases");
      setTableList(res.data);
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  }

  // Fetch part IDs and details
  const fetchIDs = async () => {
    try {
      const res = await axios.get('/api/stock/get');
      setDetails(res.data.partDetails);
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  }

  useEffect(() => {
    fetchTableData();
    fetchIDs();
  }, [refresh])

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

  const handleDatesChange = (e) => {
    setDates(e.target.value);
  }

  // Handle clear button
  const handleClear = () => {
    setUnits('');
    setSelectedPart(null);
    setDates('');
    setUnit('');
  }

  // Handle add part
  const handleAddPart = async (e) => {
    e.preventDefault();
    // Check part ID is not empty
    if (!partID) {
      toast.warning('Part name cannot be empty!');
      return;
    }
    // Check date is not empty
    if (!dates) {
      toast.warning('Date cannot be empty!')
      return;
    }
    // Check quantity is not empty
    if (!units) {
      toast.warning('Quantity cannot be empty!');
      return;
    }
    if (units <= 0) {
      toast.warning('Invalid quantity entered!');
      return;
    }

    try {
      const res = await axios.post('/api/stock/purchases', { partID,units,dates,unit});
      setRefresh(!refresh);
      handleClear();
      setPartID(null);
      toast.success(res.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  // Handle delete click in table
  const handleDeleteClick = (data) => {
    setSelectedRow(data);
    setOpenDeleteModal(true);
  };

  // Handle delete request
  const handleDelete = async (partid, date, quantity) => {
    try {
      const res = await axios.delete(`/api/stock/delete/${partid}/${date}/${quantity}`);
      setRefresh(!refresh);
      handleClear();
      setOpenDeleteModal(false)
      toast.success(res.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  return (
    <div className="flex justify-center gap-8">

      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light" />

      {/** Purchases input part - start */}
      <div className="card w-5/12 p-6 mt-28 h-84">
        <p className="topic text-xl mb-4">Purchases Details</p>

        <div className="flex justify-center fornt-inter items-center mb-4 mt-16">
          <p className="basis-1/4 text-text-primary font-semibold">Part :</p>

          <Select className="w-64"
            options={options}
            isClearable
            styles={customStyles}
            onChange={handlePartIDChange}
            value={selectedPart}
            placeholder='Add Part Id or Name' />
        </div>

        <div className="flex justify-center fornt-inter items-center mb-4">
          <p className="basis-1/4 text-text-primary font-semibold">Date:</p>
          <input
           type="date" 
           value={dates} 
           required 
           className="input basis-1/2 rounded-lg p-2 pl-4" 
           onChange={handleDatesChange} 
          />
        </div>

        <div className="flex justify-center fornt-inter">
          <p className="basis-1/4 text-text-primary font-semibold mt-3">Quantity:</p>
          <div className='flex basis-1/2 gap-4'>
            <input 
              type="number" 
              required 
              value={units} 
              className="input w-40 rounded-lg p-2 pl-4" 
              placeholder="XXX.XX"
              onChange={handleQuantityChange}
            />
            <input
             className='input rounded-lg w-20' 
             value={unit} 
             readOnly
            />
          </div>

        </div>

        <div className="flex justify-center mt-6 gap-4">
          <button className="btn btn-warning" onClick={handleClear}>Clear</button>
          <button className="btn btn-normal" onClick={handleAddPart}>Submit</button>
        </div>

      </div>
      {/** Purchases input part - end */}

      <div className="card w-5/12 mt-28 p-6 h-84">
        <p className="topic text-xl mb-4">This Month Purchases</p>
        {/** Table part - start */}
        <div className="flex justify-center overflow-auto max-h-80">
          <table className="mx-auto font-inter mt-4 w-11/12">
            <tr className='bg-text-primary text-white'>
              <th className="border-2 border-black">Part ID</th>
              <th className='border-2 border-black w-32'>Date</th>
              <th colSpan={2} className="border-2 border-black">Quantity</th>
              <th className="border-2 border-black">Action</th>
            </tr>

            {tableList === null || tableList.length === 0 ? (
              <tr>
                <td colSpan="5" className='text-center border-2 border-black py-2 mainStyle'>No data to display</td>
              </tr>
            ) : (
              tableList && tableList.map((purchases, index) => (
                <tr key={index} className="text-center mainStyle">
                  <td className="border-2 border-black">{purchases.partID}</td>
                  <td className='border-2 border-black'>{purchases.date}</td>
                  <td className="border-y-2 border-l-2 text-end border-black">
                    {purchases.unit === 'U' ? String(purchases.quantity).split('.')[0] : purchases.quantity}
                  </td>
                  <td className="border-y-2 border-r-2 text-start w-12 border-black">{purchases.unit}</td>
                  <td className="border-2 border-black cursor-pointer" onClick={() => handleDeleteClick(purchases)}>
                    <TrashIcon className='text-red-600 h-5 mx-auto' />
                  </td>
                </tr>
              )))}
          </table>
        </div>
        {/** Table part - end */}
      </div>

      {/** Delete modal - start */}
      <Modal open={openDeleteModal}>
        <div onClick={(e) => e.stopPropagation()}>
          <p className="font-bold pb-2 text-red-600 text-2xl text-center mb-3">Delete purchase Details</p>

          <div className="flex fornt-inter items-center mb-4 mainStyle">
            <p className="w-24 font-semibold">Part Id:</p>
            <input
             type="text" 
             value={selectedRow.partID} 
             readOnly 
             className="input w-40 border-2 rounded-lg py-2 pl-4"
            />
          </div>

          <div className="flex fornt-inter items-center mb-4 mainStyle">
            <p className="w-24 font-semibold">Date:</p>
            <input
             type="text" 
             value={selectedRow.date} 
             readOnly 
             className="input w-40 border-2 rounded-lg py-2 pl-4"
            />
          </div>

          <div className="flex fornt-inter mainStyle">
            <p className="w-24 font-semibold mt-3">Quantity:</p>
            <div className='flex'>
              <input
               type='text' 
               readOnly 
               className="input w-20 border-y-2 border-l-2 rounded-lg rounded-r-none py-2 pl-4"
               value={selectedRow.unit === 'U' ? String(selectedRow.quantity).split('.')[0] : selectedRow.quantity} 
              />
              <input
               type='text' 
               value={selectedRow.unit} 
               readOnly 
               className="input w-20 border-y-2 border-r-2 rounded-lg rounded-l-none text-start py-2 pl-4"
              />
            </div>
          </div>

          <div className="flex justify-center gap-8 mt-4">
            <button className='btn btn-normal' onClick={() => { setOpenDeleteModal(false) }}>Cancel</button>
            <button className="btn btn-warning"
              onClick={() => { handleDelete(selectedRow.partID, selectedRow.date, selectedRow.quantity) }}>Delete</button>
          </div>
        </div>
      </Modal>
      {/** Delete modal - end */}

    </div>
  );
};

export default Stock_AddPurchases;