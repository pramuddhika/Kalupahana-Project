import {TrashIcon,PencilSquareIcon} from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StockAddPart = () => {

  const [details,setDetails] = useState(null);
  const [refresh,setRefresh] = useState(false)
  const [inputs, setInputs] = useState({
    partID:"",
    partName:"",
    partDescription:""
  });

  useEffect( ()=> {
    const fechPartDetails = async () => {
      try{
        const res = await axios.get("http://localhost:8000/api/stock/get")
        setDetails(res.data);
      }catch(err){
        console.log('Error fetching data: ' , err);
      }
    }
    fechPartDetails()
  },[refresh])

  const handleInputChange = (e) => {
    setInputs( prevInputs => ({
      ...prevInputs,[e.target.name]: e.target.value
    }));
  }

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

    return (
        <div  className="flex justify-center gap-8">

          <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light"/>

          {/**input form -start */} 
          <div className="card w-4/12 p-6 mt-28 h-92">
            <p className="topic text-xl mb-4">Part Details</p>

            <div className="flex fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Part Id:</p>
              <input type="text" name='partID' value={inputs.partID} onChange={handleInputChange} required 
               className="input basis-1/2 rounded-lg p-2 pl-4" placeholder='Add part ID'/>
            </div>

            <div className="flex fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Part Name:</p>
              <input type="text" name='partName' value={inputs.partName} onChange={handleInputChange} required 
               className="input basis-1/2 rounded-lg p-2 pl-4" placeholder='Add Part Name'/>
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
            
            <div className='flex justify-center mb-3 gap-6'>
              <input type='text' className='input  rounded-lg pl-2' placeholder='Add part name or part ID'/>
              <button className='btn btn-normal'>Search</button>
            </div>

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
                     <td className="border-2 border-black overflow-hidden overflow-ellipsis">{partDetails.description}</td>
                     <td className="border-2 border-black cursor-pointer w-12">
                       <PencilSquareIcon className='text-green-700 h-5 mx-auto'/>
                     </td>
                     <td className="border-2 border-black cursor-pointer w-12">
                      <TrashIcon className='text-red-600 h-5 mx-auto'/>
                     </td>
                   </tr>
                  ))
                )}

                
    
              </table>
              </div>

          </div>
          {/**table part - end */}

        </div>
    );
};

export default StockAddPart;