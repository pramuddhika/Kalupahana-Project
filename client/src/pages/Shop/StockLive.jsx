import { useEffect, useState } from "react";
import axios from "axios";
import Select from 'react-select';
import customStyles from '../components/SelectStyle';


const StockLive = () => {

  const [tabledetails,setTableDetails] = useState(null);
  const [selectedPart,setSelectedPart] = useState(null);
  const [refresh,setRefresh] = useState(false);
  const [searchID,setSearchID] = useState(null);
  
  //geta table data
  const fetchTableData =  async () => {
    try{
      const res = await axios.get('http://localhost:8000/api/stock/get');
      setTableDetails(res.data);
    }catch(err){
      console.log('Error fetching data:',err);
    }
  }

  //get data from database for select item
  const fechSearchByID = async (searchID) => {
    try{
      const res = await axios.get(`http://localhost:8000/api/stock/search/${searchID}`)
      setTableDetails(res.data);
    }catch(err){
      console.log('Error fetching data: ' , err);
    }
  };

  useEffect( () => {
    if( searchID === null) {
      fetchTableData();
    }else {
      fechSearchByID(searchID);
    }
    
  })

  //filter by part id or name - option list
  const optionForID_Name = tabledetails ? tabledetails.map(part => ({
    value: part.partID,
    label: `${part.partID} - ${part.partName}`
  })):[]; 

  //handel part id & name searchbar
  const handlePartIDChange = (option) => {
    setSelectedPart(option);
    const currentOption = (option ? option.value : null);
    setSearchID(currentOption);
    setRefresh(!refresh);
  };



    return (

      <div>
        <div className="flex justify-center">
           
            <div className="flex justify-center items-center gap-10 card mt-10 p-8 w-11/12">

             <div className="flex gap-4 border-2 border-text-primary p-4 rounded-lg">
                <input type="text" className="input p-2 rounded-lg w-44" placeholder="Add Part ID or Name"/>
                
              </div>

              <div className="flex gap-4 border-2 border-text-primary p-4 rounded-lg">
              <Select className="w-60"
               options={optionForID_Name}
               isClearable
               styles={customStyles}
               onChange={handlePartIDChange}
               value={selectedPart}
               placeholder='Add Part Id or Name'/>
              </div>
               
               <div className="flex items-center gap-4 border-text-primary border-2 p-4 rounded-lg">
                 <input type="text" value="Get Report" className="input p-2 rounded-lg w-32 text-gray-400" readOnly/>
                 <button className="btn btn-normal">Download</button>
               </div>
              
            </div>

         

        </div>

        <div className="mt-10">
              
          <table className="w-10/12 mx-auto font-inter">
            <tr className="bg-text-primary text-white h-12">
              <th className="w-1/4 border-2 border-black">Part ID</th>
              <th className="w-1/2 border-2 border-black">Part Name</th>
              <th className="w-1/4 border-2 border-black">Quantity</th>
            </tr>

            {tabledetails == null || tabledetails.length == 0 ? (
              <tr>
                <td colSpan={3} className="border-2 border-black text-center py-3">No data to display</td>
              </tr>
            ):(
              tabledetails && tabledetails.map ( (partDetails, index) => (
                <tr key={index} className="bg-gray-300 p-2">
                 <td className="border-2 border-black text-center py-3">{partDetails.partID}</td>
                 <td className="border-2 border-black text-start py-3 pl-3">{partDetails.partName}</td>
                 <td className="border-2 border-black text-center py-3">{partDetails.quantity}</td>
                </tr>
              ))
            )}
            </table>
  
              </div>
      </div>
    );
};

export default StockLive;