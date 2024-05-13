import {TrashIcon,PencilSquareIcon} from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../components/Modal';
import Select from 'react-select';


const StockAddPart = () => {

  const [details,setDetails] = useState(null);
  const [refresh,setRefresh] = useState(false);
  const [selectedRow, setSelectedRow] = useState('');
  const [editPartID, setEditPartID] = useState('');
  const [editPartName, setEditPartName] = useState('');
  const [initialPartName, setInitialPartName] = useState('');
  const [initialPartDescription, setInitialPartDescription] = useState('');
  const [editPartDescription, setEditPartDescription] = useState('');
  const [openDeleteModal,setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [inputs, setInputs] = useState({partID:"", partName:"", partDescription:""});
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchID,setSearchID] = useState(null);

  //get data from database
  const fechPartDetails = async () => {
    try{
      const res = await axios.get("http://localhost:8000/api/stock/get")
      setDetails(res.data);
    }catch(err){
      console.log('Error fetching data: ' , err);
    }
  };

  //get data from database
  const fechSearchDetails = async (searchID) => {
    try{
      const res = await axios.get(`http://localhost:8000/api/stock/search/${searchID}`)
      setDetails(res.data);
    }catch(err){
      console.log('Error fetching data: ' , err);
    }
  };

  //handel searchbar inputs
  const handleChange = (option) => {
    setSelectedOption(option);
    const currentOption = (option ? option.value : null);
    setSearchID(currentOption);
    setRefresh(!refresh);
  };

  useEffect( ()=> {
    if (searchID === null) {
      fechPartDetails();
    } else {
      fechSearchDetails(searchID);
    }
  }, [refresh, searchID]);

  // Prepare your options array
  const options = details ? details.map(item => ({
  value: item.partID,
  label: `${item.partID} - ${item.partName}`
  })) : [];
  // styles for select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: 'transparent',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'transparent'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a7b0b5' : state.isFocused ? '#a7b0b5' : null,
    }),
    activeOption: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a7b0b5' : state.isFocused ? '#a7b0b5' : null,
    }),
  };
  
  //handle form user input
  const handleInputChange = (e) => {
    setInputs( prevInputs => ({
      ...prevInputs,[e.target.name]: e.target.value
    }));
  }

  const handlePartNameEditChange        = (e) => {setEditPartName(e.target.value);}
  const handlePartDescriptionEditChange = (e) => {setEditPartDescription(e.target.value);}

  //clearn user inputs
  const handleClear = () => {
    setInputs({
      partID:'',
      partName:'',
      partDescription:''
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //chack inputs are not empty
    if (!inputs.partID) {
      toast.error('Part ID cannot be empty');
      return;
    }
    if (!inputs.partName) {
      toast.error('Part Name cannot be empty');
      return;
    }
    //send data to server
    try{
      const res = await axios.post('http://localhost:8000/api/stock/add', inputs);
      setRefresh(!refresh);
      handleClear();
      toast.success(res.data);
    }catch(err){
      toast.warning(err.response.data)
    }
  }

  const handleDeleteClick = (data) => {
    setSelectedRow(data);
    setOpenDeleteModal(true);
  };
  
  const handleEditClick = (data) => {
    setEditPartID(data.partID);
    setEditPartName(data.partName);
    setEditPartDescription(data.description);

    // Set the initial state
    setInitialPartName(data.partName);
    setInitialPartDescription(data.description);
    
    setOpenEditModal(true);
  };

  //handle delete option
  const handleDelete = async (partID) => {
     try{
      const res = await axios.delete(`http://localhost:8000/api/stock/deletepart/${partID}`);
      setSelectedOption(null);
      setSearchID(null);
      setRefresh(!refresh);
      setOpenDeleteModal(false);
      toast.success(res.data);
     }catch(err){
      toast.error(err.response.data);
     }
  }
  
  //handle update option
  const handleUpdate = async (e) =>{
    e.preventDefault();
    // Check if there are changes
    if (editPartName === initialPartName && editPartDescription === initialPartDescription) {
    toast.warning('No changes made');
    return;
    }
    //handel update data
    try{
      const res = await axios.put('http://localhost:8000/api/stock/update',{editPartName,editPartDescription,editPartID});
      setSelectedOption(null);
      setSearchID(null);
      setRefresh(!refresh);
      setOpenEditModal(false);
      toast.success(res.data);
    }catch(err){
      toast.error(err.response.data);
    }
  }

    return (
        <div  className="flex justify-center gap-8">
        
          <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

          {/**input form -start */} 
          <div className="card w-4/12 p-6 mt-28 h-92">
            <p className="topic text-xl mb-4">Part Details</p>

            <div className="flex fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Part Id:</p>
              <input type="text" name='partID' value={inputs.partID} onChange={handleInputChange} required 
               className="input basis-1/2 rounded-lg p-2 pl-4" placeholder='Add part ID' maxLength='20'/>
            </div>

            <div className="flex fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Part Name:</p>
              <input type="text" name='partName' value={inputs.partName} onChange={handleInputChange} required 
               className="input basis-1/2 rounded-lg p-2 pl-4" placeholder='Add Part Name' maxLength='60'/>
            </div>

            <div className="flex fornt-inter">
              <p className="basis-1/4 text-text-primary font-semibold mt-3">Description:</p>
              <div className='relative bg-white rounded-lg'>
               <textarea rows={4} name='partDescription' value={inputs.partDescription} onChange={handleInputChange} required 
               className="input w-60 rounded-lg p-2 pl-4 pr-2" placeholder='Note about part' maxLength="120"/>
               <div className="absolute bottom-0 right-0 bg-white text-end rounded-lg pr-2 text-gray-500 text-sm">{inputs.partDescription.length}/120</div>
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-4">
              <button className="btn btn-warning" onClick={handleClear}>Clear</button>
              <button className="btn btn-normal" onClick={handleSubmit}>Submit</button>
            </div>

          </div>
          {/**input form - end */}

          {/**table part - satrt */}
          <div className="card w-6/12 mt-28 p-6 h-92">
            
            {/**search bar - start */}
            <div className='flex justify-center items-center gap-5'>
            <p className='topic'>Search Part :</p>
            <Select className="input p-2 rounded-lg w-96"
              options={options}
              isClearable
              styles={customStyles}
              onChange={handleChange}
              value={selectedOption}
              placeholder='Enter part ID or name'/>
            </div>
            {/**search bar - end */}

             <div className="flex justify-center overflow-auto max-h-80">
              <table className="mx-auto font-inter mt-4 w-11/12">
                <tr className='bg-text-primary text-white'>
                  <th className="border-2 border-black">Part ID</th>
                  <th className="border-2 border-black">Part Name</th>
                  <th className="border-2 border-black">Description</th>
                  <th colSpan="2" className="border-2 border-black">Action</th>
                </tr>

                {details == null || details.length == 0? (
                  <tr>
                    <td colSpan="4" className='text-center border-2 border-black py-2'>No data to display</td>
                  </tr>
                ):(
                  details && details.map( (partDetails, index) => (
                    <tr key={index} className="text-center">
                     <td className="border-2 w-24 border-black overflow-hidden overflow-ellipsis">{partDetails.partID}</td>
                     <td className="border-2 border-black overflow-hidden overflow-ellipsis">{partDetails.partName}</td>
                     <td className="border-2 border-black overflow-hidden text-start pl-1 overflow-ellipsis">{partDetails.description}</td>
                     <td className="border-2 border-black cursor-pointer w-12" onClick={() => handleEditClick(partDetails)}>
                        <PencilSquareIcon className='text-green-700 h-5 mx-auto'/>
                     </td>
                     <td className="border-2 border-black cursor-pointer w-12" onClick={() => handleDeleteClick(partDetails)}>
                      <TrashIcon className='text-red-600 h-5 mx-auto'/>
                     </td>
                   </tr>
                  ))
                )}
              </table>
              </div>
          </div>
          {/**table part - end */}

          {/**delete modal - start */}
          <Modal open={openDeleteModal}>
            <div>
             <div onClick={(e) => e.stopPropagation()}>
                <p className="font-bold pb-2 text-red-600 text-2xl text-center mb-3">Delete Part Details</p>

                <div className="flex fornt-inter items-center mb-4">
                  <p className="w-24 text-text-primary font-semibold">Part Id:</p>
                  <input type="text" value={selectedRow.partID} readOnly 
                  className="input w-64 border-2 rounded-lg p-2 pl-4"/>
                </div>

                <div className="flex fornt-inter items-center mb-4">
                  <p className="w-24 text-text-primary font-semibold">Part Name:</p>
                  <input type="text" value={selectedRow.partName} readOnly
                  className="input w-64 border-2 rounded-lg p-2 pl-4"/>
                </div>

                <div className="flex fornt-inter">
                  <p className="w-24 text-text-primary font-semibold mt-3">Description:</p>                  
                  <textarea rows={4} value={selectedRow.description} readOnly 
                  className="input w-64 border-2 rounded-lg p-2 pl-4 pr-2"/>              
                </div>

                <div className="flex justify-center gap-8 mt-4">
                 <button className='btn btn-normal'onClick={ () => { setOpenDeleteModal(false)}}>Cancel</button>
                 <button className="btn btn-warning" onClick={ () => {handleDelete(selectedRow.partID)}}>Delete</button>
                </div>

              </div>
            </div>
          </Modal>
          {/**delete modal - end   */}

          {/**edit modal - start */}
          <Modal open={openEditModal}>
            <div>
             <div onClick={(e) => e.stopPropagation()}>
                <p className="font-bold pb-2 text-text-primary text-2xl text-center mb-3">Part Details Update</p>

                <div className="flex fornt-inter items-center mb-4 w-88">
                  <p className="w-24 text-text-primary font-semibold">Part Id:</p>
                  <input type="text" value={editPartID} maxLength="20" readOnly
                  className="input w-64 rounded-lg p-2 pl-4  border-2"/>
                </div>

                <div className="flex fornt-inter items-center mb-4 w-88">
                  <p className="w-24 text-text-primary font-semibold">Part Name:</p>
                  <input type="text" value={editPartName} maxLength="100" onChange={handlePartNameEditChange}
                  className="input w-64 rounded-lg p-2 pl-4 border-2"/>
                </div>

                <div className="flex fornt-inter ">
                  <p className="w-24 text-text-primary font-semibold mt-3">Description:</p>
                  <div className='relative bg-white rounded-lg'>
                   <textarea rows={4} value={editPartDescription} onChange={handlePartDescriptionEditChange}
                   className="input w-64 rounded-lg p-2 pl-4 pr-2 border-2" maxLength="120"/>
                   <div className="absolute bottom-2 right-2 bg-white text-end rounded-lg pr-2 
                  text-gray-500 text-sm">{editPartDescription.length}/120</div>
                  </div>                         
                </div>

                <div className="flex justify-center gap-8 mt-4">
                 <button className='btn btn-normal'onClick={ () => { setOpenEditModal(false)}}>Cancel</button>
                 <button className="btn bg-green-700 text-white font-semibold" onClick={handleUpdate}>Update</button>
                </div>

              </div>
            </div>
          </Modal>
          {/**edit modal - end   */}

        </div>
    );
};

export default StockAddPart;