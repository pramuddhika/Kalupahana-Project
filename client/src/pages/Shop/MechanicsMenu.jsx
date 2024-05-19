import { useEffect, useState } from "react";
import ShopHeader from "../components/ShopHeader";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MechanicsMenu = () => {

  const [tableData,setTableData] = useState(null);
  const [selectedRow,setSelectedRow] = useState({});
  const [selectedRowIndex,setSelectedRowIndex] = useState('');
  const navigate = useNavigate();

  //fetch data to the table
  const fetchTableData = async () => {
    try{
      const res = await axios.get("http://localhost:8000/api/mechanic/getmechanics");
      setTableData(res.data);
    }catch(err){
      console.log('Error fetching data:', err);
    }
  }

  useEffect( () => {
    fetchTableData();
  }, []);

  //handle selected row data fetching
  const handleRowSelect = (data,index) => {
    setSelectedRowIndex(index);
    setSelectedRow(data);
  }

  const handleEditClick = () => {
    //if user not select employee stop moving  edit page
    if(JSON.stringify(selectedRow) === JSON.stringify({})){
      toast.warning('Please select an employee');
      return;
    }
    navigate('/shop/mechanics/update',{ state: { selectedRow } });
  };

 

  return (
    <div>
      <ShopHeader pageName="Mechanics"/>
      <div className="h-9 bg-side-nav-bg border-b-2"/>

      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

      <div className="flex justify-center gap-12">

        <div className="w-5/12">

          <div className="flex justify-between items-center mt-12">
            <p className="topic text-xl">Mechanics Details</p>
            <button className="btn btn-normal">
              <Link to={'/shop/mechanics/add'}>Add</Link>
            </button>
          </div>
          {/**table - start */}
          <div className="flex justify-center overflow-auto max-h-96 mt-10">
            <table className="mx-auto font-inter mt-4 w-11/12">
              <tr className='bg-text-primary text-white'>
                <th className="border-2 border-black">Employee ID</th>
                <th className="border-2 border-black">Empolyee Name</th>
                <th className="border-2 border-black">Specialist Area</th>
              </tr>

              {tableData === null || tableData.length === 0 ? (
              <tr>
                <td colSpan="4" className='text-center border-2 border-black py-2'>No data to display</td>
              </tr>
              ):(
              tableData && tableData.map( (mechanicsDetails, index)=> (
                <tr key={index} 
                className={`text-center cursor-pointer ${index === selectedRowIndex ? 'bg-web-primary' : ''}`}
                onClick={() => handleRowSelect(mechanicsDetails,index)}>
                  <td className="border-2 border-black">{mechanicsDetails.employeeId}</td>
                  <td className="border-2 border-black">{mechanicsDetails.employeeName}</td>
                  <td className="border-2 border-black">{mechanicsDetails.mainArea}</td>
                </tr>
              ))
              )} 
            </table>
          </div>
          {/**table - end */}
        </div>

        <div className="w-5/12">
          <div className="mt-12 card p-2">
            {/**select row data display form - satrt */}    
            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Employee Id : </p>
              <input type="text" value={selectedRow.employeeId} className="input rounded-lg p-2 w-56 text-gray-600" 
              placeholder="Select an employee" readOnly/>
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Employee Name : </p>
              <input type="text" value={selectedRow.employeeName} className="input rounded-lg p-2 w-56 text-gray-600" readOnly/>
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Contact Number : </p>
              <input type="text" value={selectedRow.contactNumber} className="input rounded-lg p-2 w-56 text-gray-600"  readOnly/>
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Address : </p>
              <input type="text" value={selectedRow.livingArea} className="input rounded-lg p-2 w-56 text-gray-600"  readOnly/>
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Join Date : </p>
              <input type="text" value={selectedRow.joinDate} className="input rounded-lg p-2 w-56 text-gray-600"  readOnly/>
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Main specialist area : </p>
              <input type="text" value={selectedRow.mainArea} className="input rounded-lg p-2 w-56 text-gray-600"  readOnly/>
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Sub specialist area : </p>
              <input type="text" value={selectedRow.employeeId ? (selectedRow.subArea ? selectedRow.subArea : "Not Added") : " "}  
              className="input rounded-lg p-2 w-56 text-gray-600"  readOnly/>
            </div>

            <div className="flex items-center ml-3 my-3">
              <p className="basis-1/3 text-text-primary font-semibold">Resign Date : </p>
              <input type="text" value={selectedRow.employeeId ? (selectedRow.resignDate ? selectedRow.resignDate : "Not Added ") : " "} 
              className="input rounded-lg p-2 w-56 text-gray-600"  readOnly/>
            </div>

            <div className="flex justify-end my-3 mr-10">
              <button className="btn btn-normal" onClick={handleEditClick}>Edit</button>
            </div>
            {/**select row data display form - end */} 
          </div>
        </div>

      </div>
    </div>
  );
};

export default MechanicsMenu;