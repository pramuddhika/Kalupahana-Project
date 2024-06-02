import { useEffect, useState } from "react";
import axios from "axios";
import Select from 'react-select';
import customStyles from '../components/SelectStyle';
import jsPDF from 'jspdf';
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable';



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
      const res = await axios.get('/api/stock/get');
      setTableDetails(res.data.partDetails);
    }catch(err){
      console.log('Error fetching data:',err);
    }
  }

  //get data from database for select item
  const fechSearchByID = async (searchID) => {
    try{
      const res = await axios.get(`/api/stock/search/${searchID}`)
      setTableDetails(res.data);
    }catch(err){
      console.log('Error fetching data: ' , err);
    }
  };

  //get available stock data
  const fetchAvailable =  async () => {
    try{
      const res = await axios.get('/api/stock/available');
      setTableDetails(res.data);
    }catch(err){
      console.log('Error fetching data:',err);
    }
  }

  //geta not availble data
  const fetchNotAvailable =  async () => {
    try{
      const res = await axios.get('/api/stock/notavailable');
      setTableDetails(res.data);
    }catch(err){
      console.log('Error fetching data:',err);
    }
  }

  //geta low to high stock data
  const fetchLowToHigh =  async () => {
    try{
      const res = await axios.get('/api/stock/l2h');
      setTableDetails(res.data);
    }catch(err){
      console.log('Error fetching data:',err);
    }
  }

  //geta hiigh to low stock data
  const fetchHighToLow =  async () => {
    try{
      const res = await axios.get('/api/stock/h2l');
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
    {value:'l2h', label:'Quantity - Asecending order 🔺'},
    {value:'h2l', label:'Quantity - Descending order 🔻'}
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
    // console.log(filter);
    setRefresh(!refresh);
  }
  
  //############# create stock report ############################
  const printDocument = () => {
    // A4 size page of PDF
    const pdf = new jsPDF('p', 'mm', 'a4'); 
    const pageWidth = pdf.internal.pageSize.getWidth();
    //main title
    pdf.setFontSize(22); 
    pdf.setFont("helvetica", "bold"); 
    const title = 'Kalupahana Motor Engineering';
    const titleWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2; 
    pdf.text(title, titleX, 20);
    // Add subtitle
    pdf.setFontSize(12); 
    pdf.setFont("helvetica", "normal"); 
    const subtitle = 'Mahingoda Junction Bus Stop,Ratnapura Road,Eheliyagoda. - 0773880154';
    const subtitleWidth = pdf.getStringUnitWidth(subtitle) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const subtitleX = (pageWidth - subtitleWidth) / 2; 
    pdf.text(subtitle, subtitleX, 26); 
    // Add another text row
    const reportText = 'Stock Report';
    pdf.setFont("helvetica", "bold");
    pdf.text(reportText, 26, 35);

    const dateText = new Date().toLocaleDateString();
    const dateTextWidth = pdf.getStringUnitWidth(dateText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    pdf.text(dateText, pageWidth - dateTextWidth - 26, 35);
  
    // Get table data
const tableData = tabledetails.map(item => [item.partID, item.partName, `${item.quantity} ${item.unit}`]); 
const columns = ['Part ID', 'Part Name', 'Quantity']; 

// Add table to PDF
pdf.autoTable(columns, tableData, {
  startY: 45, 
  margin: { horizontal: (pageWidth * 0.25) / 2 },
  styles: { halign: 'center' },
  // Center the content of the Part ID and quantity
  columnStyles: {
    0: { halign: 'center' }, 
    1: {halign: 'start'},
    2: { halign: 'center' }
  } 
});
    // Get current date and time and format it as a string
    const date = new Date();
    const dateTimeString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    // Save the PDF with the date and time in the filename
    pdf.save(`Kalupahana-stock-${dateTimeString}.pdf`);  
  }



  return (
    <div>

      <div className="flex justify-center">

        <div className="flex justify-center items-center gap-16 card mt-10 p-8 w-11/12">
          {/** filters - start */}
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
          {/**filters - end */}

          {/**report download button - satrt */}    
          <div className="border-text-primary">
           <button className="btn btn-normal w-48" onClick={printDocument}>Get Report</button>
          </div>
          {/**report download button - end */}    
        </div>
      </div>

      <div className="mt-10">
        {/** data disply table - start */}      
        <table id="stock_table" className="w-10/12 mx-auto font-inter">
          <tr className="bg-text-primary text-white h-12">
            <th className="w-1/4 border-2 border-black">Part ID</th>
            <th className="w-1/2 border-2 border-black">Part Name</th>
            <th colSpan={2} className="w-1/4 border-2 border-black">Quantity</th>
          </tr>

          {tabledetails == null || tabledetails.length == 0 ? (
            <tr>
              <td colSpan={4} className="border-2 border-black text-center py-3  mainStyle">No data to display</td>
            </tr>
          ):(
            tabledetails && tabledetails.map ( (partDetails, index) => (
              <tr key={index} className="bg-gray-300 p-2">
                <td className="border-2 border-black text-center py-3">{partDetails.partID}</td>
                <td className="border-2 border-black text-start py-3 pl-3">{partDetails.partName}</td>
                <td className="border-y-2 border-l-2 border-black text-right py-3">{partDetails.quantity}</td>
                <td className="border-y-2 border-r-2 border-black py-3 w-8 text-left">{partDetails.unit}</td>
              </tr>
            ))
          )}
        </table>
        {/** data disply table - end */}  
  
      </div>
    </div>
  );
};

export default StockLive;