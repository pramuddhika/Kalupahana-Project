import { useEffect, useState } from "react";
import ShopHeader from "../components/ShopHeader";
import { Link } from "react-router-dom";
import axios from 'axios';

const MechanicsMenu = () => {

  const [tableData,setTableData] = useState(null);
  const [selectedRow,setSelectedRow] = useState('');
  const [refresh,setRefresh] = useState(false);

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
  }, [refresh]);

  //handle selected row data fetching
  const handleRowSelect = (data) => {
    setSelectedRow(data);
    setRefresh(!refresh);
  }

    return (
        <div>
            <ShopHeader pageName="Mechanics"/>
            <div className="h-9 bg-side-nav-bg border-b-2"/>

            <div className="flex justify-center gap-12">

              <div className="w-5/12">

                <div className="flex justify-between items-center mt-12">
                    <p className="topic text-xl">Mechanics Details</p>
                    <button className="btn btn-normal">
                      <Link to={'/shop/mechanics/add'}>Add</Link>
                    </button>
                </div>

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
                  <tr key={index} className="text-center cursor-pointer" onClick={() => handleRowSelect(mechanicsDetails)}>
                   <td className="border-2 border-black">{mechanicsDetails.employeeId}</td>
                   <td className="border-2 border-black">{mechanicsDetails.employeeName}</td>
                   <td className="border-2 border-black">{mechanicsDetails.mainArea}</td>
                 </tr>
                  ))
                 )}

                 
                
                </table>
               </div>
              </div>

              <div className="w-5/12">
                
                <div className="mt-12 card p-2">
                 
                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3 text-text-primary font-semibold">Employee Id : </p>
                   <input type="text" value={selectedRow.employeeId} className="input rounded-lg p-2 w-56" placeholder="Select an employee" readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3 text-text-primary font-semibold">Employee Name : </p>
                   <input type="text" value={selectedRow.employeeName} className="input rounded-lg p-2 w-56" readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3 text-text-primary font-semibold">Contact Number : </p>
                   <input type="text" value={selectedRow.contactNumber} className="input rounded-lg p-2 w-56"  readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3 text-text-primary font-semibold">Address : </p>
                   <input type="text" value={selectedRow.livingArea} className="input rounded-lg p-2 w-56"  readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3 text-text-primary font-semibold">Join Date : </p>
                   <input type="text" value={selectedRow.joinDate} className="input rounded-lg p-2 w-56"  readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3 text-text-primary font-semibold">Main specialist area : </p>
                   <input type="text" value={selectedRow.mainArea} className="input rounded-lg p-2 w-56"  readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3 text-text-primary font-semibold">Sub specialist area : </p>
                   <input type="text" value={selectedRow.employeeId ? (selectedRow.subArea ? selectedRow.subArea : "Not added") : " "}  className="input rounded-lg p-2 w-56"  readOnly/>
                 </div>

                 <div className="flex items-center ml-3 my-3">
                   <p className="basis-1/3 text-text-primary font-semibold">Resign Date : </p>
                   <input type="text" value={selectedRow.employeeId ? (selectedRow.resignDate ? selectedRow.resignDate : "Not added") : " "} placeholder="jk" className="input rounded-lg p-2 w-56"  readOnly/>
                 </div>

                 <div className="flex justify-end my-3 mr-10">
                   <button className="btn btn-normal">
                     <Link to={'/shop/mechanics/update'}>Edit</Link>
                   </button>
                 </div>

                </div>

              </div>

            </div>

        </div>
    );
};

export default MechanicsMenu;