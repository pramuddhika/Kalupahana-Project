import { useEffect, useState } from "react";
import axios from "axios";
import Select from 'react-select';
import customStyles from '../components/SelectStyle';



const StockLive = () => {

  const [tabledetails,setTableDetails] = useState(null);
  const [selectedPart,setSelectedPart] = useState(null);
  const [refresh,setRefresh] = useState(false);
  const [searchID,setSearchID] = useState(null);
  const [selectedFilter,setSelectedFilter] = useState(null);
  const [filter,setFilter] = useState(null);
  
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

  //get available stock data
  const fetchAvailable =  async () => {
    try{
      const res = await axios.get('http://localhost:8000/api/stock/available');
      setTableDetails(res.data);
    }catch(err){
      console.log('Error fetching data:',err);
    }
  }

  //geta not availble data
  const fetchNotAvailable =  async () => {
    try{
      const res = await axios.get('http://localhost:8000/api/stock/notavailable');
      setTableDetails(res.data);
    }catch(err){
      console.log('Error fetching data:',err);
    }
  }

  //geta low to high stock data
  const fetchLowToHigh =  async () => {
    try{
      const res = await axios.get('http://localhost:8000/api/stock/l2h');
      setTableDetails(res.data);
    }catch(err){
      console.log('Error fetching data:',err);
    }
  }

  //geta hiigh to low stock data
  const fetchHighToLow =  async () => {
    try{
      const res = await axios.get('http://localhost:8000/api/stock/h2l');
      setTableDetails(res.data);
    }catch(err){
      console.log('Error fetching data:',err);
    }
  }

  useEffect( () => {
    if(filter === 'available' || searchID !== null ) {
      fetchAvailable();
      fechSearchByID(searchID);
    } else if (filter === 'notavailable' || searchID !== null) {
      fetchNotAvailable();
      fechSearchByID(searchID);
    } else if (filter === 'l2h' || searchID !== null) {
      fetchLowToHigh();
      fechSearchByID(searchID);
    } else if (filter == 'h2l' || searchID !== null) {
      fetchHighToLow();
      fechSearchByID(searchID);
    } else if (filter === null && searchID === null) {
      fetchTableData();
    }
  },[refresh,searchID,filter])

  //filter by part id or name - option list
  const optionForID_Name = tabledetails ? tabledetails.map(part => ({
    value: part.partID,
    label: `${part.partID} - ${part.partName}`
  })):[]; 

  //filter option for main filters
  const optionForFilter = [
    {value:'available' , label: 'Only Available'},
    {value:'notavailable', label: 'Not Available'},
    {value:'l2h', label:'Quantity - Low to High'},
    {value:'h2l', label:'Quantity - High to Low'}
  ]

  //handel part id & name searchbar
  const handlePartIDChange = (option) => {
    setSelectedPart(option);
    const currentOption = (option ? option.value : null);
    setSearchID(currentOption);
    setRefresh(!refresh);
  };

  //handle selected filter
  const handlefilterChange = (option) => {
    setSelectedFilter(option);
    const currentFilter = (option ? option.value : null);
    setFilter(currentFilter);
    console.log(filter);
    // setRefresh(!refresh);
  }



    return (

      <div>
        <div className="flex justify-center">
           
            <div className="flex justify-center items-center gap-10 card mt-10 p-8 w-11/12">

             <div className="border-2 border-text-primary p-4 rounded-lg">
                <Select className="w-72"
                 options={optionForFilter}
                 isClearable
                 styles={customStyles}
                 onChange={handlefilterChange}
                 value={selectedFilter}
                 placeholder='Add your filter'/>
                
              </div>

              <div className="border-2 border-text-primary p-4 rounded-lg">
              <Select className="w-60"
               options={optionForID_Name}
               isClearable
               styles={customStyles}
               onChange={handlePartIDChange}
               value={selectedPart}
               placeholder='Add Part Id or Name'/>
              </div>
               
               <div className="border-text-primary border-2 p-4 rounded-lg">
                 <button className="btn btn-normal w-48">Get Report</button>
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