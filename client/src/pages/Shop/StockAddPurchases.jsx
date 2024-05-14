import {TrashIcon,PencilSquareIcon} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Select from 'react-select';
import customStyles from '../components/SelectStyle';

const StockAddPurchases = () => {

  const [tableList,setTableList] = useState(null);
  const [selectedID,setSelectedID] = useState(null);
  const [selectedName,setSelectedName] =useState(null);
  const [details,setDetails] = useState(null);

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
  })

  //make option arry for partIDs
  const optionsID = details ? details.map(item => ({
    value: item.partID,
    label: `${item.partID}`
    })) : [];

  //make option arry for partIDs
  const optionsNnames = details ? details.map(item => ({
    value: item.partID,
    label: `${item.partName}`
    })) : [];

  //handle selected partID change
  const handlePartIDChange = (optionsID) => {
    setSelectedID(optionsID);
  }

  //handle selected partName change
  const handlePartNameChange = (optionsNames) => {
    setSelectedName(optionsNames);
  }

    return (
        <div className="flex justify-center gap-8">

         <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

          {/**purchases input part-start*/}
          <div className="card w-5/12 p-6 mt-28 h-84">
            <p className="topic text-xl mb-4">Purchases Details</p>

            <div className="flex justify-center fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Part Id:</p>
              
              <Select className="w-64"
              options={optionsID}
              isClearable
              styles={customStyles}
              onChange={handlePartIDChange}
              value={selectedID}
              placeholder='Add PartID'/>

          </div>

            <div className="flex justify-center fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Part Name:</p>
              
              <Select className="w-64"
              options={optionsNnames}
              isClearable
              styles={customStyles}
              onChange={handlePartNameChange}
              value={selectedName}
              placeholder='Add Part Name'/>
              
            </div>

            <div className="flex justify-center fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Date:</p>
              <input type="date" required className="input basis-1/2 rounded-lg p-2 pl-4"/>
            </div>

            <div className="flex justify-center fornt-inter">
              <p className="basis-1/4 text-text-primary font-semibold mt-3">Quantity:</p>
              <input type="number" required className="input basis-1/2 rounded-lg p-2 pl-4" placeholder="Number of units"/>
            </div>

            <div className="flex justify-center mt-6 gap-4">
              <button className="btn btn-warning">Clear</button>
              <button className="btn btn-normal">Submit</button>
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
                  <th className="border-2 border-black">Quantity</th>
                  <th colSpan="2" className="border-2 border-black">Action</th>
                </tr>

                {tableList == null || tableList.length == 0 ? (
                  <tr>
                   <td colSpan="4" className='text-center border-2 border-black py-2'>No data to display</td>
                  </tr>
                ):(
                  tableList && tableList.map ( (purchases,index) => (
                    <tr key={index} className="text-center">
                     <td className="border-2 border-black">{purchases.partID}</td>
                     <td className="border-2 border-black">{purchases.quantity}</td>
                     <td className="border-2 border-black cursor-pointer">
                       <PencilSquareIcon className='text-green-700 h-5 mx-auto'/>
                     </td>
                     <td className="border-2 border-black cursor-pointer">
                       <TrashIcon className='text-red-600 h-5 mx-auto'/>
                     </td>
                   </tr>
                  )))}
             </table>
            </div>
            {/**tab3e part - end */}
          </div>

        </div>
    );
};

export default StockAddPurchases;
